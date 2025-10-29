import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export function useZamaInstance() {
  const [instance, setInstance] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const initializeInstance = async () => {
      if (!isConnected || !address) {
        setInstance(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Check if fhevm is available globally
        const w = typeof window !== 'undefined' ? (window as any) : undefined;
        if (w?.fhevm) {
          // Initialize the SDK if needed
          if (w.fhevm.initSDK) {
            await w.fhevm.initSDK();
          }

          // Create instance with Sepolia config
          const config = { ...w.fhevm.SepoliaConfig };
          if (w.ethereum) {
            config.network = w.ethereum;
          }

          const fhevmInstance = await w.fhevm.createInstance(config);
          setInstance(fhevmInstance);
        } else {
          throw new Error('FHEVM not available. Please ensure the FHEVM library is loaded.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize FHEVM';
        setError(errorMessage);
        console.error('Failed to initialize FHEVM:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeInstance();
  }, [isConnected, address]);

  return {
    instance,
    error,
    isLoading,
    isReady: !!instance && !error,
  };
}
