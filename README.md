# Secret Hearts Give - Private Charity Platform

A privacy-first charitable donations platform using Fully Homomorphic Encryption (FHE) to protect donation amounts while maintaining transparency of collective impact.

## 🚀 Features

- **Privacy-First Donations**: Your donation amounts are encrypted using FHE and never revealed publicly
- **Collective Impact Visibility**: See the total raised for each cause without exposing individual contributions
- **Blockchain Transparency**: All transactions are recorded on-chain for accountability
- **FHE Encryption**: Uses Zama's FHEVM for secure, encrypted computations
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## 🏗️ Architecture

### Smart Contract
- **Contract Address**: `0x369e290dA6376e97367FbD10299fac5de06Fa725`
- **Network**: Sepolia Testnet
- **FHE Integration**: Uses `@fhevm/solidity` for encrypted data types
- **Key Features**:
  - Encrypted donation amounts (`euint32`)
  - Encrypted cause targets and totals
  - Encrypted donor counts
  - Encrypted impact reports

### Frontend
- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Wallet Integration**: RainbowKit + Wagmi
- **FHE Integration**: Custom hooks for FHEVM operations

## 🛠️ Technology Stack

### Backend
- **Solidity**: ^0.8.24
- **Hardhat**: Development and deployment
- **FHEVM**: Fully Homomorphic Encryption
- **Ethers.js**: Ethereum interactions

### Frontend
- **React**: ^18.3.1
- **TypeScript**: ^5.8.3
- **Vite**: Build tool
- **Wagmi**: Ethereum hooks
- **RainbowKit**: Wallet connection
- **Tailwind CSS**: Styling

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yingxuan120/secret-hearts-give.git
   cd secret-hearts-give
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Compile contracts**:
   ```bash
   npx hardhat compile
   ```

## 🚀 Deployment

### Deploy to Sepolia Testnet

1. **Configure environment variables**:
   ```bash
   SEPOLIA_RPC_URL=https://1rpc.io/sepolia
   ETHERSCAN_API_KEY=your_etherscan_api_key
   PRIVATE_KEY=your_private_key
   ```

2. **Deploy the contract**:
   ```bash
   npm run deploy:contract
   ```

3. **Update contract address**:
   The deployment script automatically updates `src/config/contract.json` with the new contract address.

## 🔧 Development

### Start Development Server
```bash
npm run dev
```

### Run Tests
```bash
npx hardhat test
```

### Test Contract Functions
```bash
npx hardhat run scripts/test-contract.cjs --network sepolia
```

## 🔐 FHE Integration

### Smart Contract FHE Types
- `euint32`: Encrypted 32-bit integers for amounts and counts
- `externalEuint32`: External encrypted data from frontend
- `FHE.fromExternal()`: Convert external encrypted data to internal format
- `FHE.add()`: Perform encrypted arithmetic operations

### Frontend FHE Operations
- **Encryption**: Use `useZamaInstance` hook to create encrypted inputs
- **Decryption**: Use `useFHEDecryption` hook to decrypt contract data
- **Wallet Integration**: Automatic signature for decryption requests

### Example FHE Usage
```typescript
// Create encrypted donation
const input = instance.createEncryptedInput(contractAddress, userAddress);
input.add32(donationAmount);
const encryptedInput = await input.encrypt();

// Submit to contract
await contract.makePrivateDonation(
  causeId,
  encryptedInput.handles[0],
  encryptedInput.inputProof
);
```

## 📊 Contract Functions

### Core Functions
- `createCause()`: Create a new charitable cause with encrypted target amount
- `makePrivateDonation()`: Make an encrypted donation to a cause
- `submitImpactReport()`: Submit encrypted impact data
- `verifyCause()`: Verify a cause (verifier only)
- `withdrawFunds()`: Withdraw funds after cause completion

### View Functions
- `getCauseInfo()`: Get cause information (encrypted amounts)
- `getEncryptedCauseData()`: Get raw encrypted cause data
- `getCauseCount()`: Get total number of causes
- `getDonationCount()`: Get total number of donations

## 🌐 Network Configuration

### Sepolia Testnet
- **RPC URL**: `https://1rpc.io/sepolia`
- **Chain ID**: `11155111`
- **Contract**: `0x369e290dA6376e97367FbD10299fac5de06Fa725`

## 🔒 Security Features

1. **FHE Encryption**: All sensitive data encrypted using Zama's FHEVM
2. **Access Control**: Role-based permissions (owner, verifier, treasury)
3. **Input Validation**: Comprehensive parameter validation
4. **Emergency Functions**: Pause/unpause capabilities
5. **Audit Trail**: All operations logged via events

## 📝 Environment Variables

```bash
# Network Configuration
SEPOLIA_RPC_URL=https://1rpc.io/sepolia

# API Keys
ETHERSCAN_API_KEY=your_etherscan_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Private Key (for deployment)
PRIVATE_KEY=your_private_key

# Contract Address (auto-updated after deployment)
CONTRACT_ADDRESS=0x369e290dA6376e97367FbD10299fac5de06Fa725
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Zama**: For FHEVM and FHE technology
- **Hardhat**: For development framework
- **RainbowKit**: For wallet integration
- **shadcn/ui**: For UI components

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Note**: This is a demonstration project showcasing FHE integration in charitable giving. Always conduct thorough security audits before using in production.