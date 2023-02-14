import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navigation from "./components/Navigation";
import Product from "./components/Product";
import Section from "./components/Section";
import abi from "./abis/Blockmazon.json";

const contractAddress = "0x914766df5DE4eFFCAAe4fB6e613e9DE6173DF4a7";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");
  const [blockmazon, setBlockmazon] = useState("");
  const [electronics, setElectronics] = useState("");
  const [clothing, setClothing] = useState("");
  const [toys, setToys] = useState("");
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);

  const togglePop = (item) => {
    
    setItem(item);
    toggle ? setToggle(false) : setToggle(true);
  };
  const loadBlockchainData = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    
    // console.log(network);
    const chainId = await network.chainId;
    if (chainId !== 5) {
      setLoading(false);
      alert("Please switch to goerli network");
    }
    const blockmazon = new ethers.Contract(contractAddress, abi, provider);
    setBlockmazon(blockmazon);
    const numItems = await blockmazon.numItemsListed();
    // const numstring = numItems.toHexString();
    // const num = numstring.toString();
    // const parse = parseInt(num);
    // console.log(parse);
    const items = [];
    for (let i = 0; i < numItems; i++) {
      const item = await blockmazon.items(i + 1);
      items.push(item);
    }
    //  console.log(items);
    const electronics = items.filter((item) => item.category === "electronics");
    setElectronics(electronics);
    // console.log(electronics);
    const clothing = items.filter((item) => item.category === "clothing");
    setClothing(clothing);
    const toys = items.filter((item) => item.category === "toys");
    setToys(toys);
    setLoading(false);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Blockmazon Best seller</h2>
      {loading && (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      ) }
      { electronics && clothing && toys&& (
        <>
        <Section
          title={"Clothing & Jewelry"}
          items={clothing}
          togglePop={togglePop}
        />
        <Section
          title={"Electronics & Gadgets"}
          items={electronics}
          togglePop={togglePop}
        />
        <Section
          title={"Toys & gaming"}
          items={toys}
          togglePop={togglePop}
        />
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} 
        account={account} blockmazon={blockmazon}
        togglePop={togglePop}
         />
      )}
      
    </div>
  );
}

export default App;
