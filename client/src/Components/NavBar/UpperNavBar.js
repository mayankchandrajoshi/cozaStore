import React from 'react'
import { Link } from 'react-router-dom'

const UpperNavBar = () => {
  return (
    <div className='flex justify-center font-[Poppins] text-xs bg-bg-black text-[#abab9b]'>
        <div className='flex justify-between max-w-[1195px] w-[100%] flex-wrap '>
          <div className='p-3 w-max'>
              Free shipping for standard order over ₹2000
          </div>
          <div className='flex flex-1 sm:flex-grow-1 justify-start md:justify-end border-solid border-t-[1px] border-[#565656]'>
              <Link to='/help' className="border-x-[1px] border-solid border-x-[#565656] py-3 px-6  hover:text-Purple transition-colors duration-500 cursor-pointer sm:max-w-max md:w-max">Help & FAQs</Link>
              <Link to='/account' className="border-r-[1px] border-solid border-r-[#565656] py-3 px-6  hover:text-Purple transition-colors duration-500 cursor-pointer max-w-max sm:w-max">My Account</Link>
          </div>
      </div>
    </div>
  )
}

export default UpperNavBar