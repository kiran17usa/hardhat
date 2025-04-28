//we dont always needs to deploy this
const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    //const { deployer } = await getNamedAccounts()
    const namedAccounts = await getNamedAccounts()
    console.log("Named Accounts:", namedAccounts) // Debug output
    const [deployerSigner] = await ethers.getSigners()

    const deployer = deployerSigner.address // Extract address

    //const [deployer] = await ethers.getSigners()
    //const deployer = namedAccounts.deployer

    if (!deployer) {
        throw new Error("Deployer account is undefined! Check Hardhat config.")
    }
    //const chainId = network.config.chainId
    console.log("Development Chains:", developmentChains)

    console.log("Current network:", network.name)
    if (developmentChains.includes(network.name)) {
        log("local network detected! deploying mocks...")
        console.log("Deployer address:", deployer)

        await deploy("MockV3Aggregator", {
            //contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed!")
        log("----------------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
