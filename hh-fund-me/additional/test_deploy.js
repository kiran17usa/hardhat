/*
const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
//descriobe("SimpleStorage",()=>{})
describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });
  it("should start with a favourite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    //assert
    //expect
    assert.equal(currentValue.toString(), expectedValue);
    //expect(currentValue.toString()).to.equal(expectedValue) - same as above
  });
  it("should update when we call store", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
*/
