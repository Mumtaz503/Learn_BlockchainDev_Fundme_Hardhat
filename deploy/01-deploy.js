const { network, deployments } = require("hardhat");

const { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config");

const { verify } = require("../utils/verification");





async function deploymentFunc(hre) { //whenever we run deploy scripts hardhat calls the ftn and passes hardhat object in it

    //grabbing the new deploy function and new log function from hre.deployments
    const { deploy, log } = hre.deployments;

    //grabbing the deployer account from hre.getNamedAccounts()
    //we have defined deployer account in hardhat.config.js
    const { deployer } = await hre.getNamedAccounts();

    const chainID = network.config.chainId;

    //23) Now we need to access the pricefeed from either the testnet contracts or the mocks that we created
    let ethUsdPriceFeedAddress;

    //24) If the network is a localhost we'll get the pricefeed from mocks.
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
        //25) Else we'll get it from one of the defined test networks.
    } else {

        ethUsdPriceFeedAddress = networkConfig[chainID]["ethUsdPriceFeed"];
    }

    //29) Pass the pricefeed address as an array because verify function taks args as an array. -_-
    const args = [ethUsdPriceFeedAddress];
    //26) Now we deploy the Fundme contract from the deployer that we have defined in the config file
    const Fundme = await deploy("FundMe", {

        from: deployer,

        //27) We defined the address in step 24
        args: args,

        log: true,

        waitConfirmations: network.config.blockConfirmations || 1,

    });

    //28) Verification

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {

        await verify(Fundme.address, args)
    }
    log("---------------------------------------------------------------------")


}

module.exports.default = deploymentFunc; //exports the specific function that gets called during deployment.
module.exports.tags = ["all", "main"];
