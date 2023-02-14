const { ethers } = require("hardhat");

async function main() {
  const Blockmazon = await ethers.getContractFactory("Blockmazon");
  const blockmazon = await Blockmazon.deploy();
  await blockmazon.deployed();
  console.log("blockmazon address is at:", blockmazon.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
