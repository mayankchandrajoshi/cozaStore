import React, { useEffect, useState } from 'react'
import MetaData from '../../Utils/MetaData'
import {MdMailOutline,MdFace} from 'react-icons/md'
import {useDispatch, useSelector} from 'react-redux'
import { clearUserError, loadUser, updateUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { toast } from 'react-toastify';

const UpdateProfile = () => {

  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const { isLoadingUser,user,userError,userSuccess } = useSelector(state=>state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Images/icons/Profile.png");
  const [ isSubmitted,setIsSubmitted ] = useState(false);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateUser(myForm)).then(()=>{
      setIsSubmitted(false);
    })
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(()=>{
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
      return;
    }
    if(userSuccess){
      dispatch(loadUser()).then(()=>navigate("/account"));
    }

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    
  },[userError,userSuccess,user]);

  return (
    isLoadingUser?<div className="w-screen h-screen flex"><Loader/></div>:<>
    <MetaData title="Update Profile" />
    <div className="w-screen min-h-screen max-w-full p-10 px-2 md:px-5 flex justify-center items-center bg-[rgb(231,231,231)]">
      <div className="bg-white w-screen h-[450px] md:w-[350px] flex flex-col">
        <div className="">
          <h2 className="text-center w-fit text-[rgba(0,0,0,0.664)] font-normal text-xl font-[Poppins] p-4 border-solid border-b-[1px] border-b-[rgba(0,0,0,0.205)] m-auto">Update Profile</h2>
        </div>
        <form
          className="flex flex-col justify-start items-center p-2 sm:p-5 h-full gap-5 pt-8 sm:pt-10"
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
        >
          <div className="flex w-full items-center">
            <MdFace className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm outline-none"
            />
          </div>
          <div className="flex w-full items-center">
            <MdMailOutline className='absolute translate-x-3 text-xl text-[rgba(0,0,0,0.623)]'/>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-3 md:py-4 px-12 pr-4 w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm outline-none"
            />
          </div>
          <div className='flex w-full items-center'>
            <img src={avatarPreview} alt="Avatar Preview" className='shrink-0 aspect-square w-12 h-12 rounded-full m-2'/>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateProfileDataChange}
              className="w-full border-solid border-[1px] border-[rgba(0,0,0,0.267)] rounded-[4px] font-light text-sm md:text-xs outline-none flex file:cursor-pointer file:w-full file:z-[2] file:h-10 file:border-none file:m-0 file:font-normal file:text-sm file:font-[Poppins] file:transition-all file:duration-500 file:px-2 file:text-[rgba(0,0,0,0.623)] file:bg-white file:hover:bg-[rgb(235,235,235)]"
            />
          </div>
          <button className="border-none text-white font-light text-sm font-[Poppins] w-full p-3 cursor-pointer transition-all duration-500 rounded-[4px] outline-none shadow-[0px_2px_5px_rgba(0,0,0,0.219)] bg-Purple hover:bg-text-Grey" type='submit' disabled={isSubmitted}>{isSubmitted?<img className="mx-auto w-5 h-5" src="/Images/icons/buttonLoaderImage..gif"/>:<>Update</>}</button>
        </form>
      </div>
    </div>
  </>
  )
}

export default UpdateProfile