// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IUniswap {

      function swapTokensForExactETH(
          uint amountOut, 
          uint amountInMax, 
          address[] calldata path, 
          address to,
           uint deadline)
        external
        returns (uint[] memory amounts);
}
