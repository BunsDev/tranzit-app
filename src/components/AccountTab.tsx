'use client'

import React, { useMemo, useState } from 'react'
import { useAccount } from "wagmi";
import Link from 'next/link';
import classNames from 'classnames';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';
import { accountTabItems } from '@/utils/links';
import { FaRegUserCircle } from "react-icons/fa";

function AccountTab() {
    
    const { isConnected } = useAccount();

    const [accountTabOpened, setAccountTabOpened] = useState(false);

    const router = usePathname();// eslint-disable-next-line react-hooks/exhaustive-deps
    const activeMenu = useMemo(() => (accountTabItems.find((e) => e.label.toLowerCase() === router.split('/')[2])?.id), [router]);
    return (
        <div className='relative'>
            <button className={classNames('p-1 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md relative', {
                ['z-30 bg-slate-100 dark:bg-neutral-800']: accountTabOpened,
            })} onClick={() => setAccountTabOpened(e => !e)}>
                {!isConnected ? <FaRegUserCircle className="w-7 h-7" /> : <div className='w-8 h-8 bg-stone-600 rounded-full bg-no-repeat bg-cover' style={{ backgroundImage: "url(/assets/dummy-image.webp)" }}></div>}
            </button>
            <div className={classNames('relative transition-opacity ease-in-out delay-75 duration-300', {
                ['opacity-100 visible']: accountTabOpened,
                ['opacity-0 invisible']: !accountTabOpened,
            })}>
                <div className={classNames('fixed w-full h-screen z-20 left-0 top-0')} style={{ backgroundColor: "rgba(10,10,10,0.6)" }} onClick={() => setAccountTabOpened(e => !e)}></div>
                <div className='absolute z-20 bg-neutral-100 dark:bg-neutral-800 -right-2 top-3 w-64 shadow-xl border-2 dark:border-neutral-900'>
                    <div className='relative'>
                        <div className='absolute p-2 right-4 -top-2 rotate-45 bg-neutral-100 dark:bg-neutral-800 border-t-2 dark:border-t-neutral-900 border-l-2 dark:border-l-neutral-900'></div>
                        <div className='p-5'>
                            <div className={classNames('mb-8', {
                                ['opacity-100']: accountTabOpened,
                                ['opacity-0']: !accountTabOpened,
                            })}>
                                <ConnectButton accountStatus="address" chainStatus="icon" showBalance={false} />
                            </div>

                            <div className={'[&>*]:mb-4 [&>*]:bg-slate-5 [&>*]:rounded-sm [&>*]:text-md'}>
                                {
                                    accountTabItems.map(({ icon: Icon, ...e }, i) => (
                                        <div key={i} className={classNames("relative after:block after:content-[''] after:absolute after:h-[4px] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left hover:bg-slate-100 dark:hover:bg-neutral-800 hover:font-semibold", {
                                            "font-semibold dark:bg-neutral-800 bg-slate-100 border-b-4": activeMenu === e.id,
                                        },
                                            { [`border-b-fuchsia-700`]: activeMenu === 1 },
                                            { [`border-b-teal-700`]: activeMenu === 2 },
                                            { [`border-b-rose-700`]: activeMenu === 3 },
                                            { [`border-b-blue-700`]: activeMenu === 4 },
                                            { [`border-b-black dark:border-b-white`]: e.id === 5 },
                                            { [`after:bg-fuchsia-700`]: e.id === 1 },
                                            { [`after:bg-teal-700`]: e.id === 2 },
                                            { [`after:bg-rose-700`]: e.id === 3 },
                                            { [`after:bg-blue-700`]: e.id === 4 },
                                            { [`after:bg-black dark:after:bg-white`]: e.id === 5 },
                                        )}>
                                            <Link href={e.link} className=" px-3 py-2 flex">
                                                <Icon className='w-6 h-6 mr-4' />
                                                <div>{e.label}</div>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountTab