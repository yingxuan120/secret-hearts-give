import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from './env';

export const walletConfig = getDefaultConfig({
  appName: 'Secret Hearts Give',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});
