import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import ProductDetail from '../../Components/Product/ProductDetail'
import ProductSlider from '../../Components/Slider/ProductSlider'
import { Rating } from "@mui/material";
import ReviewCard from '../../Components/Product/ReviewCard'
import Loader from '../../Components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../features/product/productDetailSlice';
import { getMyProductReview,getProductReviews,createProductReview, clearProductReviewSuccess, clearProductReviewError } from '../../features/product/productReviewSlice'
import { getProducts } from '../../features/product/productSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { clearWishlistSuccess, getWishlistItem, setLoadingWishlist } from '../../features/wishlist/wishlistProductsSlice';
import { toast } from 'react-toastify';
import MetaData from '../../Utils/MetaData'

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { id }=useParams();
    const { isAuthenticated } = useSelector((state)=>state.user);
    const { isLoadingProduct,product } = useSelector((state)=>state.productDetails);
    const { isLoadingProductReview,productReviews,productReview,productReviewSuccess,productReviewError} = useSelector(state=>state.productReview);
    const {isLoadingWishlistItems ,wishlistItems ,wishlistMessage } = useSelector(state=>state.wishlist);
    const { isLoading,products } = useSelector ((state)=>state.products);
    const [ isActive,setIsActive ]=useState(0);
    const [ rating,setRating ] = useState(0);
    const [ review,setReview ] = useState("");

    useEffect(()=>{
        dispatch(getProductDetails(id));
        dispatch(getProductReviews(id));
        window.scrollTo({top:0,behavior:"smooth"});
    },[id])

    useEffect(()=>{
        if(isAuthenticated){
            dispatch(getMyProductReview(id));
        }
    },[id,isAuthenticated])
  
    useEffect(()=>{
        dispatch(setLoadingWishlist());
        dispatch(getWishlistItem());
    },[])

    useEffect(()=>{
        if(productReview){
            setRating(productReview.rating);
            setReview(productReview.comment);
        }
        else{
            setRating(0);
            setReview("");
        }
    },[productReview])

    useEffect(()=>{
        if(!isLoadingProduct){
            const promise = dispatch(getProducts({tags:product.tags,page:1,sort:'{"numofReviews":-1}',outOfStock:true}))
            return ()=>{
                promise.abort();
            }
        }

    },[isLoadingProduct])

    useEffect(()=>{
        if(productReviewError){
            dispatch(getProductDetails(id)).then(()=>{
                dispatch(getProductReviews(id));}).then(()=>{
                    toast.error(productReviewError,{
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    dispatch(clearProductReviewError());
                })
            return;
        }
        if(productReviewSuccess){
            dispatch(getProductDetails(id)).then(()=>{
                dispatch(getProductReviews(id));}).then(()=>{
                    toast.success(productReviewSuccess,{
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                    });
                    dispatch(clearProductReviewSuccess());
                })
    }},[productReviewSuccess,productReviewError])

    useEffect(()=>{
        if(!isLoadingWishlistItems && wishlistMessage){
          toast.success(wishlistMessage,{
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          dispatch(clearWishlistSuccess());
        }
    },[wishlistItems])

    const options = {
        size: "small",
        precision: 0.5,
    };
    
    const submitReview = (e) =>{
        e.preventDefault();
        dispatch(createProductReview({productId:id,rating,comment:review}));
    }

  return (
    isLoadingProduct?<div className='w-screen h-screen flex'><Loader/></div>:<>
    <MetaData title={`${product.name}`}/>
    <div className="font-[Poppins] my-20 md:my-28 w-screen max-w-[1250px] m-auto">
        <div className="min-h-[104vh] w-full flex flex-col">
            <ProductDetail data={product}/>
        </div>
        <div className="my-8 border-solid border-grey3 border-[1px] py-10">
            <div className="grid gird-col-1 md:grid-cols-3 w-fit gap-2 tablet:gap-5 mx-auto text-text-Grey text-sm mb-8 p-2 tablet:p-5">
                <div className={`cursor-pointer p-[1px] text-[15px] md:mb-2 transition-colors duration-500 hover:underline-offset-[6px] hover:underline text-center hover:text-text-black ${isActive==0?'underline-offset-[6px] underline text-text-black':''}`} onClick={()=>setIsActive(0)}>Description</div>
                <div className={`cursor-pointer p-[1px] text-[15px] md:mb-2 transition-colors duration-500 hover:underline-offset-[6px] hover:underline text-center hover:text-text-black ${isActive==1?'underline-offset-[6px] underline text-text-black':''}`} onClick={()=>setIsActive(1)}>Additional information</div>
                <div className={`cursor-pointer p-[1px] text-[15px] md:mb-2 transition-colors duration-500 hover:underline-offset-[6px] hover:underline text-center hover:text-text-black ${isActive==2?'underline-offset-[6px] underline text-text-black':''}`} onClick={()=>setIsActive(2)}>Reviews ({product.numofReviews})</div>
            </div>
            <div className="w-full mx-auto p-2 tablet:p-5">
                <div className={`max-w-[900px] mx-auto text-text-Grey text-sm transition-opacity duration-500 ${isActive===0?"block opacity-100":'hidden opacity-0'}`}>
                    {product.desc}
                </div>
                <div className={`max-w-[520px] mx-auto text-sm transition-opacity duration-500 ${isActive===1?"block opacity-100":'hidden opacity-0'}`}>
                    <ul className="flex flex-col gap-3">
                        <li className="flex gap-5">
                            <span className=""> Material </span> 
                            <span className="text-text-Grey break-all">{product.material}</span>
                        </li>
                        <li className="flex gap-10">
                            <span className="">Color  </span>
                            <span className="text-text-Grey break-all">{product.color.reduce((accu,col)=>accu+" "+col[0].toUpperCase()+col.substring(1),'')}</span>
                        </li>
                        <li className="flex gap-[50px]">
                            <span className="">Size  </span>
                            <span className="text-text-Grey break-all">{Object.keys(product.size).reduce((accu,size)=>accu+" , "+size,'').substring(2)}</span>
                        </li>
                    </ul>
                </div>
                <div className={`max-w-[540px] mx-auto text-gray-500 text-sm transition-opacity duration-500 ${isActive===2?"block opacity-100":'hidden opacity-0'}`}>
                {isLoadingProductReview?<div className="w-full h-[50vh] flex"><Loader/></div>:<>{(product.numofReviews>0)&&(
                        <Swiper className="mySwiper" autoplay ={{delay: 5000,disableOnInteraction: false,}} modules={[Autoplay]}>
                            {productReviews.map(review=><SwiperSlide  key={review._id}><ReviewCard review={review}/></SwiperSlide>)}
                        </Swiper>
                    )}
                    <div className="">
                        <h1 className="text-xl text-text-black">Add a review</h1>
                        <div className="my-5">
                            <h1 className="flex items-center gap-2">Your Rating : <Rating {...options} value={rating} onChange={(event, newValue) => setRating(newValue)}/></h1>
                        </div>
                        <form className="" onSubmit={submitReview}>
                            <h1 className="mb-2">Your review</h1>
                            <textarea name="" id=""  className='w-full h-36 p-3 outline-none border-solid border-grey3 border-[1px] resize-none' value={review} onChange={(e)=>{setReview(e.target.value)}}></textarea>
                            <button  className="mt-5 text-base py-[10px] px-9  transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple">SUBMIT</button>
                        </form>
                    </div></>}
                </div>
            </div>
        </div>
        <div className="p-2 md:p-5">
            <h1 className="w-fit mx-auto mb-4 md:mb-8 text-2xl md:text-4xl font-black text-center">Related Products</h1>
            {isLoading?<div className="h-[40vh] w-full flex"><Loader/></div>:<ProductSlider data={products}/>}
        </div>
    </div>
</>
  )
}

export default ProductDetails