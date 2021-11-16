// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "./ProducerInterface.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ProductManager is Ownable{
    using SafeMath for uint;
    using SafeMath for int; 

    address payable contractOwner;
    bool private stopped;

    ProducerInterface producerInterface;
    

    struct Product{
        string name;
        bytes32 companycode;
        address origin;
        address currentOwner;
        address previousOwner;
        int counter;
        int currentPrice; // Price in USD with 2 Decimal
        address[] certificates;
        bytes32 [] oldOwnerPhoto;
        bytes32 [] newOwnerPhoto;
        ProductStatus productStatus;
    }

    enum ProductStatus {Init, Shipped, Owned, InRecall, Destroyed}

    //map id to Product
    mapping (string => Product) public productMapping;


    event productCreated (string id, address owner);

    event productOwnershipTransferEvent (string id, address oldOwner, address newOwner, bytes32 status);

    constructor (address producer)  {
        contractOwner = payable(msg.sender);
        stopped = false;
        producerInterface = ProducerInterface(producer);
    }

    

    function toggleContractActive() onlyOwner public returns (bool) {
        stopped = !stopped;
        return stopped;
    }

    modifier stopInEmergency() {
        require(!stopped, "Circuit Breaker: ProductManager Contract is currently stopped.");
        _;
    }


    modifier onlyInEmergency() {
        require(stopped, "Circuit Breaker: ProductManager Contract is not currently stopped.");
        _;
    }

    modifier checkOwner(string memory _id) {
        require(msg.sender == productMapping[_id].currentOwner, "You are not the owner!");
        _;
    }

    modifier onlyProducer(bytes32 _companycode) {
        // require(isAuthorized(msg.sender),"");
        require(producerInterface.isAuthorized(msg.sender, _companycode), "Unauthorized producer");
        _;
    }

    function createProduct (string memory _id, string memory _companycode, string memory _name, int _price, string memory _photoHash) onlyProducer(stringToBytes32(_companycode)) public {
        Product storage temp = productMapping[_id];
        temp.name = _name;
        temp.origin = msg.sender;
        temp.currentOwner = msg.sender;
        temp.currentPrice = _price;
        temp.counter = 1;
        // temp.oldOwnerPhoto[0] = stringToBytes32(_photoHash);]
        temp.oldOwnerPhoto.push(stringToBytes32(_photoHash));
        temp.productStatus = ProductStatus.Init;
        temp.companycode = stringToBytes32(_companycode);
        
        // productMapping[_id] = temp;
        
        emit productCreated(_id, temp.currentOwner);
    
    }
    
    function transferOwner(string memory _id, address _newOwner) checkOwner(_id) public  {
        require (productMapping[_id].productStatus == ProductStatus.Owned, "Product is currently not in a owned state");
        productMapping[_id].previousOwner = productMapping[_id].currentOwner;
        productMapping[_id].currentOwner = _newOwner;
        productMapping[_id].productStatus = ProductStatus.Shipped;
        emit productOwnershipTransferEvent(_id, msg.sender, _newOwner, "Shipped");
    }

    function receiveProduct(string memory _id) public checkOwner(_id) {
        require (productMapping[_id].productStatus == ProductStatus.Shipped, "Product is currently not in a shipped state");
        productMapping[_id].productStatus = ProductStatus.Owned;
        emit productOwnershipTransferEvent(_id, productMapping[_id].previousOwner  , msg.sender, "Received");
    }

    function returnProduct(string memory _id) public checkOwner(_id) {
        require (productMapping[_id].productStatus == ProductStatus.Shipped, "Product is currently not in a shipped state");
        productMapping[_id].currentOwner = productMapping[_id].previousOwner;
        productMapping[_id].productStatus = ProductStatus.Owned;
        emit productOwnershipTransferEvent(_id, productMapping[_id].previousOwner  , msg.sender, "Returned");
    }
    
    function destroyProduct(string memory _id) checkOwner(_id) public {
        require (productMapping[_id].productStatus == ProductStatus.Owned, "Product is currently not in a owned state");
        productMapping[_id].productStatus = ProductStatus.Destroyed;
        productMapping[_id].previousOwner = productMapping[_id].currentOwner;
        productMapping[_id].currentOwner = contractOwner;
        emit productOwnershipTransferEvent(_id, msg.sender , contractOwner, "Destroyed");
    }

    function getProductById (string memory _id) public view returns (Product memory _product) {
        return productMapping[_id];
    }
    
    function getPhotoHash(string memory _id) public view returns (bytes32) {
        return productMapping[_id].oldOwnerPhoto[0];
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

    fallback () external payable {}
    receive() external payable {
        // custom function code
    }





   
    

}