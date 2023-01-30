import React, { useEffect, useState } from 'react'
import MetaData from '../../Utils/MetaData'
import {TiMinus ,TiPlus} from 'react-icons/ti'
import { TbFaceIdError } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getCartItems,clearErrors,clearSuccess, updateCartItem, deleteCartItem, setError } from '../../features/cart/cartSlice'
import Loader from '../../Components/Loader/Loader'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { clearAddressError, clearAddressSuccess, loadAddress, setAddress } from '../../features/address/addressSlice'
import { toast } from 'react-toastify';

const allStates = ['Andaman & Nicobar','Andhra Pradesh','Arunachal Pradesh', 'Assam','Bihar', 'Chandigarh' ,  'Chattisgarh', 'Dadra & Nagar Haveli'  , 'Daman & Diu'  , 'Delhi'  ,'Goa' , 'Gujarat' , 'Haryana' , 'Himachal Pradesh',  'Jammu & Kashmir', 'Jharkhand' , 'Karnataka' , 'Kerala' , 'Lakshadweep' ,'Madhya Pradesh' , 'Maharashtra', 'Manipur' , 'Meghalaya'  ,'Mizoram', 'Nagaland', 'Odisha ', 'Pondicherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana' , 'Tripura' , 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoadingCart,cartItems,totalCartCost,success,error,message } = useSelector(state=>state.cart);
    const { address,errorAddress,successAddress } = useSelector(state=>state.address);
    const [ phoneNo,setPhoneNo ] = useState("");
    const [ house,setHouse ] = useState("");
    const [ area,setArea ] = useState("");
    const [ state,setState ] = useState("");
    const [ pincode,setPinCode ] = useState("");
    const [ isLoadingButton,setLoadingButton ] = useState(false);

    const handleQuantity = (data)=>{
        if(data.newQuantity>data.stock) {
            if(data.newQuantity<data.cartItem.quantity){
                dispatch(updateCartItem([data.cartItem._id,data.newQuantity]));
            }
            else return;
        }
        else if(data.newQuantity<=0)dispatch(deleteCartItem(data.cartItem._id));
        else dispatch(updateCartItem([data.cartItem._id,data.newQuantity]));
        dispatch(getCartItems());
    }

    useEffect(()=>{
        dispatch(getCartItems());
        dispatch(loadAddress());
        window.scrollTo({top:0,behavior:"smooth"});
    },[])

    useEffect(()=>{
        if(address){
            setPhoneNo(address.phoneNo)
            setHouse(address.house);
            setArea(address.area);
            setState(address.state);
            setPinCode(address.pincode);
        }
    },[address])
    
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
        if(success){
            toast.success(message,{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(clearSuccess());
        }
    },[error,success])

    const handleCheckOut = async(e)=>{
        setLoadingButton(true);
        if(cartItems.length<1){
            toast.error("Your cart is Empty",{
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
            return;
        }
        if(!phoneNo){
            toast.error("Please enter Phone Number",{
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
            return;
        }
        if(!house){
            toast.error("Please enter house number/Building name",{
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
            return
        }
        if(!area){
            toast.error("Please enter the road number/area/colony name",{
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
            return
        }
        if(!state){
            toast.error("Please select state",{
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
            return
        }
        if(!pincode){
            toast.error("Please enter valid pincode number",{
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
            return;
        }

        for (const cartItem of cartItems){
            if(cartItem.quantity>cartItem.product.size[cartItem.itemSize][cartItem.itemColor]||cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<0){
                dispatch(getCartItems()).then(()=>{
                    window.scrollTo({top:0,behavior:"smooth"});
                    dispatch(setError("Not enough stock"));
                    setLoadingButton(false);
                })
                return;
            }
        }
        await dispatch(setAddress({phoneNo,house,area,state,pincode}));
        setLoadingButton(false);
    }

    useEffect(()=>{
        if(successAddress){
            dispatch(clearAddressSuccess());
            navigate("/Checkout");
            return;
        }
        if(errorAddress){
            toast.error(errorAddress,{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(clearAddressError());
        }
    })

  return (
    isLoadingCart?<div className="w-screen h-screen flex"><Loader/></div>:<><MetaData title={'Shopping Cart'}/>
    <div className="flex justify-center font-[Poppins] mt-20 mb-20 md:mt-28 text-[13px]">
        <div className="max-w-6xl w-full grid tablet:grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 min-h-screen p-2 tablet:p-5">
            {cartItems.length>0?<>
            <div className="border-x-[1px] border-solid border-grey3 h-fit hidden tablet:block">
                <table className="w-full text-xs">
                    <thead className='p-5'>
                        <tr className='uppercase font-black border-solid border-grey3 border-y text-left'>
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
                            <tr className='text-base border-solid border-grey3 border-b-[1px]' key={index}>
                                <td className='text-bg-Grey p-5 flex flex-col items-start justify-center gap-2'>
                                    <img src={cartItem.image} alt="" className="w-16 aspect-[9/14] object-cover object-center" />
                                    <Link to={`/product/${cartItem.product._id}`}  className='capitalize'>{cartItem.name.substring(0,8)}{cartItem.name.length>8?"...":""}</Link>
                                </td>
                                <td className='text-bg-Grey p-5'>₹{cartItem.product.price}</td>
                                <td className='text-bg-Grey p-5'>{cartItem.itemSize+" "+cartItem.itemColor}</td>
                                <td className='text-bg-Grey p-5'>
                                    <div className="flex text-lg border-solid border-grey3 border-[1px] w-32 h-10 justify-start mt-5">
                                        <button className="p-3 flex-1 flex justify-center items-center hover:bg-Purple hover:text-white transition-colors duration-500" name="decrQuantity" onClick={()=>handleQuantity({cartItem,stock:cartItem.product.size[cartItem.itemSize][cartItem.itemColor],newQuantity:cartItem.quantity-1})}><TiMinus/></button>
                                        <div className="p-3 flex-1 flex justify-center items-center bg-slate-100 border-solid border-grey3 border-x-[1px]">{cartItem.quantity}</div>
                                        <button className="p-3 flex-1 flex justify-center items-center hover:bg-Purple hover:text-white transition-colors duration-500" name="incrQuantity" onClick={()=>handleQuantity({cartItem,stock:cartItem.product.size[cartItem.itemSize][cartItem.itemColor],newQuantity:cartItem.quantity+1})}><TiPlus/></button>
                                    </div>
                                    {cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<cartItem.quantity?(cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<=0?<div className='w-full mt-3 text-start text-red-600 font-medium break-words'>Out of Stock</div>:<div className='w-full mt-3 text-start text-red-600 font-medium break-words'>Not Enough stock</div>):<></>}
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
                        <div className="p-2 mb-2 border-[1px] border-solid border-grey3 rounded-md" key={cartItem._id}>
                            <div className=''>
                                <img src={cartItem.image} alt="" className="w-full aspect-[4/5] object-center object-cover" />
                                <Link to={`/product/${cartItem.product._id}`} className='mt-2 capitalize font-bold text-sm line-clamp-2'>{cartItem.name}</Link>
                            </div>
                            <div className="p-1 pt-4 sm:px-4 flex items-center justify-center sm:justify-between gap-2 flex-wrap">
                                <h1 className="w-max font-medium hidden sm:block">Quantity :</h1>
                                <div className="flex text-lg border-solid border-grey3 border-[1px] w-32 h-10">
                                    <button className="p-3 flex-1 flex justify-center items-center hover:bg-Purple hover:text-white transition-colors duration-500" onClick={()=>handleQuantity({cartItem,stock:cartItem.product.size[cartItem.itemSize][cartItem.itemColor],newQuantity:cartItem.quantity-1})}><TiMinus/></button>
                                    <div className="p-3 flex-1 flex justify-center items-center bg-slate-100 border-solid border-grey3 border-x-[1px]">{cartItem.quantity}</div>
                                    <button className="p-3 flex-1 flex justify-center items-center hover:bg-Purple hover:text-white transition-colors duration-500"  onClick={()=>handleQuantity({cartItem,stock:cartItem.product.size[cartItem.itemSize][cartItem.itemColor],newQuantity:cartItem.quantity+1})}><TiPlus/></button>
                                </div>
                            </div>
                            {
                                cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<cartItem.quantity?(cartItem.product.size[cartItem.itemSize][cartItem.itemColor]<=0?<div className="p-1 pt-4 sm:px-4 flex items-center justify-center gap-2 flex-wrap text-base text-red-600 font-medium break-words">Out of Stock</div>:<div className="p-1 pt-4 sm:px-4 flex items-center justify-center gap-2 flex-wrap text-base text-red-600 font-medium break-words">Not Enough stock</div>):<></>
                            }
                            <div className="p-1 pt-4 sm:px-4 flex justify-between flex-wrap">
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
            </>:<div className='flex justify-center items-start'>
                <div className="w-full border-solid border-grey3 border-[1px] flex flex-col items-center h-max p-5">
                    <TbFaceIdError className='text-[150px] md:text-[250px]'/>
                    <span className="text-2xl font-bold">No items in Your Cart</span>
                    <button className="w-max mt-5 text-xs sm:text-sm tablet:text-base p-3 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple uppercase" onClick={()=>navigate("/products?s=&price=[0]&color=&category=null&page=1&sortBy=null")}>Continue Shopping</button>
                </div>
            </div>}
            <div className="">
                <div className="border-[1px] border-solid border-grey3">
                    <div className="p-2 sm:p-4 tablet:p-8">
                        <h1 className="uppercase text-xl font-black">cart totals</h1>
                    </div>
                    <div className="p-2 sm:p-4 tablet:px-8 flex text-base md:text-lg justify-between flex-wrap">
                        <h1 className="w-fit">Subtotal :</h1>
                        <h2 className="w-fit">
                            ₹{totalCartCost}
                        </h2>
                    </div>
                    <div className="p-2 sm:p-4 tablet:px-8 flex text-base md:text-lg justify-between flex-wrap">
                        <h1 className="w-fit">Shipping Cost :</h1>
                        <h2 className="w-fit">
                            ₹{totalCartCost>2000?0:100}
                        </h2>
                    </div>
                    <div className="p-2 sm:p-4 tablet:px-8">
                        <h1 className="text-base md:text-lg">Shipping Details</h1>
                        <form className="text-sm pt-4 justify-start gap-4">
                            <div className='flex flex-col gap-3'> 
                                <TextField required id="outlined-required" label="Phone Number" size="small" inputProps={{ maxLength: 10 }} fullWidth value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/>
                                <TextField required id="outlined-required" label="House No./Building Name" size="small" fullWidth value={house} onChange={(e)=>setHouse(e.target.value)}/>
                                <TextField required id="outlined-required" label="Road name/Area/Colony" size="small" fullWidth value={area} onChange={(e)=>setArea(e.target.value)}/>
                                <TextField id="outlined-select-currency" size='small' fullWidth select label="State" value={state} onChange={(e)=>setState(e.target.value)}>
                                    {
                                        allStates.map(state=><MenuItem key={state} value={state}>{state}</MenuItem>)
                                    }
                                </TextField>
                                <TextField required id="outlined-required" label="Pincode" size="small" fullWidth inputProps={{ maxLength: 6 }} value={pincode} onChange={(e)=>setPinCode(e.target.value)}/>
                            </div>
                        </form>
                    </div>
                    <div className="p-2 sm:p-4 tablet:px-8 flex justify-between text-base md:text-lg flex-wrap">
                        <h1 className="w-fit">Total :</h1>
                        <span className="w-fit">₹{totalCartCost+(totalCartCost>2000?0:100)}</span>
                    </div>
                    <div className="p-2 sm:p-4 md:p-8">
                        <button className="w-full mt-5 text-sm tablet:text-base p-2 md:py-3 md:px-9 transition-all duration-300  rounded-full bg-bg-black text-white hover:bg-Purple uppercase" type='submit' onClick={handleCheckOut}>{isLoadingButton?<img className="mx-auto w-7 h-7" src="/Images/icons/buttonLoaderImage..gif"/>:<>Proceed to Checkout</>}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default Cart