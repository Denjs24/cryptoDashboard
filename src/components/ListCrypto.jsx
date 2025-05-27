import { Table, Typography, Pagination, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useCrypto } from '../context/crypto-context';
import { splitNumber } from '../utilis';
import { useCallback, useEffect, useState } from 'react';
import { fakeFetchCrypto } from '../api';
import ReactDocumentTitle from "react-document-title";
import { useNavigation } from '../shared/hooks/useNavigation';
// import CoinInfoModule from './CoinInfoModule';



export default function ListCrypto() {
  const {crypto, lastPage, setLastPage, activeCurrency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [cryptoTable, setCryptoTable] = useState(null);
  const [page, setPage] = useState(lastPage);
  const param = useParams();
  let navigate = useNavigation();
  
  const columns = [
    {
      title: '#',
      dataIndex: 'rank',
      sorter: (a, b) => a.rank - b.rank,
      sortDirections: ['descend'],
    },
    {
      title: 'Наименование',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <Typography.Title level={5} style={{ marginBottom: '0px' }}>{text}</Typography.Title>,
    },
    {
      title: 'Price, $',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (text) => <span>{activeCurrency.symbol} {text}</span>,
    },
    {
      title: '1h %',
      dataIndex: 'hous',
      sorter: (a, b) => a.hous - b.hous,
      render: (text) =>
        <Statistic title={null}
          value={+(text)}
          precision={2}
          contentFontSize={'16px'}
          valueStyle={{ color: +(text) >= 0 ? '#3f8600' : 'red' }}
          prefix={+(text) >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="%">{text} %</Statistic>,
    },
    {
      title: '24h %',
      dataIndex: 'day',
      sorter: (a, b) => a.day - b.day,
      render: (text) => <Statistic title={null}
        value={+(text)}
        precision={2}
        valueStyle={{ color: +(text) >= 0 ? '#3f8600' : 'red' }}
        prefix={+(text) >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix="%">{text} %</Statistic>,
    },
    {
      title: '7d %',
      dataIndex: 'week',
      sorter: (a, b) => a.week - b.week,
      render: (text) => <Statistic title={null}
        value={+(text)}
        precision={2}
        valueStyle={{ color: +(text) >= 0 ? '#3f8600' : 'red' }}
        prefix={+(text) >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix="%">{text} %</Statistic>,
    },
    {
      title: 'Рыночная капитализация',
      dataIndex: 'marketCap',
      sorter: (a, b) => a.marketCap - b.marketCap,
      render: (text) => <span>{activeCurrency.symbol} {splitNumber(+text)}</span>,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        let result = await fakeFetchCrypto(page, 30)
        setCryptoTable(result);
      } catch (error) {
        console.log(error);
        
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);
  
  // async function updPage(pageId){
  //   let {result} = await fakeFetchCrypto(pageId)
  //   setCryptoTable(result);   
  // }

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     updPage(page);
  //   }, 5000); 

  //   // Очистка интервала при размонтировании компонента
  //   return () => clearInterval(intervalId);
  // }, []);

  async function changePage(e) {
    let result = await fakeFetchCrypto(e)
    setCryptoTable(result);
    setLastPage(e);
    setPage(e);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }  

  const modalCreator = useCallback((record, rowIndex) => {
    // changeNamePageCrypto(record.name)
    
    navigate.to(`/currency/${record.id}`);
  }, []);

  if (loading || !cryptoTable) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  const data = cryptoTable.map((c) => ({
      key: c.rank,
      rank: c.rank,
      name: c.name,
      price: c.price * activeCurrency.rate < 0.01 ? c.price * activeCurrency.rate  : (c.price * activeCurrency.rate).toFixed(2),
      hous: (activeCurrency.rate * c.priceChange1h).toFixed(2),
      day: (activeCurrency.rate * c.priceChange1d).toFixed(2),
      week: (activeCurrency.rate * c.priceChange1w).toFixed(2),
      marketCap: (activeCurrency.rate * c.marketCap).toFixed(0),
      id: c.id,
  }))
  
  return (
    <ReactDocumentTitle title="List crypto">
      <>
      <Typography.Title level={2} style={{ color: '#fff', marginTop: '0rem' }}>Список Криптовалют</Typography.Title>
      <Table columns={columns} pagination={false} dataSource={data}  style={{ marginTop: '1rem' }} className='tableList' onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {modalCreator(record, rowIndex)}, // click row
        };
      }}/>
    <Pagination defaultCurrent={page} total={60} onChange={changePage}/>
      {/* <Modal open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModule coin={coin} />
      </Modal> */}
      </>
    </ReactDocumentTitle>
  )
}