import { getChainDetails } from "../api";
import { useCrypto } from "../context/crypto-context";
import { useState } from "react";
// import { useState, useEffect } from 'react';

export function ChainItem(props) {
  const [edit, setEdit] =  useState(false);
  const [walletAddress, setWalletAddress] =  useState('');
  const [detailsWalletOnChain, setDetailsWalletOnChain] =  useState(null);
    
  const changeAddress = (e) =>{
    setWalletAddress(e.target.value)
  }

  const changeEdit = () =>{
    setEdit(!edit)
  }

  async function getDetails(e) {
    e.preventDefault();
    let result = await getChainDetails(walletAddress, props.connectionId);
    
    setDetailsWalletOnChain(result)
  }

  return (
    <div className="portfolio__item">
      <div className="portfolio__logo">
        <img src={props.icon} alt="" />
      </div>
      <p className="portfolio__name">{props.name}</p>
      {}
      {!edit ? 
        <button onClick={changeEdit} className="portfolio__button">Check balance</button>
        :
        <form action="#" onSubmit={getDetails} className="portfolio__data">
            <input type="text" value={walletAddress} onChange={changeAddress} placeholder="Wallet Address" name="wallet" required className="portfolio__input" />
            {!detailsWalletOnChain && <button type="submit" className="portfolio__button">Check balance</button>}
        </form>
      }

      {detailsWalletOnChain && <ul className="portfolio__assets assets-portfolio">
        {detailsWalletOnChain.map((item, i) => 
            <li className="assets-portfolio__row" key={i}>
                <span className="assets-portfolio__name">{+(item.amount).toFixed(3)} {item.symbol}</span>
                <span className="assets-portfolio__value">{+(item.price * item.amount).toFixed(2)} $</span>
            </li>
        )}
      </ul>}
    </div>
  );
}
