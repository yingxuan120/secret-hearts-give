import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { useZamaInstance } from './useZamaInstance';
import { useEthersSigner } from './useEthersSigner';
import { Contract } from 'ethers';
import contractInfo from '../config/contract.json';

// Contract ABI - updated for FHE support
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "bytes", "name": "_targetAmount", "type": "bytes"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
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

// Contract address - loaded from config
const CONTRACT_ADDRESS = contractInfo.address as `0x${string}`;

export const useSecretHeartsContract = () => {
  const { address } = useAccount();

  return {
    contractAddress: CONTRACT_ADDRESS,
    contractABI: CONTRACT_ABI,
    address,
    isConnected: !!address,
  };
};

export const useCreateCause = () => {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const { instance } = useZamaInstance();
  const { address } = useAccount();
  const signerPromise = useEthersSigner();

  const createCause = async (
    name: string,
    description: string,
    targetAmount: number,
    duration: number
  ) => {
    if (!writeContract || !instance || !address) {
      throw new Error('Missing required dependencies');
    }
    
    try {
      // Create encrypted input for target amount
      const input = instance.createEncryptedInput(CONTRACT_ADDRESS, address);
      input.add32(targetAmount);
      const encryptedInput = await input.encrypt();

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createCause',
        args: [name, description, encryptedInput.handles[0], duration, encryptedInput.inputProof],
      });
    } catch (err) {
      console.error('Error creating cause:', err);
      throw err;
    }
  };

  return {
    createCause,
    isLoading: isPending,
    isSuccess,
    error,
  };
};

export const useMakeDonation = () => {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const { instance } = useZamaInstance();
  const { address } = useAccount();
  const signerPromise = useEthersSigner();

  const makeDonation = async (
    causeId: number,
    amount: string
  ) => {
    if (!writeContract || !instance || !address) {
      throw new Error('Missing required dependencies');
    }
    
    try {
      // Convert ETH amount to wei
      const amountInWei = (parseFloat(amount) * 1e18).toString();
      
      // Create encrypted input for donation amount
      const input = instance.createEncryptedInput(CONTRACT_ADDRESS, address);
      input.add32(parseInt(amountInWei));
      const encryptedInput = await input.encrypt();

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'makePrivateDonation',
        args: [causeId, encryptedInput.handles[0], encryptedInput.inputProof],
        value: BigInt(amountInWei), // Send actual ETH
      });
    } catch (err) {
      console.error('Error making donation:', err);
      throw err;
    }
  };

  return {
    makeDonation,
    isLoading: isPending,
    isSuccess,
    error,
  };
};

export const useCauseInfo = (causeId: number) => {
  const { data, isLoading, error } = useReadContract({
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
  const { data, isLoading, error } = useReadContract({
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
      if (!causeCount || Number(causeCount) === 0) {
        // If no causes in contract, return sample data
        setCauses([
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
        ]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      const causesData = [];
      
      for (let i = 0; i < Number(causeCount); i++) {
        try {
          const { causeInfo } = useCauseInfo(i);
          if (causeInfo) {
            causesData.push({
              id: i,
              title: causeInfo.name,
              description: causeInfo.description,
              goal: causeInfo.targetAmount || 0,
              raised: causeInfo.currentAmount || 0,
              donors: causeInfo.donorCount || 0,
              isActive: causeInfo.isActive,
              isVerified: causeInfo.isVerified,
              organizer: causeInfo.organizer,
              startTime: causeInfo.startTime,
              endTime: causeInfo.endTime
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

// FHE Decryption hook
export const useFHEDecryption = () => {
  const { instance } = useZamaInstance();
  const { address } = useAccount();
  const signerPromise = useEthersSigner();
  const [isDecrypting, setIsDecrypting] = useState(false);

  const decryptEncryptedData = async (handles: string[], contractAddress: string) => {
    if (!instance || !address || !signerPromise) {
      throw new Error('Missing required dependencies for decryption');
    }

    setIsDecrypting(true);
    try {
      const keypair = instance.generateKeypair();
      const pairs = handles.map(h => ({ handle: h, contractAddress }));
      const start = Math.floor(Date.now() / 1000).toString();
      const days = '10';

      const eip712 = instance.createEIP712(keypair.publicKey, [contractAddress], start, days);
      const signer = await signerPromise;
      if (!signer) throw new Error('Signer unavailable');
      
      const signature = await signer.signTypedData(
        eip712.domain,
        { UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification },
        eip712.message
      );

      const result = await instance.userDecrypt(
        pairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace('0x', ''),
        [contractAddress],
        address,
        start,
        days
      );

      return result;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    } finally {
      setIsDecrypting(false);
    }
  };

  return {
    decryptEncryptedData,
    isDecrypting,
    canDecrypt: !!instance && !!address,
  };
};
