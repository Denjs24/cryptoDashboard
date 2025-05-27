import { useCrypto } from "../context/crypto-context";
import { useEffect, useState } from 'react';

export function ItemBudget ({name, type, icon, wallet}) {
  const [open, setOpen] = useState(true)
  const {crypto} = useCrypto();

  
  
  const dataCoins = wallet.map((asset) => {
    const coin = crypto.find((c) => c.id == asset.id )
    return{
      ...asset,
      ...coin
    }
  })

    return (
      <div className="budget__item item-budget">
        <div className={open ? "item-budget__head _active" : "item-budget__head"}>
          <div  className='item-budget__main'>
            <div className="item-budget__icon">
              <img src={icon} alt="Logo" />
            </div>
            <p className="item-budget__name">{name} <span>({type})</span></p>
          </div>
          <button type="button" onClick={() => setOpen(!open)} className='item-budget__arrow'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="#0958D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="item-budget__body">
          <ul>
            {dataCoins.map((item, i) => <li key={i}><span>{item.name}</span><span>{item.amount} {item.symbol}</span><span>{(item.price * item.amount).toFixed(2)}$</span></li>)}
          </ul>
        </div>
      </div>
    );
} 
// title={news.title} img={news.imgUrl} keyWords={news.searchKeyWords} source={news.source} date={news.feedDate}