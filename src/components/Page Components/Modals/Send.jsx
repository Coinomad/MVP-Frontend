import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import ShowAssets from './ShowAssets'

const Send = ({sendAssets, setSendAssets}) => {

  return (
    <form className='w-full h-full flex flex-col justify-between items-center' action="">
        <div className='px-6 py-8 gap-6 inline-flex flex-col items-start justify-between w-full'>
            <div className='relative flex flex-col items-start gap-2 w-full'>
                <label className='relative text-[#151515] text-[.875rem] font-semibold leading-4' htmlFor="Send from">Send from</label>
                <div className='outline-none border-none bg-[#F7F7F7] h-[56px] px-4 gap-2 w-full self-stretch flex items-center text-base placeholder:text-[#838385] font-normal leading-6 text-[#000000] rounded-lg'>
                    <input disabled className='outline-none border-none bg-transparent w-full' type="text" placeholder='Select Asset' />
                    <IoIosArrowDown onClick={() => setSendAssets(prev => !prev)} className={`text-[1.125rem] text-[#151515] font-bold cursor-pointer ${sendAssets ? `rotate-[180deg] duration-200` : `rotate-0 duration-200`}`} />
                </div>
                {
                    sendAssets && (<ShowAssets/>)
                }
            </div>
            <div className='flex flex-col items-start gap-2 w-full'>
                <label className='text-[#151515] text-[.875rem] font-semibold leading-4' htmlFor="Send to">Send to</label>
                <input className='outline-none border-none bg-[#F7F7F7] h-[56px] px-4 w-full self-stretch flex items-center text-base placeholder:text-[#838385] font-normal leading-6 text-[#000000] rounded-lg' type="text" placeholder='Enter address' />
            </div>
            <div className='flex flex-col items-start gap-2 w-full'>
                <label className='text-[#151515] text-[.875rem] font-semibold leading-4' htmlFor="Amount">Amount</label>
                <input className='outline-none border-none bg-[#F7F7F7] h-[56px] px-4 w-full self-stretch flex items-center text-base placeholder:text-[#838385] font-normal leading-6 text-[#000000] rounded-lg' type="text" placeholder='Input' />
            </div>
        </div>
        <div className='flex items-start flex-col gap-[10px] pt-4 pb-8 px-6 w-full'>
            <button className='h-[56px] self-stretch flex justify-center items-center px-2 bg-[#2F4EED] rounded-lg text-base text-white font-semibold leading-[18px]'>Send</button>
        </div>
    </form>
  )
}

export default Send