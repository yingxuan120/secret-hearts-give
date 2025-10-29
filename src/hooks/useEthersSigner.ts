import { useAccount, useWalletClient } from 'wagmi';
import { useState } from 'react';

export function useEthersSigner() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [signerPromise, setSignerPromise] = useState<Promise<any> | null>(null);

  const getSigner = async () => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    // Convert viem wallet client to ethers signer
    const { createWalletClient, custom } = await import('viem');
    const { ethers } = await import('ethers');

    // Create a custom transport for ethers compatibility
    const transport = custom(walletClient.transport);
    const viemClient = createWalletClient({
      account: address as `0x${string}`,
      transport,
    });

    // Convert to ethers provider and signer
    const provider = new ethers.BrowserProvider(viemClient.transport as any);
    const signer = await provider.getSigner(address);
    
    return signer;
  };

  const initializeSigner = () => {
    const promise = getSigner();
    setSignerPromise(promise);
    return promise;
  };

  return {
    signerPromise: signerPromise || initializeSigner(),
    initializeSigner,
    address,
    isConnected: !!address,
  };
}
