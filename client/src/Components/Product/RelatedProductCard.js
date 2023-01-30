import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';

const RelatedProductCard = ({product}) => {
  const navigate = useNavigate();

  return (
    <div className="flex my-5 " key={product._id} onClick={()=>navigate(`/product/${product._id}`)}>
        <div className="shrink-0 w-12 h-14 sm:w-20 sm:h-24 cursor-pointer">
            <img src={product.images[0].url} alt="" className='w-full h-full object-cover object-center '/>
        </div>
        <div className="flex flex-col justify-start p-0 md:p-2 text-sm md:text-base ml-2 gap-1 sm:gap-3">
            <h1 className='text-text-black cursor-pointer hover:text-Purple transition-colors duration-300 break-all'>
                {product.name.substring(0,18)}{product.name.length>18?"...":""}
            </h1>
            <div className='text-text-Grey'>₹{product.price}</div>
        </div>
    </div>
  )
}

export default memo(RelatedProductCard);