import { Divider, Flex , Tag, Typography} from "antd"
import { splitNumber } from './../utilis';

export default function CoinInfoModule ({coin}){
    return (
        <>
            <Flex align="center">
                <img src={coin.icon} alt={coin.name} style={{width: '40px', marginRight: 15}}/>
                <Typography.Title level={2} style={{margin: 0}}>
                    ({coin.symbol}) {coin.name}
                </Typography.Title>
            </Flex>
            <Divider />
            <Flex align="center" gap={30}>
                <Typography.Paragraph>
                    <Typography.Text strong style={{marginRight: 10}}>1 Hour:</Typography.Text>
                    <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <Typography.Text strong style={{marginRight: 10}}>1 Day:</Typography.Text>
                    <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <Typography.Text strong style={{marginRight: 10}}>1 Week:</Typography.Text>
                    <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
                </Typography.Paragraph>
            </Flex>
            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>Price</Typography.Text>
                {coin.price.toFixed(2)} $
             </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>Price in BTC:</Typography.Text>
                {coin.priceBtc} BTC
             </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>Market Cap:</Typography.Text>
                {splitNumber(coin.marketCap) + " $"}
             </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>Total Supply</Typography.Text>
                {splitNumber(coin.totalSupply) + " " + coin.symbol}
             </Typography.Paragraph>
        </>
    )
}