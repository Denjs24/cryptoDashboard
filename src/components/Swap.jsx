import { Button, Select, Space } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import SwapForm from './SwapFrom';
import { useCrypto } from "../context/crypto-context";
// import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import ReactDocumentTitle from 'react-document-title'
import { getExchangeDetails } from '../api';



export function Swap () {
    const [firstCoin, setFirstCoin] = useState('ETH')
    const [firstValue, setFirstValue] = useState()
    const [secondCoin, setSecondCoin] = useState('USDC')
    const [secondValue, setSecondValue] = useState(0)
    const [activeExhange, setActiveExhange] = useState('Binance')
    const [select, setSelect] = useState(false)
    const {crypto, assets, exchanges} = useCrypto();


    let walletAssetFirst = assets.find(asset => asset.symbol == firstCoin)
    let walletAssetSecond = assets.find(asset => asset.symbol == secondCoin)

    useEffect(() =>{
        const getExchangesFetch = async () => {
                let {price} = await getExchangeDetails(activeExhange, firstCoin, secondCoin);
                console.log(price);
                
                if (!price) {
                    price = 0;
                }else if (price > 0.00) {
                    price.toFixed(2)
                }

                setSecondValue(firstValue * price || 0)
        }
            // const firstCoinInfo = crypto.find(coin => coin.symbol == firstCoin)
            // const secondCoinInfo = crypto.find(coin => coin.symbol == secondCoin)
            // let value = firstValue * firstCoinInfo.price / secondCoinInfo.price;
            
            // setSecondValue(value ? value : 0)
        // console.log('Отработка функции');
        // useDebouncedCallback(() => {
        //     console.log('Отработала функция!!!');
        // }, 300)
        getExchangesFetch();
    }, [firstValue, secondCoin, firstCoin, activeExhange])


    const switchCoins = useCallback(() => {
        setFirstCoin(secondCoin)
        setFirstValue(secondValue)
        setSecondCoin(firstCoin)
        setSecondValue(firstValue)
    }, [firstCoin, firstValue, secondCoin, secondValue])

    const changeValue = useCallback((e) => {
        setFirstValue(e.target.value)
    }, [])

    const changePercentValue = (e) => {
        setFirstValue(walletAssetFirst.amount * +(e.target.closest('button').value))
    };

    const changeExchange  = (value) => {
        setActiveExhange(value);
        // setSelect(false)
    }

    return(
        <ReactDocumentTitle title="Swap">
            <div className="swap">
                <div className="swap__top top-swap">
                    <div className="top-swap__left">
                        <Button className="top-swap__button">
                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-h1j5uq" color="#5155a6" aria-hidden="true" viewBox="0 0 24 24"><path fill='#5155a6' d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zm10 4h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path></svg>
                        </Button>
                    </div>
                    <div className="top-swap__right">
                        <Select
                            showSearch
                            style={{
                                width: '130px',
                            }}
                            filterOption={(input, option) =>
                                (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            // open={select}
                            // onClick={() => setSelect((prev) => !prev)}
                            placeholder='Select'
                            optionLabelProp="label"
                            onSelect={changeExchange}
                            
                            options={exchanges.map(exchange => ({
                                // label: exchange.symbol,
                                value: exchange.name,
                                icon: exchange.icon,
                            }))}
                            value={activeExhange}
                            optionRender={(option) => (
                                <Space>
                                    <div style={{display: 'flex', width: '20px'}}>
                                        <img width='20px' style={{flex: '0 0 20px'}} src={option.data.icon}/>
                                    </div>
                                    {option.data.value}
                                </Space>
                            )}
                        />
                        <Button className="top-swap__button">
                            <svg id="arrow_loading" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 28 28" width="30" height="30"><path stroke="none" fill="#5155a6" d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z" className="background-path"></path><defs><path id="arrow" stroke="none" fill="none" d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z"></path><clipPath id="arrow-clip"></clipPath></defs><g clipPath="url(#arrow-clip)"><circle cx="12" cy="12" r="5" transform="rotate(365,12,12)" fill="none" stroke="currentColor" strokeWidth="16" strokeDasharray="30" strokeDashoffset="0"><animate attributeName="strokeDashoffset" values="0;-30" begin="arrow_loading.click; 0.7s" repeatCount="indefinite" dur="-0.7s"></animate></circle></g></svg>
                        </Button>
                        <Button className="top-swap__button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#5155a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-swap-off"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        </Button>
                    </div>
                </div>
                <form className="swap__form">
                    <div className="swap__body">
                        <SwapForm coin={firstCoin} value={firstValue} changePercentValue={changePercentValue} asset={walletAssetFirst} changeAllAsset={() => setFirstValue(walletAssetFirst.amount)} changeCoin={(value, item) => setFirstCoin(item.label)} changeValue={changeValue}/>
                        <button onClick={switchCoins} type='button' className='swap__revers'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5155a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                        </button>
                        <SwapForm coin={secondCoin} value={secondValue} changePercentValue={changePercentValue} asset={walletAssetSecond} changeAllAsset={() => setSecondValue(walletAssetSecond.amount)} changeCoin={(value, item) => setSecondCoin(item.label)} radio={false} second={true}/>
                    </div>
                    <div className="swap__footer">
                        <Button type="primary" className='swap__button'>Swap</Button>
                    </div>
                </form>
            </div>
        </ReactDocumentTitle>
    )
} 