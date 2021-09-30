import Web3 from "web3"
import {Contract, CallOptions, SendOptions} from "web3-eth-contract"
import {PromiEvent} from "web3-core";
import BigNumber from "bignumber.js";

export class ERC721Contract {
  web3: Web3;
  abi: any[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"uri","type":"string"}],"name":"TokenURIUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"createAvatarTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createAvatar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"uri","type":"string"}],"name":"setTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  contract: Contract;

  constructor(web3Instance: Web3, address: string){
    this.web3 = web3Instance;
    this.contract = new this.web3.eth.Contract(this.abi, address)
  }

  approve(to: string, tokenId: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.approve(
      to,
      tokenId
    ).send(options);
  }
  
  balanceOf(owner: string, options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.balanceOf(
      owner
    ).call(options);
  }
  
  getApproved(tokenId: string | BigNumber, options?: CallOptions): Promise<string> {
    return this.contract.methods.getApproved(
      tokenId
    ).call(options);
  }
  
  isApprovedForAll(owner: string, operator: string, options?: CallOptions): Promise<boolean> {
    return this.contract.methods.isApprovedForAll(
      owner,
      operator
    ).call(options);
  }
  
  isTrustedForwarder(forwarder: string, options?: CallOptions): Promise<boolean> {
    return this.contract.methods.isTrustedForwarder(
      forwarder
    ).call(options);
  }
  
  name(options?: CallOptions): Promise<string> {
    return this.contract.methods.name().call(options);
  }
  
  ownerOf(tokenId: string | BigNumber, options?: CallOptions): Promise<string> {
    return this.contract.methods.ownerOf(
      tokenId
    ).call(options);
  }
  
  safeTransferFrom(from: string, to: string, tokenId: string | BigNumber,
    _data?: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.safeTransferFrom(
      from,
      to,
      tokenId,
      _data
    ).send(options);
  }
  
  setApprovalForAll(operator: string, approved: boolean, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.setApprovalForAll(
      operator,
      approved
    ).send(options);
  }
  
  supportsInterface(interfaceId: undefined, options?: CallOptions): Promise<boolean> {
    return this.contract.methods.supportsInterface(
      interfaceId
    ).call(options);
  }
  
  symbol(options?: CallOptions): Promise<string> {
    return this.contract.methods.symbol().call(options);
  }
  
  transferFrom(from: string, to: string, tokenId: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.transferFrom(
      from,
      to,
      tokenId
    ).send(options);
  }
  
  createAvatarTo(to: string, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.createAvatarTo(
      to
    ).send(options);
  }
  
  createAvatar(options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.createAvatar().send(options);
  }
  
  tokenURI(tokenId: string | BigNumber, options?: CallOptions): Promise<string> {
    return this.contract.methods.tokenURI(
      tokenId
    ).call(options);
  }
  
  setTokenURI(tokenId: string | BigNumber, uri: string, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.setTokenURI(
      tokenId,
      uri
    ).send(options);
  }
  
  safeMint(options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.safeMint().send(options);
  }
  
  burn(tokenId: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.burn(
      tokenId
    ).send(options);
  }
  
  getCurrTokenId(options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.getCurrTokenId().call(options);
  }
  
}