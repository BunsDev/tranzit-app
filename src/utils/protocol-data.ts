
export function getPoolInfo(chainId: string, token: string | undefined) {
    if (chainId === "11155111" && token === "usdt") {
        return {
            poolId: 222222,
            token_address: "0xD2F2F9680C94177c5a2cC3c5bc5c33d24bC33c57",
            supply_token_address: "0x7b171a0f0E075a220265cb3Aa36FdE150cde9154"
        };
    }

    if (chainId === "80001" && token === "usdt") {
        return {
            poolId: 111111,
            token_address: "0x35EE288d7CD66C272d620cB31eA7FB0fc7101BD5",
            supply_token_address: "0xb1083B50f04Cdb64005e169407EAb23466223777"
        };
    }

    return null;
}

export function getProtocolAddresses(chainId: string) {
    if (chainId === "11155111") {
        return {
            router: "0x12D783173e64Da89A24D916d86217FF0cBEe680C",
            TranzitPay: "0xF39cC9C3A28247E75147CC502F711e31Ce8CdD4F",
        }
    }
    
    if (chainId === "80001") {
        return {
            router: "0x2c6b298c148A4DB392f7569a50919508d38752BE",
            TranzitPay: "0x9407CAd400B89B66e8712Df779aaDb6994D482D3",
        }
    }

    return null;
}