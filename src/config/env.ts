// Environment configuration
// These values should be set in Vercel dashboard as environment variables
export const config = {
  chainId: import.meta.env.VITE_CHAIN_ID || '11155111',
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://1rpc.io/sepolia',
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'e08e99d213c331aa0fd00f625de06e66',
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || '',
} as const;
