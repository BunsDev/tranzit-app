import { createPublicClient, http } from 'viem'
import { polygonMumbai, sepolia, avalancheFuji } from 'viem/chains'
import protocolInfo from "../../../utils/protocol-data";

const mumbaiClient = createPublicClient({
    chain: polygonMumbai,
    transport: http()
})
const sepoliaClient = createPublicClient({
    chain: sepolia,
    transport: http()
})
const fujiClient = createPublicClient({
    chain: avalancheFuji,
    transport: http()
})

export async function POST(req: Request) {
    const body = await req.json();

    const address: string = body.address;
    const network: string = body.network;
    const contractAddress: `0x${string}` = body.token;

    const client = network === "fuji" ? fujiClient : network === "sepolia" ? sepoliaClient : mumbaiClient;
    
    const contractABI = require("../../../utils/abis/ERC20ABI.json");
    const functionName = 'balanceOf';

    try {
        const data = await client.readContract({
            address: contractAddress,
            abi: contractABI,
            functionName: functionName,
            args: [address]
        });

        const resultString = JSON.stringify(data, (key, value) => {
            if (typeof value === 'bigint') {
                return value.toString();
            }
            return value;
        });

        console.log(data);
        return new Response(resultString);  
    } catch (error) {
        console.log(error)
        return new Response("error", {status: 400})
    }

}