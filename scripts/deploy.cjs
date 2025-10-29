const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const SecretHeartsGive = await ethers.getContractFactory("SecretHeartsGive");
  
  // Deploy the contract
  console.log("Deploying SecretHeartsGive...");
  
  // Get deployer address for verifier and treasury
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  const verifier = deployer.address; // In production, this should be a separate verifier address
  const treasury = deployer.address; // In production, this should be a separate treasury address
  
  const secretHeartsGive = await SecretHeartsGive.deploy(verifier, treasury);
  
  await secretHeartsGive.waitForDeployment();
  
  const contractAddress = await secretHeartsGive.getAddress();
  
  console.log("SecretHeartsGive deployed to:", contractAddress);
  
  // Save the contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    './src/config/contract.json',
    JSON.stringify(contractInfo, null, 2)
  );
  
  console.log("Contract info saved to src/config/contract.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
