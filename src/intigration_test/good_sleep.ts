import Web3 from 'web3'

import { ERC721Contract } from './contracts/erc721'
import { RewardContract } from './contracts/reward'
import { Config } from './config'

export class GoodSleep {
    public web3: Web3
    public sleepDataNFT: ERC721Contract
    public avatarNFT: ERC721Contract
    public rewardV1: RewardContract

    constructor(web3: Web3, config: Config) {
        this.web3 = web3;

        this.sleepDataNFT = new ERC721Contract(this.web3, config.sleepDataNFTAddress);
        this.avatarNFT = new ERC721Contract(this.web3, config.avatarNFTAddress);
        this.rewardV1 = new RewardContract(this.web3, config.rewardV1Address);
    }
}
