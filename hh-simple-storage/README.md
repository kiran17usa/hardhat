# hh-simple-storage
# hre - hardhat runtime environment

# followed linux from hardhat.org - tutorial - setup

# sudo apt update

# sudo apt install curl git

# curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# sudo apt-get install -y nodejs

# yarn init

# yarn install --save-dev hardhat

# yarn hardhat init

# check package.json and ignition , pnp.cjs, pnp.loader.mjs ( instead of node_modules), hardhat.config.js

# newversions dont have ex accounts of ( like ganache) so create a one with below 2 commands

# yarn hardhat node - gives list of accounts

# yarn hardhat accounts - latest version by defaults nothing to have - by using above line we will create few - ex: task tab will create a new task - check under hardhat.config.js file for accounts addition - you can create your own accounts as well
# check hardhat guides task creation for more details

# how to verify/etherscan
# install hardhat-verify/harhat-etherscan plugin from hardhat nomic foundation

# write main function with network usage
# yarn hardhat run scripts/deploy.js  - gives us hardhat network chain id with out explicitly specifying
# yarn hardhat run scripts/deploy.js --network hardhat - same as above
# finally 
# yarn hardhat run scripts/deploy.js --network sepolia - this sepolia and api key, private key added to .env and deploy.js
# this will deploy the contract - on sepolia -it verifies the contract through verify function
# any issue - remove artifacts and cache folder - by running the above run command it automatically compiles and creates the required one
# async function ex() or const ex=async function()=>{} both are same

# yarn hardhat node - runs 10's of accounts on http://127.0.0.1:8545 - localhost
# you can run the scripts on sepolia /hardhat/localhost 
# yarn hardhat run scripts/deploy.js --network hardhat or localhost ( make sure node of accounts running)

# yarn hardhat console --network localhost/hardhat/sepolia - jumps into console - debug purpose - you can run the each statement of main() code in each line by line on console and verify parallel
# write test_deploy.js for verification as expect, assert functions
# yarn hardhat test - use to test
# you can write and run as many number of test cases
# yarn hardhat test --grep store - to run only tests contains store in key word
# it.only written test - these only will run when we say yarn hardhat test
# install solidity-coverage and use like below for code coverage
# yarn hardhat coverage

# additionally hardhat-waffle is a tool for advanced testing - plz explore ( toolbox)





