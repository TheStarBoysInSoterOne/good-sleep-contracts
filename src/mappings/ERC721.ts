import {
    Address
} from '@graphprotocol/graph-ts'

import {
    ZERO_ADDRESS
} from '@openzeppelin/test-helpers/src/constants'

import {
    Approval as ApprovalEvent,
    ApprovalForAll as ApprovalForAllEvent,
    Transfer as TransferEvent,
    TokenURIUpdated as TokenURIUpdatedEvent,
    ERC721
} from '../../generated/GoodSleepContract/ERC721'

import {
    Approval,
    ApprovalForAll,
    Transfer,
    Token,
    TokenURIUpdated
} from "../../generated/schema"

export function handleTransfer(event: TransferEvent): void {
    let tokenId = event.params.tokenId.toHex()
    let token: Token
    if (event.params.to.equals(Address.fromHexString(ZERO_ADDRESS))) {
        // burn
        token = Token.load(tokenId)
        token.isBurn = true
    } else if (event.params.from.equals(Address.fromHexString(ZERO_ADDRESS))) {
        // mint
        token = new Token(tokenId)
        token.isBurn = false
    }

    token.owner = event.params.to
    token.save()

    let transfer = new Transfer(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    transfer.from = event.params.from
    transfer.to = event.params.to
    transfer.token = event.params.tokenId.toHex()
    transfer.save()
}

export function handleTokenURIUpdated(event: TokenURIUpdatedEvent): void {
    let entity = new TokenURIUpdated(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    let tokenContract = ERC721.bind(event.address)
    let uri = tokenContract.tokenURI(event.params.tokenId)
    entity.token = event.params.tokenId.toHex()
    entity.uri = uri
    entity.save()

    let token = Token.load(event.params.tokenId.toHex())
    token.uri = uri
    token.save()
}

export function handleApproval(event: ApprovalEvent): void {
    let entity = new Approval(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.owner = event.params.owner
    entity.approved = event.params.approved
    entity.token = event.params.tokenId.toHex()
    entity.save()
}
  
export function handleApprovalForAll(event: ApprovalForAllEvent): void {
    let entity = new ApprovalForAll(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.owner = event.params.owner
    entity.operator = event.params.operator
    entity.approved = event.params.approved
    entity.save()
}