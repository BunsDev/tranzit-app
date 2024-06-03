import React from 'react'

function Account() {
  return (
    <div>
      <div className='flex justify-between mb-10'>
        <div className="dark:text-white-500">Collectibles</div>
        <div className="dark:text-white-500">Reward points: 21 - <button className='text-purple-500 font-bold'>Forge</button></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        <div>
          <div className='bg-no-repeat bg-cover w-full h-[300px] bg-neutral-900' style={{ backgroundImage: "url('/assets/pass/coachcard.jpg')" }}></div>
          <div className='py-5 bg'>
            <div className='mb-1'>Total: 11</div>
            <div className='mb-2'>Perk: free bridge (per 24hrs)</div>
            <button className='text-purple-500 font-bold'>Forge</button>
          </div>
        </div>

        <div>
          <div className='bg-no-repeat bg-cover w-full h-[300px] bg-neutral-900' style={{ backgroundImage: "url('/assets/pass/commutercard.jpg')" }}></div>
          <div className='py-5 bg'>
            <div className='mb-2'>Total: 4</div>
            <div className='mb-2'>Perk: free bridge (per 6hrs)</div>
            <button className='text-purple-500 font-bold'>Forge</button>
          </div>
        </div>

        <div>
          <div className='bg-no-repeat bg-cover w-full h-[300px] bg-neutral-900' style={{ backgroundImage: "url('/assets/pass/vipcard.jpg')" }}></div>
          <div className='py-5 bg'>
            <div className='mb-2'>Total: 1</div>
            <div className='mb-2'>Perk: free bridge (per 3hrs)</div>
            <button className='text-purple-500 font-bold'>Forge</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account