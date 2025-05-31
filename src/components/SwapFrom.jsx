import { useRef, useState } from "react"
import { Select, Space, Form, Button } from 'antd';
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
    required: "'${label}' is required!",
    types: {
        number: "${label} is not valid number"
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
};

export default function SwapForm ({second, value, coin, changeValue, changeCoin, asset, changeAllAsset, changePercentValue}){
    const [select, setSelect] = useState(false)
    const [form] = Form.useForm()
    const {crypto, activeCurrency} = useCrypto()
    const firstCoinInfo = crypto.find(coin => coin.symbol == coin)
    // if(firstCoinInfo){
    //     const valueCurrency = (value * crypto.find(c => c.symbol == coin).price * activeCurrency.rate).toFixed(2)
    // }else{
    //     return <h1>Loading...</h1>
    // }

    return (
        <div className="swap-column">
            <div className="swap-column__main">
                <input type="text" placeholder="0.0" className="swap-column__input" onChange={changeValue} value={value} disabled={second}/>
                <div className="swap-column__select">
                    <Select
                        style={{
                            width: '100px',
                        }}
                        open={select}
                        onClick={() => setSelect((prev) => !prev)}
                        placeholder='Select'
                        optionLabelProp="label"
                        onSelect={changeCoin}
                        
                        options={crypto.map(coin => ({
                            label: coin.symbol,
                            value: coin.id,
                            icon: coin.icon,
                        }))}
                        value={coin}
                        optionRender={(option) => (
                            <Space>
                                <img width='20px' src={option.data.icon}/>{option.data.label}
                            </Space>
                        )}
                    />
                </div>
            </div>
            <div className="swap-column__second">
                {/* <p className="swap-column__price">{valueCurrency && valueCurrency !== 0 ? `${valueCurrency} ${activeCurrency.symbol}` : null}</p> */}
                {!second && <button type="button" onClick={asset && asset.amount ? changeAllAsset : null} className="swap-column__wallet">
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-6ctqk6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccountBalanceWalletRoundedIcon"><path d="M10 16V8c0-1.1.89-2 2-2h9V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-1h-9c-1.11 0-2-.9-2-2zm3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h9V8h-9zm3 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></svg>
                    {asset ? asset.amount : 0} {coin}
                </button>}
                
            </div>
            {!second && <div className="swap-column__part part-swap-column">
                <Button onClick={changePercentValue} className="part-swap-column__item" value={0.25}>25%</Button>
                <Button onClick={changePercentValue} className="part-swap-column__item" value={0.5}>50%</Button>
                <Button onClick={changePercentValue} className="part-swap-column__item" value={0.75}>75%</Button>
                <Button onClick={changePercentValue} className="part-swap-column__item" value={1}>100%</Button>
            </div>}
            
        </div>
    )
}