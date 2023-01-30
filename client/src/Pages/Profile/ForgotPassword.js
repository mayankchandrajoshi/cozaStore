import React, { useEffect, useState } from 'react'
import MetaData from '../../Utils/MetaData'
import { MdEmail } from 'react-icons/md';
import { clearUserError, clearUserSuccess, forgotPassword } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const { userSuccess,userError } = useSelector(state =>state.user);
  const [ email,setEmail ]=useState("");
  const [ isSubmitted,setIsSubmitted ] = useState(false);

  const forgotPasswordSubmit=(e)=>{
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(forgotPassword(email)).then(()=>{
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
      toast.success(userSuccess,{
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearUserSuccess());
      navigate("/")
    }
  }, [userSuccess,userError])
  
  return (
    <>
      <MetaData title="Forgot Password" />
          <div className="w-screen min-h-screen max-w-full p-10 px-2 md:px-5 flex justify-center items-center bg-[rgb(231,231,231)]">
            <div className="bg-white w-screen h-[280px] md:w-[350px] flex flex-col">
              <div className="">
                <h2 className="text-center w-fit text-[rgba(0,0,0,0.664)] font-normal text-xl font-[Poppins] p-4 border-solid border-b-[1px] border-b-[rgba(0,0,0,0.205)] m-auto">Forgot Password</h2>
              </div>
              <form
                className="flex flex-col justify-start items-center p-2 sm:p-5 h-full gap-5 pt-8 sm:pt-10"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="flex w-full items-center">
                  <MdEmail className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm font-[cursive] outline-none"
                  />
                </div>
                <button className="border-none text-white font-light text-sm font-[Poppins] w-full p-3 cursor-pointer transition-all duration-500 rounded-[4px] outline-none shadow-[0px_2px_5px_rgba(0,0,0,0.219)] bg-Purple hover:bg-text-Grey" type='submit' disabled={isSubmitted}>{isSubmitted?<img className="mx-auto w-5 h-5" src="/Images/icons/buttonLoaderImage..gif"/>:<>Send</>}</button>
              </form>
            </div>
          </div>
    </>
  )
}

export default ForgotPassword