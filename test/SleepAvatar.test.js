const { assert } = require("chai")
const testUtils = require('./utils')
const SleepAvatar = artifacts.require('SleepAvatar')

const { toWei, fromWei } = web3.utils

contract('SleepAvatar', ([alice, bob, carol, dev, backend]) => {
    beforeEach(async () => {
        this.avatar = await SleepAvatar.new({ from: dev })
        this.avatar.transferOwnership(backend, { from: dev })
    })

    let aliceAvatarId
    let bobAvatarId
    let carolAvatarId
    it('Users create avatar owned by themself', async () => {
        let createAvatarReceipt1 = await this.avatar.createAvatar({ from: alice })
        const transferEventArgs1 = testUtils.getEventArgsFromTx(createAvatarReceipt1, 'Transfer')
        aliceAvatarId = transferEventArgs1.tokenId
        assert.equal(aliceAvatarId.toString(), '1')
        
        let createAvatarReceipt2 = await this.avatar.createAvatar({ from: bob })
        const transferEventArgs2 = testUtils.getEventArgsFromTx(createAvatarReceipt2, 'Transfer')
        bobAvatarId = transferEventArgs2.tokenId
        assert.equal(bobAvatarId.toString(), '2')

        let createAvatarReceipt3 = await this.avatar.createAvatar({ from: carol })
        const transferEventArgs3 = testUtils.getEventArgsFromTx(createAvatarReceipt3, 'Transfer')
        carolAvatarId = transferEventArgs3.tokenId
        assert.equal(carolAvatarId.toString(), '3')
    })

    it('Backend feeds avatars', async() => {
        // let feedReceipt = await this.avatar.feed(aliceAvatarId, toWei('1'), { from: backend })
        // const feedEventArgs = testUtils.getEventArgsFromTx(feedReceipt, 'Feeding')
    })
})