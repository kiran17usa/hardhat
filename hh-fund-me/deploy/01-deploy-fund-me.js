//import
//main function
//calling of main function

const { network } = require("hardhat")
const { verify } = require("../utils/verify")

//deployFunc is a default function for deployment
//async function deployFunc(hre) {
//     console.log("Hi!")
//     hre.getNamedAccounts()
//     hre.deployments
// }
// module.exports.default = deployFunc
// const helperConfig = require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig
//below is same as above two lines
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
//with out explicity function name the below is generic
// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments} = hre
//     //hre.getNamedAccounts
//     //hre.deployments

// }
//instead of above
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const [deployerSigner] = await ethers.getSigners()

    const deployer = deployerSigner.address // Extract address
    if (!deployer) {
        throw new Error("Deployer account is undefined! Check Hardhat config.")
    }
    //const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    //future, if chainid is x use address y
    //if chainid is i use address j
    //use aave hardhat config
    //const ethUsdPriceFeedAddress = networkCOnfig[chainId]["ethUsdPriceFeed"]
    //if the contract doesnt exist, we deploy a min version of for our local testing
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //const address = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    //what will happen when we want to change chains
    //when going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //put the price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1, //if nothing was given atleast take 1 confirmation
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHEREUM_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("--------------------------------------")
    log("FundMe deployed!")
    log("FundMe address:", fundMe.address)
    log("FundMe deployed by:", deployer)
}
module.exports.tags = ["all", "fundme"]
