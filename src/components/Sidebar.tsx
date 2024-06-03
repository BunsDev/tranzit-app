'use client'

import React, { useMemo } from 'react'
import ThemeButton from './ThemeButton'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { menuItems } from '@/utils/links';

function Sidebar() {

  const router = usePathname();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeMenu = useMemo(() => (menuItems.find((e) => e.label.toLowerCase() === router.split('/')[2])?.id), [router]);

  return (
    <div className='h-screen w-72 p-10 border-r-2 dark:border-r-neutral-600 hidden sm:block'>
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
            {[`border-b-fuchsia-700`]: activeMenu === 1},
            {[`border-b-teal-700`]: activeMenu === 2},
            {[`border-b-rose-700`]: activeMenu === 3},
            {[`border-b-blue-700`]: activeMenu === 4},
            {[`border-b-orange-700`]: activeMenu === 5},
            {[`border-b-black dark:border-b-white`]: e.id === 6},
            {[`after:bg-fuchsia-700`]: e.id === 1},
            {[`after:bg-teal-700`]: e.id === 2},
            {[`after:bg-rose-700`]: e.id === 3},
            {[`after:bg-blue-700`]: e.id === 4},
            {[`after:bg-orange-700`]: e.id === 5},
            {[`after:bg-black dark:after:bg-white`]: e.id === 6},
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
  )
}

// hover:transition-all hover:ease-in hover:duration-200 hover:border-b-4 hover:border-b-black

export default Sidebar