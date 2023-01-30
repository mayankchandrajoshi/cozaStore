import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import 'swiper/css/autoplay';

// import required modules
import { EffectFade, Navigation } from "swiper";

import './ProductImageSlider.css'

export default function ProductImageSlider({productImages}) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        navigation={true}
        modules={[EffectFade, Navigation]}
        className="mySwiper ProductImageSlider h-full w-full"
      >
        {
            productImages.map((image)=>(
                <SwiperSlide key={image.url}>
                    {({isActive})=>(<div className="h-full w-full relative">
                        <img src={image.url} alt="" className="object-cover object-center h-full w-full"/>
                    </div>)}
                </SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}
