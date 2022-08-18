//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Trust {

    //Trust is also known as TrustFundKids
    //a contract that help kids to save money for future use.
    //is the owner[the parents] can withdraw the kid amount any time and when the age of that kid
    // the owner input for that particulat kid then the kid can withdraw

    struct KidProperties {
        uint256 amount;
        uint256 maturity;
        bool paid;
    }
    mapping(address => KidProperties) public kids;
 
   //the admin to monitor the transaction of the kids
    address public owner;

     //constructor function is only called after you deploy the smart contract
    constructor() {
        owner = msg.sender;
        //the owner function is passed inside the addkid() function
    }

     function addKid(address _kid, uint256 _timeToMaturity) external payable {
         require(msg.sender == owner, 'only admin has access');
        //   require(amounts[msg.sender] == 0, 'kid already exist');

         require(kids[msg.sender].amount == 0, 'kid already exist');
         kids[_kid] = KidProperties(msg.value, block.timestamp + _timeToMaturity, false);
     }

     function withdrawKidAmount() external {
         KidProperties storage kid = kids[msg.sender];
         require(kid.maturity <= block.timestamp, 'too early to withdraw');
        require(kid.amount > 0, 'only kid can withdraw');
        require(kid.paid == false, 'you have paid already');
        kid.paid = true;
         payable(msg.sender).transfer(kid.amount); 
     }

     //getBalance of current address
     function getBalance() external view returns(uint bal) {
         bal = address(this).balance;
     }
} 