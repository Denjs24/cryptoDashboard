import { Layout , Card , Statistic , List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import {capitalize} from '../../utilis'
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    padding: "1rem",
};

export default function AppSider(){

    const {loading, assets} = useContext(CryptoContext)

    if (loading) {
        return <Spin fullscreen />
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.length !== 0 && <h2 style={{marginBottom: '5px'}}>My favorite {assets.length < 2 ? 'asset' : 'assets'} </h2>}
            {assets.map((asset, i) => i < 4 ? (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        // valueStyle={{ color: asset.grow ? '#3f8600' : 'red'}}
                        // prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size='small'
                        bordered
                        dataSource={[
                            {title: "Total profit", value: asset.totalProfit, withTag: true},
                            {title: "Total Amount", value: asset.amount, isPlain: true},
                            // {title: "Difference", value: asset.growPercent},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && (
                                        <Tag color={asset.grow ? 'green' : 'red'}>
                                            {asset.growPercent}%
                                        </Tag>
                                    )}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && (
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {+(item.value).toFixed(2)}$
                                        </Typography.Text>
                                    )}
                                </span>
                                
                            </List.Item>
                        )}
                    />
                </Card>
            ) : null)}
        </Layout.Sider>
        // <div style={{ width: 256 }}>
        //     <Menu
        //         defaultSelectedKeys={['1']}
        //         defaultOpenKeys={['sub1']}
        //         mode="inline"
        //         theme="dark"
        //         inlineCollapsed={collapsed}
        //         items={items}
        //     />
        // </div>
    )
}