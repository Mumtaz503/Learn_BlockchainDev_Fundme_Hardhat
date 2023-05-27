// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error FundMe__NotOwner();

contract FundMe {
    using PriceConvertor for uint256;

    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address public /* immutable */ i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

    //1) Create a variable of AggregatorV3Interface object type
    AggregatorV3Interface public PriceFeed;
    
    //2) Pass it in the constructor of your contract to access the data of address for price feed contract
    constructor(address PriceFeedAddress) {
        i_owner = msg.sender;

        //3) Access the price feed contract address in the constructor (Modularization)
        PriceFeed = AggregatorV3Interface(PriceFeedAddress);
    }

    function fund() public payable {

        //8) Get Conversion rate now has two parameters You can Add PriceFeed variable in here
        require(msg.value.getConversionRate(PriceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
    
    function getVersion() public view returns (uint256){
        //9) ETH/USD price feed address of Sepolia Network accessed directly from AggregatorV3Interface
        AggregatorV3Interface priceFeed = AggregatorV3Interface(PriceFeed);
        return priceFeed.version();
    }
    
    modifier onlyOwner {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }
    
    function withdraw() public onlyOwner {
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        // // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }
    // Explainer from: https://solidity-by-example.org/fallback/
    // Ether is sent to contract
    //      is msg.data empty?
    //          /   \ 
    //         yes  no
    //         /     \
    //    receive()?  fallback() 
    //     /   \ 
    //   yes   no
    //  /        \
    //receive()  fallback()

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

}