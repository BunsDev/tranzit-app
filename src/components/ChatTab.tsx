'use client'

import React, { useMemo, useState } from 'react'
import { PiChatTeardropBold } from "react-icons/pi";
import { FaCircle, FaTimes, FaArrowLeft } from "react-icons/fa";
import classNames from 'classnames';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { shortenHexString } from '@/utils/helpers';
import { FiSend } from "react-icons/fi";

function ChatTab() {
    enum Tabs {
        Messages,
        Notifications
    };
    const [chatTabOpened, setChatTabOpened] = useState(false);
    const [activeTab, setActiveTab] = useState(Tabs.Messages);
    const [focusedReceiver, setFocusedReceiver] = useState("")
    const isReceiverFocused = useMemo(() => (focusedReceiver !== ""), [focusedReceiver]);
    const dummyData = [
        {
            address: "0x10Dc6354A36782002B2e323F371F459ea53CfDE3",
            lastMessage: "Hello, how are you",
            timestamp: "3m"
        },
        {
            address: "0x85db92aD7a03727063D58846617C977B3Aaa3036",
            lastMessage: "Gm",
            timestamp: "2h"
        },
        {
            address: "0xc80B282Cc68BF8ee6f70fEc96d1D9f7ab5dc3b3c",
            lastMessage: "Thanks, i've seen it",
            timestamp: "7m"
        },
        {
            address: "0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3",
            lastMessage: "Nice",
            timestamp: "yesterday"
        },
        {
            address: "0x10Dc6354A36782002B2e323F371F459ea53CfDE3",
            lastMessage: "Ok, i'll get to work",
            timestamp: "yesterday"
        },
        {
            address: "0x75873133A7dc9a87aAa4374f59d707F67343502a",
            lastMessage: "Maybe",
            timestamp: "27 Nov"
        }
    ]
    return (
        <div>
            <button className={classNames('p-1 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md relative', {
                ['sm:z-20 bg-slate-100 dark:bg-neutral-800']: chatTabOpened,
            })} onClick={() => setChatTabOpened(e => !e)}>
                <PiChatTeardropBold className='w-7 h-7' />
                <div className='inline-block absolute top-1 right-1'><FaCircle className='w-3 h-3 text-fuchsia-900' /></div>
            </button>

            <div className={classNames('relative transition-opacity ease-in-out delay-75 duration-300', {
                ['opacity-100 visible']: chatTabOpened,
                ['opacity-0 invisible']: !chatTabOpened,
            })}>
                <div className={classNames('fixed w-full h-screen z-10 left-0 top-0')} style={{ backgroundColor: "rgba(10,10,10,0.6)" }}></div>
                <div className='fixed p-5 sm:rounded-md z-10 bg-neutral-100 dark:bg-neutral-800 right-0 sm:right-10 bottom-0 sm:bottom-10 w-full sm:w-96 h-screen sm:h-4/6 overflow-auto shadow-xl border-2 dark:border-neutral-900'>
                    {
                        !isReceiverFocused ?
                            <>
                                <div className='fixed sm:relative w-full bg-neutral-100 dark:bg-neutral-800 left-0 p-5 sm:p-0'>
                                    <div className='flex justify-between items-center mb-6'>
                                        <div className="flex gap-2 items-center">
                                            <PiChatTeardropBold className='w-7 h-7' />
                                            <div className='font-bold text-xl'>Chat</div>
                                        </div>
                                        <button className='p-1 rounded-full bg-slate-100 dark:bg-neutral-700' onClick={() => setChatTabOpened(e => !e)}><FaTimes className='w-6 h-6' /></button>
                                    </div>

                                    <div className='flex gap-5 sm:mb-5'>
                                        <button className={classNames('py-2 px-2 text-xs font-bold', {
                                            ['bg-fuchsia-800 text-neutral-200']: activeTab === Tabs.Messages,
                                            ['dark:text-neutral-200']: activeTab !== Tabs.Messages
                                        })} onClick={() => setActiveTab(Tabs.Messages)}>Messages</button>
                                        <button className={classNames('py-2 px-2 text-xs font-bold', {
                                            ['bg-fuchsia-800 text-neutral-200']: activeTab === Tabs.Notifications,
                                            ['dark:text-neutral-200']: activeTab !== Tabs.Notifications
                                        })} onClick={() => setActiveTab(Tabs.Notifications)}>Notifications</button>
                                    </div>
                                </div>

                                <div className='pt-32 sm:pt-0'>
                                    {
                                        activeTab === Tabs.Messages ?
                                            dummyData.map((e, i) => (
                                                <div key={i} onClick={() => setFocusedReceiver(e.address)} className='cursor-pointer hover:bg-slate-200 dark:hover:bg-neutral-700 rounded-sm hover:p-3 flex justify-between py-4 border-b-2 dark:border-b-neutral-700 mb-1 items-center'>
                                                    <div className="flex gap-3 items-center">
                                                        <Jazzicon diameter={60} seed={jsNumberForAddress(e.address)} />
                                                        <div>
                                                            <div className='text-xs font-bold'>{shortenHexString(e.address)}</div>
                                                            <div style={{ fontSize: '11px' }} className='dark:text-neutral-400 text-neutral-700'>{e.lastMessage}</div>
                                                        </div>
                                                    </div>

                                                    <div style={{ fontSize: '11px' }} className='dark:text-neutral-400 text-neutral-700'>{e.timestamp}</div>
                                                </div>
                                            ))
                                            :
                                            <div>
                                                Notifications
                                            </div>
                                    }
                                </div>
                            </> :
                            <>
                                <div className='fixed sm:relative w-full bg-neutral-100 dark:bg-neutral-800 left-0 p-5 sm:p-0'>
                                    <div className='relative'>
                                        <div className='flex gap-6 items-center mb-6'>
                                            <button className='p-1 rounded-full bg-slate-100 dark:bg-neutral-700' onClick={() => setFocusedReceiver("")}><FaArrowLeft className='w-6 h-6' /></button>
                                            <div className='flex gap-4'>
                                                <Jazzicon diameter={31} seed={jsNumberForAddress(focusedReceiver)} />
                                                <div className='font-bold text-lg'>{shortenHexString(focusedReceiver)}</div>
                                            </div>
                                        </div>

                                        <div className='sm:right-10 bottom-0 sm:bottom-10 w-full sm:w-96 fixed bg-slate-200 dark:bg-slate-900 p-5 h-[calc(100%-100px)] sm:h-[calc(100%-430px)] right-0'>
                                            {/* <div className='h-full w-full bg-red-500'>Hello</div> */}
                                            Hello
                                        </div>

                                        <div className='fixed flex gap-3 right-0 sm:right-10 bottom-0 sm:bottom-10 w-full sm:w-96 h-auto bg-neutral-100 dark:bg-neutral-800 p-5 border-t-2 dark:border-t-neutral-600'>
                                            <textarea className='w-full p-3 text-neutral-300' placeholder='Type message' />
                                            <div>
                                                <button className='p-3 rounded-full bg-teal-800 hover:bg-teal-700 text-neutral-50'><FiSend className='w-5 h-5' /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatTab