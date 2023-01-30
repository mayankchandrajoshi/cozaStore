import React from 'react'
import {FaInstagram,FaGithub} from 'react-icons/fa';
import {AiFillLinkedin} from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom'

const categories = [
    { name:"Women",category:"women" },
    { name:"Men",category:"men" },
    { name:"Bags",category:"bags" },
    { name:"Footwears",category:"footwears" },
    { name:"Watches",category:"watches" }
]  

const Footer = () => {

    const navigate = useNavigate();
    const [ searchParams ]= useSearchParams();

  return (
    <div className="">
        <div className='flex justify-center font-[Poppins] pt-16 pb-10 text-[13px] bg-bg-black text-[#abab9b]'>
        <div className='flex justify-between max-w-[1195px] w-full flex-row '>
            <div className="grid grid-cols-1 grid-rows-4 p-2 px-4 gap-16 w-full md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
                <div className="">
                    <h1 className="uppercase font-bold text-white text-base">Categories</h1>
                    <ul className="flex flex-col gap-5 mt-5">
                        {
                            categories.map((category,index)=>(
                                <li className="capitalize cursor-pointer hover:text-blue-400 transition-colors duration-500" onClick={()=>navigate(`/products?s=${searchParams.get('s')?searchParams.get('s'):""}&price=${searchParams.get("price")?searchParams.get("price"):'[0]'}&color=${searchParams.get("color")}&category=${category.category}&page=${searchParams.get("page")}&sortBy=${searchParams.get("sortBy")}&outOfStock=${searchParams.get("outOfStock")==="true"}`)} key={index}>{category.name}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="">
                    <h1 className="uppercase font-bold text-white text-base">Help</h1>
                    <ul className="flex flex-col gap-5 mt-5">
                        <li className="capitalize cursor-pointer hover:text-blue-400 transition-colors duration-500" onClick={()=>navigate('/orders')}>Track Orders</li>
                        <li className="capitalize cursor-pointer hover:text-blue-400 transition-colors duration-500" onClick={()=>navigate('/contact')}>Contact</li>
                        <li className="capitalize cursor-pointer hover:text-blue-400 transition-colors duration-500" onClick={()=>navigate('/help')}>FAQs </li>
                    </ul>
                </div>
                <div className="">
                    <h1 className="uppercase font-bold text-white text-base">Get in Touch</h1>
                    <div className="mt-5 flex flex-col gap-3">
                        <a href='https://www.linkedin.com/' target='_blank' className='flex gap-3 items-end'>
                            <AiFillLinkedin className='text-2xl hover:text-Purple transition-colors duration-500'/>
                            <span className="">Linkedin</span>
                        </a>
                        <a href='https://www.instagram.com/' target='_blank' className="flex gap-3 items-end">
                            <FaInstagram className='text-2xl hover:text-Purple transition-colors duration-500'/>
                            <span className="">Instagram</span>
                        </a>
                        <a href="https://github.com/mayankchandrajoshi" target='_blank' className="flex gap-3 items-end">
                            <FaGithub className='text-2xl hover:text-Purple transition-colors duration-500'/>
                            <span className="">Github</span>
                        </a>
                        
                    </div>
                </div>
                <div className="">
                    <h1 className="uppercase font-bold text-white text-base mb-8">NewsLetter</h1>
                    <form action="" className="flex gap-5 flex-col">
                        <input type="email" placeholder='email@example.com' className='bg-transparent outline-none pb-2 border-solid border-b-[1px] border-b-white'/>
                        <button className="uppercase bg-Purple py-[10px] px-10 text-xs md:text-[15px] text-white rounded-full w-fit transition-colors duration-300 hover:bg-white hover:text-Purple ">subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div className='flex justify-center font-[Poppins] pb-10 text-[13px] bg-bg-black text-[#abab9b]'>
        <div className='flex justify-center gap-1 sm:gap-5 max-w-[1195px] w-screen px-5'>
            <img src="/Images/gpay2.png" alt="Google Pay" className="min-w-0 w-9 h-6 rounded-sm object-cover"  loading="lazy"/>
            <img src="/Images/Phonepe3.webp" alt="Phone Pe" className="min-w-0 w-9 h-6 rounded-sm object-cover"  loading="lazy"/>
            <img src="/Images/viza.jpg" alt="Viza" className="min-w-0 w-9 h-6 rounded-sm object-cover"  loading="lazy"/>
            <img src="/Images/masterCard2.png" alt="MasterCard" className="min-w-0 w-9 h-6 rounded-sm object-cover"  loading="lazy"/>
            <img src="/Images/paytm.jpg" alt="Paytm" className="min-w-0 w-9 h-6 rounded-sm object-cover"  loading="lazy"/>
        </div>
    </div>
    </div>
  )
}

export default Footer