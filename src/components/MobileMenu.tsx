'use client'
import React, { useMemo, useState } from 'react'
import { menuItems } from '@/utils/links';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { LuMenuSquare } from "react-icons/lu";
import ThemeButton from './ThemeButton';
import Link from 'next/link';
// import { TiThMenuOutline } from "react-icons/ti";

function MobileMenu() {

    const [menuOpened, setMenuOpened] = useState(false);
    const router = usePathname();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeMenu = useMemo(() => (menuItems.find((e) => e.label.toLowerCase() === router.split('/')[2])?.id), [router]);

    return (
        <div>
            <button className={classNames('p-1 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-md relative', {
                ['sm:z-20 bg-slate-100 dark:bg-neutral-800']: menuOpened,
            })} onClick={() => setMenuOpened(e => !e)}>
                <LuMenuSquare className='w-7 h-7' />
            </button>

            <div className={classNames('relative transition-opacity ease-in-out delay-75 duration-300', {
                ['opacity-100 visible']: menuOpened,
                ['opacity-0 invisible']: !menuOpened,
            })}>
                <div className={classNames('fixed w-full h-screen z-10 left-0 top-0')} style={{ backgroundColor: "rgba(10,10,10,0.6)" }} onClick={() => setMenuOpened(e => !e)}></div>
                <div className='fixed z-20 h-screen w-72 p-10 border-r-2 dark:border-r-neutral-600 bg-neutral-100 dark:bg-neutral-900 top-0 left-0'>
                    <div className='flex justify-between mb-32'>
                        <div className='font-bold text-xl'>Tranzit</div>
                        <ThemeButton />
                    </div>

                    {/* menu */}
                    <div className={'[&>*]:mb-4 [&>*]:bg-slate-5 [&>*]:rounded-sm [&>*]:text-md'}>
                        {
                            menuItems.map(({ icon: Icon, ...e }, i) => (
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
                                    <Link href={e.link} onClick={() => setMenuOpened(e => !e)} className=" px-3 py-2 flex">
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
    )
}

export default MobileMenu