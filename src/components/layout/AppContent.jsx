import { Layout, Typography} from 'antd';
// import { useCrypto } from '../../context/crypto-context';
import ListCrypto from '../ListCrypto';
import { Routes, Route } from "react-router-dom";
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
    minHeight: 'calc(100vh - 60px)',
    // lineHeight: '120px',
    color: '#fff',
    background: '#001529',
    padding: '1rem'
};


export default function AppContent(props){
    return (
        
            <Layout.Content style={contentStyle}>
                
                <Routes>
                    <Route path="/" element={<Portfolio />}></Route>
                    <Route path="/listcrypto" element={<ListCrypto />}></Route>
                    <Route path="/swap" element={<Swap />}></Route>
                    <Route path="/currency/:coinName" element={<Currency />}></Route>
                    <Route path="/chainList" element={<ChainList />}></Route>
                    <Route path="/news" element={<News />}></Route>
                    <Route path="/news/:id" element={<NewsPage />}></Route>
                    <Route path="/budget" element={<Budget />}></Route>
                    
                    <Route path="/callback" element={<Callback />}></Route>
                    <Route path="/success" element={<Success />}></Route>

                    <Route path="/profile" element={<Profile />}></Route>

                    <Route path="*" element={<div>Not found page</div>}></Route>
                </Routes>
            </Layout.Content>
    )
}