const { ethers } = require("hardhat");

async function main() {
  console.log("Initializing Active Causes with FHE encryption...");

  // Load contract address from config
  const contractInfo = require("../src/config/contract.json");
  const contractAddress = contractInfo.address;
  const SecretHeartsGive = await ethers.getContractFactory("SecretHeartsGive");
  const contract = SecretHeartsGive.attach(contractAddress);

  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Sample causes data (these would normally be encrypted in the frontend)
  const causes = [
    {
      name: "Clean Water Initiative",
      description: "Providing clean drinking water to remote communities worldwide",
      targetAmount: 50000, // This would be encrypted in real usage
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

  console.log("\n=== Creating Causes ===");

  for (let i = 0; i < causes.length; i++) {
    const cause = causes[i];
    console.log(`\nCreating cause ${i + 1}: ${cause.name}`);
    
    try {
      // Use createCauseSimple for easy case creation (no FHE encryption needed for creation)
      const tx = await contract.createCauseSimple(
        cause.name,
        cause.description,
        cause.targetAmount,
        cause.duration
      );
      
      await tx.wait();
      console.log(`✅ Cause "${cause.name}" created successfully`);
      console.log(`   Target: $${cause.targetAmount.toLocaleString()}`);
      console.log(`   Duration: ${cause.duration / (24 * 60 * 60)} days`);
      
    } catch (error) {
      console.error(`❌ Failed to create cause "${cause.name}":`, error.message);
      if (error.data) {
        console.error(`   Error data:`, error.data);
      }
    }
  }

  // Check final state
  console.log("\n=== Final State ===");
  const causeCount = await contract.getCauseCount();
  console.log("Total causes created:", causeCount.toString());

  console.log("\n🎉 Active Causes initialization completed!");
  console.log("Contract Address:", contractAddress);
  console.log("Deployer Address:", deployer.address);
  
  // Display all created causes
  if (Number(causeCount) > 0) {
    console.log("\n=== Created Causes Summary ===");
    for (let i = 0; i < Number(causeCount); i++) {
      try {
        const causeInfo = await contract.getCauseInfo(i);
        console.log(`\nCause ${i}:`);
        console.log(`  Name: ${causeInfo.name}`);
        console.log(`  Target: $${causeInfo.targetAmount}`);
        console.log(`  Current: $${causeInfo.currentAmount}`);
        console.log(`  Donors: ${causeInfo.donorCount}`);
        console.log(`  Active: ${causeInfo.isActive}`);
      } catch (err) {
        console.error(`  Error fetching cause ${i}:`, err.message);
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
