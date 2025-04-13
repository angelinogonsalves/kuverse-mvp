// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importa contrato ERC721 com suporte a URIs específicas para cada token
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Importa controle de acesso (define um "dono" do contrato)
import "@openzeppelin/contracts/access/Ownable.sol";

contract KuverseNFT is ERC721URIStorage, Ownable {
  // Identificador incremental para os tokens
  uint256 public nextTokenId;

  // Quantidade máxima de NFTs que podem ser criados
  uint256 public maxSupply;

  // Preço (em wei) para mintar um NFT
  uint256 public mintPrice;

  // Evento para notificar a mintagem de um NFT
  event KoreMinted(
    address indexed to,
    uint256 indexed tokenId,
    string tokenURI
  );

  // Construtor do contrato - define nome, símbolo, dono e configurações iniciais
  constructor(
    uint256 _maxSupply,
    uint256 _mintPrice
  ) ERC721("Kuverse Kore", "KORE") Ownable(msg.sender) {
    maxSupply = _maxSupply;
    mintPrice = _mintPrice;
  }

  // Função pública para mintar um novo NFT
  function mintKore(string memory tokenURI) public payable returns (uint256) {
    // Garante que ainda não atingimos o limite de NFTs
    require(nextTokenId < maxSupply, "Limite maximo de NFTs atingido");

    // Garante que o valor enviado cobre o preco de mint
    require(msg.value >= mintPrice, "Valor de mint insuficiente");

    uint256 tokenId = nextTokenId;

    // Cria o NFT de forma segura
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI);

    emit KoreMinted(msg.sender, tokenId, tokenURI);

    nextTokenId++;

    return tokenId;
  }

  // Função para o dono retirar os fundos arrecadados com mint
  function withdraw() public onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }

  // Função para alterar o preço de mint (caso necessário)
  function setMintPrice(uint256 _newPrice) public onlyOwner {
    mintPrice = _newPrice;
  }

  // Função para alterar o maxSupply (só reduz, por segurança)
  function reduceMaxSupply(uint256 _newMaxSupply) public onlyOwner {
    require(_newMaxSupply < maxSupply, "Novo limite deve ser menor");
    require(
      _newMaxSupply >= nextTokenId,
      "Novo limite nao pode ser menor que total de tokens"
    );
    maxSupply = _newMaxSupply;
  }
}
