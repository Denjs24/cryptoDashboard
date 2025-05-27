import { useCrypto } from "../context/crypto-context";
import { ChainItem } from "./ChainItem";
import ReactDocumentTitle from 'react-document-title'
// import { useState, useEffect } from 'react';

export function ChainList (props) {
    let {chainList} = useCrypto();
    
    console.log(typeof chainList);
    

    return(
        <ReactDocumentTitle title='Chain List'>
        <div className="portfolio">
            <h2 className="portfolio__title _title">Chain List</h2>
            <div className="portfolio__content">
                {chainList.map((chain, index) => {
                    return (
                        <ChainItem {...chain} key={index}/>
                    )
                })}
            </div>
        </div>
        </ReactDocumentTitle>
    )
} 