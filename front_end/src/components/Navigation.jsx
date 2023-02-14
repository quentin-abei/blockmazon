import './Navigation.css'
import React from 'react'
import {ethers} from 'ethers'


const Navigation = ({account, setAccount}) => {
    const connectHandler = async() => {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
    }
    
  return (
    
    <nav className='nav_main'>
        <div className='nav_logo'>
          <h1>Blockmazon</h1>
        </div>
        <input 
        type="text"
        placeholder='search an item'
        className='nav_search'
        />
        {account ? (
            <button 
            type='button'
            className='nav_connect'
            >
                {account.slice(0,6)+ '...'+ account.slice(38,42)}
            </button>
        ): (
            <button 
        type='button'
        className='nav_connect'
        onClick={connectHandler}
        > Connect
        </button>
        )}
        <ul className='nav_links'>
            <li><a href='#Clothing & Jewelry'>Clothing & Jewelry</a></li>
            <li><a href='#Electronics'>Electronics</a></li>
            <li><a href='#Gaming'>Gaming</a></li>
        </ul>
    </nav>
  )
}

export default Navigation
