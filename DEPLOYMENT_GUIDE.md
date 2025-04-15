# Deployment Guide – Kuverse NFT Smart Contract

## Network

For testing and deployment, the Sepolia testnet (Ethereum) was used.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Hardhat](https://hardhat.org/)
- MetaMask configured for Sepolia testnet
- Some test ETH in your wallet (you can use a Sepolia faucet)

---

## 1. Clone the Project

```bash
git clone https://github.com/angelinogonsalves/kuverse-mvp.git
cd kuverse-mvp/smart-contracts
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file based on the `.env.example` (if present) or just make sure the `hardhat.config.js` has your private key and RPC:

```js
sepolia: {
  url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
  accounts: [`0x${YOUR_PRIVATE_KEY}`]
}
```

> ⚠️ Never commit your private key.

---

## 4. Compile the Smart Contract

```bash
npx hardhat compile
```

---

## 5. Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

After deployment, you will see the contract address in your terminal.

---

## 6. Interact with the Contract

You can write a script or use Hardhat console:

```bash
npx hardhat console --network sepolia
```

```js
const KuverseNFT = await ethers.getContractFactory("KuverseNFT");
const kuverseNFT = await KuverseNFT.attach("PASTE_YOUR_DEPLOYED_ADDRESS");
await kuverseNFT.mintKore("https://metadata.kuverse.app/kore/1.json", { value: ethers.utils.parseEther("0.01") });
```

---

## 7. Verify the Contract (Optional)

```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

---

## Notes

- The contract emits standard `Transfer` events.
- Follows OpenZeppelin's ERC721 implementation.
- Includes minting with `tokenURI` and payment.

---

## Explorer

You can view the contract on [Sepolia Etherscan](https://sepolia.etherscan.io/) if verification is successful.