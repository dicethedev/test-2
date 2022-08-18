// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ITrustFund {

   struct KidProperties {
        uint256 amount;
        uint256 maturity;
        bool paid;
    }

      function addKid(address _kid, uint256 _timeToMaturity) external payable;
     function withdrawKidAmount() external;
     function getBalance() external view returns(uint bal);
}