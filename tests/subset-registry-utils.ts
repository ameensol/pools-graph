import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Subset } from "../generated/SubsetRegistry/SubsetRegistry"

export function createSubsetEvent(
  subsetRoot: Bytes,
  nullifier: Bytes,
  pool: Address,
  accessType: BigInt,
  bitLength: BigInt,
  subsetData: Bytes
): Subset {

  let mockEvent = newMockEvent()
  let subsetEvent = changetype<Subset>(mockEvent)

  subsetEvent.parameters = new Array()
  subsetEvent.parameters.push(
    new ethereum.EventParam(
      "subsetRoot",
      ethereum.Value.fromFixedBytes(subsetRoot)
    )
  )
  subsetEvent.parameters.push(
    new ethereum.EventParam(
      "nullifier",
      ethereum.Value.fromFixedBytes(nullifier)
    )
  )
  subsetEvent.parameters.push(
    new ethereum.EventParam(
      "pool",
      ethereum.Value.fromAddress(pool)
    )
  )
  subsetEvent.parameters.push(
    new ethereum.EventParam(
      "accessType",
      ethereum.Value.fromUnsignedBigInt(accessType)
    )
  )
  subsetEvent.parameters.push(
    new ethereum.EventParam(
      "bitLength",
      ethereum.Value.fromUnsignedBigInt(bitLength)
    )
  )
  subsetEvent.parameters.push(
    new ethereum.EventParam(
      "subsetData",
      ethereum.Value.fromBytes(subsetData)
    )
  )

  return subsetEvent
}
