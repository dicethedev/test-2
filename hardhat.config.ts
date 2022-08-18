import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//this will help you to verify your address on Etherscan
require("@nomiclabs/hardhat-etherscan");
const dotenv = require('dotenv');
dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.9",
   networks: {
      hardhat: {
    forking: {
      url: "https://mainnet.infura.io/v3/b282b364c8bc4347a14d8dcd53de02ce",
    }
  },
    ropsten: {
      url: process.env.ROPSTEN_RPC_URL,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY_FOR_REACT,
  },
};

export default config;
