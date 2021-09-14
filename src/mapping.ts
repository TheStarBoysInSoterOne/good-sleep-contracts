import {
    Approval as ApprovalEvent,
    ApprovalForAll as ApprovalForAllEvent,
    Transfer as TransferEvent
} from '../generated/GoodSleepContract/ERC721'

import {
    Approval,
    ApprovalForAll,
    Transfer
} from "../generated/schema"

import { Token } from '../generated/schema'

export function handleTransfer(event: TransferEvent): void {
    let tokenId = event.params.tokenId.toHex()
    let token = new Token(tokenId)
    token.owner = event.params.to

    token.save()

    let transfer = new Transfer(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    transfer.from = event.params.from
    transfer.to = event.params.to
    transfer.tokenId = event.params.tokenId
    transfer.save()
}

export function handleApproval(event: ApprovalEvent): void {
    let entity = new Approval(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.owner = event.params.owner
    entity.approved = event.params.approved
    entity.tokenId = event.params.tokenId
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