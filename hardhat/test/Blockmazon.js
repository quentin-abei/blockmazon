const { expect } = require("chai");
const { ethers } = require("hardhat");
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const ID = 1566;
const NAME = "Laptop";
const CATEGORY = "electronics";
const IMAGE =
  "https://ipfs.io/ipfs/Qmcfif4eR6oZLaw56ocfHsoBTzKPD3LhvH2Yvq9oJzZXma";
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;

describe("Blockmazon", () => {
  let blockmazon;
  let owner;
  let random;
  beforeEach(async () => {
    [owner, random] = await ethers.getSigners();
    // console.log(owner, random);
    const Blockmazon = await ethers.getContractFactory("Blockmazon");
    blockmazon = await Blockmazon.deploy();
  });

  describe("Listing Item", () => {
    let tx;
    let id;
    beforeEach(async () => {
      tx = await blockmazon
        .connect(owner)
        .listItems(ID,NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await tx.wait();
      
    });
    it("should return item attribute", async () => {
      //console.log(id.toString());
      const item = await blockmazon.items(ID);
      expect(await item.id).to.equal(ID);
      expect(await item.name).to.equal(NAME);
      expect(await item.category).to.equal(CATEGORY);
      expect(await item.image).to.equal(IMAGE);
      expect(await item.cost).to.equal(COST);
      expect(await item.rating).to.equal(RATING);
      expect(await item.stock).to.equal(STOCK);
    });
    it("should emit new listing event", async () => {
      expect(await tx)
        .to.emit(blockmazon, "newItemListed")
        .withArgs(owner.address, id, COST);
    });
  });

  describe("Buying", () =>{
    let transaction;
    beforeEach(async () => {
      transaction = await blockmazon
      .connect(owner)
      .listItems(ID,NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      transaction = await blockmazon.connect(random).buyItem(ID, {value: COST});
    })
     it("Should update the contract Balance", async()=> {
      const result = await ethers.provider.getBalance(blockmazon.address);
      expect(result).to.equal(COST);
     })
     it("should update the order count", async() => {
      const result = await blockmazon.orderCount(random.address);
      expect(result).to.equal(1);
     })
     it("should update the orders", async() => {
      const result = await blockmazon.orderCount(random.address);
      const orders = await blockmazon.orders(random.address, result);
      expect(orders.time).to.be.greaterThan(0);
      expect(orders.item.name).to.equal(NAME);
      expect(blockmazon.buyItem).to.emit(
        blockmazon,
        "newItemBuy"
        ).withArgs(ID)
     })

  })
  
});
