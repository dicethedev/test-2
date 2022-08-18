import { ethers } from "hardhat";

async function main() {

    const BNBAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const UNI_Router  = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    //amounts to be used in swapping aave token to dai
    const amountOutMin = 2e6;
    const amountIn = 3e6;

    //amounts to be used in adding liquidity btw aave and dai
    const amountADesired = 100;
    const amountBDesired = 100;
    const amountAMin = 1;
    const amountBMin = 1;
    const epochTime = 1661108545;
    //im
    const helpers = require("@nomicfoundation/hardhat-network-helpers");
    const HolderToken = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
    await helpers.impersonateAccount(HolderToken);
    const impersonatedSigner = await ethers.getSigner(HolderToken);


    //aave contract initialization
    const Aave = await ethers.getContractAt(
        "IERC20",
        BNBAddress,
        impersonatedSigner
    );


    //dai contract initialization
    const DAI = await ethers.getContractAt("IERC20", DAIAddress);

    //uniswap router initialization
    const ROUTER = await ethers.getContractAt(
        "IUniswapV2Router02",
        UNI_Router,
        impersonatedSigner
    );

    await ROUTER.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        [BNBAddress, DAIAddress],
        HolderToken,
        1960674129
    );
    console.log("Swapped Tokens");

    const bnbBalAfter = await Aave.balanceOf(impersonatedSigner.address);
    const daiBalAfter = await DAI.balanceOf(impersonatedSigner.address);

    console.log("balance after swap:", bnbBalAfter.toString(), daiBalAfter.toString());

    const AddLiquidity = await ROUTER.addLiquidity(
        BNBAddress,
        DAIAddress,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        HolderToken,
        epochTime,
        { gasLimit: ethers.utils.hexlify(1000000) }
    );

    console.log(AddLiquidity);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});