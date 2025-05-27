import React, { useState } from "react";
import { useCrypto } from './../context/crypto-context';
import { useParams } from "react-router-dom";
import { getCoin } from "../api";
import { useEffect } from "react";
import { useNavigation } from "../shared/hooks/useNavigation";
import axios from "axios";
import CurrencyChart from "./CurrencyChart";

let socialIcons = {
    reddit: 'https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_reddit-512.png',
    website: 'https://cdn-icons-png.freepik.com/512/6472/6472018.png',
    twitter: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png',
}

export function Currency(){

    const {coinName} = useParams();
    const {crypto} = useCrypto();
    const [coinData, setCoinData] = useState(null);
    const [loading, setLoading] = useState(true);
    const {back} = useNavigation();
    const [price, setPrice] = useState(0)
    const [prevPrice, setPrevPrice] = useState(0)

    useEffect(() => {
        if (!coinData) return;
        
        const fetchPrice = async () => {
            try {
                const res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${coinData.symbol}USDT`)
                let responePrice = +(res.data.price)
                if (price < 0.01) {
                    
                }else if (responePrice > 1000) {
                    responePrice = responePrice.toFixed(0)
                }else{
                    responePrice = responePrice.toFixed(2)
                }
                setPrice(responePrice)
                setPrevPrice(price)
            } catch (error) {
                console.error('Ошибка при загрузке цены:', error)
            }
        }
        fetchPrice()
        const interval = setInterval(fetchPrice, 5000)
        return () => clearInterval(interval)
        // const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coinData.symbol.toLowerCase()}usdt@trade`)
        
        // ws.onmessage = (event) => {
        //     const data = JSON.parse(event.data)
        //     setPrice(+data.p)
        // }

        // return () => ws.close()
    }, [coinData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coinDataFetch = await getCoin(coinName)
                setCoinData(coinDataFetch);
                
            } catch (error) {
                console.log(error);
                
            }finally{
                setLoading(false);
            }
        }

        if (crypto.find(coin => coin.name.toLowerCase() === coinName.toLowerCase())) {
            setCoinData(crypto.find(coin => coin.name.toLowerCase() === coinName.toLowerCase()));
            setLoading(false);
        }else{
            fetchData();
        }
    }, [coinName])
    
    
    if(loading){
        return(
            <div className="loading">
                <button type="button" onClick={back}>Back</button>
                <h1>Loading...</h1>
            </div>
        )
    }
    

    return(
        <div className="currency">
            <div className="currency__head">
                <button type="button" onClick={back}>Back</button>
                <span className='text-2xl white font-bold' style={{'color': price > prevPrice ? 'green' : 'red'}}>{price}</span>
                <div className="currency__main">
                    <div className="currency__icon">
                        <img src={coinData.icon} alt="Icon"/>
                    </div>
                    <h1 className="currency__name">{coinData.name} [{coinData.symbol}]</h1>
                </div>
                <ul className="currency__social social-currency">
                    <li className="social-currency__item">
                        <a href={coinData.redditUrl} target="_blank" className="social-currency__icon">
                            <img src={socialIcons.reddit} alt="Reddit"/>
                        </a>
                    </li>
                    <li className="social-currency__item">
                        <a href={coinData.websiteUrl} target="_blank" className="social-currency__icon">
                            <img src={socialIcons.website} alt="Website"/>
                        </a>
                    </li>
                    <li className="social-currency__item">
                        <a href={coinData.twitterUrl} target="_blank" className="social-currency__icon">
                            <img src={socialIcons.twitter} alt="Twitter"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="currency__body">
                <ul className="currency__price-change price-change">
                    <li className="price-change__item">
                        <span className="price-change__name">1 hour</span>
                        <span style={{color: coinData.priceChange1h < 0 ? 'red' : 'green'}} className="price-change__value">{coinData.priceChange1h}%</span>
                    </li>
                    <li className="price-change__item">
                        <span className="price-change__name">1 day</span>
                        <span style={{color: coinData.priceChange1d < 0 ? 'red' : 'green'}} className="price-change__value">{coinData.priceChange1d}%</span>
                    </li>
                    <li className="price-change__item">
                        <span className="price-change__name">1 week</span>
                        <span style={{color: coinData.priceChange1w < 0 ? 'red' : 'green'}} className="price-change__value">{coinData.priceChange1w}%</span>
                    </li>
                </ul>
                <CurrencyChart symbol={coinData.symbol}/>
            </div>
        </div>
    )
}