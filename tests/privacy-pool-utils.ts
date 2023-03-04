import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Deposit, Withdrawal } from "../generated/PrivacyPool/PrivacyPool"

export function createDepositEvent(
  commitment: Bytes,
  denomination: BigInt,
  leafIndex: BigInt,
  timestamp: BigInt
): Deposit {

  let mockEvent = newMockEvent()
  let depositEvent = changetype<Deposit>(mockEvent)

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam(
      "commitment",
      ethereum.Value.fromFixedBytes(commitment)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "denomination",
      ethereum.Value.fromUnsignedBigInt(denomination)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "leafIndex",
      ethereum.Value.fromUnsignedBigInt(leafIndex)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return depositEvent
}


export function createWithdrawalEvent(
  recipient: Address,
  relayer: Address,
  subsetRoot: Bytes,
  nullifier: Bytes,
  fee: BigInt
): Withdrawal {

  let mockEvent = newMockEvent()
  let event = changetype<Withdrawal>(mockEvent)

  event.parameters = new Array()

  event.parameters.push(
    new ethereum.EventParam(
      "recipient",
      ethereum.Value.fromAddress(recipient)
    )
  )
  event.parameters.push(
    new ethereum.EventParam(
      "relayer",
      ethereum.Value.fromAddress(relayer)
    )
  )
  event.parameters.push(
    new ethereum.EventParam(
      "subsetRoot",
      ethereum.Value.fromFixedBytes(subsetRoot)
    )
  )
  event.parameters.push(
    new ethereum.EventParam(
      "nullifier",
      ethereum.Value.fromFixedBytes(nullifier)
    )
  )
  event.parameters.push(
    new ethereum.EventParam(
      "fee",
      ethereum.Value.fromUnsignedBigInt(fee)
    )
  )

  return event
}