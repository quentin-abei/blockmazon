// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Blockmazon {
    // 
    error NotAuthorized();
    error cannotDelist();
    address public owner;
    uint256 public numItemsListed;

    struct Item {
        uint id;
        string name;
        string category;
        string image;
        uint cost;
        uint rating;
        uint stock;
    }

    struct Order {
        uint time;
        Item item;
    }

    event newItemListed(address _lister, uint _id, uint _cost);
    event newItemBuy(uint _id); 
     mapping (uint256 => Item) public items;
     mapping(address => uint) public orderCount;
     mapping(address => mapping(uint256 => Order)) public orders;

    constructor() {
        owner = msg.sender;
    }

    function listItems(
         uint _id,
         string memory _name,
         string memory _category,
         string memory _image,
         uint _cost,
         uint _rating,
         uint _stock)
         public onlyBlockmazon {
         Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
         );
         items[_id] = item;
         numItemsListed += 1;
         emit newItemListed(msg.sender, _id, _cost);
    }
    modifier onlyBlockmazon {
        if(owner != msg.sender){
            revert NotAuthorized();
        }
        _;
    }

    function buyItem(uint _id) external payable {
        Item memory item = items[_id];
        require(msg.value >= item.cost, "Not enough funds");
        require(item.stock > 0);
        Order memory order = Order(
            block.timestamp,
            item
        );
        orderCount[msg.sender] +=1;
        orders[msg.sender][orderCount[msg.sender]] = order;
        items[_id].stock = item.stock -1;
        if(item.stock == 0){
            numItemsListed -=1;
        }
        emit newItemBuy(_id);
    }

  

    function withdraw() public onlyBlockmazon {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}