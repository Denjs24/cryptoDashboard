import { Table, Statistic } from 'antd';
import { useCrypto } from '../context/crypto-context';
import {percentDifference} from '../utilis'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';


export default function AssetsTable(){
    const {assets, crypto, activeCurrency, removeAsset} = useCrypto();

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: (name) => <span><strong>{name}</strong></span>,
      },
      {
        title: `Buy Price, ${activeCurrency.symbol}`,
        dataIndex: 'startPrice',
        sorter: (a, b) => a.startPrice - b.startPrice,
        render: (value) => <span>{(value * activeCurrency.rate).toFixed(2) + " " + activeCurrency.symbol}</span>,
      },
      {
        title: `Price Now, ${activeCurrency.symbol}`,
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        render: (value) => <span>{(value * activeCurrency.rate).toFixed(2) + " " + activeCurrency.symbol}</span>,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        render: (value, item) => <span>{value + " " + item.symbol}</span>,
      },
      {
        title: 'Start Value',
        dataIndex: 'startValue',
        sorter: (a, b) => a.startValue - b.startValue,
        render: (value) => <span>{(value * activeCurrency.rate).toFixed(2) + " " + activeCurrency.symbol}</span>,
      },
      {
        title: 'Value',
        dataIndex: 'value',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.value - b.value,
        render: (value) => <span>{(value * activeCurrency.rate).toFixed(2) + " " + activeCurrency.symbol}</span>,
      },
      {
        title: 'Profit',
        dataIndex: 'growPrice',
        sorter: (a, b) => a.growPrice - b.growPrice,
        render: (value) => <span style={value > 0 ? {color: 'green'} : {color: "red"}}>{(value * activeCurrency.rate).toFixed(2) + " " + activeCurrency.symbol}</span>,
      },
      {
        title: 'Profit Percent',
        dataIndex: 'growPercent',
        sorter: (a, b) => a.growPercent - b.growPercent,
        render: (value, record) => <Statistic
          // title={capitalize(asset.id)}
          value={value}
          precision={2}
          valueStyle={{ color: record.grow ? '#3f8600' : 'red'}}
          prefix={record.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="%"
        />,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (_, record) => (
          <div>
            {/* <button type='button' onClick={() => console.log(record)}>Edit</button>
            <span style={{ margin: '0 8px' }}>|</span> */}
            <button type='button' style={{padding: '5px 10px', background: 'gray', borderRadius: '6px', color: '#fff'}} onClick={() => removeAsset(record.name)}>Delete</button>
          </div>
        ),
      },
    ];
    
    const data = assets.map((a) => ({
        key: a.id,
        symbol: crypto.find((c) => a.id == c.id).symbol,
        name: a.name,
        price: crypto.find((c) => a.id == c.id).price.toFixed(2),
        startPrice: a.price,
        amount: a.amount,
        startValue: +(a.amount * a.price).toFixed(2),
        value: +(a.amount * crypto.find((c) => a.id == c.id).price).toFixed(2),
        growPercent: percentDifference(crypto.find((c) => a.id == c.id).price, a.price),
        growPrice: +(a.amount * crypto.find((c) => a.id == c.id).price - a.amount * a.price).toFixed(2),
        grow: +(a.price) < +(crypto.find((c) => a.id == c.id).price),
    }))

    return(
        <Table columns={columns} pagination={false} dataSource={data} />
    )
}