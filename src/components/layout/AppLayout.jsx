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
            {/* <Layout>
                <AppHeader />
                <Layout >
                    <AppSider />
                    <AppContent />
                </Layout>
            </Layout> */}
            <Layout style={{flexDirection: 'row', maxHeight: '100dvh', overflow: 'hidden', padding: '24px', columnGap: '24px', minHeight: '500px'}}>
                <AppSider />
                <Layout style={{maxHeight: '100%', overflow: 'hidden', height: '100vh', }}>
                    <AppHeader style={{ padding: 0, position: 'sticky', top: '0px'}} />
                    <AppContent />
                </Layout>
            </Layout>
        </BrowserRouter>
    )
}