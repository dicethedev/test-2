require("dotenv").config({ path: ".env" });
import { BytesLike } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
    let provider = {
        PrivateKey: process.env.PRIVATE_KEY as BytesLike,
        URL: process.env.ROPSTEN_RPC_URL,
    }

    const provider2 = ethers.getDefaultProvider("ropsten", provider.URL);
    let wallet = new ethers.Wallet(provider.PrivateKey, provider2);
    const _value = ethers.utils.parseEther("0.01");

    const CONTRACTADDRESS = "0x44E37A26B1468A9edCb5d1c8e606Ff5b9A883f0F";
    const _vault = await ethers.getContractAt("ITrustFund", CONTRACTADDRESS);

    //Add Kid
    await _vault.addKid("0x12896191de42EF8388f2892Ab76b9a728189260A", 0, { value: _value });

    /// get kid contract balance
//     const bal = await _vault.getBalance();
//     console.log("Contract Balance: ", Number(bal._hex));

//   const helpers = require("@nomicfoundation/hardhat-network-helpers");
//   let approval = "0x9ee15CF9EC4B3830bBedA501d85F5329Ea3C595C";
//   await helpers.impersonateAccount(approval);
//   const impersonatedSigner = await ethers.getSigner(approval);

//   const rec = await (
//     await _vault.connect(impersonatedSigner).withdrawKidAmount()
//   ).wait();

    /// kid withdraw
//     const kid = await _vault.withdrawKidAmount();
//     console.log("Reached: ", kid);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});