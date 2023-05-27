const { assert } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");




describe("Funds", async function () {
    let fundMe;
    let deployer;
    let mockV3Aggregator;

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        fundMe = await ethers.getContract("FundMe", deployer);
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        );
    });

    describe("constructor", async function () {
        it("Sets the aggregator address correctly", async function () {
            const response = await fundMe.getPriceFeed();
            assert.equal(response, mockV3Aggregator.address);
        });
    });
});
