const { ethers } = require("hardhat");
const contractInfo = require("../src/config/contract.json");

async function main() {
  console.log("Initializing 3 sample Active Causes...");
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  const contractAddress = contractInfo.address;
  const SecretHeartsGive = await ethers.getContractFactory("SecretHeartsGive");
  const contract = SecretHeartsGive.attach(contractAddress);

  console.log("\n=== Contract Information ===");
  console.log("Contract Address:", contractAddress);
  console.log("Deployer Address:", deployer.address);

  console.log("\n=== Current State ===");
  const initialCauseCount = await contract.getCauseCount();
  console.log("Initial cause count:", initialCauseCount.toString());

  const sampleCauses = [
    {
      name: "Clean Water Initiative",
      description: "Providing clean drinking water to remote communities worldwide",
      targetAmount: 50000,
      duration: 30 * 24 * 60 * 60 // 30 days in seconds
    },
    {
      name: "Education for All",
      description: "Supporting educational programs for underprivileged children",
      targetAmount: 75000,
      duration: 45 * 24 * 60 * 60 // 45 days in seconds
    },
    {
      name: "Emergency Relief Fund",
      description: "Rapid response to natural disasters and humanitarian crises",
      targetAmount: 100000,
      duration: 60 * 24 * 60 * 60 // 60 days in seconds
    }
  ];

  console.log("\n=== Creating Sample Causes ===");
  let createdCausesCount = 0;
  
  for (const cause of sampleCauses) {
    console.log(`\nCreating cause ${createdCausesCount + 1}: ${cause.name}`);
    try {
      const tx = await contract.createCauseSimple(
        cause.name,
        cause.description,
        cause.targetAmount,
        cause.duration,
        { gasLimit: 500000 }
      );
      
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log(`✅ Cause "${cause.name}" created successfully`);
      createdCausesCount++;
    } catch (error) {
      console.error(`❌ Failed to create cause "${cause.name}":`, error.message);
    }
  }

  console.log("\n=== Final State ===");
  const finalCauseCount = await contract.getCauseCount();
  console.log("Total causes created:", finalCauseCount.toString());

  console.log("\n=== Sample Causes Created ===");
  for (let i = 0; i < Number(finalCauseCount); i++) {
    try {
      const cause = await contract.causes(i);
      console.log(`\n${i + 1}. ${cause.name}`);
      console.log(`   Description: ${cause.description}`);
      console.log(`   Organizer: ${cause.organizer}`);
      console.log(`   Active: ${cause.isActive}`);
      console.log(`   Verified: ${cause.isVerified}`);
    } catch (error) {
      console.error(`Error fetching cause ${i}:`, error.message);
    }
  }

  console.log("\n🎉 Sample causes initialization completed!");
  console.log("Contract Address:", contractAddress);
  console.log("Deployer Address:", deployer.address);
  console.log("\n📋 Note: Target amounts are stored as FHE-encrypted euint32 values");
  console.log("Donations will be encrypted using FHEVM for privacy protection");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
