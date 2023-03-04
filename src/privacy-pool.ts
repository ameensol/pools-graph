import {
  Deposit as DepositEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/PrivacyPool-0.001-ETH/PrivacyPool"
import { Commitment, SubsetRoot } from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
  let entity = new Commitment(
    event.transaction.hash
  )
  entity.timestamp = event.params.timestamp
  entity.contractAddress = event.address
  entity.sender = event.transaction.from
  entity.leafIndex = event.params.leafIndex
  entity.commitment = event.params.commitment
  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new SubsetRoot(
    event.transaction.hash
  )
  entity.timestamp = event.block.timestamp
  entity.contractAddress = event.address
  entity.sender = event.transaction.from
  entity.subsetRoot = event.params.subsetRoot
  entity.relayer = event.params.relayer
  entity.recipient = event.params.recipient
  entity.nullifier = event.params.nullifier
  entity.save()
}
