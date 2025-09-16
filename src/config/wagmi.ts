import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { config } from './env';

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(config.rpcUrl),
  },
});
