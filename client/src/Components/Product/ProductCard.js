import React, { memo,useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { clearWishlistSuccess, deleteWishlistItem, getWishlistItem, setWishlistItem, setLoadingWishlist } from '../../features/wishlist/wishlistProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { AiFillHeart, AiFillStar,AiOutlineHeart } from 'react-icons/ai'

const ProductCard = ({data,setShowProductModal,setModalData}) => {
  const dispatch = useDispatch();
  const [liked,setLiked] = useState(false);

  const {isLoadingWishlistItems ,wishlistItems ,wishlistMessage } = useSelector(state=>state.wishlist);

  useEffect(()=>{
    dispatch(setLoadingWishlist());
    dispatch(getWishlistItem());
  },[])

  const handleLiked = (e) => {
    if(liked){
      dispatch(deleteWishlistItem(data._id));
    }
    else {
      dispatch(setWishlistItem(data._id));
    }
    dispatch(getWishlistItem());
    setLiked(!liked)
  }

  useEffect(()=>{
    let isLiked=false;
    wishlistItems.forEach((item)=>{
      if(item===data._id){
        setLiked(true);
        isLiked=true;
        return;
      }
    })
    if(!isLiked)setLiked(false);
  },[wishlistItems])

  useEffect(()=>{
    if(!isLoadingWishlistItems && wishlistMessage){
      toast.success(wishlistMessage,{
        position: "bottom-right",
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
  },[liked])
  
  return (
    isLoadingWishlistItems?<Loader/>:<div className=''>
    <div className='aspect-[3/4] overflow-hidden relative group'>
        <img src={data.images[0].url} alt="" className='w-full h-full object-cover object-center ease-in group-hover:scale-110 transition-transform duration-500 '/>
        <button className="whitespace-nowrap text-[15px] py-[10px] px-7 opacity-100 absolute -bottom-16 group-hover:bottom-5 transition-all duration-300  left-1/2 -translate-x-1/2 rounded-full bg-white  hover:bg-bg-black hover:text-white z-[5] peer" onClick={()=>{setShowProductModal(true);setModalData(data)}}>
          Quick View
        </button>
    </div>
    <div className='mt-4'>
        <div className='flex justify-between text-sm md:text-base capitalize mb-2 text-text-black'>
            <Link to={`/product/${data._id}`} className="cursor-pointer line-clamp-1">{data.name}</Link>
            <div className='cursor-pointer text-xl md:text-2xl flex items-center' onClick={handleLiked}>
              {liked?<AiFillHeart className='text-Purple'/>:<AiOutlineHeart/>}
            </div>
        </div>
        <div className="flex mb-2 gap-1 items-center">
          <div className="bg-green-600 text-xs md:text-sm rounded-sm p-1 text-white font-semibold flex items-center gap-1">
            <span>{data.rating.toFixed(1)}</span><AiFillStar className='text-xs md:text-sm'/>
          </div>
          <p className="text-xs md:text-sm">
            ({data.numofReviews})
          </p>
        </div>
        <div className='text-sm text-text-black flex gap-2'>
          <span className='font-semibold whitespace-nowrap'>₹{data.price}</span>
          <span className='line-through whitespace-nowrap'>₹{data.meta.originalPrice}</span>
          <span className='text-green-600 whitespace-nowrap'>{data.meta.discount}% off</span>
        </div>
    </div>
</div>
  )
}

export default memo(ProductCard);