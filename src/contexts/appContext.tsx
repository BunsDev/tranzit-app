'use client'

import React, { createContext, useEffect, useState } from 'react'
import { useAccount } from "wagmi";
import axios from 'axios';

const AppContext = createContext({})

export function AppProvider({ children }: {
    children: React.ReactNode
}) {

    const { isConnected, address } = useAccount();
    const [isFetchingErc20Balances, setIsFetchingErc20Balances] = useState(true);
    const [erc20Balances, setErc20Balances] = useState([]);
    const [lastestItem, setLatestItem] = useState("");

    useEffect(() => {
        if (isConnected) {
            getErc20Balances();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected])

    async function getErc20Balances() {
        setIsFetchingErc20Balances(true);
        try {
            const resp = await axios.post<string>(`/api/balances`, {
                "address": address,
                "network": "mumbai",
                "token": "0xb1083B50f04Cdb64005e169407EAb23466223777"
            });
            console.log(resp.data)
            setIsFetchingErc20Balances(false);
        } catch (error) {
            setIsFetchingErc20Balances(false);
            // console.log("error enco")
        }
    }

    return (
        <AppContext.Provider value={{ erc20Balances, isFetchingErc20Balances, lastestItem, setLatestItem }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;