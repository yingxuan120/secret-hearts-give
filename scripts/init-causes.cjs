const { ethers } = require("hardhat");

async function main() {
  console.log("Initializing Active Causes with FHE encryption...");

  const contractAddress = "0xCbfaE5985376810C85554dFE3336093DA97187A4";
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
      // Note: In a real implementation, the targetAmount would be encrypted
      // For this demo, we'll create a simple encrypted input
      // In production, this would be done by the frontend using FHEVM
      
      // For now, we'll create a placeholder encrypted input
      // This is a simplified version - in reality, you'd use FHEVM to encrypt
      const mockEncryptedAmount = "0x" + "0".repeat(64); // Placeholder
      const mockInputProof = "0x" + "0".repeat(64); // Placeholder
      
      const tx = await contract.createCause(
        cause.name,
        cause.description,
        mockEncryptedAmount,
        cause.duration,
        mockInputProof
      );
      
      await tx.wait();
      console.log(`✅ Cause "${cause.name}" created successfully`);
      console.log(`   Target: $${cause.targetAmount.toLocaleString()}`);
      console.log(`   Duration: ${cause.duration / (24 * 60 * 60)} days`);
      
    } catch (error) {
      console.error(`❌ Failed to create cause "${cause.name}":`, error.message);
    }
  }

  // Check final state
  console.log("\n=== Final State ===");
  const causeCount = await contract.getCauseCount();
  console.log("Total causes created:", causeCount.toString());

  console.log("\n🎉 Active Causes initialization completed!");
  console.log("Contract Address:", contractAddress);
  console.log("Deployer Address:", deployer.address);
  console.log("\n📋 Note: In production, target amounts would be encrypted using FHEVM");
  console.log("This demo shows the structure - real encryption happens in the frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
