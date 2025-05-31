import { useState } from "react";
import { useCrypto } from "../context/crypto-context";
import { TableTopCheckbox } from "./TableTopCheckbox";
import { TableTopItem } from "./TableTopItem";

export function TableTop({title, dataTabs, dataTabsActive}) {
    let active;
    if(dataTabs.length > 0){
        if (dataTabsActive && dataTabs.find(dataTab => dataTab == dataTabsActive)) {
            active = dataTabsActive
        }else{
            active = dataTabs[0]
        }
    }else{
        return (
            <h3 className="text-2xl text-red-600">Not-found-data</h3>
        )
    }
    const {crypto} = useCrypto();
    const [filteredCrypto, setFilteredCrypto] = useState(crypto.slice(0, 5));
    const [activeTab, setActiveTab] = useState(active);
    

    const handleClickRadio = (value) => {
        setActiveTab(value)
        
        switch (value) {
            case 'Top rank':{
                setFilteredCrypto(crypto.sort((a, b) => a.rank > b.rank ? 1 : -1).slice(0, 5))
                break;
            }
            case 'Top growth':{
                setFilteredCrypto(crypto.sort((a, b) => {
                    if (a.priceChange1d < b.priceChange1d) {
                        return 1
                    }else{
                        return -1
                    }
                } ).slice(0, 5));
                break;
            }
            case 'Top volume':{
                setFilteredCrypto(crypto.sort((a, b) => +a.volume < +b.volume ? 1 : -1).slice(0, 5))
                break;
            }   
        
            default:
                setFilteredCrypto(crypto.slice(0, 5))
                break;
        }
    }

    return(
        <div className="bg-blue-900 rounded-2xl flex flex-col gap-y-6 p-6 row-span-2">
            <div className="flex justify-between items-center gap-x-4">
                <h4 className="text-white text-xl font-bold">{title}</h4>
                <div className="flex p-1 rounded-lg bg-slate-400 space-x-1">
                    {dataTabs.map(dataTab => <TableTopCheckbox key={dataTab} handleChange={handleClickRadio} isActive={dataTab === activeTab}>{dataTab}</TableTopCheckbox>)}
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                {filteredCrypto.map((item, index) => <TableTopItem key={item.name} coin={item} index={index + 1}/>)}
            </div>
        </div>
    )
} 