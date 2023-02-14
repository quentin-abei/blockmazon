const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config();
const { items } = require("../items.json");
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const contractAddress = "0x914766df5DE4eFFCAAe4fB6e613e9DE6173DF4a7";
  const rpc = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, rpc);
  const Blockmazon = await hre.ethers.getContractAt(
    "Blockmazon",
    contractAddress,
    wallet
  );

  for (let i = 0; i < items.length; i++) {
    const transaction = await Blockmazon.listItems(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock
    );
    await transaction.wait();
    console.log(`Listed item ${items[i].id}: ${items[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
