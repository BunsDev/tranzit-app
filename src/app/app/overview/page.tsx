import React from 'react'
import { GiStumpRegrowth } from "react-icons/gi";
import { FaMoneyBillWheat } from "react-icons/fa6";
import { FiArrowDownLeft, FiArrowUpLeft, FiArrowRight } from "react-icons/fi";
import { FaArrowRight, FaCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import PerformanceChart from '@/components/PerformanceChart';
import Image from 'next/image';

function Overview() {

  return (
    <div>
      <div className='flex w-full justify-between mb-10'>
        <div className='flex'>
          <div className='font-bold text-2xl mr-4'>Welcome back</div>
          <div className='w-8 h-8'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="7.656" style={{ fill: "#f8de40" }} /><path d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" style={{ fill: "#e7c930" }} /><path d="M21.554 5.693c-.063-.289-2.888-.829-4.871-.829a5.584 5.584 0 0 0-3.3.7A3.125 3.125 0 0 1 12 5.919a3.125 3.125 0 0 1-1.381-.352 5.584 5.584 0 0 0-3.3-.7c-1.983 0-4.808.54-4.871.829s-.113 1.217.088 1.381.439.025.477.6.477 2.976 1.808 3.767 3.741.163 4.6-.365A4.3 4.3 0 0 0 11.3 8.568c.138-.892.351-1.507.7-1.507s.565.615.7 1.507a4.3 4.3 0 0 0 1.883 2.51c.854.528 3.264 1.155 4.6.365s1.77-3.189 1.808-3.767.276-.439.477-.6.149-1.095.086-1.383z" style={{ fill: "#101820" }} /><path d="M14 11.457a.32.32 0 0 0-.313.327 2.1 2.1 0 0 1-.5 1.33 1.593 1.593 0 0 1-1.187.433 1.6 1.6 0 0 1-1.187-.43 2.088 2.088 0 0 1-.5-1.334.32.32 0 1 0-.64-.012 2.712 2.712 0 0 0 .679 1.791 2.211 2.211 0 0 0 1.648.625 2.211 2.211 0 0 0 1.647-.625 2.718 2.718 0 0 0 .679-1.791.322.322 0 0 0-.326-.314z" style={{ fill: "#864e20" }} /></svg>
          </div>
        </div>
      </div>

      <div className='sm:flex grid gap-5 sm:gap-4'>
        <div className="w-full sm:w-2/3">
          <div className="sm:flex grid sm:gap-14 gap-6 grid-cols-2 mb-10">
            <div className='flex gap-2'>
              <div>
                <div className='w-14 p-3 bg-fuchsia-900 text-white rounded-md flex items-center'>
                  <GiStumpRegrowth className='w-8 h-9' />
                </div>
              </div>
              <div className='p-1'>
                <div className='font-bold text-lg'>41</div>
                <div className='font-light text-sm text-neutral-600 dark:text-neutral-400'>Total reward points</div>
              </div>
            </div>

            <div className='flex gap-2'>
              <div>
                <div className='w-14 p-3 bg-stone-500 text-white rounded-md flex items-center'>
                  <FaMoneyBillWheat className='w-8 h-9' />
                </div>
              </div>
              <div className='p-1'>
                <div className='font-bold text-lg'>5</div>
                <div className='font-light text-sm text-neutral-600 dark:text-neutral-400'>Total Transactions</div>
              </div>
            </div>

            <div className='flex gap-2'>
              <div>
                <div className='w-14 p-3 bg-gray-500 text-white rounded-md flex items-center'>
                  <MdPendingActions className='w-8 h-9' />
                </div>
              </div>
              <div className='p-1'>
                <div className='font-bold text-lg'>$140.30</div>
                <div className='font-light text-sm text-neutral-600 dark:text-neutral-400'>In transit</div>
              </div>
            </div>
          </div>

          <div className='w-full sm:pr-10 mb-14'>
            <div className="flex justify-between">
              <div className='font-bold text-xl mr-4 mb-4'>Transaction Rewards</div>
              <div className='flex [&>*]:p-1 [&>*]:mr-3 [&>*]:text-xs'>
                <button>D</button>
                <button>W</button>
                <button>M</button>
                <button>Y</button>
                <button className='font-bold border-b-2 border-b-fuchsia-900'>ALL</button>
              </div>
            </div>
            <div className='w-full' style={{ height: '200px' }}>
              <PerformanceChart />
            </div>
          </div>

          <div className='w-fill sm:pr-10'>
            <div className="flex justify-between mb-8">
              <div className='font-bold text-xl mr-4'>Supported Tokens</div>
              <button className='flex items-center gap-2 text-sm p-1 bg-slate-100 dark:bg-neutral-800 dark:text-neutral-50 rounded-md'>
                <div>More</div>
                <FaArrowRight />
              </button>
            </div>



            <div className="relative overflow-x-auto mb-10 z-0">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-neutral-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Networks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cursor-pointer hover:bg-gray-100 bg-white dark:bg-neutral-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-2">
                      <Image className='w-5' width={20} height={20} src="/assets/icons/usdc.svg" alt="usdc" />
                      USDC
                    </th>
                    <td className="px-6 py-4 dark:text-white text-black">
                      Avalanche, Polygon, Ethereum
                    </td>
                  </tr>
                  <tr className="cursor-pointer hover:bg-gray-100 bg-white border-b dark:bg-neutral-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-2">
                      <Image className='w-5' width={20} height={20} src="/assets/icons/dai.svg" alt="dai" />
                      CCIP BnM
                    </th>
                    <td className="px-6 py-4 dark:text-white text-black">
                      Avalanche, Polygon, Ethereum
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


          </div>
        </div>

        <div className="w-full sm:w-1/3 mb-10">
          <div className="flex justify-between mb-8">
            <div className='font-bold text-xl mr-4'>Recent activities</div>
            <button className='flex items-center gap-2 text-sm p-1 bg-slate-100 dark:bg-neutral-800 dark:text-neutral-50 rounded-md'>
              <div>More</div>
              <FaArrowRight />
            </button>
          </div>

          <div className='[&>*]:mb-6 [&>*]:border-b-2 [&>*]:pb-3 mb-8'>

            <div className='flex w-full justify-between'>
              <div className='flex gap-2'>
                <FiArrowRight className='w-6 h-6 text-orange-500' />
                <div>
                  <div className='text-sm font-bold mb-1'>Bridge</div>
                  <div className='text-xs'>29 May 24, 17:54</div>
                </div>
              </div>

              <div>
                <div className='text-sm font-bold mb-1'>10.5661 USDC</div>
                <div className='flex items-center gap-1 float-right'>
                  <FaCircle className='w-1 h-1 text-green-500' />
                  <div className='text-xs'>Completed</div>
                </div>
              </div>
            </div>

            <div className='flex w-full justify-between'>
              <div className='flex gap-2'>
                <FiArrowRight className='w-6 h-6 text-orange-500' />
                <div>
                  <div className='text-sm font-bold mb-1'>Bridge</div>
                  <div className='text-xs'>29 May 24, 17:54</div>
                </div>
              </div>

              <div>
                <div className='text-sm font-bold mb-1'>3.17836 USDC</div>
                <div className='flex items-center gap-1 float-right'>
                  <FaCircle className='w-1 h-1 text-green-500' />
                  <div className='text-xs'>Completed</div>
                </div>
              </div>
            </div>

            <div className='flex w-full justify-between'>
              <div className='flex gap-2'>
                <FiArrowRight className='w-6 h-6 text-orange-500' />
                <div>
                  <div className='text-sm font-bold mb-1'>Bridge</div>
                  <div className='text-xs'>29 May 24, 17:54</div>
                </div>
              </div>

              <div>
                <div className='text-sm font-bold mb-1'>17.39 CCIP BnM</div>
                <div className='flex items-center gap-1 float-right'>
                  <FaCircle className='w-1 h-1 text-green-500' />
                  <div className='text-xs'>Completed</div>
                </div>
              </div>
            </div>

          </div>

          <div className="w-full h-64 bg-slate-50 dark:bg-neutral-900 p-5 bg-no-repeat bg-cover" style={{ backgroundImage: "url('/assets/icons/moon.svg')", backgroundPosition: "50px 50px" }}>
            <div className='font-bold '>Earn reward points <br /> on Tranzit</div>
            {/* <Image src={moonImg} className='w-60' alt=""/> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview