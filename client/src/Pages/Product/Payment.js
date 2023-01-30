import React from 'react'
import { Link } from 'react-router-dom'
import { IoBagCheck } from 'react-icons/io5'

const Payment = () => {

  return (
    <div className='w-screen h-[85vh] md:h-screen text-base md:text-xl flex flex-col justify-center items-center gap-4'>
      <IoBagCheck className='text-5xl sm:text-6xl tablet:text-8xl text-green-500'/>
      <h1 className=''>Payment Successful</h1>
      <Link to='/' className='p-2 px-4 md:p-4 md:px-6 rounded-full bg-bg-black text-white'>Continue Shopping</Link>
    </div>
  )
}

export default Payment