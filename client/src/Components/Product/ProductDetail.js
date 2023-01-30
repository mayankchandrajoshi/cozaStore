import React, { memo, useEffect, useRef, useState } from 'react'
import {TiArrowUnsorted ,TiHeart,TiMinus ,TiPlus} from 'react-icons/ti'
import ProductImageSlider from '../Slider/ProductImageSlider'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, clearErrors, clearSuccess, getCartItems } from '../../features/cart/cartSlice'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'
import { deleteWishlistItem, getWishlistItem, setLoadingWishlist, setWishlistItem } from '../../features/wishlist/wishlistProductsSlice'

const ProductDetail = ({data}) => {
  const refSize = useRef();
  const refColor = useRef();
  const dispatch = useDispatch();
  
  const [ selectedSize,setSelectedSize ] = useState(0);
  const [ selectedColor ,setSelectedColor ] = useState(0);
  const [ quantity,setQuantity ] = useState(0);
  const [liked,setLiked] = useState(false);
  const {isLoadingWishlistItems ,wishlistItems } = useSelector(state=>state.wishlist);
  
  const { isLoadingCart,cartItems,success,error,message } = useSelector(state=>state.cart);

  useEffect(()=>{
    dispatch(setLoadingWishlist());
    dispatch(getWishlistItem());
  },[])

  useEffect(()=>{
      wishlistItems.forEach((item)=>{
        if(item===data._id){
          setLiked(true);
          return;
        }
      })
  },[wishlistItems])

  useEffect(()=>{
    if(error){
      toast.error(message,{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
      dispatch(clearErrors());
    }
    if(success){
      dispatch(getCartItems()).then(()=>{
        toast.success(message,{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch(clearSuccess());
      })
    }
  },[error,success]);

  const handleQuantity = (increament)=>{
    let newQuantity = quantity+increament;
    if(newQuantity<0) return;

    const cartItemQuantity = cartItems.filter(cartItem=>cartItem.product._id===data._id&&cartItem.itemSize===Object.entries(data.size)[selectedSize][0]&&cartItem.itemColor===Object.entries(Object.entries(data.size)[selectedSize][1])[selectedColor][0]).reduce((acc,item)=>acc+=item.quantity,0);
    
    if(cartItemQuantity){
      if(cartItemQuantity>=Object.entries(Object.entries(data.size)[selectedSize][1])[selectedColor][1]){
        toast.error(`Maximum Quantity of size ${Object.entries(data.size)[selectedSize][0]} and color  ${Object.entries(Object.entries(data.size)[selectedSize][1])[selectedColor][0]} is already in cart`,{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      if(newQuantity+cartItemQuantity>Object.entries(Object.entries(data.size)[selectedSize][1])[selectedColor][1])return;
    }
    else {
      if(newQuantity>Object.entries(Object.entries(data.size)[selectedSize][1])[selectedColor][1])return;
    }
    setQuantity(newQuantity);
  }

  const getSelectedSize = () =>{
    setSelectedSize(refSize.current.selectedIndex);
    setSelectedColor(0);
    setQuantity(0);
  }

  const getSelectedColor = () =>{
    setSelectedColor(refColor.current.selectedIndex);
    setQuantity(0);
  }

  const addToCart = () =>{
    if(quantity===0){
        toast.error("Quantity cannot be zero",{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      return;
    }
    dispatch(addCartItem({productId:data._id,image:data.images[0].url,name:data.name,quantity,itemSize:Object.entries(data.size)[selectedSize][0],itemColor:Object.entries(Object.entries(data.size)[selectedSize][1])[selectedColor][0]}))
  }

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

  return (
    isLoadingCart||isLoadingWishlistItems?<div className="grow flex bg-white"><Loader/></div>:<>
    <div className="grow bg-white grid grid-cols-1 tablet:grid-rows-1 tablet:grid-cols-2 p-2 tablet:p-5 lg:p-7 gap-5 md:gap-10 h-full">
      <div className="w-full aspect-[4/5] md:aspect-[3/4] p-2">
        <ProductImageSlider productImages={data.images} key={data._id} className="w-full h-full"/>
      </div>
      <div className="p-2 lg:p-8 h-full">
          <h1 className="font-['Poppins'] text-lg md:text-2xl break-all">{data.name}</h1>
          <div className="font-['Poppins'] text-base md:text-lg my-1 md:my-3 text-text-black flex gap-2">
            <span className='font-semibold'>₹{data.price}</span>
            <span className='line-through'>₹{data.meta.originalPrice}</span>
            <span className='text-green-600'>{data.meta.discount}% off</span>
          </div>
          <p className="text-xs md:text-sm text-text-Grey mb-5 md:mb-10 line-clamp-2">{data.desc}</p>
          <form action="flex flex-col gap-5">
            <div className="w-full md:w-4/5 mx-auto grid grid-row-4 grid-cols-1 md:grid-rows-2 md:grid-cols-[1fr_4fr] items-center gap-2 md:gap-5">
              <label htmlFor="Size" className='text-sm sm:text-base'>Size</label>
              <div className="flex-1 border-solid border-[1px] border-bg-Grey relative">
                <select name="" id="Size" className='appearance-none text-xs sm:text-sm p-2 md:p-3 text-text-Grey outline-none border-none w-full' ref={refSize} onChange={getSelectedSize}>
                {Object.entries(data.size).map((size,index)=><option value={`${size[0]}`} className='text-base checked:bg-Purple checked:text-white hover:bg-Purple hover:text-white' key={index}>{size[0]}</option>)}
                </select>
                <TiArrowUnsorted className='text-sm text-text-Grey absolute top-1/2 -translate-y-1/2 right-0 -translate-x-full'/>
              </div> 
              <label htmlFor="Color" className='text-sm sm:text-base'>Color</label>
              <div className="flex-1 border-solid border-[1px] border-bg-Grey relative">
                <select name="" id="Color" className='appearance-none text-xs sm:text-sm p-2 md:p-3 text-text-Grey outline-none border-none w-full capitalize' ref={refColor} onChange={getSelectedColor}>
                  {Object.entries(Object.entries(data.size)[selectedSize][1]).map((col,index)=><option value="Choose" key={index} className='text-base checked:bg-Purple checked:text-white hover:bg-Purple hover:text-white capitalize'>{col[0]}</option>)}
                </select>
                <TiArrowUnsorted className='text-sm  text-text-Grey absolute top-1/2 -translate-y-1/2 right-0 -translate-x-full'/>
              </div>
            </div>
            <div className="flex text-sm md:text-lg border-solid border-[1px] border-text-Grey w-28 h-10 sm:w-36 sm:h-12 mx-auto mt-5">
              <button className="p-1 md:p-3 flex-1 flex justify-center items-center hover:bg-Purple hover:text-white transition-colors duration-500" type='button' onClick={(e)=>handleQuantity(-1)} aria-label="decrQuantity"><TiMinus/></button>
              <div className="p-1 md:p-3 flex-1 flex justify-center items-center bg-slate-200 border-solid border-x-[1px] border-text-Grey">{quantity}</div>
              <button className="p-1 md:p-3 flex-1 flex justify-center items-center hover:bg-Purple hover:text-white transition-colors duration-500" type='button' onClick ={(e)=>handleQuantity(1)} aria-label="incQuantity"><TiPlus/></button>
            </div>
            {Object.entries(Object.entries(data.size)[selectedSize][1])[selectedColor][1]>0?<div className="w-full md:w-fit mx-auto">
              <button className="w-full md:w-fit mt-5 text-sm md:text-base py-3 px-3 md:px-9  transition-all duration-300  rounded-full hover:bg-bg-black text-white bg-Purple" type='button' onClick={addToCart}>Add to Cart</button>
            </div>:<div className='text-lg mt-5'>
              <p className="w-full text-center text-red-600 font-medium">Out of Stock</p>
            </div>
              }
            <div onClick={handleLiked} className={`cursor-pointer text-4xl w-fit mx-auto mt-3 ${liked?"text-Purple":"text-black hover:text-Purple "} transition-colors duration-500`}>
              <TiHeart/>
            </div>
          </form>
      </div>
    </div>
</>
  )
}

export default memo(ProductDetail)