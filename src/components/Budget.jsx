import { useCrypto } from "../context/crypto-context";
import { useEffect, useState } from 'react';
import { ItemBudget } from './ItemBudget';
import { budgetData } from '../data'
import ReactDocumentTitle from "react-document-title";

export function Budget (props) {
  
    return (
      <ReactDocumentTitle title='Budget'>
      <div className='budget'>
        <div className="budget__head">
          <h2 className="budget__title _title">Budget</h2>
        </div>
        <div className="budget__content">
          {budgetData.map((item, i) => <ItemBudget {...item} key={i} />)}
        </div>
      </div>
      </ReactDocumentTitle>
    );
} 
// title={news.title} img={news.imgUrl} keyWords={news.searchKeyWords} source={news.source} date={news.feedDate}