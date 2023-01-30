import React from 'react'
import CategoryCard from './CategoryCard'

const CategoryMenu = () => {
  return (
    <div className='flex flex-col items-center font-[Poppins] my-10 md:my-20 gap-4 md:gap-6 px-2 sm:px-3 md:px-5'>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1195px] w-[100%] gap-4 md:gap-6">
            <CategoryCard Title={'Women'} subTitle={'New Trend'} Image={'/Images/banner-01.jpg'}/>
            <CategoryCard Title={'Men'} subTitle={'New Trend'} Image={'/Images/banner-02.jpg'}/>
        </div>
        <div className="grid grid-rows-3 grid-cols-1 max-w-[1195px] w-[100%] gap-4 md:gap-6 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-3">
            <CategoryCard Title={'Watches'} subTitle={`New ${new Date().getFullYear()}`} Image={'/Images/banner-07.jpg'}/>
            <CategoryCard Title={'Bags'} subTitle={`New ${new Date().getFullYear()}`} Image={'/Images/banner-08.jpg'}/>
            <CategoryCard Title={'Footwears'} subTitle={`New ${new Date().getFullYear()}`} Image={'/Images/shoe.png'} style={"md:w-1/2 md:col-span-2 md:mx-auto lg:col-span-1 lg:w-full"}/>
        </div>
    </div>
  )
}

export default CategoryMenu