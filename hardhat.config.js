require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers");



/** @type import('hardhat/config').HardhatUserConfig */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const GORELI_RPC_URL = process.env.GORELI_RPC_URL;
const GORELI_PRIVATE_KEY = process.env.GORELI_PRIVATE_KEY;

module.exports = {
  defaultNetowrk: "hardhat",

  networks: {
    hardhat: {
      //url: "http://127.0.0.1:8545/",
      chainID: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },

    goreli: {
      url: GORELI_RPC_URL,
      accounts: [GORELI_PRIVATE_KEY],
      chainID: 5,
      blockConfirmations: 6,
    },

  },
  //13) You need to define different versions of solidity being used in each of your contracts
  //You accessed chainlink's Aggregator interface so you need to define the version of that contract here.

  solidity: {
    compilers: [{ version: "0.8.18" }, { version: "0.8.8" }, { version: "0.7.0" }],
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },

  namedAccounts: {
    deployer: {
      default: 0, //by default the account on 0th index in our sepolia accounts is the default account (msg.sender)

    },
    user: {
      default: 0,

    }
  },

  mocha: {
    timeout: 500000,
  },

  plugins: ["@nomiclabs/hardhat-ethers"],
};
