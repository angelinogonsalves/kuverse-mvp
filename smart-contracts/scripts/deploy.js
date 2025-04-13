const hre = require("hardhat");

async function main() {
  const KuverseNFT = await hre.ethers.getContractFactory("KuverseNFT");

  const maxSupply = 10;
  const mintPrice = hre.ethers.parseEther("0.001");

  const kuverseNFT = await KuverseNFT.deploy(maxSupply, mintPrice);
  await kuverseNFT.waitForDeployment();

  console.log(`✅ KuverseNFT deployed to: ${kuverseNFT.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
