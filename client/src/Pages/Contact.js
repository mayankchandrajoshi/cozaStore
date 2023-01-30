import React, { useEffect, useRef, useState } from 'react'
import {IoMailOutline,IoLocationOutline,IoCallOutline} from 'react-icons/io5';
import MetaData from '../Utils/MetaData'
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
    const emailRef = useRef();
    const emailMessageRef  = useRef();

    const [ isSendingEmail,setIsSendingEmail ] = useState(false);
    
    useEffect(() => {
        window.scrollTo({top:0,behavior:"smooth"});
    }, []) 

    const handleEmailSubmit = async(e) =>{
        e.preventDefault();
        setIsSendingEmail(true);
        try {
            if(emailRef.current.value==""||emailMessageRef.current.value==""){
                throw "Please Enter email and message";
            }
            await axios.post(
                "https://formsubmit.co/ajax/6729e37e664fd19bf896a3c34a01607a ",
                {name: emailRef.current.value,message: emailMessageRef.current.value},
                { headers: { "Content-Type": "application/json" } }
            )
            toast.success("Email sent successfully", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            toast.error(error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setIsSendingEmail(false);
        }
    }
  return (
    <>
    <MetaData title='Contact Us'/>
    <div className='mt-20 font-[Poppins]'>
        <div className={`h-60 bg-[url(Images/bg-01.jpg)] bg-center flex justify-center items-center`}>
            <h1 className="text-4xl sm:text-[50px] font-black text-white">Contact</h1>
        </div>
        <div className='flex justify-center font-[Poppins] pt-16 pb-20 text-[13px]'>
            <div className='max-w-[1195px] w-full  px-2 sm:px-3 md:px-5 grid grid-rows-2 grid-cols-1 tablet:grid-rows-1 tablet:grid-cols-2'>
                <div className="border-solid border-grey3 border-te border-2 p-2 md:px-20 md:py-14 tablet:p-10 lg:px-20 lg:py-14 w-full">
                    <h1 className="text-2xl text-center text-text-black">Send Us A Message</h1>
                    <form action="" className="mt-7" onSubmit={handleEmailSubmit}>
                      <div className="border-solid border-grey3 border-te border-2 p-3 md:p-5 mb-5 flex gap-2 md:gap-5 items-center">
                        <IoMailOutline className='text-2xl'/>
                        <input ref={emailRef} type="email" name="email" id="" className="overflow-hidden text-sm md:text-lg flex-1 outline-none border-none text-text-black" placeholder='Your Email Address' />
                      </div>
                      <div className="">
                        <textarea  ref={emailMessageRef} name="message" id="" cols="30" rows="8" placeholder='How can we Help?' className="resize-none w-full border-solid border-grey3 border-te border-2 p-5 outline-none"></textarea>
                      </div>
                      <div className="">
                        <button className="border-none text-white font-light text-sm font-[Poppins] w-full p-3 cursor-pointer transition-all duration-500 rounded-full outline-none shadow-[0px_2px_5px_rgba(0,0,0,0.219)] bg-Purple hover:bg-text-Grey" type='submit' disabled={isSendingEmail}>{isSendingEmail?<img className="mx-auto w-5 h-5" src="/Images/icons/buttonLoaderImage..gif"/>:<>SUBMIT</>}</button>
                      </div>
                    </form>
                </div>
                <div className="border-solid border-grey3 border-2 tablet:border-l-0 p-2 sm:p-10 md:px-20  sm:p-5md:py-14 flex flex-col justify-evenly w-full">
                    <div className="flex flex-row gap-5 max-w-xs">
                        <div className="">
                            <IoLocationOutline className='text-xl md:text-2xl'/>
                        </div>
                        <div className="">
                            <h1 className="text-sm md:text-lg leading-none">Address</h1>
                            <p className="my-5 text-sm text-text-Grey">Coza Store,India</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 max-w-xs">
                        <div className="">
                            <IoCallOutline className='text-xl md:text-2xl'/>
                        </div>
                        <div className="">
                            <h1 className="text-sm md:text-lg leading-none">Lets Talk</h1>
                            <p className="my-5 text-sm text-text-Grey">XXXXXXXXXX</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 max-w-xs">
                        <div className="">
                            <IoMailOutline className='text-xl md:text-2xl'/>
                        </div>
                        <div className="">
                            <h1 className="text-sm md:text-lg leading-none break-all">Sale Support</h1>
                            <p className="my-5 text-sm text-text-Grey break-all">mayankchandrajoshi9871@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact