import React, { useEffect, useRef, useState } from 'react'
import BlogCard from '../../Components/Blog/BlogCard'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {MdOutlineSearch} from 'react-icons/md';
import MetaData from '../../Utils/MetaData';
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate,useSearchParams } from 'react-router-dom';
import { getBlogs } from '../../features/blog/blogSlice'
import Loader from '../../Components/Loader/Loader'
import { getProducts } from '../../features/product/productSlice';
import RelatedProductCard from '../../Components/Product/RelatedProductCard';
import NoBlogFound from '../../Components/Blog/NoBlogFound';

const categories = [
  "Fashion","Street Style","Beauty","Life Style","DIY and Crafts"
]

const tags = [
"Men","Women","Fashion","LifeStyle","Denim","StreetStyle","Crafts"
]

const Blogs = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const navigate = useNavigate();
  const [ searchParams ]= useSearchParams();

  const { isLoadingBlogs,blogs,blogsCount,blogsPerPage } = useSelector(state=>state.blog);
  const { isLoading,products } = useSelector(state=>state.products);

  useEffect(() => {
    dispatch(getBlogs({keyword:searchParams.get("s"),page:searchParams.get("page"),category:searchParams.get("category"),tags:searchParams.get("tags")}))
    window.scrollTo({top:0,behavior: 'smooth'});
  }, [searchParams])

  useEffect(()=>{
    dispatch(getProducts({tags:[searchParams.get("tags"),searchParams.get("category")],page:1}));
  },[searchParams.get("tags"),searchParams.get("category")])

  useEffect(()=>{
    if(products.length==0) dispatch(getProducts({sort:'{"sold":-1}',page:1}));
  },[products.length])


  const handleSearch = (e)=>{
    e.preventDefault();
    navigate(`/blogs?s=${searchRef.current.value}&category=${searchParams.get("category")?searchParams.get("category"):""}&tags=${searchParams.get("tags")?searchParams.get("tags"):[]}&page=1`)
  }

  const HandlePageChange=(e,number)=>{
    navigate(`/blogs?s=${searchParams.get("s")}&category=${searchParams.get("category")?searchParams.get("category"):""}&tags=${searchParams.get("tags")?searchParams.get("tags"):[]}&page=${number}`)
  }

  return (
  <>
    <MetaData title='Blogs'/>
    <div className='mt-20 font-[Poppins]'>
        <div className={`h-60 bg-[url(Images/bg-02.jpg)] bg-center flex justify-center items-center`}>
            <h1 className="text-5xl font-black text-white">Blogs</h1>
        </div>
        {isLoadingBlogs?<div className="w-screen h-[80vh] flex"><Loader/></div>:<div className='w-screen flex justify-center font-[Poppins] pt-10 pb-14 md:pt-16 md:pb-20 text-[13px]'>
            <div className='max-w-[1200px] grid grid-cols-1 tablet:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr] gap-x-8 lg:gap-x-[70px] gap-y-10 px-2 sm:px-3 md:px-5'>
              <div className="">
                {blogsCount==0?<NoBlogFound/>:<>
                  <div className="flex flex-col gap-12">
                    {
                      blogs.map(blog=>(
                      <BlogCard blog={blog} page={'Blog'} key={blog._id}/>
                      ))
                    }
                  </div>
                  <div className="mt-10 grid place-items-center">
                    {
                      blogsCount>blogsPerPage&&<Stack spacing={2}>
                        <Pagination count={Math.trunc(blogsCount/blogsPerPage)+(blogsCount%blogsPerPage!==0)} showFirstButton showLastButton page={Number(searchParams.get("page"))} size="medium" onChange={HandlePageChange} />
                    </Stack>
                    }
                  </div>
                </>}
                </div>
                <div className="flex flex-col gap-8">
                    <div className="">
                      <form className="border border-solid border-grey3 flex w-full lg:w-[90%] mx-auto p-[10px] px-6 rounded-full overflow-hidden" onSubmit={handleSearch}>
                        <input type="text" className="w-full flex-1 text-[16px] outline-none border-none mr-2" placeholder='Search' ref={searchRef} defaultValue={searchParams.get("s")?searchParams.get("s"):""}/>
                        <button className="text-xl" type="submit"><MdOutlineSearch className='text-grey3 hover:text-black transition-colors duration-500'/></button>
                      </form>
                    </div>
                    <div className="w-full mx-auto">
                      <h1 className="font-black text-xl">Categories</h1>
                      <ul className='text-text-Grey'>
                        {categories.map((cat,index)=><li  className={`text-base py-2 border-solid border-t-[1px] border-grey3 cursor-pointer transition-colors duration-500 hover:text-Purple ${index==0?"mt-7":"mt-1"} ${cat.toLowerCase()==searchParams.get("category")?'text-Purple font-medium':"text-text-Grey font-normal"}`} key={index} onClick={()=>navigate(`/blogs?s=${searchParams.get("s")}&category=${cat.toLowerCase()}&tags=${searchParams.get("tags")?searchParams.get("tags"):[]}&page=1`)}>{cat.replace("and","&")}</li>)}
                      </ul>
                    </div>
                    <div className="w-full mx-auto">
                      <h1 className="font-black text-xl">Featured Products</h1>
                      {isLoading?<div className="w-full h-[60vh] flex"><Loader/></div>:<>
                        <div className="mt-7">
                          {
                            products.map(RelatedProduct=><RelatedProductCard product={RelatedProduct} key={RelatedProduct._id}/>)
                          }
                        </div>
                      </>}
                    </div>
                    <div className="w-full mx-auto">
                      <h1 className="font-black text-xl">Tags</h1>
                      <div className="mt-7 flex flex-wrap gap-2">
                        {tags.slice(0,10).map((t,index)=><span className={`cursor-pointer transition-colors duration-500 hover:text-Purple hover:border-Purple text-text-Grey rounded-full border-solid border-[1px] border-grey3 py-1 px-4 ${t.toLowerCase()==searchParams.get("tags")?'text-Purple border-Purple':''}`} key={index} onClick={(e)=>navigate(`/blogs?s=${searchParams.get("s")}&category=${searchParams.get("category")?searchParams.get("category"):""}&tags=${[t.toLowerCase()]}&page=1`)}>{t}</span>)}
                      </div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
</>
  )
}

export default Blogs