//10) Create a Configuration File that defines configurations for different pricefeed contract addresses
//For different networks such as sepolia, Goreli, etc..

const networkConfig = {

    11155111: {

        name: "Sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },

    5: {

        name: "Goreli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },

}


//11) For local chains define them separately
const developmentChains = ["hardhat", "localHost"];

const DECIMALS = 8;

const INITIAL_ANSWER = 200000000000;


//12) Export this configuration to access in other js files 
module.exports = {

    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}