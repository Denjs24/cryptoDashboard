import { useContext } from 'react';
import {Layout, Spin} from 'antd';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';
import CryptoContext from '../../context/crypto-context';
import { BrowserRouter } from 'react-router-dom';


export default function AppLayout(){
    const {loading, crypto} = useContext(CryptoContext)


    if (loading || !crypto) {
        return <Spin fullscreen/>
    }
    return (
        <BrowserRouter>
            <Layout>
                <AppHeader />
                <Layout >
                    <AppSider />
                    <AppContent text="Hello world"/>
                </Layout>
            </Layout>
            {/* <Layout>
                <AppSider />
                <Layout>
                    <AppHeader style={{ padding: 0}} />
                    <AppContent style={{ margin: '24px 16px 0' }} />
                </Layout>
            </Layout> */}
        </BrowserRouter>
    )
}