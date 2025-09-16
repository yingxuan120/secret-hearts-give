const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const SecretHeartsGive = await ethers.getContractFactory("SecretHeartsGive");
  
  // Deploy the contract
  console.log("Deploying SecretHeartsGive...");
  
  // You'll need to provide verifier and treasury addresses
  const verifier = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual verifier address
  const treasury = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual treasury address
  
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
