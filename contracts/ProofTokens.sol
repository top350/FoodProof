// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract ProofTokens is Ownable, ERC721 {

    using SafeMath for uint;
    
    uint public tokenIndex;

    constructor() ERC721('Proof Token', 'PRF') {
        //tokenid index
        tokenIndex = 0;
    }


    //token struct
    struct ProofToken {
      bytes32 tokenHash;
      string name;
      string location;
      string farmerName;
      string tokenURI;
      address owner;
    }

    //buyers mapping with buyer struct bytes32 => buyer, buyer struct {bytes32, totalBought, exists, owneraddress, totalDonated}, totalBought increments after everytime the buyer buys something and sold function is called, we check for exists and if not true we create a new buyer and add the amount they bought and increment on top of that amount in the future
    //identifier hash of off chain identifier of buyer
    mapping (bytes32 => Buyer) public buyers;
    struct Buyer {
      uint256 totalContributed; //total amount the buyer has bought in USD
      uint256 totalDonationsAllocated; //amount of donation capital allocated
      bool exists; //always true
      address buyerAddress; //address of buyer (if token has been redeemed)
    }

    //index needs to be unique so it may be possible to do SHA256(tokenId + soldId + user ID)
    mapping (uint256 => SaleDetails) public soldTokens;
    struct SaleDetails {
      bytes32 buyerHash; //identifier hash of off chain identifier of buyer
      bytes32 redemptionHash; //SHA256 of secret value used by buyer to redeem their token
      bool redeemed; //redemption status of token
      bool sold;  //always true
      uint256 cost; //cost of token in sale (USD)
    }

    //modifiers
    //check if buyer exists
    modifier onlyBuyer(bytes32 _buyerId) { require(buyers[_buyerId].exists == true); _; }

    //events when minted
    event MintedToken (uint256 _tokenId, address _tokenMinter, string _tokenMetaData);
    //event when item is sold
    event SoldToken (uint256 _tokenId, bytes32 _buyerId, uint256 _cost);
    //event when donation is chosen (bytes32, amount, charityName, donation id)
    //  event DonationChosen (string _charityName, bytes32 _buyerId, uint256 _amountToBeDonated);
    //event when donation is made by luxarity
    // event DonationMadeToCharity (uint256 _amountDonated, string _charityName, bytes32 _proofHash, string _donationProof, bytes32 _donationMadeHash);
    //event when token is redeemed
    event RedeemedToken (uint256 _tokenId, bytes32 _buyerId, address _buyerAddress);





    

    

}