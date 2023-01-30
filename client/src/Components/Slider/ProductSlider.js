import React, { memo, useState } from "react";
import ProductDetailModal from "../Modals/ProductDetailModal";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation} from "swiper";

import ProductCard from '../../Components/Product/ProductCard'
import './ProductSlider.css'

const ProductSlider = ({data}) => {
  const [modalData,setModalData] = useState(null);
  const [showProductModal,setShowProductModal]=useState(false);

  return (
    <div className=''>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          520: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          991: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
        
      >
        {
            data.map(item=>(
                <SwiperSlide key={item._id}><ProductCard data={item} setModalData={setModalData} setShowProductModal={setShowProductModal}/></SwiperSlide>
            ))
        }
      </Swiper>
      <ProductDetailModal data={modalData} showProductModal={showProductModal} setShowProductModal={setShowProductModal} setModalData={setModalData}/>
    </div>
  )
}

export default memo(ProductSlider);