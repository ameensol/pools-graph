import { Subset as SubsetEvent } from "../generated/SubsetRegistry/SubsetRegistry"
import { SubsetData } from "../generated/schema"

export function handleWithdrawAndRecord(event: SubsetEvent): void {
  let entity = new SubsetData(
    event.transaction.hash
  )
  entity.subsetRoot = event.params.subsetRoot
  entity.nullifier = event.params.nullifier
  entity.contractAddress = event.params.pool
  entity.accessType = event.params.accessType
  entity.bitLength = event.params.bitLength
  entity.subsetData = event.params.subsetData

  entity.save()
}