import React from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({Title,subTitle,Image,style}) => {
  
  const navigate = useNavigate();

  return (
    <div className={`relative border-solid border-grey3 border font-[Poppins] after:transition-all after:duration-500 group hover:after:absolute hover:after:content-[""] hover:after:top-0 hover:after:left-0 hover:after:w-full hover:after:h-full hover:after:bg-CategoryCard-Blue z-50 cursor-pointer ${style}`} onClick={()=>navigate(`/products?price=[0]&color=&category=${Title.toLowerCase()}&page=1&sortBy=null`)}>
       <div className='absolute top-0 left-0 z-10 p-3 tablet:p-8 w-full h-full flex flex-col justify-between'>
        <div className=""> 
          <h1 className="capitalize font-extrabold text-xl sm:text-3xl text-text-black transition-colors duration-500 group-hover:text-white">{Title}</h1>
          <h2 className="capitalize text-xs sm:text-sm mt-1 text-text-Grey transition-colors duration-500 group-hover:text-white">{subTitle}</h2>
        </div>
        <div className="uppercase text-[15px] font-medium w-fit">
            <h1 className='text-white delay-300 transition-[transform,opacity] duration-500 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100'>Shop Now</h1>
            <div className=" group-hover:scale-100 scale-0 w-full h-[2px] transition-transform duration-500 origin-center bg-white"></div>
        </div>
       </div>
       <img src={Image} alt="" className='w-full h-full object-cover object-center'/>
    </div>
  )
}

export default CategoryCard