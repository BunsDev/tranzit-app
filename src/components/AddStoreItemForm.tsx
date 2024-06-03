'use client'


import React, { useState } from 'react'
import { readContract, getNetwork, getAccount } from '@wagmi/core'
import { usePrepareContractWrite, useContractWrite, useWalletClient } from 'wagmi'

import { parseEther } from 'viem'
import { getPoolInfo, getProtocolAddresses } from '@/utils/protocol-data'
import TranzitPayABI from '@/utils/abis/TranzitPay.json'

type Form = {
    price?: string,
    pool?: string,
    paymentType?: string
}

function AddStoreItemForm({ storeAddress, itemTokenUri }: { storeAddress: string, itemTokenUri: string }) {
    const [form, setForm] = useState<Form | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const { chain } = getNetwork();
    const { address } = getAccount();

    const { data: client } = useWalletClient();


    // const { config:addItemConfig } = usePrepareContractWrite({
    //     address: "0xF39cC9C3A28247E75147CC502F711e31Ce8CdD4F",
    //     abi: TranzitPayABI,
    //     functionName: 'addItem',
    //     args: [storeAddress, itemTokenUri, parseEther("10"), "222222", "1"],
    // })

    // const { data, write:addItemWrite } = useContractWrite(addItemConfig);

    // write;

    async function handleAddItem() {
        setIsRunning(true);
        try {

            const poolInfo = getPoolInfo(`${chain?.id}`, form?.pool);
            const protocolInfo = getProtocolAddresses(`${chain?.id}`);

            if (poolInfo === null || protocolInfo === null) {
                throw Error("invalid pool");
            }

            // write && write();
            const hash = await client?.writeContract({
                address: protocolInfo.TranzitPay as `0xstring`,
                abi: TranzitPayABI,
                functionName: 'addItem',
                args: [storeAddress, itemTokenUri, parseEther(form?.price as string), poolInfo.poolId, form?.paymentType],
            })

            // const allowance = await readContract({
            //     address: poolInfo.token_address as `0x${string}`,
            //     abi: ERC20ABI,
            //     functionName: 'allowance',
            //     args: [address, protocolInfo?.TranzitPay]
            // })
            console.log(hash);
            setIsRunning(false);
            alert("Item added succesfully")
        } catch (error) {
            setIsRunning(false);
            alert("Error while adding item")
            console.log(error);
        }
    }

    return (
        <>
            <div className=' text-sm flex justify-between mb-3'>
                <div className='text-slate-800 dark:text-neutral-400 break-words overflow-auto'>Store Address: {storeAddress}</div>
            </div>
            <div className=' text-sm flex justify-between mb-6'>
                <div className='text-slate-800 dark:text-neutral-400 break-words overflow-auto'>Item token URI: {itemTokenUri}</div>
            </div>


            <div className=' text-sm flex justify-between mb-3'>
                <div className='text-slate-800 dark:text-neutral-400'>Price</div>
            </div>
            <div className='flex bg-slate-100 dark:bg-neutral-800 gap-5 mb-6'>
                <input type="text" placeholder='0.0' className='w-full bg-slate-300 dark:bg-neutral-900 outline-none p-3' onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            </div>


            <div className=' text-sm flex justify-between mb-3'>
                <div className='text-slate-800 dark:text-neutral-400'>Payment type</div>
            </div>
            <div className='flex bg-slate-100 dark:bg-neutral-800 gap-5 mb-6'>
                <select placeholder='Select' className='w-full bg-slate-300 dark:bg-neutral-900 outline-none p-3' onChange={(e) => setForm((f) => ({ ...f, paymentType: e.target.value }))}>
                    <option value="">SELECT</option>
                    <option value="0">FREE</option>
                    <option value="1">ONEOFF</option>
                    <option value="2">MONTHLY</option>
                    <option value="3">YEARLY</option>
                </select>
            </div>


            <div className=' text-sm flex justify-between mb-3'>
                <div className='text-slate-800 dark:text-neutral-400'>Currency</div>
            </div>
            <div className='flex bg-slate-100 dark:bg-neutral-800 gap-5 mb-10'>
                <select placeholder='Select' className='w-full bg-slate-300 dark:bg-neutral-900 outline-none p-3' onChange={(e) => setForm((f) => ({ ...f, pool: e.target.value }))}>
                    <option value="">SELECT</option>
                    <option value="usdt">
                        USDT
                    </option>
                    <option value="usdc">
                        USDC
                    </option>
                    <option value="dai">
                        DAI
                    </option>
                </select>
            </div>

            <button className='w-full p-3 dark:bg-neutral-300 bg-slate-700 dark:text-neutral-900 text-neutral-100' onClick={() => handleAddItem()} disabled={!form || isRunning || !form.price || !form.pool || !form.paymentType}>{isRunning ? "..." : "Add Item"}</button>
        </>
    )
}

export default AddStoreItemForm