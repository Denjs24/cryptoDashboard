import React, { memo } from "react";
import { Layout, Typography} from 'antd';
import { useCrypto } from '../context/crypto-context';
import PortfolioChart from './PortfolioChart';
import AssetsTable from './AssetsTable';
import {splitNumber} from "../utilis";
import ReactDocumentTitle from "react-document-title";

export const Portfolio = memo(function Portfolio(props){
    const {assets, crypto, activeCurrency} = useCrypto();

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc;
    }, {})

    const totalValue = splitNumber(assets.map((asset) => asset.amount * cryptoPriceMap[asset.id]).reduce((acc, v) => (acc += v), 0) * activeCurrency.rate)


    return (
        <ReactDocumentTitle title="Home">
            <>
            <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
                Portfolio: {' '}
                {totalValue}
                {" "}
                {activeCurrency.symbol}
            </Typography.Title>
            <PortfolioChart />
            <AssetsTable />
            </>
        </ReactDocumentTitle>
    )
})