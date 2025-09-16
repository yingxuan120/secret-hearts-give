import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

// Contract ABI - you'll need to generate this from your compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_targetAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"}
    ],
    "name": "createCause",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "causeId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "makePrivateDonation",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "causeId", "type": "uint256"}],
    "name": "getCauseInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "targetAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "currentAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "donorCount", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "organizer", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCauseCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address - this should be set after deployment
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual address

export const useSecretHeartsContract = () => {
  const { address } = useAccount();
  
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
  });

  return {
    contract,
    address,
    isConnected: !!address,
  };
};

export const useCreateCause = () => {
  const { write, isLoading, isSuccess, error } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'createCause',
  });

  const createCause = async (
    name: string,
    description: string,
    targetAmount: number,
    duration: number
  ) => {
    if (!write) return;
    
    try {
      await write({
        args: [name, description, targetAmount, duration],
      });
    } catch (err) {
      console.error('Error creating cause:', err);
    }
  };

  return {
    createCause,
    isLoading,
    isSuccess,
    error,
  };
};

export const useMakeDonation = () => {
  const { write, isLoading, isSuccess, error } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'makePrivateDonation',
  });

  const makeDonation = async (
    causeId: number,
    amount: string,
    inputProof: string
  ) => {
    if (!write) return;
    
    try {
      await write({
        args: [causeId, amount, inputProof],
        value: BigInt(amount), // Convert to wei
      });
    } catch (err) {
      console.error('Error making donation:', err);
    }
  };

  return {
    makeDonation,
    isLoading,
    isSuccess,
    error,
  };
};

export const useCauseInfo = (causeId: number) => {
  const { data, isLoading, error } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCauseInfo',
    args: [causeId],
  });

  return {
    causeInfo: data,
    isLoading,
    error,
  };
};

export const useCauseCount = () => {
  const { data, isLoading, error } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCauseCount',
  });

  return {
    causeCount: data,
    isLoading,
    error,
  };
};

export const useAllCauses = () => {
  const { causeCount } = useCauseCount();
  const [causes, setCauses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCauses = async () => {
      if (!causeCount) return;
      
      setIsLoading(true);
      const causesData = [];
      
      for (let i = 0; i < Number(causeCount); i++) {
        try {
          const { causeInfo } = useCauseInfo(i);
          if (causeInfo) {
            causesData.push({
              id: i,
              ...causeInfo,
            });
          }
        } catch (err) {
          console.error(`Error fetching cause ${i}:`, err);
        }
      }
      
      setCauses(causesData);
      setIsLoading(false);
    };

    fetchCauses();
  }, [causeCount]);

  return {
    causes,
    isLoading,
  };
};
