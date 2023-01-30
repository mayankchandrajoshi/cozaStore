import React, { memo, useEffect, useRef } from 'react'
import ProductDetail from '../Product/ProductDetail';
import {MdClose} from 'react-icons/md'

const ProductDetailModal = ({data,showProductModal,setShowProductModal,setModalData}) => {
    const modalRef = useRef(null);
    
    const HideModal=(e)=>{
        if(e.target!=modalRef.current&&!modalRef.current.contains(e.target)){
        setShowProductModal(false);
        setModalData(null);
        };
    }
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen bg-[#000]/80  z-[1200] py-7 md:py-10  overflow-y-scroll transition-all duration-300 ${showProductModal?'visible opacity-100':'invisible opacity-0' }`} onClick={HideModal}>
        <div className="w-[90vw] lg:w-[78vw] h-auto min-h-[110vh] mx-auto flex flex-col">
            <div className="flex justify-end text-white h-[6vh] text-4xl" >
                <MdClose className='cursor-pointer'/>
            </div>
            {showProductModal && <div className='grow flex flex-col' ref={modalRef}>
              <ProductDetail data={data}/>
            </div>}
        </div>
      </div>
  )
}

export default memo(ProductDetailModal)