import Web3 from "web3"
import {Contract, CallOptions, SendOptions} from "web3-eth-contract"
import {PromiEvent} from "web3-core";
import BigNumber from "bignumber.js";

export class RewardContract {
  web3: Web3;
  abi: any[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Feeding","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"oldMultiplier","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"newMultiplier","type":"uint256"}],"name":"MultiplierUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastRewardRecords","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"records","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"feed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"structIReward.FeedParam[]","name":"params","type":"tuple[]"}],"name":"batchFeed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"phase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"reward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"estimateReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_multiplier","type":"uint256"}],"name":"setMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}];
  contract: Contract;

  constructor(web3Instance: Web3, address: string){
    this.web3 = web3Instance;
    this.contract = new this.web3.eth.Contract(this.abi, address)
  }

  isTrustedForwarder(forwarder: string, options?: CallOptions): Promise<boolean> {
    return this.contract.methods.isTrustedForwarder(
      forwarder
    ).call(options);
  }
  
  lastRewardRecords(id_1: string | BigNumber, options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.lastRewardRecords(
      id_1
    ).call(options);
  }
  
  multiplier(options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.multiplier().call(options);
  }
  
  owner(options?: CallOptions): Promise<string> {
    return this.contract.methods.owner().call(options);
  }
  
  records(id_1: string | BigNumber, options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.records(
      id_1
    ).call(options);
  }
  
  renounceOwnership(options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.renounceOwnership().send(options);
  }
  
  transferOwnership(newOwner: string, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.transferOwnership(
      newOwner
    ).send(options);
  }
  
  feed(tokenId: string | BigNumber, amount: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.feed(
      tokenId,
      amount
    ).send(options);
  }
  
  batchFeed(params: {
    tokenId: string | BigNumber,
    amount: string | BigNumber
  }[], options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.batchFeed(
      params
    ).send(options);
  }
  
  phase(options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.phase().call(options);
  }
  
  reward(tokenId: string | BigNumber, options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.reward(
      tokenId
    ).call(options);
  }
  
  estimateReward(tokenId: string | BigNumber, amount: string | BigNumber, options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.estimateReward(
      tokenId,
      amount
    ).call(options);
  }
  
  setMultiplier(_multiplier: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.setMultiplier(
      _multiplier
    ).send(options);
  }
  
  withdraw(tokenId: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.withdraw(
      tokenId
    ).send(options);
  }
  
}