// Frontend initialization script for Active Causes
// This would be called from the frontend to create sample causes with FHE encryption

export const initializeActiveCauses = async (contract, instance, userAddress) => {
  console.log("Initializing Active Causes with FHE encryption...");

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

  const createdCauses = [];

  for (let i = 0; i < sampleCauses.length; i++) {
    const cause = sampleCauses[i];
    console.log(`Creating cause ${i + 1}: ${cause.name}`);
    
    try {
      // Create encrypted input for target amount
      const input = instance.createEncryptedInput(contract.address, userAddress);
      input.add32(cause.targetAmount);
      const encryptedInput = await input.encrypt();

      // Create the cause with encrypted target amount
      const tx = await contract.createCause(
        cause.name,
        cause.description,
        encryptedInput.handles[0],
        cause.duration,
        encryptedInput.inputProof
      );
      
      await tx.wait();
      
      createdCauses.push({
        ...cause,
        id: i,
        txHash: tx.hash
      });
      
      console.log(`✅ Cause "${cause.name}" created successfully`);
      
    } catch (error) {
      console.error(`❌ Failed to create cause "${cause.name}":`, error);
    }
  }

  return createdCauses;
};

// Helper function to get cause information with decryption
export const getCauseInfo = async (contract, instance, userAddress, causeId) => {
  try {
    // Get encrypted cause data
    const encryptedData = await contract.getEncryptedCauseData(causeId);
    
    // Decrypt the data (this would require proper FHE decryption setup)
    // For now, we'll return the structure
    return {
      id: causeId,
      name: encryptedData.name,
      description: encryptedData.description,
      // Note: targetAmount, currentAmount, donorCount would be decrypted here
      isActive: encryptedData.isActive,
      isVerified: encryptedData.isVerified,
      organizer: encryptedData.organizer,
      startTime: encryptedData.startTime,
      endTime: encryptedData.endTime
    };
  } catch (error) {
    console.error("Error getting cause info:", error);
    return null;
  }
};

// Sample data for frontend display (before FHE integration)
export const sampleCausesData = [
  {
    id: 0,
    title: "Clean Water Initiative",
    description: "Providing clean drinking water to remote communities worldwide",
    goal: 50000,
    raised: 32847,
    donors: 156
  },
  {
    id: 1,
    title: "Education for All",
    description: "Supporting educational programs for underprivileged children",
    goal: 75000,
    raised: 48293,
    donors: 203
  },
  {
    id: 2,
    title: "Emergency Relief Fund", 
    description: "Rapid response to natural disasters and humanitarian crises",
    goal: 100000,
    raised: 67841,
    donors: 298
  }
];
