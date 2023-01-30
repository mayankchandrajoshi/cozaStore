import React, { useEffect, useRef, useState } from 'react'
import MetaData from '../../Utils/MetaData'
import { MdFilterList,MdOutlineSearch,MdClose } from 'react-icons/md'
import ProductCard from '../../Components/Product/ProductCard';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../features/product/productSlice';
import Loader from '../../Components/Loader/Loader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductDetailModal from '../../Components/Modals/ProductDetailModal';
import NoProduct from '../../Components/Product/NoProduct';

const categories = [
  { name:"All Products",category:null},
  { name:"Women",category:"women" },
  { name:"Men",category:"men" },
  { name:"Bags",category:"bags" },
  { name:"Footwears",category:"footwears" },
  { name:"Watches",category:"watches" }
]

const sortingFilters = [
  { name:"Default",sortBy:"null" },
  { name:"Popularity",sortBy:'{"sold":-1,"_id":-1}' },
  { name:"Average Rating",sortBy:'{"rating":-1,"_id":-1}' },
  { name:"Newness",sortBy:'{"createdAt":-1,"_id":-1}' },
  { name:"Price: Low to High",sortBy:'{"price":1,"_id":-1}' },
  { name:"Price: High to Low",sortBy:'{"price":-1,"_id":-1}' }
];

const priceFilters = [
  { name:"All",range:"[0]" },
  { name:"₹0.00 - ₹500.00",range:"[0,500]" },
  { name:"₹500.00 - ₹1000.00",range:"[500,1000]" },
  { name:"₹1000.00 - ₹5000.00",range:"[1000,5000]" },
  { name:"₹5000.00 - ₹20000.00",range:"[5000,10000]" },
  { name:"₹20000.00+" , range:"[20000]" }
]

const colorFilters = [
  { name:"black",color:"bg-black" },
  { name:"brown",color:"bg-orange-900" },
  { name:"blue",color:"bg-blue-700" },
  { name:"green",color:"bg-green-700" },
  { name:"yellow",color:"bg-yellow-500" },
  { name:"red",color:"bg-red-600" },
  { name:"white",color:"bg-white" }
]

const Products = () => {

  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const [ searchParams ]= useSearchParams();

  const searchRef = useRef();

  const [ showFilter,setShowFilter ] = useState(false);
  const [ showSearch,setShowSearch ] = useState(false);
  const [modalData,setModalData] = useState(null);
  const [showProductModal,setShowProductModal]=useState(false);

  const { isLoading,products,productCount,error,resultPerPage} = useSelector(state=>state.products);

  useEffect(()=>{
    const promise = dispatch(getProducts({keyword:searchParams.get("s")?searchParams.get("s"):"",page:searchParams.get("page"),sort:searchParams.get("sortBy"),price:JSON.parse(searchParams.get("price")),color:searchParams.get("color"),category:searchParams.get("category"),outOfStock:searchParams.get("outOfStock")==="true"}));
    window.scrollTo({top:0,behavior:"smooth"});
    return()=>{
      promise.abort();
    }
  },[searchParams])

  const handleShowSearch=()=>{
    setShowFilter(false);
    setShowSearch(!showSearch);
  }

  const handleFilterSearch=()=>{
    setShowSearch(false);
    setShowFilter(!showFilter);
  }

  const handleSearchProduct = (e) =>{
    e.preventDefault();
    navigate(`/products?s=${searchRef.current.value}&price=${searchParams.get("price")}&color=${searchParams.get("color")}&category=${searchParams.get("category")}&page=${searchParams.get("page")}&sortBy=${searchParams.get("sortBy")}&outOfStock=${searchParams.get("outOfStock")==="true"}`);
  }

  const handlePagination = (e,value) =>{
    navigate(`/products?s=${searchParams.get("s")?searchParams.get("s"):""}&price=${searchParams.get("price")}&color=${searchParams.get("color")}&category=${searchParams.get("category")}&page=${value}&sortBy=${searchParams.get("sortBy")}&outOfStock=${searchParams.get("outOfStock")==="true"}`);
  }
  return (
    <>
    <MetaData title={'Product'}/>
    <div className="min-h-[calc(100vh-40px)] mt-5 md:mt-20 p-2 md:p-4">
        <div className='flex justify-center font-[Poppins] pt-16 pb-20 text-[13px]'>
            <div className='max-w-[1195px] w-full'>
                <div className="flex flex-wrap gap-5">
                   <div className="grow">
                      <ul className="flex text-base text-text-Grey gap-x-7 gap-y-2 md:gap-y-4 flex-wrap">
                        {categories.map((cat,index)=><li className={`underline-offset-2 leading-loose hover:text-text-black hover:underline transition-all duration-500 cursor-pointer ${cat.category+""==searchParams.get("category")+""?"text-text-black underline":"no-underline"}`} onClick={(e)=>{navigate(`/products?s=${searchParams.get("s")?searchParams.get("s"):""}&price=${searchParams.get("price")}&color=${searchParams.get("color")}&category=${cat.category}&page=1&sortBy=${searchParams.get("sortBy")}&outOfStock=${searchParams.get("outOfStock")==="true"}`)}} key={index}>{cat.name}</li>)}
                      </ul>
                   </div>
                   <div className="flex gap-5 text-sm text-text-Grey flex-wrap justify-center">
                    <div className={`flex items-center gap-1 border-solid border-[1px] text-text-Grey border-slate-200 ss py-2 px-4 hover:bg-Purple hover:text-white transition-colors duration-500 ${showFilter?'bg-slate-100':''} transition-colors duration-500`} onClick={handleFilterSearch}>
                      {showFilter?<MdClose  className='text-lg'/>:<MdFilterList  className='text-lg'/>}
                      <h1 className="">Filter</h1>
                    </div>
                    <div className={`flex items-center gap-1 border-solid border-[1px] border-slate-200 py-2 px-4 hover:bg-Purple hover:text-white ${showSearch?'bg-slate-100':''} transition-colors duration-500`} onClick={handleShowSearch}>
                      {showSearch?<MdClose  className='text-lg'/>:<MdOutlineSearch sx={{fontSize:"18px"}}/>}
                      <h1 className="">Search</h1>
                    </div>
                   </div>
                   <div className=""></div>
                </div>
                <div className="my-5">
                    <div className={`transition-[max-height] duration-500 delay-100 overflow-hidden origin-top ${showSearch?'max-h-[100px]':'max-h-0'}`}>
                      <form className={`p-4 border-solid border-[1px] overflow-hidden border-slate-200 flex text-base items-center gap-4`} onSubmit = {handleSearchProduct}>
                        <MdOutlineSearch className='text-lg shrink-0'/>
                        <input type="text" className="flex-1 outline-none border-none overflow-hidden placeholder:text-text-black" placeholder='Search..' defaultValue={searchParams.get("s")?searchParams.get("s"):""} ref={searchRef}/>
                      </form>
                    </div>
                    <div className={`transition-[max-height] overflow-hidden origin-top ${showFilter?'max-h-[1200px] duration-1000':'max-h-0 duration-700'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 tablet:grid-cols-4 justify-between p-5 md:p-10 bg-slate-200 gap-3">
                            <div className="">
                              <h1 className="text-lg font-bold mb-3">Sort By</h1>
                              <ul className="">
                                {sortingFilters.map((filter,index)=><li className={`text-[15px] text-text-Grey mb-2 cursor-pointer ${filter.sortBy===searchParams.get("sortBy")?"text-text-black font-medium":""}`} onClick={()=>navigate(`/products?s=${searchParams.get("s")?searchParams.get("s"):""}&price=${searchParams.get("price")}&color=${searchParams.get("color")}&category=${searchParams.get("category")}&page=1&sortBy=${filter.sortBy}&outOfStock=${searchParams.get("outOfStock")==="true"}`)} key={index}>{filter.name}</li>)}
                              </ul>
                            </div>
                            <div className="">
                            <h1 className="text-lg font-bold mb-3">Price</h1>
                              <ul className="">
                                {priceFilters.map((filter,index)=><li className={`text-[15px] text-text-Grey mb-2 cursor-pointer ${filter.range===searchParams.get("price")?"text-text-black font-medium":""}`} onClick={()=>navigate(`/products?s=${searchParams.get("s")?searchParams.get("s"):""}&price=${filter.range}&color=${searchParams.get("color")}&category=${searchParams.get("category")}&page=1&sortBy=${searchParams.get("sortBy")}&outOfStock=${searchParams.get("outOfStock")==="true"}`)} key={index}>{filter.name}</li>)} 
                              </ul>
                            </div> 
                            <div className="">
                              <h1 className="text-lg font-bold mb-3">Color</h1>
                              <ul className="">
                                {colorFilters.map((filter,index)=>(
                                  <li className={`text-[15px] text-text-Grey mb-2 cursor-pointer ${filter.name==searchParams.get("color")?"text-text-black font-medium":""}`} key={index} onClick={(e)=>navigate(`/products?s=${searchParams.get("s")?searchParams.get("s"):""}&price=${searchParams.get("price")}&color=${filter.name}&category=${searchParams.get("category")}&page=1&sortBy=${searchParams.get("sortBy")}&outOfStock=${searchParams.get("outOfStock")==="true"}`)}>
                                    <span className={`mr-2 w-3 h-3 ${filter.color} inline-block rounded-full`}></span>
                                    <span className="capitalize">{filter.name}</span>
                                  </li>))}
                              </ul>
                            </div>
                            <div className="">
                              <h1 className="text-lg font-bold mb-3">Availability</h1>
                              <div className="flex gap-2 items-center">
                                <input type="checkbox" name="" id="" className='w-4 h-4  checked:accent-Purple' checked={searchParams.get("outOfStock")==="true"} onChange={(e)=>navigate(`/products?s=${searchParams.get("s")?searchParams.get("s"):""}&price=${searchParams.get("price")}&color=${searchParams.get("color")}&category=${searchParams.get("category")}&page=1&sortBy=${searchParams.get("sortBy")}&outOfStock=${!(searchParams.get("outOfStock")==="true")}`)}/><span className="">Include out of Stock</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading?<div className="w-full h-[50vh] flex"><Loader/></div>:(<div className="transition-all duration-500">
                  {
                    productCount==0?<NoProduct/>:<div className="grid grid-cols-1 md:grid-cols-2 tablet:grid-cols-3 lg:grid-cols-4 gap-7">
                      {
                        products.map((item)=>(
                          <ProductCard data={item} key={item._id} setModalData={setModalData} setShowProductModal={setShowProductModal}/>
                        ))
                      }
                  </div>
                  }
                  {
                    productCount>resultPerPage&&
                      <div className="flex justify-center mt-5">
                        <Pagination count={(productCount%resultPerPage===0?Math.trunc(productCount/resultPerPage):(Math.trunc(productCount/resultPerPage)+1))} variant="outlined" page={Number(searchParams.get("page"))} onChange={handlePagination} />
                    </div>
                   }
                </div>)}
            </div>
        </div>
    </div>
  <ProductDetailModal data={modalData} showProductModal={showProductModal} setShowProductModal={setShowProductModal} setModalData={setModalData}/>
</>
  
  )
}

export default Products