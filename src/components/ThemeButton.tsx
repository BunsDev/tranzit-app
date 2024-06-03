'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import { HiMoon, HiSun } from "react-icons/hi";
import classNames from 'classnames';

function ThemeButton() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button className={classNames('p-2', {
            'bg-slate-100': resolvedTheme === 'light',            
            'bg-slate-800': resolvedTheme === 'dark'
        })} onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>{resolvedTheme === 'dark' ? <HiSun className='h-5 w-5 text-slate-50' /> : <HiMoon />}</button>
    )
}

export default ThemeButton