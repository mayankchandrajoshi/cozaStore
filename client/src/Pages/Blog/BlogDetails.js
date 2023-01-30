import React, { useEffect, useMemo, useRef, useState } from 'react'
import MetaData from '../../Utils/MetaData'
import {MdOutlineSearch} from 'react-icons/md';
import BlogCard from '../../Components/Blog/BlogCard'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearBlogErrors, clearBlogSuccess, createBlogComment, getBlogDetails, getMyComment } from '../../features/blog/blogDetailsSlice';
import { getProducts } from '../../features/product/productSlice';
import Loader from '../../Components/Loader/Loader';
import RelatedProductCard from '../../Components/Product/RelatedProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade} from "swiper";
import CommentCard from '../../Components/Blog/CommentCard';
import { toast } from 'react-toastify';

const BlogDetails = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();
  const {id} = useParams();

  const { isAuthenticated } = useSelector(state=>state.user);
  const { isLoadingBlog,blog,myComment,blogError,blogSuccess } = useSelector(state=>state.blogDetails);
  const { isLoading,products } = useSelector(state=>state.products);
  const [ comment,setComment ] = useState(myComment);

  useEffect(()=>{
    window.scrollTo({top:0,behavior: 'smooth'});
    dispatch(getBlogDetails(id)).then(()=>{
      if(isAuthenticated){
        dispatch(getMyComment(id))
      }
    })
  },[id])

  useEffect(()=>{
    dispatch(getProducts({tags:blog.tags,page:1,sort:'{"numofReviews":-1}',outOfStock:true}))
  },[blog])
  
  useEffect(()=>{
    if(products.length==0 && blog) dispatch(getProducts({page:1,sort:'{"numofReviews":-1}'}));
  },[products.length])

  useEffect(()=>setComment(myComment),[myComment])

  useEffect(()=>{
    if(blogError){
      dispatch(getBlogDetails(id)).then(()=>{
        toast.error(blogError,{
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch(clearBlogErrors());
      })
      return;
    }
    if(blogSuccess){
      dispatch(getBlogDetails(id)).then(()=>{
        dispatch(getMyComment(id))
      }).then(()=>{
      toast.success(blogSuccess,{
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
      });
      dispatch(clearBlogSuccess());
    })
  }
  },[blogSuccess,blogError])
  
  const handleSearch = (e)=>{
    e.preventDefault();
    navigate(`/blogs?s=${searchRef.current.value}&page=1`)
  }

  const submitReview = async(e) =>{
    e.preventDefault();
    await dispatch(createBlogComment({id,comment}))
    window.scrollTo({top:0,behavior: 'smooth'});
  }

  return (
    <>
      <MetaData title='Blogs'/>
      <div className='mt-20 font-[Poppins]'>
          <div className={`h-60 bg-[url(Images/bg-02.jpg)] bg-center flex justify-center items-center`}>
              <h1 className="text-5xl font-black text-white">Blogs</h1>
          </div>
          {isLoadingBlog?<div className="w-screen h-[150vh] flex"><Loader/></div>:<div className='flex justify-center font-[Poppins] pt-10 pb-14 md:pt-16 md:pb-20 text-[13px]'>
              <div className="w-full max-w-[1200px] grid grid-cols-1 tablet:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr] gap-x-8 lg:gap-x-[70px] gap-y-10 px-2 sm:px-3 md:px-5">
                <div className="overflow-hidden">
                    <BlogCard blog={blog} page={'blogDetail'}/>
                    <div className={`mx-auto text-gray-500 text-sm mt-10`}>
                      <div className=''>
                        <h1 className='font-bold text-lg text-text-black mb-5'>Comments : </h1>
                        {blog.noOfComments>0?(
                            <Swiper className="mySwiper" effect={"fade"} fadeEffect= {{crossFade: true}} autoplay ={{delay: 4000,disableOnInteraction: false}} modules={[Autoplay,EffectFade]}>
                                {blog.comments.map((comment,index)=><SwiperSlide  key={index}><CommentCard comment={comment}/></SwiperSlide>)}
                            </Swiper>
                        ):(
                          <div className="h-28 flex justify-center items-center border-solid border-grey3 border-2">
                            <p className="">No Comments</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-5">
                          <h1 className="text-lg md:text-xl text-text-black">Add a comment</h1>
                          <form className="" onSubmit={submitReview}>
                              <h1 className="my-2">Your review</h1>
                              <textarea name="" id=""  className='w-full h-36 p-3 outline-none border-solid border-grey3 border-[1px] resize-none' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                              <button  className="mt-5 text-base py-[10px] px-9  transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple">SUBMIT</button>
                          </form>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <form className="border border-solid border-grey3 flex w-full lg:w-[90%] mx-auto p-[10px] px-6 rounded-full" onSubmit={handleSearch}>
                      <input type="text" className="w-full flex-1 text-[16px] outline-none border-none mr-2" placeholder='Search' ref={searchRef}/>
                      <button className="text-xl"><MdOutlineSearch className='text-grey3 hover:text-black transition-colors duration-500'/></button>
                    </form>
                    <div className="w-full mx-auto">
                      <h1 className="font-black text-xl">Featured Products</h1>
                      {isLoading?<div className="w-full h-[80vh] flex"><Loader/></div>:<div className="mt-7">
                        {
                          products.map(RelatedProduct=><RelatedProductCard product={RelatedProduct} key={RelatedProduct._id}/>)
                        }
                      </div>}
                    </div>
                    <div className="w-full mx-auto">
                    <h1 className="font-black text-xl">Tags</h1>
                      <div className="mt-7 flex flex-wrap gap-2">
                        {(blog.tags.length>10?blog.tags.slice(0,10):blog.tags).map((tag,index)=><span className="cursor-pointer transition-colors duration-500 hover:text-Purple hover:border-Purple text-text-Grey rounded-full border-[1px] border-solid border-grey3 py-1 px-4" key={index} onClick={(e)=>navigate(`/blogs?tags=${tag}&page=1`)}>{tag}</span>)}
                      </div>
                    </div>
                </div>
              </div>
          </div>}
      </div>
    </>
)}

export default BlogDetails