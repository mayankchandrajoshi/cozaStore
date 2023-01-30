import React, { useEffect } from 'react'
import {MdClose,MdSearch} from 'react-icons/md';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchModal = ({showSearch,HideModal}) => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const [keyword,setKeyword]= useState(searchParams.get("s")?searchParams.get("s"):"");

  const searchProduct = (e) =>{
    e.preventDefault();
    navigate(`/products?s=${keyword}&price=${searchParams.get("price")?searchParams.get("price"):'[0]'}&color=${searchParams.get("color")}&category=${searchParams.get("category")}&page=1&sortBy=${searchParams.get("sortBy")}&outOfStock=${searchParams.get("outOfStock")==="true"}`);
    HideModal();
  }

  useEffect(()=>{
    setKeyword(searchParams.get("s")?searchParams.get("s"):"");
  },[searchParams.get("s")])

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[2000] p-7 tablet:p-10 bg-[rgba(255,255,255,0.9)] ${showSearch?"translate-y-0":"-translate-y-full"} transition-transform duration-500`}>
        <form className="-translate-y-1/4 grow max-w-full lg:max-w-[60vw]" onSubmit={searchProduct}>
            <div className="flex justify-end">
                    <MdClose className='text-5xl' onClick={HideModal}/>
            </div>
            <div className="bg-white p-4 flex items-center border-solid border-grey3 border-2 grow">
                <button type="submit" aria-label="searchProduct" className="mr-3"><MdSearch className='text-5xl'/></button>
                <input type="text" placeholder='Search Product...' className="text-3xl overflow-hidden grow shrink tablet:text-6xl outline-none border-none font-light " value={keyword} onChange={e=>setKeyword(e.target.value)}/>
            </div>
        </form>
    </div>
  )
}

export default SearchModal