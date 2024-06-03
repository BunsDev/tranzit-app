import Image from 'next/image';
import React from 'react'
import { PiFlyingSaucerBold } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa";
import BridgeForm from '@/components/BridgeForm';

function Bridge() {
  return (
    <div className='flex w-full justify-center mt-12'>
      <div className='sm:w-1/2 w-full border-2 border-slate-200 dark:border-neutral-700 p-5 rounded-lg'>
        <div className='mb-8 flex gap-3'>
          <PiFlyingSaucerBold className="w-6 h-6" />
          <div className='font-bold'>Bridge</div>
        </div>
        <BridgeForm />
      </div>
    </div>
  )
}

export default Bridge