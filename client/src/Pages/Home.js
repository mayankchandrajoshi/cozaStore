import React, { useEffect, useState } from 'react'
import MainSlider from '../Components/Slider/MainSlider'
import CategoryMenu from '../Components/Category/CategoryMenu'
import ProductSlider from '../Components/Slider/ProductSlider'
import BlogCard from '../Components/Blog/BlogCard'
import MetaData from '../Utils/MetaData'
import { useSelector,useDispatch } from 'react-redux'
import { getProducts } from '../features/product/productSlice.js'
import { getBlogs } from '../features/blog/blogSlice'
import Loader from '../Components/Loader/Loader'

const storeOverview = [
  {name:"Best Seller",sortBy: '{"sold":-1,"_id":-1}' },
  {name : "Newest",sortBy: '{"createdAt":-1,"_id":-1}' },
  { name : "Discount" ,sortBy : '{"meta.discount":-1,"_id":-1}' },
  { name : "Top Rate", sortBy : '{"rating":-1,"_id":-1}' }
]

const Home = () => {
  const dispatch = useDispatch();

  const { isLoading,products } = useSelector((state)=>state.products);
  const { isLoadingBlogs,blogs } = useSelector((state)=>state.blog);
  const [ isActive,setActive ] = useState(0);
  const [ sortBy,setSortBy ] = useState(storeOverview[0].sortBy);

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  },[])

  useEffect(()=>{
    const promise = dispatch(getProducts({sort:sortBy,page:1}));
    return()=>{
      promise.abort();
    }
  },[sortBy])

  useEffect(()=>{
    dispatch(getBlogs({page:1}));
  },[])


  const handleIsActive = ({index,cond}) =>{
    setActive(index);
    setSortBy(cond.sortBy);
  }

  return (
    <>
        <MetaData title="COZASTORE" />
        <MainSlider/>
        <CategoryMenu/>
        <div className='flex flex-col items-center font-[Poppins] my-10 md:my-20 px-2 sm:px-3 md:px-5'>
          <div className="max-w-[1195px] w-[100%]">
            <h1 className="text-3xl sm:text-[40px] leading-tight font-extrabold text-center">Store Overview</h1>
            <div className="mt-4 md:mt-6 mb-5 md:mb-10 flex gap-x-7 gap-y-2 justify-center w-full flex-wrap">
              {storeOverview.map((cond,index)=><h2 className={`w-max cursor-pointer p-[1px] text-sm sm:text-base sm:mb-2 transition-colors duration-500 border-solid border-black hover:border-b-[1px] hover:text-text-black ${isActive==index?'border-b-[1px] text-text-black':'border-b-0 text-text-Grey'}`} onClick={()=>handleIsActive({index,cond})} key={index}>{cond.name}</h2>)}
            </div>
            {isLoading?<div className="w-full h-[40vh] flex"><Loader/></div>:<ProductSlider data={products}/>}
          </div>
        </div>
        <div className='flex flex-col items-center font-["Poppins",sans-serif] my-10 md:my-20'>
          <div className="max-w-[1195px] w-[100%] px-2 sm:px-3 md:px-5">
            <h1 className="text-3xl sm:text-[40px] font-extrabold text-center mb-7 sm:mb-10 break-words leading-tight">Our Blogs</h1>
            {isLoadingBlogs?<Loader/>:<div className="grid grid-cols-1 md:grid-cols-2 tablet:grid-cols-3 tablet:grid-rows-1 gap-10 md:gap-7">
              {
                blogs.map(blog=>(
                  <BlogCard blog={blog} key={blog._id}/>
                ))
              }
            </div>}
          </div>
        </div>
    </>
  )
}

export default Home