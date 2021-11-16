// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ProofTokens.sol";

contract ProofTokenManager is Ownable {

    using SafeMath for uint;

    address payable contractOwner;
    bool private stopped;

}