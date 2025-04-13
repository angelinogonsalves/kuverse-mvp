const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5AC458b1CE5d7816A391e1B5e05A2d671F69bf73";
  const KuverseNFT = await hre.ethers.getContractFactory("KuverseNFT");
  const kuverseNFT = await KuverseNFT.attach(contractAddress);

  const tokenURI = "https://metadata.kuverse.app/kore/1.json";

  const tx = await kuverseNFT.mintKore(tokenURI, {
    value: hre.ethers.parseEther("0.001")
  });

  const receipt = await tx.wait();
  console.log(`🎉 NFT mintado com sucesso!`);
  console.log("📦 Event logs:", receipt.logs);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
