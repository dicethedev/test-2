import { ethers } from "hardhat";

async function main() {
        //go to etherscan and look for this Token addresses and copy it here
    const BNB_Address = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
    const MATIC_Address = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
    const UNI_Router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const amountOut = 1000;
    const amountInMax = 4e6;

     const helpers = require("@nomicfoundation/hardhat-network-helpers");
    const BNB_Holder = "0x4Fabb145d64652a948d72533023f6E7A623C7C53";
    await helpers.impersonateAccount(BNB_Holder);
    const impersonatedSigner = await ethers.getSigner(BNB_Holder);
    
    //the token that I'm swapping is BNB & DAI
    const BNB = await ethers.getContractAt("IERC20", BNB_Address, impersonatedSigner);
    const MATIC = await ethers.getContractAt("IERC20", MATIC_Address, impersonatedSigner);
    const ROUTER = await ethers.getContractAt("IUniswap", UNI_Router, impersonatedSigner);

    await BNB.approve(UNI_Router, amountInMax);
    const bnbBal = await BNB.balanceOf(BNB_Holder);
     const maticBal = await MATIC.balanceOf(BNB_Holder);

    console.log("amount balance before swap", bnbBal, maticBal);

    //change epoch time
    await ROUTER.swapTokensForExactETH(amountOut, amountInMax, [BNB_Address, MATIC_Address],
    BNB_Holder, 1660853691 );

    const bnbBalAfter = await BNB.balanceOf(BNB_Holder);
    const maticBalAfter = await MATIC.balanceOf(BNB_Holder);

    console.log(" amount balance after swap", bnbBalAfter, maticBalAfter);
}


//usdt   149376720600308
//dai    500000764750

//after
//usdt  149376718595593
//dai   500002764750


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
