import { useEffect, useState } from "react";
import { getMarkets } from "../api";
import { MarketInfo } from "./MarketInfo";

export function MarketInfoWrapper() {
    const [marketsInfo, setMarketsInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let result = await getMarkets()
            setMarketsInfo(result)
        }
        fetchData()
    }, [])

    // useEffect(()=> {
        
    // },[marketsInfo])

    if (!marketsInfo) {
        return <div>Загрузка...</div>; // или спиннер
    }


    return(
        <div className="grid grid-cols-3 grid-rows-2 row-span-2 col-span-2 gap-6">
            {Object.entries(marketsInfo).map(item => <MarketInfo key={item[0]} title={item[0]} value={item[1]} />)}            
        </div>
    )
} 