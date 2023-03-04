import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { handleWithdrawAndRecord } from "../src/subset-registry"
import { createSubsetEvent } from "./subset-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let subsetRoot = Bytes.fromHexString('0x1234567890')
    let subsetData = Bytes.fromHexString('0xabababababababababababababababababababababababababababababababababababababababab')
    let nullifier = Bytes.fromHexString('0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0de')
    let pool = Address.fromString('0xfacefacefacefacefacefacefacefacefaceface')
    let accessType = BigInt.fromI32(1)
    let bitLength = BigInt.fromI32(256)

    let newDepositEvent = createSubsetEvent(
      subsetRoot,
      nullifier,
      pool,
      accessType,
      bitLength,
      subsetData
    )

    handleWithdrawAndRecord(newDepositEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Subset data created and stored", () => {
    assert.entityCount("SubsetData", 1)
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "subsetRoot",
      "0x1234567890"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "nullifier",
      "0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0de"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "contractAddress",
      "0xfacefacefacefacefacefacefacefacefaceface"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "accessType",
      "1"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "bitLength",
      "256"
    )
    assert.fieldEquals(
      "SubsetData",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "subsetData",
      "0xabababababababababababababababababababababababababababababababababababababababab"
    )
  })
})