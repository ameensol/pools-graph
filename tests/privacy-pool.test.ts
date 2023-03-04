import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { handleDeposit, handleWithdrawal } from "../src/privacy-pool"
import { createDepositEvent, createWithdrawalEvent } from "./privacy-pool-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let commitment = Bytes.fromHexString('0x1234567890')
    let denomination = BigInt.fromI32(100)
    let leafIndex = BigInt.fromI32(0)
    let timestamp = BigInt.fromI32(234)
    let newDepositEvent = createDepositEvent(
      commitment,
      denomination,
      leafIndex,
      timestamp
    )
    handleDeposit(newDepositEvent)

    let recipient = Address.fromString('0xf00df00df00df00df00df00df00df00df00df00d')
    let relayer = Address.fromString('0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0de')
    let subsetRoot = Bytes.fromHexString('0xfacefacefacefacefacefacefacefacefacefacefacefacefacefacefaceface')
    let nullifier = Bytes.fromHexString('0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef')
    let fee = BigInt.fromI32(42)
    let newWithdrawalEvent = createWithdrawalEvent(
      recipient,
      relayer,
      subsetRoot,
      nullifier,
      fee
    )
    handleWithdrawal(newWithdrawalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Commitment created and stored", () => {
    assert.entityCount("Commitment", 1)
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "contractAddress",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "sender",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "leafIndex",
      "0"
    )
    assert.fieldEquals(
      "Commitment",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "commitment",
      "0x1234567890"
    )
  })

  test("SubsetRoot created and stored", () => {
    assert.entityCount("SubsetRoot", 1)
    assert.fieldEquals(
      "SubsetRoot",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "timestamp",
      "1"
    )
    assert.fieldEquals(
      "SubsetRoot",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "contractAddress",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "SubsetRoot",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "sender",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    )
    assert.fieldEquals(
      "SubsetRoot",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "recipient",
      "0xf00df00df00df00df00df00df00df00df00df00d"
    )
    assert.fieldEquals(
      "SubsetRoot",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "relayer",
      "0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0de"
    )
    assert.fieldEquals(
      "SubsetRoot",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "subsetRoot",
      "0xfacefacefacefacefacefacefacefacefacefacefacefacefacefacefaceface"
    )
    assert.fieldEquals(
      "SubsetRoot",
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      "nullifier",
      "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef"
    )
  })
})