import React, { useEffect } from 'react'
import MetaData from '../../Utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearWishlistSuccess } from '../../features/wishlist/wishlistProductsSlice'
import Loader from '../../Components/Loader/Loader'
import WishlistProductCard from '../../Components/Product/WishlistProductCard'
import { toast } from 'react-toastify'
import { TbFaceIdError } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoadingWishList ,wishlistItems ,wishlistMessage } = useSelector(state=>state.wishlist);

    useEffect(()=>{
        if(!isLoadingWishList && wishlistMessage){
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
    },[wishlistMessage])
    
  return (
    isLoadingWishList?<Loader/>:<>
        <MetaData title={'Favourite Products'}/>
        <div className="flex justify-center items-center">
            <div className="font-[Poppins] my-20 md:my-28 text-[13px] min-h-[80vh] md:min-h-screen max-w-6xl p-2 md:p-5 flex flex-col justify-start grow">
                <h1 className="text-text-black font-bold text-xl sm:text-3xl mb-5 md:mb-10 w-full">Your WishList</h1>
                {wishlistItems.length>0?<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 tablet:grid-cols-3 lg:grid-cols-4 gap-7">
                {
                    wishlistItems.map((FavItem)=>(
                        <WishlistProductCard favId={FavItem} key={FavItem}/>
                    ))
                }
                </div>:<div className='flex justify-center items-start'>
                    <div className="w-full border-solid border-grey3 border-[1px] flex flex-col items-center h-max p-2 md:p-5">
                        <TbFaceIdError className='text-[150px] md:text-[250px]'/>
                        <span className="text-2xl font-bold">No items in Your Wishlist</span>
                        <button className="w-max mt-5 text-xs sm:text-sm tablet:text-base p-3 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple uppercase" onClick={()=>navigate("/products?s=&price=[0]&color=&category=null&page=1&sortBy=null")}>Continue Shopping</button>
                    </div>
                </div>}
            </div>
        </div>
    </>
  )
}

export default Wishlist