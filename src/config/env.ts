// Environment configuration
export const config = {
  chainId: import.meta.env.VITE_CHAIN_ID || '11155111',
  rpcUrl: import.meta.env.VITE_RPC_URL || import.meta.env.SEPOLIA_RPC_URL || 'https://1rpc.io/sepolia',
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || import.meta.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_WALLET_CONNECT_PROJECT_ID',
  infuraApiKey: import.meta.env.VITE_INFURA_API_KEY || 'YOUR_INFURA_API_KEY',
  rpcUrlAlt: import.meta.env.VITE_RPC_URL_ALT || 'https://1rpc.io/sepolia',
} as const;
