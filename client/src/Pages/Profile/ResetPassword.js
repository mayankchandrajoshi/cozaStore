import React, { useEffect, useState } from 'react'
import MetaData from '../../Utils/MetaData'
import {MdVpnKey,MdLock} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearUserError, loadUser, resetPassword } from '../../features/user/userSlice'
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useParams();

  const { userError,userSuccess } = useSelector(state=>state.user);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ isSubmitted,setIsSubmitted ] = useState(false);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(resetPassword({token,password,confirmPassword})).then(()=>{
      setIsSubmitted(false);
    })
  }

  useEffect(() => {
    if(userError){
      toast.error(userError, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearUserError());
      ;return;
    }
    if(userSuccess){
      dispatch(loadUser()).then(()=>{
        navigate("/account")
      })
    }
  }, [userError,userSuccess])
  

  return (
    <>
      <MetaData title="Reset Password"/>
      <div className="w-screen min-h-screen max-w-full p-10 px-2 md:px-5 flex justify-center items-center bg-[rgb(231,231,231)]">
        <div className="bg-white w-screen h-[480px] md:w-[360px] flex flex-col">
          <div className="">
            <h2 className="text-center w-fit text-[rgba(0,0,0,0.664)] font-normal text-xl font-[Poppins] p-4 border-solid border-b-[1px] border-b-[rgba(0,0,0,0.205)] m-auto">Reset Password</h2>
            </div>
          <form
            className="flex flex-col justify-start items-center p-2 sm:p-5 h-full gap-5 pt-8 sm:pt-10"
            onSubmit={resetPasswordSubmit}
          >
            <div className='flex w-full items-center'>
              <MdVpnKey className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm font-[cursive] outline-none"
              />
            </div>
            <div className="flex w-full items-center">
              <MdLock className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm font-[cursive] outline-none"
              />
            </div>
            <button className="border-none text-white font-light text-sm font-[Poppins] w-full p-3 cursor-pointer transition-all duration-500 rounded-[4px] outline-none shadow-[0px_2px_5px_rgba(0,0,0,0.219)] bg-Purple hover:bg-text-Grey" type='submit' disabled={isSubmitted}>{isSubmitted?<img className="mx-auto w-5 h-5" src="/Images/icons/buttonLoaderImage..gif"/>:<>Update</>}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword