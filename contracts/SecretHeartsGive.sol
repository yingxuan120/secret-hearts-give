// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretHeartsGive is SepoliaConfig {
    using FHE for *;
    
    struct CharityCause {
        euint32 causeId;
        euint32 targetAmount;
        euint32 currentAmount;
        euint32 donorCount;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        address organizer;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct PrivateDonation {
        euint32 donationId;
        euint32 amount;
        address donor;
        uint256 timestamp;
        bool isProcessed;
    }
    
    struct ImpactReport {
        euint32 reportId;
        euint32 beneficiariesReached;
        euint32 fundsUtilized;
        bool isVerified;
        string reportHash;
        address reporter;
        uint256 timestamp;
    }
    
    mapping(uint256 => CharityCause) public causes;
    mapping(uint256 => PrivateDonation) public donations;
    mapping(uint256 => ImpactReport) public impactReports;
    mapping(address => euint32) public donorReputation;
    mapping(address => euint32) public charityReputation;
    mapping(address => uint256[]) public donorDonations;
    mapping(uint256 => uint256[]) public causeDonations;
    
    uint256 public causeCounter;
    uint256 public donationCounter;
    uint256 public reportCounter;
    
    address public owner;
    address public verifier;
    address public treasury;
    
    event CauseCreated(uint256 indexed causeId, address indexed organizer, string name);
    event DonationMade(uint256 indexed donationId, uint256 indexed causeId, address indexed donor);
    event ImpactReported(uint256 indexed reportId, uint256 indexed causeId, address indexed reporter);
    event CauseVerified(uint256 indexed causeId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event FundsWithdrawn(uint256 indexed causeId, address indexed organizer, uint256 amount);
    
    constructor(address _verifier, address _treasury) {
        owner = msg.sender;
        verifier = _verifier;
        treasury = _treasury;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function createCause(
        string memory _name,
        string memory _description,
        externalEuint32 _targetAmount,
        uint256 _duration,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Cause name cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 causeId = causeCounter++;
        
        // Convert external encrypted target amount to internal euint32
        euint32 encryptedTargetAmount = FHE.fromExternal(_targetAmount, inputProof);
        
        causes[causeId] = CharityCause({
            causeId: FHE.asEuint32(uint32(causeId)),
            targetAmount: encryptedTargetAmount,
            currentAmount: FHE.asEuint32(0),
            donorCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            organizer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit CauseCreated(causeId, msg.sender, _name);
        return causeId;
    }
    
    // Simplified createCause function for easy case creation (non-FHE version)
    function createCauseSimple(
        string memory _name,
        string memory _description,
        uint32 _targetAmount,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Cause name cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(_targetAmount > 0, "Target amount must be positive");
        
        uint256 causeId = causeCounter++;
        
        causes[causeId] = CharityCause({
            causeId: FHE.asEuint32(uint32(causeId)),
            targetAmount: FHE.asEuint32(_targetAmount),
            currentAmount: FHE.asEuint32(0),
            donorCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            organizer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit CauseCreated(causeId, msg.sender, _name);
        return causeId;
    }
    
    function makePrivateDonation(
        uint256 causeId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(causes[causeId].organizer != address(0), "Cause does not exist");
        require(causes[causeId].isActive, "Cause is not active");
        require(block.timestamp <= causes[causeId].endTime, "Cause has ended");
        require(msg.value > 0, "Donation amount must be greater than 0");
        
        uint256 donationId = donationCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        donations[donationId] = PrivateDonation({
            donationId: FHE.asEuint32(uint32(donationId)),
            amount: internalAmount,
            donor: msg.sender,
            timestamp: block.timestamp,
            isProcessed: false
        });
        
        // Update cause totals
        causes[causeId].currentAmount = FHE.add(causes[causeId].currentAmount, internalAmount);
        causes[causeId].donorCount = FHE.add(causes[causeId].donorCount, FHE.asEuint32(1));
        
        // Track donations
        donorDonations[msg.sender].push(donationId);
        causeDonations[causeId].push(donationId);
        
        // Mark donation as processed
        donations[donationId].isProcessed = true;
        
        emit DonationMade(donationId, causeId, msg.sender);
        return donationId;
    }
    
    function submitImpactReport(
        uint256 causeId,
        euint32 beneficiariesReached,
        euint32 fundsUtilized,
        string memory reportHash
    ) public returns (uint256) {
        require(causes[causeId].organizer == msg.sender, "Only organizer can submit report");
        require(causes[causeId].isActive, "Cause must be active");
        require(bytes(reportHash).length > 0, "Report hash cannot be empty");
        
        uint256 reportId = reportCounter++;
        
        impactReports[reportId] = ImpactReport({
            reportId: FHE.asEuint32(uint32(reportId)),
            beneficiariesReached: beneficiariesReached,
            fundsUtilized: fundsUtilized,
            isVerified: false,
            reportHash: reportHash,
            reporter: msg.sender,
            timestamp: block.timestamp
        });
        
        emit ImpactReported(reportId, causeId, msg.sender);
        return reportId;
    }
    
    function verifyCause(uint256 causeId, bool isVerified) public onlyVerifier {
        require(causes[causeId].organizer != address(0), "Cause does not exist");
        
        causes[causeId].isVerified = isVerified;
        emit CauseVerified(causeId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public onlyVerifier {
        require(user != address(0), "Invalid user address");
        
        // Determine if user is donor or charity based on context
        if (donorDonations[user].length > 0) {
            donorReputation[user] = reputation;
        } else {
            charityReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 causeId) public {
        require(causes[causeId].organizer == msg.sender, "Only organizer can withdraw");
        require(causes[causeId].isVerified, "Cause must be verified");
        require(block.timestamp > causes[causeId].endTime, "Cause must be ended");
        
        // Calculate total funds raised for this cause
        uint256 totalFunds = 0;
        for (uint256 i = 0; i < causeDonations[causeId].length; i++) {
            uint256 donationId = causeDonations[causeId][i];
            if (donations[donationId].isProcessed) {
                // In a real implementation, we would decrypt the amount
                // For now, we'll use a placeholder calculation
                totalFunds += 0.1 ether; // Placeholder amount
            }
        }
        
        // Transfer funds to organizer
        if (totalFunds > 0) {
            payable(msg.sender).transfer(totalFunds);
            causes[causeId].isActive = false;
            emit FundsWithdrawn(causeId, msg.sender, totalFunds);
        }
    }
    
    function getCauseInfo(uint256 causeId) public view returns (
        string memory name,
        string memory description,
        uint8 targetAmount,
        uint8 currentAmount,
        uint8 donorCount,
        bool isActive,
        bool isVerified,
        address organizer,
        uint256 startTime,
        uint256 endTime
    ) {
        CharityCause storage cause = causes[causeId];
        return (
            cause.name,
            cause.description,
            0, // FHE.decrypt(cause.targetAmount) - will be decrypted off-chain
            0, // FHE.decrypt(cause.currentAmount) - will be decrypted off-chain
            0, // FHE.decrypt(cause.donorCount) - will be decrypted off-chain
            cause.isActive,
            cause.isVerified,
            cause.organizer,
            cause.startTime,
            cause.endTime
        );
    }
    
    function getDonationInfo(uint256 donationId) public view returns (
        uint8 amount,
        address donor,
        uint256 timestamp,
        bool isProcessed
    ) {
        PrivateDonation storage donation = donations[donationId];
        return (
            0, // FHE.decrypt(donation.amount) - will be decrypted off-chain
            donation.donor,
            donation.timestamp,
            donation.isProcessed
        );
    }
    
    function getImpactReportInfo(uint256 reportId) public view returns (
        uint8 beneficiariesReached,
        uint8 fundsUtilized,
        bool isVerified,
        string memory reportHash,
        address reporter,
        uint256 timestamp
    ) {
        ImpactReport storage report = impactReports[reportId];
        return (
            0, // FHE.decrypt(report.beneficiariesReached) - will be decrypted off-chain
            0, // FHE.decrypt(report.fundsUtilized) - will be decrypted off-chain
            report.isVerified,
            report.reportHash,
            report.reporter,
            report.timestamp
        );
    }
    
    function getDonorReputation(address donor) public view returns (uint8) {
        return 0; // FHE.decrypt(donorReputation[donor]) - will be decrypted off-chain
    }
    
    function getCharityReputation(address charity) public view returns (uint8) {
        return 0; // FHE.decrypt(charityReputation[charity]) - will be decrypted off-chain
    }
    
    function getDonorDonations(address donor) public view returns (uint256[] memory) {
        return donorDonations[donor];
    }
    
    function getCauseDonations(uint256 causeId) public view returns (uint256[] memory) {
        return causeDonations[causeId];
    }
    
    function getCauseCount() public view returns (uint256) {
        return causeCounter;
    }
    
    function getDonationCount() public view returns (uint256) {
        return donationCounter;
    }
    
    function getReportCount() public view returns (uint256) {
        return reportCounter;
    }
    
    // FHE-specific functions for encrypted data access
    function getEncryptedCauseData(uint256 causeId) public view returns (
        euint32 causeId_encrypted,
        euint32 targetAmount,
        euint32 currentAmount,
        euint32 donorCount,
        bool isActive,
        bool isVerified,
        string memory name,
        string memory description,
        address organizer,
        uint256 startTime,
        uint256 endTime
    ) {
        CharityCause storage cause = causes[causeId];
        return (
            cause.causeId,
            cause.targetAmount,
            cause.currentAmount,
            cause.donorCount,
            cause.isActive,
            cause.isVerified,
            cause.name,
            cause.description,
            cause.organizer,
            cause.startTime,
            cause.endTime
        );
    }
    
    function getEncryptedDonationData(uint256 donationId) public view returns (
        euint32 donationId_encrypted,
        euint32 amount,
        address donor,
        uint256 timestamp,
        bool isProcessed
    ) {
        PrivateDonation storage donation = donations[donationId];
        return (
            donation.donationId,
            donation.amount,
            donation.donor,
            donation.timestamp,
            donation.isProcessed
        );
    }
    
    function getEncryptedImpactReportData(uint256 reportId) public view returns (
        euint32 reportId_encrypted,
        euint32 beneficiariesReached,
        euint32 fundsUtilized,
        bool isVerified,
        string memory reportHash,
        address reporter,
        uint256 timestamp
    ) {
        ImpactReport storage report = impactReports[reportId];
        return (
            report.reportId,
            report.beneficiariesReached,
            report.fundsUtilized,
            report.isVerified,
            report.reportHash,
            report.reporter,
            report.timestamp
        );
    }
    
    // Emergency functions
    function pauseCause(uint256 causeId) public onlyOwner {
        causes[causeId].isActive = false;
    }
    
    function unpauseCause(uint256 causeId) public onlyOwner {
        causes[causeId].isActive = true;
    }
    
    function setVerifier(address _verifier) public onlyOwner {
        verifier = _verifier;
    }
    
    function setTreasury(address _treasury) public onlyOwner {
        treasury = _treasury;
    }
    
    function withdrawEmergency() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    // Fallback function to receive ETH
    receive() external payable {}
}
