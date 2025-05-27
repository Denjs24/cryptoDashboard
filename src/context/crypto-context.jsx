import {createContext, useContext, useEffect, useState} from 'react';
import { fakeFetchCrypto, getCurrency, getChainList, getNews, getLocalStorageAssets, setLocalStorageAssets, getExchanges } from '../api';
import {mapAssets, percentDifference} from '../utilis'

const typeContext = {
    assets: [],
    crypto: [],
    lastPage: 1,
    chainList: [],
    currency: [],
    news: [],
    activeTypeSort: 'latest',
    activeCurrency: {},
    exchanges: [],
    callbackData: {},
}

const CryptoContext = createContext(typeContext)

const currencyArr = ['USD', 'EUR', 'UAH', "PLN"]

export function CryptoContextProvider ({children}){
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])
    const [currency, setCurrency] = useState([])
    const [activeCurrency, setActiveCurrency] = useState({})
    const [callbackData, setCallbackData] = useState({})

    const [chainList, setChainList] = useState([])

    const [news, setNews] = useState([])
    const [activeTypeSort, setActiveTypeSort] = useState('latest')
    
    const [exchanges, setExchanges] = useState([])
    
    const [lastPage, setLastPage] = useState(1);
    
    useEffect(() => {
        async function preload(){
            setLoading(true);
            const result = await fakeFetchCrypto(1, 100)
            const assets = await getLocalStorageAssets();
            // const assets = await fetchAssets()
            const currency = await getCurrency()
            const chainList = await getChainList()
            const news = await getNews(1, 20);
            const exhangesFetch = await getExchanges();
            console.log(assets);
            
            
            setAssets(mapAssets(assets, result));
            
            setCrypto(result);
            setChainList(chainList);
            setNews(news)
            setExchanges(exhangesFetch)
            setCurrency(currency.filter(curr => currencyArr.includes(curr.name)));
            setActiveCurrency(currency.find(curr => curr.name == "USD"));
            if(result.length > 0){
                setLoading(false);
            }
        }
        preload()
    }, [])

    // 
    function addAsset(newAsset){
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
        localStorage.setItem('assets', JSON.stringify([...assets, newAsset]))
    }
    // 
    function removeAsset(name){      
        const filteredAssets = assets.filter(asset => asset.name !== name)
        setLocalStorageAssets(filteredAssets)
        setAssets(filteredAssets)
    }

    async function pageCrypto(page = 1) {
        const result = await fakeFetchCrypto()
        setCrypto(result)
    }

    // 
    function changeCurrency(item){
        setActiveCurrency(item)
    }
    // 
    function changeCallbackData (data) {
        setCallbackData(data)
    }

    return <CryptoContext.Provider value={{loading, crypto, assets, lastPage, exchanges, activeTypeSort, callbackData, setLastPage, setActiveTypeSort, addAsset, removeAsset, pageCrypto, changeCurrency, changeCallbackData, currency, activeCurrency, chainList, news,}}>{children}</CryptoContext.Provider>
}

export default CryptoContext;

export function useCrypto(){
    return useContext(CryptoContext);
}