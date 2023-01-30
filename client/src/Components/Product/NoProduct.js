import React from 'react'
import { TbFaceIdError } from 'react-icons/tb'

const NoProduct = () => {
  return (
    <div className='flex justify-center items-start'>
        <div className="w-full border-solid border-grey3 border-[1px] flex flex-col items-center h-max p-5">
            <TbFaceIdError className='text-[150px] md:text-[250px]'/>
            <p className="text-2xl font-bold text-center">No Products Found</p>
        </div>
    </div>
  )
}

export default NoProduct