import './App.css'
import {CryptoContextProvider} from './context/crypto-context'
import AppLayout from './components/layout/AppLayout'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { scroll, zkSync, mainnet } from 'viem/chains'
import { BrowserRouter } from 'react-router-dom'

const projectId = '2a2a5978a58aad734d13a2d194ec469a'

const chains = [mainnet, zkSync, scroll];

const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  metadata: {
    name: 'test',
  }
})

createWeb3Modal({
  chains,
  projectId,
  wagmiConfig,
  enableAnalytics: true,
  connectorImages: {
    coinbaseWallet: 'https://images.mydapp.com/coinbase.png',
    metamask: 'https://images.mydapp.com/metamask.png'
  }
})


export default function App() {
  return (
    <CryptoContextProvider>
        <WagmiConfig config={wagmiConfig}>
          <AppLayout />
        </WagmiConfig>
    </CryptoContextProvider>
  )
}
