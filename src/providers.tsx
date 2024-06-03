'use client'

import React, { useEffect } from 'react'
import { ThemeProvider } from "next-themes"
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
    Chain
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    polygonMumbai,
    sepolia,
    avalancheFuji,
    polygonZkEvm
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { AppProvider } from './contexts/appContext';

// const polygonAmoy = {
//     id: 80002,
//     name: 'Polygon amoy',
//     // iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
//     iconBackground: '#fff',
//     nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
//     rpcUrls: {
//         default: { http: ['https://rpc-amoy.polygon.technology'] },
//         public: {http: [""]}
//     },
//     blockExplorers: {
//         default: { name: 'polygonscan', url: 'https://www.oklink.com/amoy' },
//     },
//     network: ""
// } as const satisfies Chain;

const { chains, publicClient } = configureChains(
    [sepolia, avalancheFuji, polygonZkEvm],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'Tranzit',
    projectId: '4751b8bc2b1340a9ab69bccca9097ea5',
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})

const demoAppInfo = {
    appName: 'Tranzit',
};

function Providers({ children }: {
    children: React.ReactNode
}) {
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
                <AppProvider>
                    <ThemeProvider attribute='class'>{mounted && children}</ThemeProvider>
                </AppProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default Providers