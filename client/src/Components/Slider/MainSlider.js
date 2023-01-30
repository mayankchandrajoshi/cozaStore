import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import 'swiper/css/autoplay';

// import required modules
import {  Autoplay,EffectFade, Navigation } from "swiper";
import './MainSlider.css'

import {Link} from 'react-router-dom'

export default function MainSlider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        autoplay ={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Navigation]}
        className="mySwiper MainSlider"
      >
        <SwiperSlide>
            {({isActive})=>(
              <div className={`h-[calc(100vh-40px)] min-h-[500px] w-full relative`}>
                <img src='/Images/slide-01.jpg' alt="" className="object-cover h-full w-full" />
                <div className="absolute left-0 top-0 flex  justify-center items-center w-full z-10 h-full">
                   <div className="max-w-[1195px] w-full p-2">
                      <h1 className={`capitalize font-[Poppins] text-xl leading-relaxed md:text-[28px] my-5 text-text-black  ${isActive?'animate-[fadeInDown_1s] opacity-100':'-translate-y-1/4 opacity-0'}`}>Women Collection {new Date().getFullYear()}</h1>
                      <h1 className={`uppercase font-['PlayfairDisplay-Bold'] text-[34px] md:text-6xl leading-none font-bold text-text-black mb-10 transition-opacity delay-[800ms]  ${isActive?'animate-[fadeInUp_1s_800ms] opacity-100':'translate-y-[250%] opacity-0'}`}>New Season</h1>
                      <button className={`transition-opacity delay-[1600ms]  font-[Poppins] ${isActive?'animate-[zoomIn_1s_1600ms] opacity-100':'opacity-0'}`}>
                        <Link to='/products?price=[0]&color=&category=women&sortBy={"createdAt":-1}&page=1&sortBy=null' className='text-white rounded-full uppercase w-fit bg-Purple py-3 px-9 transition-colors duration-500 hover:bg-bg-black'>SHOP NOW</Link>
                      </button>
                   </div>
                </div>
            </div>
            )}
        </SwiperSlide>
        <SwiperSlide>
            {({isActive})=>(<div className="h-[calc(100vh-40px)] min-h-[500px] w-full relative">
                <img src='/Images/slide-02.jpg' alt="" className="object-cover h-full w-full"/>
                <div className="absolute left-0 top-0 flex  justify-center items-center w-full z-10 h-full">
                   <div className="max-w-[1195px] w-full p-2">
                      <h1 className={`capitalize font-[Poppins] text-xl leading-relaxed md:text-[28px] my-5 text-text-black origin-left ${isActive?'animate-[rotateInDown_1s] opacity-100':'opacity-0'}`}>Men Collection {new Date().getFullYear()}</h1>
                      <h1 className={`uppercase font-['PlayfairDisplay-Bold'] text-[34px] md:text-6xl leading-none font-bold  origin-top-right text-text-black mb-10 transition-opacity delay-[800ms] ${isActive?'animate-[rotateInUpRight_1s_800ms] opacity-100':'opacity-0'}`}>New Season</h1>
                      <button className={`font-[Poppins] transition-opacity delay-[1600ms] ${isActive?'animate-[rotateIn_1s_1600ms] opacity-100':'opacity-0'}`}>
                        <Link to='/products?price=[0]&color=&category=men&sortBy={"createdAt":-1}&page=1&sortBy=null' className='text-white rounded-full uppercase w-fit bg-Purple py-3 px-9 transition-colors duration-500 hover:bg-bg-black '>SHOP NOW</Link>
                      </button>
                   </div>
                </div>
            </div>)}
        </SwiperSlide>
        <SwiperSlide>
            {({isActive})=>(<div className={`h-[calc(100vh-40px)] min-h-[500px] w-full relative`}>
                <img src='/Images/slide-03.jpg' alt="" className="object-cover h-full w-full" />
                <div className="absolute left-0 top-0 flex  justify-center items-center w-full z-10 h-full">
                   <div className="max-w-[1195px] w-full p-2">
                      <h1 className={`capitalize font-[Poppins] text-xl leading-relaxed md:text-[28px] my-5 origin-left text-text-black ${isActive?'animate-[rollIn_1s]':''}`}>Footwear Collection {new Date().getFullYear()}</h1>
                      <h1 className={`uppercase font-['PlayfairDisplay-Bold'] text-[34px] md:text-6xl leading-none font-bold text-text-black mb-10 transition-opacity delay-[800ms] ${isActive?'animate-[lightSpeedIn_1s_800ms] opacity-100':'opacity-0'}`}>Latest Sneakers</h1>
                      <button className={`transition-opacity delay-[1600ms] font-[Poppins] ${isActive?"animate-[slideInUp_1s_1600ms] opacity-100":"opacity-0"}`}>
                        <Link to='/products?price=[0]&color=&category=footwears&sortBy={"createdAt":-1}&page=1&sortBy=null' className='text-white rounded-full uppercase w-fit bg-Purple py-3 px-9 transition-colors duration-500 hover:bg-bg-black '>SHOP NOW</Link>
                      </button>
                   </div>
                </div>
            </div>)}
        </SwiperSlide>
      </Swiper>
    </>
  );
}
