import React, { useEffect } from 'react'
import {MdClose} from 'react-icons/md';
import {Link, useNavigate} from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'
import { clearErrors, clearSuccess, getCartItems } from '../../features/cart/cartSlice'
import OutsideClick from '../../Utils/OutSideClick';
import { useRef } from 'react';
import Loader from '../Loader/Loader';

const CartSideBar = ({showCart,ShowCartSideBar,openCartRef}) => {
    const navigate = useNavigate();

    const cartRef = useRef(null);
    const closeCartRef = useRef(null);
    
    const { isLoadingCart,cartItems,totalCartCost }  = useSelector(state=>state.cart);
    
    OutsideClick(cartRef,closeCartRef,openCartRef,ShowCartSideBar);

    const handleCheckOut = () =>{
        ShowCartSideBar();
        navigate('/cart')
    }

  return (
    <div className={`font-[Poppins] text-xl transition-all duration-500 flex gap-6 fixed top-0 right-0 z-[1001]  min-w-fit w-2/3 max-w-[390px] h-screen bg-white flex-col p-5 py-7 sm:p-8 sm:py-10 md:p-12 md:px-10 text-text-black overflow-y-scroll ${showCart?'translate-x-0 shadow-[0_0_0_100000px_rgba(0,0,0,.6)]':'translate-x-full'}`} ref={cartRef}>
    <div className='flex justify-between items-center mb-2 md:mb-5'>
        <div className='uppercase font-extrabold'>YOUR CART</div>
        <div className='cursor-pointer' ref={closeCartRef}>
            <MdClose  className='text-[40px]'/>
        </div>
    </div>
    {isLoadingCart?<div className={`w-full h-full flex`}><Loader/></div>:<><div className="flex flex-col gap-4">
        {
            cartItems.map(cartItem=>(
                <Link to={`product/${cartItem.product._id}`} className="flex flex-row " key={cartItem._id}>
                    <div className="shrink-0 w-16 h-[90px]">
                        <img src={cartItem.image} alt="" className='w-full h-full object-cover object-center cursor-pointer'/>
                    </div>
                    <div className="flex flex-col justify-between p-2 text-sm ml-2">
                        <div className='text-text-black cursor-pointer hover:text-Purple transition-colors duration-300 break-all'>
                            {`${cartItem.name.substring(0,10)}(${cartItem.itemSize},${cartItem.itemColor})`}
                        </div>
                        <div className='text-text-Grey'>
                            <span>{cartItem.quantity}</span><span> X ₹</span><span>{cartItem.product.price}</span>
                        </div>
                    </div>
                </Link>
            ))
        }
    </div>
    <div className="mt-auto">
        Total : ₹{totalCartCost}<span className="text-lg"></span>
    </div>
    </>
    }
    <div className="w-full text-[15px]">
        <button className="uppercase cursor-pointer w-full bg-bg-black text-white hover:bg-Purple rounded-full px-5 py-2 md:px-[26px] md:py-3 transition-colors duration-500" onClick={handleCheckOut}>CHECK OUT</button>
    </div>
</div>
  )
}

export default CartSideBar