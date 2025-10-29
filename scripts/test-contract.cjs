const { ethers } = require("hardhat");

async function main() {
  console.log("Testing SecretHeartsGive contract...");

  // Get the deployed contract
  const contractAddress = "0x369e290dA6376e97367FbD10299fac5de06Fa725";
  const SecretHeartsGive = await ethers.getContractFactory("SecretHeartsGive");
  const contract = SecretHeartsGive.attach(contractAddress);

  console.log("Contract address:", contractAddress);

  // Test basic contract functions
  try {
    const causeCount = await contract.getCauseCount();
    console.log("Current cause count:", causeCount.toString());

    const donationCount = await contract.getDonationCount();
    console.log("Current donation count:", donationCount.toString());

    const reportCount = await contract.getReportCount();
    console.log("Current report count:", reportCount.toString());

    console.log("Contract is working correctly!");
  } catch (error) {
    console.error("Error testing contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
