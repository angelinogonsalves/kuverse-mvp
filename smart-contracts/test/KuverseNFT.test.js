const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KuverseNFT", function () {
  let kuverseNFT;
  let owner, addr1;
  const tokenURI = "https://metadata.kuverse.app/kore/1.json";
  const maxSupply = 10;
  const mintPrice = ethers.parseEther("0.001");

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    console.log("Deploy...");
    kuverseNFT = await (await ethers.getContractFactory("KuverseNFT"))
      .deploy(maxSupply, mintPrice);
    await kuverseNFT.waitForDeployment();

    console.log("Contract kuverseNFT.target:", kuverseNFT.target);
    console.log("owner.address:", owner.address);
    console.log("addr1.address:", addr1.address);
    console.log("mintPrice:", ethers.formatEther(mintPrice), "ETH");
  });

  it("Deve ser deployado com sucesso", async function () {
    expect(await kuverseNFT.name()).to.equal("Kuverse Kore");
    expect(await kuverseNFT.symbol()).to.equal("KORE");
  });

  it("Deve permitir mintar um NFT com tokenURI", async function () {
    console.log("Saldo do addr1 antes do mint:", ethers.formatEther(await ethers.provider.getBalance(addr1.address)));

    const tx = await kuverseNFT.connect(addr1).mintKore(tokenURI, {
      value: mintPrice
    });

    const receipt = await tx.wait();
    console.log("Transação de mint tx.hash:", tx.hash);
    console.log("Eventos emitidos receipt.events:", receipt.events);

    console.log("Saldo do addr1 depois do mint:", ethers.formatEther(await ethers.provider.getBalance(addr1.address)));

    const ownerOfNFT = await kuverseNFT.ownerOf(0);
    expect(ownerOfNFT).to.equal(addr1.address);

    const mintedTokenURI = await kuverseNFT.tokenURI(0);
    expect(mintedTokenURI).to.equal(tokenURI);
  });

  it("Deve falhar se valor enviado for menor que o mintPrice", async function () {
    await expect(
      kuverseNFT.connect(addr1).mintKore(tokenURI, {
        value: ethers.parseEther("0.0005")
      })
    ).to.be.revertedWith("Valor de mint insuficiente");
  });

  it("Deve falhar se tentar mintar além do maxSupply", async function () {
    for (let i = 0; i < maxSupply; i++) {
      await kuverseNFT.connect(addr1).mintKore(`${tokenURI}?id=${i}`, {
        value: mintPrice
      });
    }

    await expect(
      kuverseNFT.connect(addr1).mintKore(`${tokenURI}?id=overflow`, {
        value: mintPrice
      })
    ).to.be.revertedWith("Limite maximo de NFTs atingido");
  });
});
