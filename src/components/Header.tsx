'use client'

import AccountTab from './AccountTab';
import ChatTab from "./ChatTab";
import MobileMenu from "./MobileMenu";

function Header() {

    return (
        <div className="w-full flex justify-between mb-7">
            <div className='font-bold text-xl'>Tranzit</div>
            <div className='flex gap-3 sm:gap-6 items-center'>
                <ChatTab />
                <div className="sm:hidden">
                    <MobileMenu />
                </div>
                <AccountTab />

            </div>
        </div>
    )
}

export default Header