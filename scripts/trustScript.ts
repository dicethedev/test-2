import { ethers } from "hardhat";

async function main() {

 let [kid1, kid2] = await ethers.getSigners();

// const lockedAmount = ethers.utils.parseEther("1");
//this will send one ether along when deploying
  const amount = ethers.utils.parseEther("0.01");

  const Trust = await ethers.getContractFactory("Trust");
  const trust = await Trust.deploy();
   
  await trust.deployed();

console.log("TrustFund contract deployed to this address: ", trust.address );
//TrustFund contract deployed to this address:  0x44E37A26B1468A9edCb5d1c8e606Ff5b9A883f0F
//check etherscan with this address above [rospten testnet]

//createGrant is a function in the Vault.sol
 const kidAddition = await trust.addKid(kid2.address, 0, {value: amount});

 const newKidAddition = await kidAddition.wait(); 
 console.log('value', amount);

 console.log("new Kid Addition", newKidAddition);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});