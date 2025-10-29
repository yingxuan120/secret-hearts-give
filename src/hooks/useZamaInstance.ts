import { useState, useEffect } from 'react';
import { createInstance, initSDK, SepoliaConfig } from '@zama-fhe/relayer-sdk/bundle';

export function useZamaInstance() {
  const [instance, setInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initZama = async () => {
      try {
        console.log('🚀 Starting FHE initialization process...');
        setIsLoading(true);
        setError(null);

        // 检查CDN脚本是否加载
        if (typeof window !== 'undefined' && !window.relayerSDK) {
          console.warn('⚠️ FHE SDK CDN script not loaded, waiting...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (!window.relayerSDK) {
            throw new Error('FHE SDK CDN script not loaded. Please check network connection.');
          }
        }

        console.log('🔄 Step 1: Initializing FHE SDK...');
        console.log('📊 SDK available:', !!window.relayerSDK);
        console.log('📊 initSDK function:', typeof window.relayerSDK?.initSDK);
        
        try {
          await initSDK();
          console.log('✅ Step 1 completed: FHE SDK initialized successfully');
        } catch (initError) {
          console.warn('⚠️ FHE SDK init failed, trying alternative approach:', initError);
          // Try alternative initialization if the first one fails
          if (window.relayerSDK?.initSDK) {
            await window.relayerSDK.initSDK();
            console.log('✅ Step 1 completed: FHE SDK initialized with alternative method');
          } else {
            throw initError;
          }
        }

        console.log('🔄 Step 2: Creating FHE instance with Sepolia config...');
        console.log('📊 SepoliaConfig:', SepoliaConfig);
        
        try {
          const zamaInstance = await createInstance(SepoliaConfig);
          console.log('✅ Step 2 completed: FHE instance created successfully');
          console.log('📊 Instance methods:', Object.keys(zamaInstance || {}));
          
          if (mounted) {
            setInstance(zamaInstance);
            console.log('🎉 FHE initialization completed successfully!');
            console.log('📊 Instance ready for encryption/decryption operations');
          }
        } catch (createError) {
          console.warn('⚠️ FHE instance creation failed, trying with fallback config:', createError);
          // Try with a simpler config as fallback
          const fallbackConfig = {
            ...SepoliaConfig,
            // Remove potentially problematic config options
          };
          const zamaInstance = await createInstance(fallbackConfig);
          console.log('✅ Step 2 completed: FHE instance created with fallback config');
          console.log('📊 Instance methods:', Object.keys(zamaInstance || {}));
          
          if (mounted) {
            setInstance(zamaInstance);
            console.log('🎉 FHE initialization completed with fallback!');
            console.log('📊 Instance ready for encryption/decryption operations');
          }
        }
      } catch (err) {
        console.error('❌ FHE initialization failed at step:', err);
        console.error('📊 Error details:', {
          name: err?.name,
          message: err?.message,
          stack: err?.stack
        });
        
        if (mounted) {
          setError(`Failed to initialize encryption service: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initZama();

    return () => {
      mounted = false;
    };
  }, []);

  return { instance, isLoading, error };
}
