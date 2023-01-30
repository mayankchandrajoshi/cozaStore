import React, { useEffect, useState } from 'react'
import MetaData from '../../Utils/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { MdLink } from 'react-icons/md'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux'
import { clearOrdersError, getMyOrders } from '../../features/order/orderSlice'
import Loader from '../../Components/Loader/Loader'
import { toast } from 'react-toastify';
import { TbFaceIdError } from 'react-icons/tb'

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoadingOrders,orders,totalOrdersCount,orderPerPage,ordersError} = useSelector(state=>state.order);
  const[ page,setPage]=useState(1);

  useEffect(()=>{
    dispatch(getMyOrders(page));
    window.scrollTo({top:0,behavior:"smooth"});
  },[page])

  useEffect(()=>{
    if(ordersError){
      toast.error(ordersError,{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearOrdersError());
    }
  },[ordersError])
  
  const HandlePageChange=(e,number)=>{
    setPage(number);
  }

  return (
    isLoadingOrders?<div className="w-screen h-screen flex"><Loader/></div>:<>
    <MetaData title={'My Orders'}/>
    {orders.length>0?<>
      <div className="font-[Poppins] mt-28 mb-20 text-[13px] min-h-screen p-5 hidden md:block">
        <div className="mx-auto max-w-6xl w-full">
          <h1 className="uppercase text-xl font-black mb-4">Your orders</h1>
          {
            <table className="w-full text-xs border-solid border-grey3 border-[1px]">
              <thead className='p-5'>
                  <tr className='uppercase font-black border-solid border-grey3 border-b-[1px] text-left'>
                    <td className="p-4">Order Id</td>
                    <td className="p-4">Total Cost</td>
                    <td className="p-4">Delivery Status</td>
                    <td className="p-4">Details</td>
                  </tr>
                </thead>
                <tbody className="">
                {
                  orders.map(order=>(
                      <tr className="text-base border-solid border-grey3 border-b-[1px]" key={order._id}>
                        <td className="text-bg-Grey p-5 break-all">{order._id}</td>
                        <td className="text-bg-Grey p-5 break-all">₹{order.itemsPrice+order.shippingPrice}</td>
                        <td className="text-bg-Grey p-5 break-all">{order.orderStatus}</td>
                        <td className="text-bg-Grey p-5 break-all transition-all duration-500 hover:text-Purple text-2xl">
                          <Link to={`/order/${order._id}`}><MdLink/></Link>
                        </td>
                      </tr>
                  ))
                }
                </tbody>
              </table>
          }
          <div className="mt-10 w-fit mx-auto">
              {
                totalOrdersCount>orderPerPage&&<Stack spacing={2}>
                <Pagination count={(totalOrdersCount%orderPerPage===0?Math.trunc(totalOrdersCount/orderPerPage):(Math.trunc(totalOrdersCount/orderPerPage)+1))} showFirstButton showLastButton page={page} onChange={HandlePageChange} />
              </Stack>
              }
          </div>
        </div>
      </div>
      <div className="font-[Poppins] my-16 text-[13px] p-2 md:p-5 flex flex-col gap-4 md:hidden">
        <h1 className="uppercase text-xl font-black mx-auto">Your orders</h1>
        {
          orders.map(order=>(
            <div className="p-2  border-solid border-grey3 border-[1px] flex flex-col gap-2" key={order._id}>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">OrderId :</span>
                <span className="w-fit break-all">{order._id}</span>
              </div>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">Delivery Status :</span>
                <span className=" w-fit">{order.orderStatus}</span>
              </div>
              <div className="flex justify-between flex-wrap">
                <span className="font-medium w-fit">Total Pirce :</span>
                <span className=" w-fit break-all">₹{order.itemsPrice+order.shippingPrice}</span>
              </div>
              <Link to={`/order/${order._id}`} className="">
                <button className="w-full mt-3 text-sm p-2 transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple uppercase" >View Details</button>
              </Link>
          </div>
          ))
        }
      </div>
    </>:
    <div className='font-[Poppins] mt-28 mb-20 text-[13px] p-2 md:p-5 flex justify-center items-start'>
      <div className="w-full border-solid border-grey3 border-[1px] flex flex-col items-center h-max p-5">
          <TbFaceIdError className='text-9xl md:text-[250px]'/>
          <span className="text-2xl font-bold">No Orders</span>
          <button className="w-max mt-5 text-xs sm:text-sm tablet:text-base p-3 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple uppercase" onClick={()=>navigate("/products")}>Continue Shopping</button>
      </div>
    </div>}
  </>
  )
}

export default Order