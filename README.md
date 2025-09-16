# 💖 Secret Hearts Give

> *Where compassion meets cryptography - Give from your heart, not for show*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yingxuan120/secret-hearts-give)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with ❤️](https://img.shields.io/badge/Built%20with-❤️-red.svg)](https://github.com/yingxuan120/secret-hearts-give)

## 🌟 The Vision

In a world where charity has become a performance, **Secret Hearts Give** brings back the true essence of giving. We believe that the most meaningful donations come from the heart, not from the desire to be seen.

**Our Mission**: Enable genuine philanthropy through privacy-first donations using cutting-edge FHE (Fully Homomorphic Encryption) technology.

## ✨ What Makes Us Different

### 🔒 **Privacy-First Philosophy**
- Your donation amounts are **never revealed publicly**
- Only you know how much you gave
- FHE encryption ensures mathematical privacy guarantees

### 💝 **Heart-Centered Design**
- Beautiful, intuitive interface that feels warm and welcoming
- Focus on the cause, not the donor
- Genuine impact tracking without social pressure

### ⛓️ **Blockchain Transparency**
- All transactions are recorded on-chain
- Total impact is always visible
- Smart contracts ensure funds reach their intended destinations

### 🧠 **Advanced Cryptography**
- Fully Homomorphic Encryption for sensitive data
- Zero-knowledge proofs for privacy
- Cutting-edge privacy-preserving technology

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- A crypto wallet (MetaMask, WalletConnect, etc.)
- Some testnet ETH for donations

### Installation

```bash
# Clone the repository
git clone https://github.com/yingxuan120/secret-hearts-give.git

# Navigate to the project
cd secret-hearts-give

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env.local` file:

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/your-key
VITE_WALLET_CONNECT_PROJECT_ID=your-project-id
VITE_INFURA_API_KEY=your-infura-key
```

## 🏗️ Architecture

### Frontend Stack
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library

### Blockchain Integration
- **Wagmi** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **Viem** - TypeScript interface for Ethereum
- **FHE** - Fully Homomorphic Encryption

### Smart Contracts
- **Solidity 0.8.24** - Smart contract language
- **Hardhat** - Development framework
- **Sepolia Testnet** - Testing environment

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run deploy:contract  # Deploy smart contracts
```

### Smart Contract Development

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Sepolia
npm run deploy:contract
```

## 🌐 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Import your fork
4. Add environment variables
5. Deploy! 🚀

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Other Platforms

This is a standard Vite React app and can be deployed to:
- Netlify
- GitHub Pages
- AWS Amplify
- Any static hosting service

## 💡 How It Works

### 1. **Connect Your Heart** 💖
Connect your crypto wallet to start your charitable journey

### 2. **Choose Your Cause** 🎯
Browse verified charitable causes that resonate with your values

### 3. **Donate Privately** 🔐
Your donation amount is encrypted using FHE - only you know how much you gave

### 4. **See Collective Impact** 🌍
Watch the total impact grow while your individual contribution remains private

## 🔐 Privacy & Security

### FHE Encryption
- **Fully Homomorphic Encryption** ensures your donation amounts are never revealed
- Mathematical privacy guarantees
- Even the smart contract cannot see individual amounts

### Blockchain Security
- All transactions are recorded on Ethereum
- Smart contracts are audited and verified
- Funds are held in secure, transparent contracts

### Data Protection
- No personal data collection
- Wallet addresses are not linked to donation amounts
- Complete anonymity for donors

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports** - Found a bug? Let us know!
- 💡 **Feature Requests** - Have an idea? We'd love to hear it!
- 🔧 **Code Contributions** - Submit a pull request
- 📖 **Documentation** - Help improve our docs
- 🎨 **Design** - Help make our UI even more beautiful

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama** - For FHE technology and inspiration
- **Rainbow** - For beautiful wallet connection UI
- **Vercel** - For amazing deployment platform
- **Open Source Community** - For all the amazing tools we use

## 📞 Support

- 📧 **Email**: support@secretheartsgive.com
- 💬 **Discord**: [Join our community](https://discord.gg/secretheartsgive)
- 🐦 **Twitter**: [@SecretHeartsGive](https://twitter.com/secretheartsgive)
- 📖 **Documentation**: [docs.secretheartsgive.com](https://docs.secretheartsgive.com)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yingxuan120/secret-hearts-give&type=Date)](https://star-history.com/#yingxuan120/secret-hearts-give&Date)

---

<div align="center">

**Made with 💖 by the Secret Hearts Give team**

*Give from your heart, not for show*

[Website](https://secretheartsgive.com) • [Documentation](https://docs.secretheartsgive.com) • [Community](https://discord.gg/secretheartsgive)

</div>