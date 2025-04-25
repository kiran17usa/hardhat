"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    solidity: "0.8.28",
};
exports.default = config;
require("dotenv/config");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ethers");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */
//some times what if thery are unable to access - use || add any path or value
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia/example";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
module.exports = {
    defaultNetworks: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.28",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY, //sometimes you can comment this
        token: "POLYGON",
        //offline: true,
        showTimeSpent: true,
        currencyPrecision: 5,
    },
};
task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
    const accounts = await ethers.getSigners();
    for (const account of accounts) {
        console.log(account.address);
    }
});
