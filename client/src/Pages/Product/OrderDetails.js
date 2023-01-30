import React, { useEffect } from 'react'
import MetaData from '../../Utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../features/order/orderSlice';
import Loader from '../../Components/Loader/Loader'

const OrderDetails = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {isLoadingOrders,order } = useSelector(state=>state.order);

  useEffect(()=>{
    dispatch(getOrderDetails(id));
  },[id])

  return (
    isLoadingOrders||!order?<div className="w-screen h-screen flex"><Loader/></div>:<>
    <MetaData title={'Order Details'}/>
    <div className="flex justify-center font-[Poppins] mt-20 mb-20 md:mt-28 text-[13px]">
        <div className="max-w-6xl w-full grid tablet:grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 min-h-screen p-2 tablet:p-5">
            <div className="border-solid border-grey3 border-x-[1px] h-fit hidden tablet:block">
                <table className="w-full text-xs">
                    <thead className='p-5'>
                        <tr className='uppercase font-black border-solid border-grey3 border-b-[1px] border-t text-left'>
                            <th className='p-4'>Product</th>
                            <th className='p-4'>Price</th>
                            <th className="p-4">Size</th>
                            <th className="p-4">Color</th>
                            <th className='p-4'>Quantity</th>
                            <th className='p-4'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        order.orderItems.map((item,index)=>(
                            <tr className='text-base border-solid border-grey3 border-b-[1px]' key={index}>
                                <td className='text-bg-Grey p-5 flex flex-col items-center justify-center gap-4'>
                                    <img src={item.image} alt="" className="w-16 aspect-[9/14] object-cover object-center" />
                                    <Link to={`/product/${item.product}`}>{item.name.substring(0,8)}{item.name.length>8?"...":""}</Link>
                                </td>
                                <td className='text-bg-Grey p-5'>{item.price}</td>
                                <td className='text-bg-Grey p-5'>{item.size}</td>
                                <td className='text-bg-Grey p-5'>{item.color}</td>
                                <td className='text-bg-Grey p-5'>
                                    <div className="text-lg mx-auto">
                                        <div className="">{item.quantity}</div>
                                    </div></td>
                                <td className='text-bg-Grey p-5'>${item.price*item.quantity}</td>
                        </tr>
                        ))
                       }
                    </tbody>
                </table>
            </div>
            <div className="tablet:hidden">
            {
                order.orderItems.map(item=>(
                    <div className="p-2 border-solid border-grey3 border-[1px] mb-2 rounded-md" key={item._id}>
                        <div>
                            <img src={item.image} alt="" className="w-full aspect-video object-center object-cover" />
                        </div>
                        <div className="p-1 pt-4 sm:px-4">
                            <h1 className="w-fit text-sm mt-2 capitalize font-bold line-clamp-2">{item.name}</h1>
                        </div>
                        <div className="p-1 pt-4 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Quantity :</h1>
                            <div className='w-fit'>{item.quantity}</div>
                        </div>
                        <div className="p-1 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Price :</h1>
                            <h2 className="w-fit">
                            ₹{item.price}
                            </h2>
                        </div>
                        <div className="p-1 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Size :</h1>
                            <h2 className="w-fit">
                            {item.size}
                            </h2>
                        </div>
                        <div className="p-1 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Color :</h1>
                            <h2 className="w-fit capitalize">
                            {item.color}
                            </h2>
                        </div>
                        <div className="p-1 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Total :</h1>
                            <h2 className="w-fit capitalize">
                            ₹{item.price*item.quantity}
                            </h2>
                        </div>
                    </div>
                ))
            }
            </div>
            <div className="">
                <div className="border-solid border-grey3 border-[1px] p-2 sm:p-4 tablet:p-8 flex flex-col gap-2 md:gap-5">
                        <div className="">
                            <h1 className="uppercase text-xl font-black mb-2 md:mb-0">Order Details</h1>
                        </div>
                        <div className="flex text-base md:text-lg justify-between flex-wrap">
                            <h1 className="w-max">Status:</h1>
                            <h2 className="w-max">
                                {order.orderStatus}
                            </h2>
                        </div>
                        <div className="flex text-base md:text-lg justify-between flex-wrap">
                            <h1 className="w-max">Subtotal:</h1>
                            <h2 className="w-max">
                                ₹{order.itemsPrice}
                            </h2>
                        </div>
                        <div className="flex text-base md:text-lg justify-between flex-wrap">
                            <h1 className="w-max">Shipping Cost :</h1>
                            <h2 className="w-max">
                                ₹{order.shippingPrice}
                            </h2>
                        </div>
                        <div className="">
                            <h1 className="text-base md:text-lg mb-2">Shipping:</h1>
                            <div className="grid grid-col-1 md:grid-cols-2 gap-2 md:gap-4">
                                    <div className="font-medium">Phone Number</div>
                                    <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{order.shippingInfo.phoneNo}</span></div>
                                    <div className="font-medium">House No./Building Name</div>
                                    <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{order.shippingInfo.house}</span></div>
                                    <div className="font-medium">Road name/Area/Colony</div>
                                    <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{order.shippingInfo.area}</span></div>
                                    <div className="font-medium">State</div>
                                    <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{order.shippingInfo.state}</span></div>
                                    <div className="font-medium">PinCode</div>
                                    <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{order.shippingInfo.pincode}</span></div>
                                
                            </div>
                        </div>
                        <div className="flex justify-between text-base md:text-lg flex-wrap">
                            <h1 className="w-max">Total :</h1>
                            <span className="w-max">₹{order.itemsPrice+order.shippingPrice}</span>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</>
)}

export default OrderDetails