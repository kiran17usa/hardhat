# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

solhint - solidity linting is analyzing of the project
eslint - java script code
---
for deploy - no need to have deploy.js at scripts folder. we will install hardhat-deploy and hardhat-deploy-ethers
create a deploy folder and have the files ascending order based on deployment
the required deployment folders shall be under ascending order as per deployment - say , 01-deploy1.js, 02-deploy2.js

yarn hardhat gives deploy option along with many

yarn hardhat deploy - command runs the deploy folder - ex - hi msg can be seen from deploy function - deployFunc is the default function
add the 01-deploy-function.js and helper-hardhat-config.js files which has network information about sepolia, original polygon(matc) their chainid's and pricefeed address to use diff network pricefeeds to pull eth-usd pricefeed address dynamically
- use yarn hardhat deploy --network polygon/sepolia/..
what if they dont have corresponding network-chains , use default mocks file under deploy folder

-------
modify the code accordingly and make sure no errors
under the deploy folder 00-mocks and 01-fundme refers to diff deployments
yarn hardhat deploy --tags mocks - tries to deploy mocks only
yarn hardhat deploy -- will deploy both the contracts one after other ( mocks, fund-me)
-----------
after adding utils verify file
you can start deploying to testnetworks sepolia or something
yarn hardhat deploy --network sepolia
output:
yarn run v1.22.22
$ /home/kiran17usa/hardhat/hh-fund-me/node_modules/.bin/hardhat deploy --network sepolia
Nothing to compile
Named Accounts: {}
Development Chains: [ 'hardhat', 'localhost' ]
Current network: sepolia
deploying "FundMe" (tx: 0x6533e7376ef3b6e94c1d362bba3b2637601efa2f56474ed98cc7f9ab71a09b9c)...: deployed at 0xecd5Ae108F90C6271EcaD9d8a15b2a9a26996Ade with 859000 gas
--------------------------------------
FundMe deployed!
FundMe address: 0xecd5Ae108F90C6271EcaD9d8a15b2a9a26996Ade
FundMe deployed by: 0xaD2CD3E602A8403B5A090fA32E48219B347D71Fa
Done in 79.53s.

--------------------------------------------------------------
yarn hardhat test after creating individual unit test cases under test/unit
yarn hardhat test --grep "amount funded" - to run individual test under describe
yarn hardhat test - runs all tests under test/unit/*.js
this is like a deployment to test net verification
-------------------------------------------
the final step before actual deployment is staging under test folder
write fund.js and write.js files
run below
yarn hardhat run scripts/fund.js --network sepolia
yarn hardhat run scripts/withdraw.js --network sepolia
---------------------------
package.json shall include scripts

