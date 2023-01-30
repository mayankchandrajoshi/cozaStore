import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../Utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Loader/Loader'
import { clearUserError, clearUserSuccess, logout } from '../../features/user/userSlice'
import { toast } from 'react-toastify';
import { clearCart } from '../../features/cart/cartSlice'

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoadingUser , user ,userSuccess,userError } = useSelector(state =>state.user);

  const handleLogout = () =>{
    dispatch(logout()).then(()=>{
      dispatch(clearCart());
      navigate("/login");
    })
  }

  useEffect(()=>{
    if(userError){
      toast.error(userError, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearUserError());
      return;
    };
    if(userSuccess){
      toast.success(userSuccess,{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearUserSuccess());
    }
  },[userError,userSuccess])
  
  return (
    isLoadingUser?<div className="w-screen h-screen flex"><Loader/></div>:   
     <>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1195px] mx-auto bg-white  px-2 sm:px-3 md:px-5 my-24 md:my-32 gap-5 md:gap-10">
        <div className='flex flex-col justify-end items-center gap-5 md:gap-10 w-full h-full'>
          <div className="w-full flex justify-center">
            <img src={user.avatar.url} alt={user.name} className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[300px] aspect-square object-cover rounded-full"/>
          </div>
          <Link to="/account/update" className='bg-Purple font-normal text-base text-white p-2 w-full tablet:w-1/2 text-center transition-all duration-500 hover:bg-text-Grey'>Edit Profile</Link>
          <button name="logout" className='bg-Purple font-normal text-base text-white p-2 w-full tablet:w-1/2 text-center transition-all duration-500 hover:bg-text-Grey' onClick={handleLogout}>Log out</button>
        </div>
        <div className='flex flex-col text-center md:text-left justify-center items-center md:items-start gap-6 md:gap-12'>
          <div>
            <h4 className='text-black font-normal text-xl font-[Poppins]'>Full Name</h4>
            <p className='text-text-Grey font-normal font-[cursive] text-sm md:text-lg break-all'>{user.name}</p>
          </div>
          <div>
            <h4 className='text-black font-normal text-xl font-[Poppins]'>Email</h4>
            <p className='text-text-Grey font-normal font-[cursive] text-sm md:text-lg break-all'>{user.email}</p>
          </div>
          <div>
            <h4 className='text-black font-normal text-xl font-[Poppins]'>Joined On</h4>
            <p className='text-text-Grey font-normal font-[cursive] text-sm md:text-lg break-all'>{String(user.createdAt).substring(0, 10)}</p>
          </div>
          <div className='flex flex-col w-full tablet:w-3/4 mt-auto gap-5 md:gap-10'>
            <Link to="/orders" className='bg-text-black font=normal font-[Poppins] text-base text-white p-2 text-center transition-all duration-500 hover:bg-bg-black'>My Orders</Link>
            <Link to="/password/update" className='bg-text-black font=normal font-[Poppins] text-base text-white p-2 text-center transition-all duration-500 hover:bg-bg-black'>Change Password</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account