# Vercel Deployment Guide

## Quick Deploy

### Option 1: Connect via GitHub
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import repository: `yingxuan120/secret-hearts-give`
4. Configure environment variables (see below)
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```

## Required Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

### Production Environment Variables

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://1rpc.io/sepolia
VITE_WALLET_CONNECT_PROJECT_ID=e08e99d213c331aa0fd00f625de06e66
VITE_INFURA_API_KEY= (optional, if using Infura)
```

**Important:** 
- Set these for **Production**, **Preview**, and **Development** environments
- The Wallet Connect Project ID is already set as a fallback in the code, but you should set it in Vercel for best practice

## Configuration Details

### Headers Configuration
The `vercel.json` file includes required headers for FHE support:
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

These are essential for FHEVM thread support in the browser.

### Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Post-Deployment Checklist

1. ✅ Verify FHE initialization works (check browser console)
2. ✅ Verify wallet connection works
3. ✅ Verify contract interaction works
4. ✅ Test donation flow with encryption
5. ✅ Verify data is read from contract (not hardcoded)

## Troubleshooting

### FHE Thread Support Error
If you see "This browser does not support threads":
- Verify headers are set in `vercel.json`
- Clear browser cache and reload
- Check network tab for correct headers

### Wallet Connect Error
If you see 403/400 errors for Wallet Connect:
- Verify `VITE_WALLET_CONNECT_PROJECT_ID` is set in Vercel
- The fallback value `e08e99d213c331aa0fd00f625de06e66` should work, but using Vercel env is preferred

### Contract Not Found
- Ensure contract is deployed to Sepolia
- Update `src/config/contract.json` with deployed contract address
- Commit and push changes

## Notes

- Environment variables are NOT committed to git (see `.gitignore`)
- Wallet Connect Project ID has a fallback value for development
- All sensitive data should be stored in Vercel dashboard, not in code
