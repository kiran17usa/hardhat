const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
//const ethers = require("ethers")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    //const { deployer } = await getNamedAccounts()
    const accounts = await ethers.getSigners()
    console.log(
        "Available Accounts:",
        accounts.map((acc) => acc.address)
    )
    const deployer = accounts[0].address
    console.log("Deployer Address:", deployer)
    console.log("Deployer:", deployer)
    log("----------------------------------------------------")
    log("Deploying FunWithStorage and waiting for confirmations...")
    const funWithStorage = await deploy("FunWithStorage", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    console.log("FunWithStorage object:", funWithStorage)
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(funWithStorage.address, [])
    }

    log("Logging storage...")
    for (let i = 0; i < 10; i++) {
        const provider = ethers.provider
        console.log("Using provider:", provider)
        // const storageValue = await provider.getStorageAt(
        //     funWithStorage.address,
        //     i
        // )
        console.log("Ethers Utils:", ethers.utils)
        const storageValue = await provider.send("eth_getStorageAt", [
            funWithStorage.address,
            ethers.utils.hexlify(ethers.BigNumber.from(i)),
        ])
        // log(
        //     `Location ${i}: ${await provider.getStorageAt(
        //         funWithStorage.address,
        //         i
        //     )}`
        // )
        log(`Location ${i}: ${storageValue}`)
    }
    /*
    //You can use this to trace!
    const trace = await network.provider.send("debug_traceTransaction", [
        funWithStorage.transactionHash,
    ])
    for (structLog in trace.structLogs) {
        if (trace.structLogs[structLog].op == "SSTORE") {
            console.log(trace.structLogs[structLog])
        }
    }
    const firstelementLocation = ethers.utils.keccak256(
        "0x0000000000000000000000000000000000000000000000000000000000000002"
    )
    const arrayElement = await ethers.provider.getStorageAt(
        funWithStorage.address,
        firstelementLocation
    )
    log(`Location ${firstelementLocation}: ${arrayElement}`)

    //Can you write a function that finds the storage slot of the arrays and mappings?
    //And then find the data in those slots?
    */
}

module.exports.tags = ["all", "storage"]
