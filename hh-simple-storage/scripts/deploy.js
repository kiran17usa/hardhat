//imports
const {ethers, run, network} = require("hardhat");
const hardhatConfig = require("../hardhat.config");


//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract ...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    console.log("Contract deployed to:", await simpleStorage.getAddress())
    //what happens when we deploy to our hardhat network?
    console.log(network.config)
    //the chainid from networks info -sepolia from hardhat.config.js
    //verifying contract
    if(network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY ){
        await simpleStorage.waitForDeployment(6)
        await verify(await simpleStorage.getAddress(), [])
    }
    //interacting
    const currentValue = await simpleStorage.retrieve()
    console.log('current value is :', currentValue)

    //update current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log('updated value: ', updatedValue)
    
}
async function verify(contractAddress, args){
    //check ethereum programmable verification through apis
    //similarly hardhat etherscan plugins for verification
    console.log("verifying contract ...")
    try{
    await run("verify:verify", {
        address:contractAddress,
        constructorArguments: args,

    })
    }   
    catch(e){
        if (e.message.toLowerCase().includes("already verified")){
            console.log("Already Verified")
        }else{
            console.log(e)
        }
    }
    
}
//call main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
