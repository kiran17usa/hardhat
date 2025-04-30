//const { deployContract } = require("@nomicfoundation/hardhat-ethers/types")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")
//this is unit test purpose which is local on hardhat
describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator
    //const sendValue = "1000000000000000000" //1 eth
    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async function () {
        //deploy our fundMe contract
        //using hardhat deploy
        //const accounts = await ethers.getSigners()
        //const accountZero = accounts[0]
        const deployer = await getNamedAccounts()
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe") //gives the most recently deployed contract
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        )
        console.log("Mock Aggregator Address:", mockV3Aggregator.address)
    })
    describe("constructor", async function () {
        it("sets the aggregator addresses correctly", async function () {
            const response = await fundMe.priceFeed()
            //const expectedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
            //const expectedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
            console.log(await fundMe.priceFeed())
            assert.equal(response, mockV3Aggregator.address)
        })
    })
    describe("fund", async function () {
        it("fails if you dont send enough eth", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "you need to spend more ETH!"
            )
        })
        it("updated the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })
        it("adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funder(0)
            assert.equal(funder, deployer)
        })
    })
    describe("withdraw", async function () {
        beforeEach(async function () {
            await fundMe.fund({ value: sendValue })
        })
        it("withdraw ETH from a single founder", async function () {
            //arrange
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            //act
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            const gasCost = gasUsed.mul(effectiveGasPrice)
            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )

            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            //assert
            assert.equal(endingFundMeBalance, 0)
            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance),
                endingDeployerBalance.add(gasCost).toString()
            )
        })
        it("allows us to withdraw with multiple funders", async function () {
            const accounts = await ethers.getSigners()
            for (let i = 1; i < 6; i++) {
                const fundMeConnectedContract = await fundMe.connect(
                    accounts[i]
                )
                fundMeConnectedContract.fund({ value: sendValue })
            }
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            //act
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            const gasCost = gasUsed.mul(effectiveGasPrice)
            // assert
            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            //assert
            assert.equal(endingFundMeBalance, 0)
            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance),
                endingDeployerBalance.add(gasCost).toString()
            )
            //make sure that the funder are reset properly
            await expect(fundMe.funder(0)).to.be.reverted
            for (i = 1; i < 6; i++) {
                assert.equal(
                    await fundMe.addressToAmountFunded(accounts[i].address)
                )
            }
        })
        it("only allows the owner to withdraw", async function () {
            const accounts = await ethers.getSigners()
            const attacker = accounts[1]
            const attackerConnectedContract = await fundMe.connect(attacker)
            await expect(attackerConnectedContract.withdraw()).to.be.reverted
        })
    })
})
