import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
import {Contract, CallOptions, SendOptions} from "web3-eth-contract"

import { GET, POST } from './http'
import { Config } from './config'

import {
    GoodSleep
} from './good_sleep'

const { mnemonic } = require('@/../../file/secrets.json')
console.log('mnemonic: ', mnemonic)

const main = async () => {
    let config: Config = {
        mnemonic: mnemonic,
        chainUrl: 'https://test2.goodata.io',
        sleepDataNFTAddress: '0x6359Ee5b6000169a091b7eb243d5e219c0Ffc7BF',
        avatarNFTAddress: '0xe3a855b650Be77697c1d987f1FB547a7d7167A03',
        rewardV1Address: '0xdBD831C193E1908c3828dBe4E4319106C8DE8907',
    }
    
    let web3 = new Web3(new HDWalletProvider(config.mnemonic, config.chainUrl))
    web3.defaultAccount = (await web3.eth.getAccounts())[0]
    console.log('account: ', web3.defaultAccount)
    
    let gs = new GoodSleep(web3, config)
    
    gs.sleepDataNFT.name().then(v => {
        console.log('name: ', v)
    })
    
    // GET('https://dev-sleep.goodata.io/metadata/data/sleep/1', resp => {
    //     console.log('resp: ', JSON.stringify(resp))
    // })

    POST('https://dev-sleep.goodata.io/v1/getSalt',
        {"wallet_address": "0x32A5Ce4dd445fAd24ae6117272ad9AfEA32FFb12"},
        resp => {
            console.log('getSalt: ', resp)
        }
    )

    // gs.sleepDataNFT.createAvatar({
    //     from: web3.defaultAccount
    // })
    // .on('transactionHash', hash => {
    //     console.log('createAvatar txHash: ', hash)
    // })
    // .on('receipt', receipt => {
    //     console.log('createAvatar receipt: ', receipt)
    // })
    // .on('error', err => {
    //     console.log('error: ', err)
    // })
}

main().catch(console.error)