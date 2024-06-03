'use client'

import { shortenWord } from '@/utils/helpers';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { useContractWrite } from 'wagmi'
import ABI from "../utils/abis/TranzitTest.json";
import ERC20 from "../utils/abis/ERC20ABI.json";
import { parseEther } from 'ethers/lib/utils';

function BridgeForm() {

    const [activeFromToken, setActiveFromToken] = useState("usdc")
    const [activeFromNetwork, setActiveFromNetwork] = useState("ethereum")
    const [fromSelectTab, setFromSelectTab] = useState("");

    const [activeToNetwork, setActiveToNetwork] = useState("polygon")
    const [toSelectTab, setToSelectTab] = useState("");

    const [amount, setAmount] = useState("");

    // const toast

    const handleYouGetValue = useMemo(() => {
        if (amount === "") {
            return 0;
        } else {
            return parseInt(amount);
        }
        // else if (parseInt(amount) <= 5) {
        //     return 0;
        // } else {
        //     return parseInt(amount) - 5;
        // }
    }, [amount]);

    const { data: dataApprove, isLoading: isLoadingApprove, isSuccess: isSuccessApprove, write: writeApprove } = useContractWrite({
        address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        abi: ERC20,
        functionName: 'approve',
        args: ["0xc80B282Cc68BF8ee6f70fEc96d1D9f7ab5dc3b3c", 1000000]
    });

    const { data: dataBoard, isLoading: isLoadingBoard, isSuccess: isSuccessBoard, write: writeBoard } = useContractWrite({
        address: '0x09D0893B04750314344EeC524b0A88e7e85480Fe',
        abi: ABI,
        functionName: 'board',
    });

    async function runBoard() {
        writeApprove();
    }
    
    useEffect(() => {
        if (!isLoadingApprove && isSuccessApprove && dataApprove) {
            writeBoard();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataApprove, isLoadingApprove, isSuccessApprove])

    return (
        <div>
            <div className='mb-3 text-sm text-slate-500 dark:text-neutral-500'>From</div>
            <div className='flex bg-slate-100 dark:bg-neutral-800 gap-5 mb-7'>
                <div className='sm:w-2/3 w-1/2 px-3 py-2 border-r-2 border-slate-200 dark:border-neutral-700 cursor-pointer' onClick={() => setFromSelectTab((e) => e === "token" ? "" : "token")}>
                    <div className='text-sm mb-1 text-slate-600 dark:text-neutral-400'>Token</div>
                    <div className="flex justify-between items-center py-2">
                        <div className="flex gap-2">
                            <Image className='w-5' width={20} height={20} src={`/assets/icons/${activeFromToken}.svg`} alt="usdt" />
                            <div>{`${activeFromToken}`.toUpperCase()}</div>
                        </div>
                        <FaAngleDown className="w-4 h-4" />
                    </div>
                </div>
                <div className='sm:w-1/3 w-1/2 pr-2 py-2' onClick={() => setFromSelectTab((e) => e === "network" ? "" : "network")}>
                    <div className='text-sm mb-1 text-slate-600 dark:text-neutral-400'>Network</div>
                    <div className="flex justify-between items-center py-2 cursor-pointer">
                        <div className="flex gap-2">
                            <Image className='w-5' width={20} height={20} src={`/assets/icons/${activeFromNetwork}.svg`} alt="usdt" />
                            <div>{shortenWord(`${activeFromNetwork}`.toUpperCase(), 6)}</div>
                        </div>
                        <FaAngleDown className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div className={classNames('relative w-full', {
                'block': fromSelectTab === "token",
                'hidden': fromSelectTab !== "token"
            })}>
                <div className='absolute w-full z-10 -top-7 bg-slate-100 dark:bg-neutral-800'>
                    <div className='text-xs px-3 py-2'>Select token</div>
                    <div className='flex justify-between items-center cursor-pointer' onClick={() => { setActiveFromToken("usdc"); setFromSelectTab(""); }}>
                        <div className='flex p-3 gap-2'>
                            <Image className='w-5' width={20} height={20} src="/assets/icons/usdc.svg" alt="usdc" />
                            <div className='text-sm'>USDC</div>
                        </div>
                        <div className='p-3'>
                            {activeFromToken == "usdc" && <FaCheck className="w-3 h-3 text-green-600" />}
                        </div>
                    </div>
                    <div className='flex justify-between items-center cursor-pointer' onClick={() => { setActiveFromToken("CCIP-BnM"); setFromSelectTab(""); }}>
                        <div className='flex p-3 gap-2'>
                            <Image className='w-5' width={20} height={20} src="/assets/icons/dai.svg" alt="CCIP-BnM" />
                            <div className='text-sm'>CCIP BnM</div>
                        </div>
                        <div className='p-3'>
                            {activeFromToken == "CCIP-BnM" && <FaCheck className="w-3 h-3 text-green-600" />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames('relative w-full', {
                'block': fromSelectTab === "network",
                'hidden': fromSelectTab !== "network"
            })}>
                <div className='absolute w-full z-10 -top-7 bg-slate-100 dark:bg-neutral-800'>
                    <div className='text-xs px-3 py-2'>Select network</div>
                    <div className='flex justify-between items-center cursor-pointer' onClick={() => { setActiveFromNetwork("ethereum"); setFromSelectTab(""); }}>
                        <div className='flex p-3 gap-2'>
                            <Image className='w-5' width={20} height={20} src="/assets/icons/ethereum.svg" alt="ethereum" />
                            <div className='text-sm'>ETHREUM SEPOLIA</div>
                        </div>
                        <div className='p-3'>
                            {activeFromNetwork == "ethereum" && <FaCheck className="w-3 h-3 text-green-600" />}
                        </div>
                    </div>
                    <div className='flex justify-between items-center cursor-pointer' onClick={() => { setActiveFromNetwork("polygon"); setFromSelectTab(""); }}>
                        <div className='flex p-3 gap-2'>
                            <Image className='w-5' width={20} height={20} src="/assets/icons/polygon.svg" alt="polygon" />
                            <div className='text-sm'>POLGON AMOY</div>
                        </div>
                        <div className='p-3'>
                            {activeFromNetwork == "polygon" && <FaCheck className="w-3 h-3 text-green-600" />}
                        </div>
                    </div>
                    {/* <div className='flex justify-between items-center cursor-pointer' onClick={() => { setActiveFromNetwork("mode"); setFromSelectTab(""); }}>
                        <div className='flex p-3 gap-2'>
                            <Image className='w-5' width={20} height={20} src="/assets/icons/mode.png" alt="mode" />
                            <div className='text-sm'>MODE TESTNET</div>
                        </div>
                        <div className='p-3'>
                            {activeFromNetwork == "mode" && <FaCheck className="w-3 h-3 text-green-600" />}
                        </div>
                    </div> */}
                </div>
            </div>




            <div className='mb-3 text-sm text-slate-500 dark:text-neutral-500'>To</div>
            <div className='flex bg-slate-100 dark:bg-neutral-800 gap-5 mb-7'>
                <div className='sm:w-2/3 w-1/2 px-3 py-2 border-r-2 border-slate-200 dark:border-neutral-700 cursor-pointer' onClick={() => setToSelectTab("")}>
                    <div className='text-sm mb-1 text-slate-600 dark:text-neutral-400'>Token</div>
                    <div className="flex justify-between items-center py-2">
                        <div className="flex gap-2">
                            <Image className='w-5' width={20} height={20} src={`/assets/icons/${activeFromToken}.svg`} alt="usdt" />
                            <div>{`${activeFromToken}`.toUpperCase()}</div>
                        </div>
                        {/* <FaAngleDown className="w-4 h-4" /> */}
                    </div>
                </div>
                <div className='sm:w-1/3 w-1/2 pr-2 py-2' onClick={() => setToSelectTab((e) => e === "network" ? "" : "network")}>
                    <div className='text-sm mb-1 text-slate-600 dark:text-neutral-400'>Network</div>
                    <div className="flex justify-between items-center py-2 cursor-pointer">
                        <div className="flex gap-2">
                            <Image className='w-5' width={20} height={20} src={`/assets/icons/${activeToNetwork}.svg`} alt="usdt" />
                            <div>{shortenWord(`${activeToNetwork}`.toUpperCase(), 6)}</div>
                        </div>
                        <FaAngleDown className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className={classNames('relative w-full', {
                'block': toSelectTab === "network",
                'hidden': toSelectTab !== "network"
            })}>
                <div className='absolute w-full -top-7 z-10 bg-slate-100 dark:bg-neutral-800'>
                    <div className='text-xs px-3 py-2'>Select network</div>
                    <div className='flex justify-between items-center cursor-pointer' onClick={() => { setActiveToNetwork("ethereum"); setToSelectTab(""); }}>
                        <div className='flex p-3 gap-2'>
                            <Image className='w-5' width={20} height={20} src="/assets/icons/ethereum.svg" alt="ethereum" />
                            <div className='text-sm'>ETHREUM SEPOLIA</div>
                        </div>
                        <div className='p-3'>
                            {activeToNetwork == "ethereum" && <FaCheck className="w-3 h-3 text-green-600" />}
                        </div>
                    </div>
                    <div className='flex justify-between items-center cursor-pointer' onClick={() => { setActiveToNetwork("polygon"); setToSelectTab(""); }}>
                        <div className='flex p-3 gap-2'>
                            <Image className='w-5' width={20} height={20} src="/assets/icons/polygon.svg" alt="polygon" />
                            <div className='text-sm'>POLGON AMOY</div>
                        </div>
                        <div className='p-3'>
                            {activeToNetwork == "polygon" && <FaCheck className="w-3 h-3 text-green-600" />}
                        </div>
                    </div>
                    {/* <div className='flex justify-between items-center cursor-pointer' onClick={() => { setActiveToNetwork("mode"); setToSelectTab(""); }}>
                        <div className='flex p-3 gap-2'>
                            <Image className='w-5' width={20} height={20} src="/assets/icons/mode.png" alt="mode" />
                            <div className='text-sm'>MODE TESTNET</div>
                        </div>
                        <div className='p-3'>
                            {activeToNetwork == "mode" && <FaCheck className="w-3 h-3 text-green-600" />}
                        </div>
                    </div> */}
                </div>
            </div>



            <div className='mb-3 text-sm flex justify-between'>
                <div className='text-slate-500 dark:text-neutral-500'>Amount</div>
                {amount !== "" && <div className='text-slate-700 dark:text-neutral-300'>You get: {handleYouGetValue} {`${activeFromToken}`.toUpperCase()}</div>}
            </div>
            <div className='flex bg-slate-100 dark:bg-neutral-800 gap-5 mb-3 px-3 py-4'>
                <input type="text" className='w-full bg-slate-100 dark:bg-neutral-800 outline-none' onChange={(e) => setAmount(e.target.value)} placeholder='0.0' />
            </div>
            <div className='mb-14 flex justify-end'>
                <div className='text-xs text-slate-700 dark:text-neutral-300'>
                    <div>Fee: 0 {`${activeFromToken}`.toUpperCase()}</div>
                    <div>Duration: 30mins</div>
                </div>
            </div>


            <button className='w-full p-3 dark:bg-neutral-300 bg-slate-700 dark:text-neutral-900 text-neutral-100' onClick={() => runBoard()} disabled={isLoadingApprove || isLoadingBoard}>Send Bridge</button>


        </div>
    )
}

export default BridgeForm