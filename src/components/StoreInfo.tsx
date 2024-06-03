'use client'

import React, { useState } from 'react'
import { FaStore } from 'react-icons/fa'
import AddItemButton from './AddItemButton'
import { PiVideo } from 'react-icons/pi'

function StoreInfo() {
    const storeAddress = "0xc67Fe28Ab8F06Cc03892DfDD09f49fffb2f61A8a";
    return (
        <>
        <div className='mb-20'>
            <div className="flex justify-between mb-8 items-center">
                <div className="flex gap-3">
                    <FaStore className="w-5 h-5" />
                    <div className='font-bold text-sm'>
                        Relax playlist
                    </div>
                </div>
                <AddItemButton storeAddress={storeAddress} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-5 gap-5'>
                <div className='w-100 cursor-pointer'>
                    <div className='w-100 px-5 py-10 bg-pink-700 mb-2 hover:bg-pink-900'>
                        <PiVideo className="w-8 h-8" />
                    </div>
                    <div className='text-xs'>cool jam.mp4</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default StoreInfo