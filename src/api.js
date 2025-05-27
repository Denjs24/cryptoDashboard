// import { cryptoAssets, cryptoData } from "./data";

import { getToTimeStamp } from "./utilis";
import axios from "axios";

const http = axios.create({
  baseURL: "https://openapiv1.coinstats.app",
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "TgU6evEyMuw4INzja2VZ8xYC3i2wxP/4w/KwD+Cr7DQ=",
  },
});

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'TgU6evEyMuw4INzja2VZ8xYC3i2wxP/4w/KwD+Cr7DQ='
    }
};

export function fakeFetchCrypto(page = 1, limit = 30){
    return getCoinStatsData(page, limit);
}

// export function fetchAssets(){
//     return new Promise (resolve => {
//         setTimeout(() => {
//             resolve(cryptoAssets)
//         }, 1);
//     })
// }

async function getCoinStatsData(page, limit) {
    try {
      const response = await http.get(`/coins?page=${page}&limit=${limit}`)
      .then((response) => response.data);
      return response.result;
    } catch (err) {
      console.error(err);
    //   throw err; // <- опционально, можете не ретранслировать ошибку
    }
}

export async function getCoin(coin) {
  try {
    const response = await http.get(`/coins/${coin}`)
      .then((response) => response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getCurrency() {
  try {
    const response = await http.get(`/fiats`)
      .then((response) => response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getChainList() {
  try {
    const response = await http.get(`/wallet/blockchains`)
      .then((response) => response.data);
    console.log('chains', response);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getChainDetails(address, connectionId) {
  try {
    const response = await http.get(`/wallet/balance?address=${address}&connectionId=${connectionId}`)
      .then((response) => response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getNews(page = 1, limit = 20, type='latest') {
  try {
    const response = await http.get(`/news/type/${type}?page=${page}&limit=${limit}`)
      .then((response) => response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getNewsDetails(id) {
  try {
    const response = await http.get(`/news/${id}`)
      .then((response) => response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getLocalStorageAssets() {
  const assets = localStorage.getItem('assets');
  try {
    const assetsResult = JSON.parse(assets);
    console.log(assetsResult);
    
    if (assetsResult) {
      return assetsResult;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error parsing assets from localStorage:', error);
    return [];
  }
}

export async function setLocalStorageAssets (assets) {
  try {
    localStorage.setItem('assets', JSON.stringify(assets));
  } catch (error) {
    console.error('Error setting assets to localStorage:', error);
  }
}

export async function getExchanges () {
  try {
    const response = await http.get(`/tickers/exchanges`)
      .then((response) => response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getExchangeDetails (exchange, from, to) {
  console.log(exchange, from, to, getToTimeStamp());
  try {
    const response = await http.get(`/coins/price/exchange?exchange=${exchange}&from=${from}&to=${to}&timestamp=${getToTimeStamp()}`)
      .then((response) => response.data);
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
}
  
//   fetch('https://openapiv1.coinstats.app/coins', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));