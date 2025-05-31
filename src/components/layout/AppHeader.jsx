import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import CryptoContext, { useCrypto } from '../../context/crypto-context';
import AddAssetForm from '../AddAssetForm';
import CoinInfoModule from '../CoinInfoModule';
import { FaUser } from "react-icons/fa";
import { HeaderSearch } from '../HeaderSearch';
import { Bounce, ToastContainer } from 'react-toastify';

const headerStyle = {
    textAlign: 'center',
    width: '100%',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // background: 'transparent'
};




export default function AppHeader(){
    const {currency, activeCurrency, changeCurrency} = useContext(CryptoContext)
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const [drawer, setDrawer] = useState(false)
    const { crypto } = useCrypto();

    const {open, close} = useWeb3Modal();
    const { disconnect } = useDisconnect()
    const { address, isConnected, isDisconnected } = useAccount()


    // useEffect(() => {
    //     const keypress = event =>{
    //         if (event.key == '/') {
    //             setSelect(!select)
    //         }
    //     }
    //     document.addEventListener('keypress', keypress)
    //     return () => document.removeEventListener('keypress', keypress)
    // }, [])

    const handleSelect = (value) => {
        setCoin(crypto.find(c => c.id === value))
        setModal(true);
    };

    const handleChangeCurrency = (value, item) => {      
        changeCurrency(item)
    };


    return (
      <Layout.Header style={headerStyle}>
        {/* <nav className="header-nav">
          <ul className="header-nav__list">
            <li className="header-nav__item">
              <NavLink
                to={"/"}
                className={(navData) =>
                  navData.isActive
                    ? "header-nav__link _active"
                    : "header-nav__link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="header-nav__item">
              <NavLink
                to={"/listcrypto"}
                className={(navData) =>
                  navData.isActive
                    ? "header-nav__link _active"
                    : "header-nav__link"
                }
              >
                Crypto list
              </NavLink>
            </li>
            <li className="header-nav__item">
              <NavLink
                to={"/swap"}
                className={(navData) =>
                  navData.isActive
                    ? "header-nav__link _active"
                    : "header-nav__link"
                }
              >
                Swap
              </NavLink>
            </li>
            <li className="header-nav__item">
              <NavLink
                to={"/chainList"}
                className={(navData) =>
                  navData.isActive
                    ? "header-nav__link _active"
                    : "header-nav__link"
                }
              >
                Chain List
              </NavLink>
            </li>
            <li className="header-nav__item">
              <NavLink
                to={"/news"}
                className={(navData) =>
                  navData.isActive
                    ? "header-nav__link _active"
                    : "header-nav__link"
                }
              >
                News
              </NavLink>
            </li>
            <li className="header-nav__item">
              <NavLink
                to={"/budget"}
                className={(navData) =>
                  navData.isActive
                    ? "header-nav__link _active"
                    : "header-nav__link"
                }
              >
                Budget
              </NavLink>
            </li>
            <li className="header-nav__item">
              <NavLink
                to={"/callback"}
                className={(navData) =>
                  navData.isActive
                    ? "header-nav__link _active"
                    : "header-nav__link"
                }
              >
                Callback
              </NavLink>
            </li>
          </ul>
        </nav> */}
        
        <HeaderSearch />
        
        <div className="header-actions">
          <Select
            style={{
              width: "100px",
            }}
            // open={select}
            // onClick={() => setSelect((prev) => !prev)}
            placeholder="Currency"
            optionLabelProp="label"
            onSelect={handleChangeCurrency}
            options={currency.map((curr) => ({
              value: curr.name,
              name: curr.name,
              rate: curr.rate,
              symbol: curr.symbol,
              imageUrl: curr.imageUrl,
            }))}
            defaultValue={activeCurrency.name}
            optionRender={(option) => (
              <Space>
                <img width="20px" src={option.data.imageUrl} />
                {option.data.name}
              </Space>
            )}
          />
          <Button type="primary" onClick={() => setDrawer(true)}>
            Add Asset
          </Button>
          {/* <w3m-network-button /> */}
          {/* <w3m-button /> */}
          {isConnected ? <button type="button" onClick={() => disconnect()} style={{color: '#fff', fontWeight: '600', fontSize: '18px'}}>Disconnect Wallet</button> : <button type="button" onClick={() => open()} style={{color: '#fff', fontWeight: '600', fontSize: '18px'}}>Connect Wallet</button>}
          {isConnected && <Link to={"/profile"} className="header-nav__link" style={{display: 'flex', alignItems: 'center', columnGap: '10px'}}> <FaUser /> Proile</Link>}
          
        </div>

        <Modal
          open={modal}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
          footer={null}
        >
          <CoinInfoModule coin={coin} />
        </Modal>

        <Drawer
          width="600px"
          title="Basic Drawer"
          onClose={() => setDrawer(false)}
          open={drawer}
          destroyOnClose
        >
          <AddAssetForm onClose={() => setDrawer(false)} />
        </Drawer>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </Layout.Header>
    );
}