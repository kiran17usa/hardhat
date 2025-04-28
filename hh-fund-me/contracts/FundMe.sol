// Get funds from user
// withdraw funds
// set a minimum funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./PriceConverter.sol";

//import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    using PriceConverter for uint256;
    uint256 public minimumUsd = 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public owner;
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        //want to be able to set a minimum fund amount
        //1. how do we send ETH to this contract?

        //msg.value.getConversionRate(); //instead of below
        require(
            msg.value.getConversionRate(priceFeed) > minimumUsd,
            "Didn't send enough!"
        ); //1*10*18=wei= 1eth
        //require(getConversionRate(msg.value) > minimumUsd, "Didn't send enough!"); //1*10*18=wei= 1eth
        //18 decimals
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        //require(msg.sender == owner, "Sender is not the owner!");

        //for(/*starting index, ending index, step amount - 0, 10, 1 */)
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        //reset the array
        funders = new address[](0);
        //actually withdraw the funds
        //transfer
        //send
        //call
        //msg.sender = address
        //payable(msg.sender) = payable address
        //bool sendSuccess = payable(msg.sender).transfer(address(this).balance);
        //require(sendSuccess, "send failed");

        //call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "call failed");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender is not the owner!");
        _;
    }
}
