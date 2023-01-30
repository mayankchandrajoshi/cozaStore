import React, { useEffect, useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {MdEmail, MdFace, MdLock} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { clearUserError, clearUserSuccess, login, register } from '../../features/user/userSlice';
import { toast } from 'react-toastify';

const LoginRegister = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const { isAuthenticated,userError,userSuccess } = useSelector((state)=>state.user);

  const [ isLoginForm,setIsLoginForm ] = useState(true);
  const [ isSubmitted,setIsSubmitted ] = useState(false);
  const [ loginEmail, setLoginEmail ] = useState("");
  const [ loginPassword, setLoginPassword ] = useState("");
  const [ avatar, setAvatar ] = useState(null);
  const [ avatarPreview, setAvatarPreview ] = useState("/Images/icons/Profile.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loginSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(login({email:loginEmail,password:loginPassword})).then(()=>{
      setIsSubmitted(false);
    })
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const myForm = new FormData();
    
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm)).then(()=>{
      setIsSubmitted(false);
    })
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } 
    else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
      return
    };
    if(isAuthenticated) {
      navigate("/account");
      return;
    }
    if(userSuccess&&!isAuthenticated){
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
      }
    }
  }, [userError,userSuccess,isAuthenticated])
  
  return (
    <>
      <div className="w-screen min-h-screen max-w-full p-10 px-2 md:px-5 flex justify-center items-center bg-[rgb(231,231,231)]">
        <div className="bg-white w-screen h-full min-h-[480px] md:w-[350px] md:h-[65vh] flex flex-col overflow-hidden">
          <div className='grow-0 flex flex-col justify-between'>
              <div className="flex h-12">
                <p onClick={(e) =>{if(!isSubmitted)setIsLoginForm(true)}} className={`grid place-items-center w-full cursor-pointer transition-all text-[rgba(0,0,0,0.678)] font-light text-sm font-[Poppins] hover:text-Purple`}>LOGIN</p>
                <p onClick={(e) =>{if(!isSubmitted)setIsLoginForm(false)}} className="grid place-items-center w-full cursor-pointer transition-all text-[rgba(0,0,0,0.678)] font-light text-sm font-[Poppins] hover:text-Purple">REGISTER</p>
              </div>
              <button ref={switcherTab} className={`w-1/2 h-[3px] border-none transition-all duration-500 bg-Purple ${isLoginForm?"translate-x-0":"translate-x-full"}`}></button>
          </div>
          <div className="relative grow">
              <div className={`absolute top-0 left-0 right-0 bottom-0 transition-all duration-500 ${isLoginForm?"":"translate-x-full"}`}>
                <form className={`flex flex-col justify-start items-center p-2 sm:p-5 h-full gap-5 pt-8 sm:pt-10`} ref={loginTab} onSubmit={loginSubmit}>
                  <div className="flex w-full items-center">
                    <MdEmail className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm font-[cursive] outline-none"
                    />
                  </div>
                  <div className="flex w-full items-center">
                    <MdLock className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm font-[cursive] outline-none"
                    />
                  </div>
                  <Link to="/password/forgot" className='self-end text-[rgba(0,0,0,0.651)] transition-all duration-500 font-medium text-xs font-["Gill_Sans"] hover:text-black'>Forget Password ?</Link>
                  <button className="border-none text-white font-light text-sm font-[Poppins] w-full p-3 cursor-pointer transition-all duration-500 rounded-[4px] outline-none shadow-[0px_2px_5px_rgba(0,0,0,0.219)] bg-Purple hover:bg-text-Grey" type='submit' disabled={isSubmitted}>{isSubmitted?<img className="mx-auto w-5 h-5" src="/Images/icons/buttonLoaderImage..gif"/>:<>Login</>}</button>
                </form>
              </div>
              <div className={`absolute top-0 left-0 right-0 bottom-0 transition-all duration-500 ${isLoginForm?"-translate-x-full":""}`}>
                <form
                  className={`flex flex-col justify-start items-center p-2 sm:p-5 h-full gap-5 pt-8 sm:pt-9`}
                  ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  <div className="flex w-full items-center">
                    <MdFace className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={user.name}
                      onChange={registerDataChange} 
                      className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm font-[cursive] outline-none"
                    />
                  </div>
                  <div className="flex w-full items-center">
                    <MdEmail className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={user.email}
                      onChange={registerDataChange} 
                      className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm font-[cursive] outline-none"
                    />
                  </div>
                  <div className="flex w-full items-center">
                    <MdLock className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={user.password}
                      onChange={registerDataChange}
                      className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm font-[cursive] outline-none"
                    />
                  </div>
                  <div className="flex w-full items-center">
                    <img src={avatarPreview} alt="Avatar Preview" className='shrink-0 aspect-square w-12 h-12 rounded-full m-2' />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                      className="w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm md:text-xs font-[cursive] outline-none flex file:cursor-pointer file:w-full file:z-[2] file:h-10 file:border-none file:m-0 file:font-normal file:text-sm file:font-[cursive] file:transition-all file:duration-500 file:px-2 file:text-[rgba(0,0,0,0.623)] file:bg-white file:hover:bg-[rgb(235,235,235)]"
                    />
                  </div>
                  <button className="border-none text-white font-light text-sm font-[Poppins] w-full p-3 cursor-pointer transition-all duration-500 rounded-[4px] outline-none shadow-[0px_2px_5px_rgba(0,0,0,0.219)] bg-Purple hover:bg-text-Grey" type='submit' disabled={isSubmitted}>{isSubmitted?<img className="mx-auto w-5 h-5" src="/Images/icons/buttonLoaderImage..gif"/>:<>Register</>}</button>
                </form>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginRegister