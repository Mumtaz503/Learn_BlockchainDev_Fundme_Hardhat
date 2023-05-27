// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConvertor {
    function getPrice(
        //4) Pass the AggregatorV3Interface object in the function to access contract address
        AggregatorV3Interface PriceFeed
    ) internal view returns (uint256) {
        // // Sepolia ETH / USD Address
        // // https://docs.chain.link/data-feeds/price-feeds/addresses#Sepolia%20Testnet
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(
        //     0x694AA1769357215DE4FAC081bf1f309aDC325306
        // );

        //5) Access the round data function from AggregatorV3Interface
        (, int256 answer, , , ) = PriceFeed.latestRoundData();

        return uint256(answer * 10000000000);
    }

    function getConversionRate(
        uint256 ethAmount,
        //6) Pass the AggregatorV3Interface object in the conversionrate function
        AggregatorV3Interface PriceFeed
    ) internal view returns (uint256) {
        //7) Access the Get Price Function from The AggregatorV3Interface Interface
        uint256 ethPrice = getPrice(PriceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;

        return ethAmountInUsd;
    }
}
