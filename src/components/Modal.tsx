'use client'

import classNames from 'classnames'
import React from 'react'

function Modal({ children, title, isOpen, setIsOpen }: {
    children: React.ReactNode,
    title: string,
    isOpen: boolean,
    setIsOpen: any
}) {
    return (
        <div className={classNames('w-full fixed h-screen left-0 top-0 p-5 flex justify-center items-center bg-neutral-900 bg-opacity-90', {
            'hidden': !isOpen
        })}>
            <div className='-mt-48 dark:bg-neutral-800 bg-slate-100 sm:w-1/3 w-5/6 p-5 rounded-md'>
                <div className='flex justify-between mb-8'>
                    <div className='font-bold'>{title}</div>
                    <button onClick={() => setIsOpen(false)}>close</button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal