import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteWishlistItem, getWishlistItem, setLoadingWishlist } from '../../features/wishlist/wishlistProductsSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { AiFillStar,AiFillHeart } from 'react-icons/ai'

const WishlistProductCard = ({favId}) => {
    const dispatch = useDispatch();
    const [product,setProduct] = useState(null);

    const handleLiked = (e) => {
        dispatch(setLoadingWishlist());
        dispatch(deleteWishlistItem(favId))
        dispatch(getWishlistItem());
    }

    useEffect(()=>{
        (async()=>{
            const {data} = await axios.get(`/api/v1/product/${favId}`);
            setProduct(data.product);
        })();
    },[favId])
    
    return (
      !product?<Loader/>:<div className=''>
        <div className='aspect-[3/4] overflow-hidden relative group'>
            <img src={product.images[0].url} alt="" className='w-full h-full object-cover object-center ease-in group-hover:scale-110 transition-transform duration-500 '/>
        </div>
        <div className='mt-4'>
            <div className='flex justify-between text-sm md:text-base capitalize mb-2 text-text-black'>
                <Link to={`/product/${product._id}`} className="cursor-pointer line-clamp-1">{product.name}</Link>
                <div className='cursor-pointer r text-xl md:text-2xl flex items-center' onClick={handleLiked}>
                    <AiFillHeart className='text-Purple'/>
                </div>
            </div>
            <div className="flex mb-2 gap-1 items-center">
                <div className="bg-green-600 text-xs md:text-sm rounded-sm p-1 text-white font-semibold flex items-center gap-1">
                    <span>{product.rating.toFixed(1)}</span><AiFillStar className='text-xs md:text-sm'/>
                </div>
                <p className="text-xs md:text-sm">
                    ({product.numofReviews})
                </p>
            </div>
            <div className='text-sm text-text-black flex gap-2'>
                <span className='font-semibold whitespace-nowrap'>₹{product.price}</span>
                <span className='line-through whitespace-nowrap'>₹{product.meta.originalPrice}</span>
                <span className='text-green-600 whitespace-nowrap'>{product.meta.discount}% off</span>
            </div>
        </div>
    </div>
)}

export default memo(WishlistProductCard);