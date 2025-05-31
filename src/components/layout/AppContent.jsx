import { Breadcrumb, Layout, Typography} from 'antd';
// import { useCrypto } from '../../context/crypto-context';
import ListCrypto from '../ListCrypto';
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Portfolio } from '../Portfolio';
import { Currency } from './../Currency';
import { Swap } from './../Swap';
import { ChainList } from '../ChainList';
import { News } from '../News';
import { Budget } from '../Budget';
import { NewsPage } from '../../pages/NewsPage';
import { Profile } from '../../pages/Profile';
import { Callback } from '../../pages/Callback';
import { Success } from '../../pages/Success';

const contentStyle = {
    // textAlign: 'center',
    // lineHeight: '120px',
    color: '#fff',
    background: '#001529',
    padding: '1rem 1rem 3rem',
    flex: '1 1 auto', 
    overflowY: 'auto'

};


export default function AppContent(){
    const location = useLocation()
    const pathname = location.pathname.replace('/', '').split('/').filter(local => local !== "")
    
    return (
        
            <Layout.Content style={contentStyle}>
                {pathname.length > 0
                &&
                <Breadcrumb style={{color: 'white', margin: '0px 0px 15px'}} items={[
                    {
                        title: <NavLink to={'/'}>Home</NavLink>,
                    },
                    ...pathname.map((part, index) => {
                        return{
                            title: pathname.length !== index + 1 ? <NavLink to={"/" + part}>{part.charAt(0).toUpperCase() + part.slice(1)}</NavLink> : part.charAt(0).toUpperCase() + part.slice(1) ,
                        }
                    })
                ]}/>
                }
                
                <Routes>
                    <Route path="/" element={<Portfolio />}></Route>
                    <Route path="/listcrypto" element={<ListCrypto />}></Route>
                    <Route path="/swap" element={<Swap />}></Route>
                    <Route path="/listcrypto/:coinName" element={<Currency />}>
                        <Route element={<div>Not found coin!</div>}></Route>
                    </Route>
                    <Route path="/chainList" element={<ChainList />}></Route>
                    <Route path="/news" element={<News />}></Route>
                    <Route path="/news/:id" element={<NewsPage />}></Route>
                    <Route path="/budget" element={<Budget />}></Route>
                    
                    <Route path="/callback" element={<Callback />}></Route>
                    <Route path="/success" element={<Success />}></Route>

                    <Route path="/profile" element={<Profile />}></Route>

                    <Route path="/*" element={<div>Not found page</div>}></Route>
                </Routes>
            </Layout.Content>
    )
}