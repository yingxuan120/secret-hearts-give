const { ethers } = require("hardhat");

async function main() {
  console.log("Initializing Active Causes (Demo Mode)...");

  const contractAddress = "0xCbfaE5985376810C85554dFE3336093DA97187A4";
  const SecretHeartsGive = await ethers.getContractFactory("SecretHeartsGive");
  const contract = SecretHeartsGive.attach(contractAddress);

  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Since FHEVM plugin is not initialized in this context,
  // we'll create a simplified version that shows the structure
  // In production, this would be done by the frontend with proper FHE encryption

  console.log("\n=== Contract Information ===");
  console.log("Contract Address:", contractAddress);
  console.log("Deployer Address:", deployer.address);
  
  // Check contract state
  const causeCount = await contract.getCauseCount();
  const donationCount = await contract.getDonationCount();
  const reportCount = await contract.getReportCount();
  
  console.log("\n=== Current State ===");
  console.log("Total causes:", causeCount.toString());
  console.log("Total donations:", donationCount.toString());
  console.log("Total reports:", reportCount.toString());

  // Get contract roles
  const owner = await contract.owner();
  const verifier = await contract.verifier();
  const treasury = await contract.treasury();
  
  console.log("\n=== Contract Roles ===");
  console.log("Owner:", owner);
  console.log("Verifier:", verifier);
  console.log("Treasury:", treasury);

  console.log("\n=== Sample Causes (Frontend Ready) ===");
  const sampleCauses = [
    {
      id: 0,
      name: "Clean Water Initiative",
      description: "Providing clean drinking water to remote communities worldwide",
      targetAmount: 50000,
      raised: 32847,
      donors: 156
    },
    {
      id: 1,
      name: "Education for All", 
      description: "Supporting educational programs for underprivileged children",
      targetAmount: 75000,
      raised: 48293,
      donors: 203
    },
    {
      id: 2,
      name: "Emergency Relief Fund",
      description: "Rapid response to natural disasters and humanitarian crises", 
      targetAmount: 100000,
      raised: 67841,
      donors: 298
    }
  ];

  sampleCauses.forEach((cause, index) => {
    console.log(`\n${index + 1}. ${cause.name}`);
    console.log(`   Description: ${cause.description}`);
    console.log(`   Target: $${cause.targetAmount.toLocaleString()}`);
    console.log(`   Raised: $${cause.raised.toLocaleString()}`);
    console.log(`   Donors: ${cause.donors}`);
  });

  console.log("\n🎉 Contract is ready for frontend integration!");
  console.log("\n📋 Next Steps:");
  console.log("1. Frontend can now connect to the contract");
  console.log("2. Users can create causes with FHE-encrypted target amounts");
  console.log("3. Users can make FHE-encrypted donations");
  console.log("4. All sensitive data will be encrypted using FHEVM");
  console.log("\n🔗 Contract Address: 0xCbfaE5985376810C85554dFE3336093DA97187A4");
  console.log("🌐 Network: Sepolia Testnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
