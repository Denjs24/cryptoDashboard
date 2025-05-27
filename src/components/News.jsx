import {  Select } from 'antd';
import { useCrypto } from "../context/crypto-context";
import { NewsItem } from "./NewsItem";
import { useEffect, useState } from 'react';
import { getNews } from '../api';
import ReactDocumentTitle from 'react-document-title'

// import { useState, useEffect } from 'react';
export const typesSortNews = ['latest', 'handpicked', 'trending',  'bullish', 'bearish']
export function News (props) {
    const {activeTypeSort, setActiveTypeSort} = useCrypto();
    const [news, setNews] = useState([]);
    const [type, setType] = useState(activeTypeSort);
        
    useEffect( ()=> {
        const newNews = async () => {
            let result = await getNews(1, 20, type);            
            setNews(result)
        };    
        newNews()
    }, [type])

    const handleChangeType = (value) =>{
        setType(value)
        setActiveTypeSort(value)
    }

    return (
      <ReactDocumentTitle title="News">
      <div className="news">
        <div className="news__head">
          <h2 className="news__title _title">News</h2>
          <Select
            style={{
              width: "150px",
            }}
            // open={select}
            // onClick={() => setSelect((prev) => !prev)}
            placeholder="Type news"
            onSelect={handleChangeType}
            options={typesSortNews.map((type) => ({
              value: type,
            }))}
            defaultValue={type}
          />
        </div>
        <div className="news__content">
          {news.length > 0 && news.map((item, i) => (
            <NewsItem {...item} key={i} />
          ))}
        </div>
      </div>
      </ReactDocumentTitle>
    );
} 
// title={news.title} img={news.imgUrl} keyWords={news.searchKeyWords} source={news.source} date={news.feedDate}