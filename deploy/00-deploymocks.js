//14) In mocks you need to provide the pricefeed that you got from MockV3Aggregator.sol

const { network } = require("hardhat");
require("@nomiclabs/hardhat-ethers");

//15) Here you need to access the configurations from helper config file.
const { developmentChains, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config");


//16) hre is hardhat runtime environment and in this function you're passing it as an object to access 
//its internal variables.
async function deploymentFtn(hre) {

    //17) The deploy function will deploy the contract.
    const { deploy, log } = hre.deployments;

    //18) The deployer is the msg.sender account which you will get from hardhat config file.
    const { deployer } = await hre.getNamedAccounts();

    //19) Chain Id will be defined in config files and will be accessed here in the mocks.
    const chainID = network.config.chainId;

    //20) Access the chain ID for deploying at a localhost that you defined in step 11.
    if (developmentChains.includes(network.name)) {

        log("Local Network Detected. Deploying Mocks.....");
        //21) This just deploys the contract and logs its metadata.
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],

        });
        log("Mocks Deployed!");
        log("----------------------------------------------------------");
    }


}

//22) This doesn't work for some reason.
module.exports.tags = ["all", "mocks"];
module.exports.default = deploymentFtn;