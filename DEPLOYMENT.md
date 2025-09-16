# Vercel Deployment Guide for Secret Hearts Give

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare your environment configuration

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `yingxuan120/secret-hearts-give`
4. Click "Import"

### Step 2: Configure Project Settings

1. **Project Name**: `secret-hearts-give`
2. **Framework Preset**: `Vite`
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Environment Variables

Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
VITE_RPC_URL_ALT=https://1rpc.io/sepolia
```

**How to add environment variables:**
1. In your Vercel project dashboard
2. Go to "Settings" tab
3. Click "Environment Variables"
4. Add each variable with the values above
5. Make sure to add them for all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. In your Vercel project dashboard
2. Go to "Settings" tab
3. Click "Domains"
4. Add your custom domain
5. Follow the DNS configuration instructions

## Post-Deployment Configuration

### Smart Contract Deployment

1. **Deploy to Sepolia Testnet**:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. **Update Contract Address**:
   - Copy the deployed contract address
   - Update `src/hooks/useContract.ts` with the new address
   - Commit and push changes
   - Redeploy on Vercel

### Environment-Specific Settings

**Production Environment:**
- Use mainnet RPC URLs
- Update chain ID to 1 (Ethereum mainnet)
- Use production wallet connect project ID

**Development Environment:**
- Use testnet RPC URLs
- Keep current Sepolia configuration

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check if all dependencies are in package.json
   - Ensure environment variables are set correctly
   - Check build logs in Vercel dashboard

2. **Wallet Connection Issues**:
   - Verify WalletConnect project ID is correct
   - Check RPC URL accessibility
   - Ensure chain ID matches your network

3. **Contract Interaction Issues**:
   - Verify contract is deployed
   - Check contract address in useContract.ts
   - Ensure user has testnet ETH for transactions

### Performance Optimization

1. **Enable Vercel Analytics**:
   - Go to project settings
   - Enable "Vercel Analytics"

2. **Configure Caching**:
   - Add `vercel.json` for custom caching rules
   - Optimize static assets

3. **Monitor Performance**:
   - Use Vercel's built-in performance monitoring
   - Check Core Web Vitals

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Smart Contract Security**:
   - Audit contracts before mainnet deployment
   - Use multi-signature wallets for admin functions
   - Implement proper access controls

3. **Frontend Security**:
   - Validate all user inputs
   - Use HTTPS in production
   - Implement proper error handling

## Monitoring and Maintenance

1. **Set up monitoring**:
   - Configure Vercel alerts
   - Monitor contract events
   - Track user interactions

2. **Regular updates**:
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update contract addresses as needed

3. **Backup strategy**:
   - Regular database backups (if applicable)
   - Contract state snapshots
   - User data protection

## Support

For deployment issues:
- Check Vercel documentation
- Review build logs
- Contact support through Vercel dashboard

For contract issues:
- Check Hardhat documentation
- Verify network connectivity
- Review contract deployment logs
