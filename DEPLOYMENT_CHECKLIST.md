# Deployment Checklist for Vercel

## ✅ Completed Changes

1. **Cleaned Local Environment Config**
   - Removed hardcoded localhost contract address from `src/config/contract.json`
   - Created `env.example` as template for environment variables
   - Updated code to read contract address from `VITE_CONTRACT_ADDRESS` environment variable

2. **Code Updates**
   - Modified `src/config/env.ts` to use environment variables
   - Updated `src/hooks/useContract.ts` to read contract address from env instead of contract.json
   - Removed debug console.log statements
   - Cleaned up vercel.json configuration

3. **Git Configuration**
   - Switched to yingxuan120 PAT token
   - Committed and pushed all changes

## 📋 Required Vercel Environment Variables

When deploying to Vercel, add these environment variables in **Settings → Environment Variables**:

### Production, Preview, and Development:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://1rpc.io/sepolia
VITE_WALLET_CONNECT_PROJECT_ID=e08e99d213c331aa0fd00f625de06e66
VITE_CONTRACT_ADDRESS=0x87bF4F81892344Abef0bC5773f794A1B098830D7
```

**Current Deployed Contract:**
- Address: `0x87bF4F81892344Abef0bC5773f794A1B098830D7`
- Network: Sepolia Testnet
- Status: ✅ Deployed and initialized with 3 Active Causes

**Important:**
- `VITE_CONTRACT_ADDRESS` should be set to your deployed Sepolia contract address
- Make sure to deploy the contract to Sepolia first
- Update the contract address after deployment

## 🚀 Deployment Steps

1. **Contract Already Deployed** ✅
   - Address: `0x87bF4F81892344Abef0bC5773f794A1B098830D7`
   - Network: Sepolia Testnet
   - Initialized with 3 Active Causes

2. **Add Environment Variables in Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables listed above
   - Set `VITE_CONTRACT_ADDRESS` to your deployed contract address
   - Apply to all environments (Production, Preview, Development)

3. **Deploy to Vercel**
   - Push code to GitHub (already done)
   - Vercel will automatically deploy
   - Or manually trigger deployment from Vercel dashboard

4. **Causes Already Initialized** ✅
   - 3 Active Causes created on the contract
   - No need to run initialization script again

## 📝 Notes

- Contract address is now read from environment variable `VITE_CONTRACT_ADDRESS`
- All local Hardhat addresses have been removed
- The `contract.json` file is kept for reference but no longer used
- FHE headers are configured in `vercel.json` for proper thread support

## 🔍 Verification

After deployment, verify:
1. FHE initialization works (check browser console)
2. Wallet connection works
3. Contract data loads correctly
4. Causes display with proper data (not all zeros)
