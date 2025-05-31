import { Layout , Card , Statistic , List, Typography, Spin, Tag, Menu } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import {capitalize} from '../../utilis'
import CryptoContext from '../../context/crypto-context';
import { useNavigation } from '../../shared/hooks/useNavigation';
import { NavLink, useLocation } from 'react-router-dom';

const items = [
  { key: "/", label: 'Home', },
  { key: "/listcrypto", label: 'Crypto list' },
  { key: "/swap", label: 'Swap' },
  { key: '/chainList', label: 'Chain List'},
  { key: '/news', label: 'News'},
  { key: '/budget', label: 'Budget'},
  { key: '/callback', label: 'Callback'},
];

export default function AppSider(){
    const navigation = useNavigation();
    const location = useLocation()
    

    const {loading, assets} = useContext(CryptoContext)

    if (loading) {
        return <Spin fullscreen />
    }
    
    // const handleClick = ({item}) => {
    //     // console.log(item.props.path);
    //     navigation.to(item.props.path)   
    // }
    

    return (
        // <Layout.Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={(broken) => console.log(broken)} onCollapse={(collapsed, type) => console.log(collapsed, type)}>
        //     {assets.length !== 0 && <h2 style={{marginBottom: '5px'}}>My favorite {assets.length < 2 ? 'asset' : 'assets'} </h2>}
        //     {assets.map((asset, i) => i < 4 ? (
        //         <Card key={asset.id} style={{marginBottom: '1rem'}}>
        //             <Statistic
        //                 title={capitalize(asset.id)}
        //                 value={asset.totalAmount}
        //                 precision={2}
        //                 // valueStyle={{ color: asset.grow ? '#3f8600' : 'red'}}
        //                 // prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        //                 suffix="$"
        //             />
        //             <List
        //                 size='small'
        //                 bordered
        //                 dataSource={[
        //                     {title: "Total profit", value: asset.totalProfit, withTag: true},
        //                     {title: "Total Amount", value: asset.amount, isPlain: true},
        //                     // {title: "Difference", value: asset.growPercent},
        //                 ]}
        //                 renderItem={(item) => (
        //                     <List.Item>
        //                         <span>{item.title}</span>
        //                         <span>
        //                             {item.withTag && (
        //                                 <Tag color={asset.grow ? 'green' : 'red'}>
        //                                     {asset.growPercent}%
        //                                 </Tag>
        //                             )}
        //                             {item.isPlain && item.value}
        //                             {!item.isPlain && (
        //                                 <Typography.Text type={asset.grow ? 'success' : 'danger'}>
        //                                     {+(item.value).toFixed(2)}$
        //                                 </Typography.Text>
        //                             )}
        //                         </span>
                                
        //                     </List.Item>
        //                 )}
        //             />
        //         </Card>
        //     ) : null)}
        // </Layout.Sider>
        <div style={{flex: '0 0 270px', padding: '24px 16px', background: 'rgba(225, 225, 225, 0.15)', borderRadius: '16px'}}>
            {items.length > 0 
                && 
            <ul className="flex flex-col gap-y-2">
                {items.map(itemNav => <li key={itemNav.label} className="header-nav__item">
                    <NavLink
                        to={itemNav.key}
                        className={(navData) =>
                        navData.isActive
                            ? "rounded-lg text-white font-bold text-lg flex py-2 px-4 bg-blue-500"
                            : "rounded-lg text-white font-bold text-lg flex py-2 px-4"
                        }>
                        {itemNav.label}
                    </NavLink>
                </li>)}
            </ul>}
            
            {/* <Menu
                defaultSelectedKeys={[items.find(item => item.path === location.pathname)?.key || undefined]}
                mode="inline"
                theme="dark"
                // inlineCollapsed={collapsed}
                
                // items={items.map(itemBlock => {
                //     return {...itemBlock, isActive: navigation.isActive(itemBlock.path)}
                // })}
                items={items}
                onSelect={handleClick}
            /> */}
        </div>
    )
}