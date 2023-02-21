import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IoMdHeartEmpty} from 'react-icons/io'
import { MdShoppingCart,MdOutlineSearch,MdClose} from 'react-icons/md'
import { GiHamburgerMenu} from 'react-icons/gi';
import CartSideBar from '../SideBar/CartSideBar';
import SearchModal from '../Modals/SearchModal';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../features/cart/cartSlice';
import { getWishlistItem } from '../../features/wishlist/wishlistProductsSlice';
import UpperNavBar from './UpperNavBar';
import OutsideClick from '../../Utils/OutSideClick';

const MainNavBar = () => {
    const dispatch = useDispatch();

    const mainNavRef=useRef(null);
    const upperNavRef = useRef(null);
    const showCartRef = useRef(null);
    const sideNavRef = useRef(null);
    const showNavRef = useRef(null);
    const closeNavRef = useRef(null);

    const [scrollPos,setScrollPos]=useState(40);
    const [showNavBar,setShowNavBar] = useState(false);
    const [showSearchModal,setShowSearchModal] = useState(false);
    const [showCartSideBar,setShowCartSideBar]=useState(false);
    const [height, setHeight] = useState(0)

    const { isAuthenticated } = useSelector((state)=>state.user);
    const { totalWishlistItem } = useSelector(state=>state.wishlist);
    const { isLoadingCart,cartItems,error } = useSelector(state=>state.cart);

    useLayoutEffect(() => {
        setHeight(upperNavRef.current.clientHeight)
        setScrollPos(upperNavRef.current.clientHeight);
    },[])

    useLayoutEffect(()=>{
        const resizeListenerFunc = function(){
            setHeight(upperNavRef.current.clientHeight);
            setScrollPos(upperNavRef.current.clientHeight);
        }
        window.addEventListener("resize",resizeListenerFunc);
        return ()=>{
            window.removeEventListener("resize",resizeListenerFunc);
        }
    },[])

    useLayoutEffect(()=>{
        const scrollListenerFunc = function(){
            const currentPos = height-this.scrollY;
            currentPos>=0?setScrollPos(currentPos):setScrollPos(0);
        }
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

        if(isTouchDevice){ 
            window.addEventListener("touchmove",scrollListenerFunc);
        }
        else  window.addEventListener("scroll",scrollListenerFunc);
        return ()=>{
            if(isTouchDevice){ 
                window.removeEventListener("touchmove",scrollListenerFunc);
            }
            else  window.removeEventListener("scroll",scrollListenerFunc);
        }
    },[height])

    useEffect(() => {
        mainNavRef.current.style.top=`${scrollPos}px`;
    }, [scrollPos])
  
    useEffect(()=>{
        if(isAuthenticated){
            dispatch(getCartItems())
        }
    },[isAuthenticated])

    useEffect(()=>{
        dispatch(getWishlistItem());
    },[totalWishlistItem])

    OutsideClick(sideNavRef,closeNavRef,showNavRef,setShowNavBar);

    const HandleShowSearchModal=(e)=>{
        setShowSearchModal(false);
    }
    
  return (
    <>
        <div className="" ref={upperNavRef}>
            <UpperNavBar/>
        </div>
        <nav className={`fixed w-screen z-[1000] flex justify-center p-5 transition-[height,background-color] left-0 duration-300 ${scrollPos===0?'h-[65px] md:h-[70px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,.2)]':'h-[70px] md:h-20 bg-transparent ease-linear'}`} ref={mainNavRef}>
            <div className='flex max-w-[1195px] w-[100%] items-center'>
                <Link to='/' className="font-sans mr-4 md:mr-14 flex items-center">
                    <img src={'/Images/icons/logo-01.png'} alt="logo-01" className='w-full h-full'/>
                </Link>
                <div ref={sideNavRef} className={`font-[Poppins] text-xl lg:text-sm flex lg:flex-row gap-6 lg:relative fixed top-0 left-0 lg:top-0 lg:min-h-0 lg:w-auto  min-w-[195px] w-2/3 max-w-[390px] min-h-screen lg:bg-inherit bg-Purple flex-col p-7 md:p-10 lg:text-text-black text-white lg:p-0 transition-all duration-500 ${showNavBar?'translate-x-0 shadow-[0_0_0_100000px_rgba(0,0,0,.6)] lg:shadow-none':'-translate-x-full'} lg:translate-x-0 z-[1001]`}>
                    <Link to="/" className="lg:hover:text-Purple transition-colors duration-500 cursor-pointer mt-12 lg:mt-0">Home</Link>
                    <Link to="/products?s=&price=[0]&color=&category=null&page=1&sortBy=null" className="lg:hover:text-Purple transition-colors duration-500 cursor-pointer">Shop</Link>
                    <Link to="/wishlist" className="lg:hover:text-Purple transition-colors duration-500 cursor-pointer block md:hidden">Wishlist</Link>
                    <Link to="/blogs?s=&page=1" className="lg:hover:text-Purple transition-colors duration-500 cursor-pointer">Blog</Link>
                    <Link to="/about" className="lg:hover:text-Purple transition-colors duration-500 cursor-pointer">About</Link>
                    <Link to="/contact" className="lg:hover:text-Purple transition-colors duration-500 cursor-pointer">Contact</Link>
                    <div className="absolute right-7 top-7 lg:hidden cursor-pointer" ref={closeNavRef}><MdClose className='text-[40px]'/></div>
                </div>
                <div className="flex items-center ml-auto">
                    <div className="relative mr-6 cursor-pointer hidden md:block">
                        <MdOutlineSearch className='hover:text-Purple transition-all duration-500 cursor-pointer text-[26px]' onClick={()=>setShowSearchModal(true)}/>
                    </div>
                    <div className="relative mr-6">
                        <div className="" ref={showCartRef}>
                            <MdShoppingCart className='hover:text-Purple transition-all duration-500 cursor-pointer text-[22px] sm:text-[26px]'/>
                        </div>
                        <div className="absolute -top-[7px] -right-[7px] bg-Purple text-white text-xs rounded-sm min-w-[15px] height-[15px] flex items-center justify-center">
                            <span>{isLoadingCart?0:cartItems.length}</span>
                        </div>
                        <CartSideBar showCart={showCartSideBar} ShowCartSideBar={setShowCartSideBar} openCartRef={showCartRef}/>
                    </div>
                    <Link to='/wishlist' className="relative mr-6 hidden md:block">
                        <IoMdHeartEmpty className='hover:text-Purple transition-all duration-500 cursor-pointer text-[26px]'/>
                        <div className="absolute -top-[7px] -right-[7px] bg-Purple text-white text-xs rounded-sm min-w-[15px] height-[15px] flex items-center justify-center">
                            <span>{totalWishlistItem}</span>
                        </div>
                    </Link>
                </div>
                <div ref={showNavRef} className="lg:hidden cursor-pointer">
                    <GiHamburgerMenu className='hover:text-Purple transition-all duration-500 cursor-pointer text-[22px] sm:text-[26px]'/>
                </div>
            </div>
        </nav>
        <SearchModal showSearch={showSearchModal} HideModal={HandleShowSearchModal}/>
    </>
  )
}

export default MainNavBar