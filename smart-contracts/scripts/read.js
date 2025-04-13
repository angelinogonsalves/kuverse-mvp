const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5AC458b1CE5d7816A391e1B5e05A2d671F69bf73";
  const KuverseNFT = await hre.ethers.getContractFactory("KuverseNFT");
  const kuverseNFT = await KuverseNFT.attach(contractAddress);

  // Lê o próximo tokenId
  const nextTokenId = await kuverseNFT.nextTokenId();
  console.log(`🔢 Total de NFTs mintados: ${nextTokenId}\n`);

  for (let tokenId = 0; tokenId < nextTokenId; tokenId++) {
    try {
      const owner = await kuverseNFT.ownerOf(tokenId);
      const uri = await kuverseNFT.tokenURI(tokenId);

      console.log(`Token ID: ${tokenId}`);
      console.log(`Dono: ${owner}`);
      console.log(`URI: ${uri}`);
      console.log("----------------------------");
    } catch (err) {
      console.log(`Erro ao buscar dados do token ${tokenId}:`, err.message);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
