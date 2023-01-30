import React, { useEffect, useState } from 'react'
import MetaData from '../../Utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCartItems,clearErrors, setError } from '../../features/cart/cartSlice'
import Loader from '../../Components/Loader/Loader'
import axios from 'axios'
import { toast } from 'react-toastify';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    })
}

const CheckOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoadingCart,cartItems,totalCartCost,error,message } = useSelector(state=>state.cart);
    const [ isLoadingButton,setLoadingButton ] = useState(false);
    const { isLoadingAddress,address} = useSelector(state=>state.address);

    useEffect(()=>{
        if((!cartItems||cartItems.length==0)||!address){
            navigate("/cart");
        }else{
            window.scrollTo({top:0,behavior:"smooth"});
        }
    },[])
    
    useEffect(()=>{
        if(error){
            toast.error(message,{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(clearErrors());
        }
    },[error])
    
    const handlePayment = async()=>{
        try {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!res) {
                toast.error("Razorpay SDK failed to load. Are you online?",{
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }

            const config = {headers:{"Content-Type": "application/json"}}
            const  { data: { key } } = await axios.get("/api/v1/payment/getkey");
            const {data :{order}} = await axios.post("/api/v1/payment/create",{amount:totalCartCost+(totalCartCost>2000?0:100)},config);

            const {data:{order:userOrder}}=await axios.post("/api/v1/orders/create",{
                orderItems:cartItems.map((item)=>(
                    {
                        name:item.name,
                        price:item.product.price,
                        size:item.itemSize,
                        color:item.itemColor,
                        image:item.image,
                        quantity:item.quantity,
                        product:item.product._id
                    }
                )),
                shippingInfo:address,
                itemsPrice:totalCartCost,
                shippingPrice:totalCartCost>2000?0:100,
            });
            
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                // description:"",
                name: "CozaStore",
                // image: "/Images/logo.png",
                order_id: order.id,
                handler: async (res) => {
                    try {
                        await axios.post("/api/v1/payment/verify",{orderId:userOrder[0]._id,...res});
                        await axios.delete("/api/v1/cart/all");
                        dispatch(getCartItems()).then(()=>{
                            navigate("/payment");
                            setLoadingButton(false);
                        })
                    } catch (error) {
                        await axios.delete(`/api/v1/order/${userOrder[0]._id}`);
                        toast.error("Order not placed.You will get refunded if money got deducted",{
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        setLoadingButton(false);
                    }
                },
                modal: {
                    escape:false,
                    handleback:false,
                    ondismiss: async function(){
                        await axios.delete(`/api/v1/order/${userOrder[0]._id}`);
                        await axios.delete(`/api/v1/refund/${order.id}`);
                        setLoadingButton(false);
                    },
                    remember_customer:true
                },
                theme: {
                    color: "#FFFFFF"
                },
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            dispatch(getCartItems()).then(()=>{
                setLoadingButton(false);
                window.scrollTo({top:0,behavior:"smooth"});
                dispatch(setError("Order not created"));
            })
        }
    }

  return (
    isLoadingCart||isLoadingAddress?<div className="w-screen h-screen flex"><Loader/></div>:<><MetaData title={'Checkout'}/>
    <div className="flex justify-center font-[Poppins] mt-20 mb-20 md:mt-28 text-[13px]">
        <div className="max-w-6xl w-full grid tablet:grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 min-h-screen p-2 tablet:p-5">
        <div className="border-x-[1px] border-solid border-grey3 h-fit hidden tablet:block">
                <table className="w-full text-xs">
                    <thead className='p-5'>
                        <tr className='uppercase font-black border-y border-solid border-grey3 text-left'>
                            <th className='p-4'>Product</th>
                            <th className='p-4'>Price</th>
                            <th className='p-4'>Size and Color</th>
                            <th className='p-4'>Quantity</th>
                            <th className='p-4'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        cartItems.map((cartItem,index)=>(
                            <tr className='text-base border-b-[1px] border-solid border-grey3' key={index}>
                                <td className='text-bg-Grey p-5 flex flex-col items-center justify-center gap-4'>
                                    <img src={cartItem.image} alt="" className="w-16 aspect-[9/14] object-cover object-center" />
                                    <div>{cartItem.name.substring(0,8)}{cartItem.name.length>8?"...":""}</div>
                                </td>
                                <td className='text-bg-Grey p-5'>₹{cartItem.product.price}</td>
                                <td className='text-bg-Grey p-5'>{cartItem.itemSize+" "+cartItem.itemColor}</td>
                                <td className='text-bg-Grey p-5'>
                                    {cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<cartItem.quantity?(cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<=0?<div className='text-lg text-red-600 font-medium break-words'>Out of Stock</div>:<div className='text-lg text-red-600 font-medium break-words'>Not Enough stock</div>):cartItem.quantity}
                                </td>
                                <td className='text-bg-Grey p-5'>₹{cartItem.product.price*cartItem.quantity}</td>
                            </tr>
                        ))
                       }
                    </tbody>
                </table>
        </div>
        <div className="tablet:hidden">
            {
                cartItems.map(cartItem=>(
                    <div className="p-2 border-[1px] border-solid border-grey3 mb-2 rounded-md" key={cartItem._id}>
                        <div>
                            <img src={cartItem.image} alt="" className="w-full aspect-[4/5] object-center object-cover" />
                            <div className='mt-2 capitalize font-bold text-sm line-clamp-2'>{cartItem.name}</div>
                        </div>
                        <div className="p-1 pt-4 sm:px-4 flex justify-between flex-wrap">
                            {cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<cartItem.quantity?(cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<=0?<div className='w-full text-base text-red-600 font-medium break-words text-center'>Out of Stock</div>:<div className='w-full text-base text-red-600 font-medium break-words text-center'>Not Enough stock</div>):<>
                                <h1 className="w-fit font-medium">Quantity :</h1>
                                <div className='w-fit'>{cartItem.quantity}</div></>
                            }
                        </div>
                        <div className="p-1 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Price :</h1>
                            <h2 className="w-fit">
                            ₹{cartItem.product.price}
                            </h2>
                        </div>
                        <div className="p-1 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Size :</h1>
                            <h2 className="w-fit">
                            {cartItem.itemSize}
                            </h2>
                        </div>
                        <div className="p-1 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Color :</h1>
                            <h2 className="w-fit capitalize">
                            {cartItem.itemColor}
                            </h2>
                        </div>
                        <div className="p-1 sm:px-4 flex justify-between flex-wrap">
                            <h1 className="w-fit font-medium">Total :</h1>
                            <h2 className="w-fit capitalize">
                            ₹{cartItem.product.price*cartItem.quantity}
                            </h2>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="">
            <div className="border-[1px] border-solid border-grey3 p-2 sm:p-4 tablet:p-8 flex flex-col gap-2 md:gap-5">
                <div className="">
                    <h1 className="uppercase text-xl font-black mb-2 md:mb-0">Order totals</h1>
                </div>
                <div className="flex text-base md:text-lg justify-between flex-wrap">
                    <h1 className="w-max">Subtotal:</h1>
                    <h2 className="w-max">
                        ₹{totalCartCost}
                    </h2>
                </div>
                <div className="flex text-base md:text-lg justify-between flex-wrap">
                    <h1 className="w-max">Shipping Cost :</h1>
                    <h2 className="w-max">
                        ₹{totalCartCost>2000?0:100}
                    </h2>
                </div>
                <div className="">
                    <h1 className="text-base md:text-lg mb-2">Shipping:</h1>
                    <div className="grid grid-col-1 md:grid-cols-2 gap-2 md:gap-4">
                            <div className="font-medium">Phone Number</div>
                            <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{address.phoneNo}</span></div>
                            <div className="font-medium">House No./Building Name</div>
                            <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{address.house}</span></div>
                            <div className="font-medium">Road name/Area/Colony</div>
                            <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{address.area}</span></div>
                            <div className="font-medium">State</div>
                            <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{address.state}</span></div>
                            <div className="font-medium">PinCode</div>
                            <div className="flex"> <span className="mr-2 hidden md:inline">:</span><span className="">{address.pincode}</span></div>
                        
                    </div>
                </div>
                <div className="flex justify-between text-base md:text-lg flex-wrap">
                    <h1 className="w-max">Total :</h1>
                    <span className="w-max">₹{totalCartCost+(totalCartCost>2000?0:100)}</span>
                </div>
                <div className="">
                    <button className="w-full mt-5 text-sm tablet:text-base p-2 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple uppercase" type='submit' onClick={()=>{setLoadingButton(true);handlePayment()}}>{isLoadingButton?<img className="mx-auto w-7 h-7" src="/Images/icons/buttonLoaderImage..gif"/>:<>Proceed to Payment</>}</button>
                </div>
            </div>
        </div>
        </div>
    </div>
</>
  )
}

export default CheckOut;