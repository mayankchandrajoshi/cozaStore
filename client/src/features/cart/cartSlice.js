import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState ={
    isLoadingCart:false,
    cartItems : [],
    totalCartCost : 0,
    success:false,
    error:false,
    message:null
}

export const addCartItem = createAsyncThunk("cart/add",async(cartData,ThunkAPI)=>{
    try{
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } =await axios.post("/api/v1/cart",cartData,config);
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
});

export const getCartItems = createAsyncThunk("cart/get",async(cartData,ThunkAPI)=>{
    try{
        const { data } =await axios.get("/api/v1/cart");
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    } 
})

export const updateCartItem = createAsyncThunk("/cart/update",async(cartData,ThunkAPI)=>{
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.patch("/api/v1/cart",{cartItemId:cartData[0],newQuantity:cartData[1]},config);
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const deleteCartItem = createAsyncThunk('cart/delete',async(cartItemId,ThunkAPI)=>{
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.delete("/api/v1/cart",{...config,data:{cartItemId}});
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})


const cartSlice = createSlice ({
    name:"cart",
    initialState,
    reducers : {
        setLoading : (state)=>{
            state.isLoadingCart = true;
        },
        clearLoading : (state ) =>{
            state.isLoadingCart = false;
        },
        clearErrors : (state) => {
            state.error = false;
            state.message = null;
        },
        clearSuccess : (state) => {
            state.success = false;
            state.message = null;
        },
        setError : (state,action) => {
            state.error = true;
            state.message = action.payload;
        },
        clearCart : (state,action) => {
            state.cartItems = [];
            state.totalCartCost = 0;
        }
    },
    extraReducers:{
        [addCartItem.pending] : (state,action)=>{
            state.isLoadingCart = true;
        },
        [addCartItem.fulfilled] : (state,action) => {
            state.isLoadingCart = false;
            state.success  = true;
            state.message  = "Item added to Cart";
        },
        [addCartItem.rejected ] : (state,action) => {
            state.isLoadingCart = false;
            state.error = true;
            state.message = action.payload;
        },
        [getCartItems.pending] : (state,action)=>{
            state.isLoadingCart = true;
        },
        [getCartItems.fulfilled] : (state,action) => {
            state.isLoadingCart = false;
            state.cartItems = action.payload.cartItems;
            state.totalCartCost = action.payload.cartItems.reduce((acc,item)=>{
                return acc+item.product.price*item.quantity;
            },0)
        },
        [getCartItems.rejected ] : (state,action) => {
            state.isLoadingCart = false;
            state.error = true;
            state.message = action.payload;
        },
        [updateCartItem.pending] : (state,action)=>{
            state.isLoadingCart = true;
        },
        [updateCartItem.fulfilled] : (state,action) => {
            state.isLoadingCart = false;
            state.success= true;
            state.message = "Cart item updated";
        },
        [updateCartItem.rejected ] : (state,action) => {
            state.isLoadingCart = false;
            state.error = true;
            state.message = action.payload;
        },
        [deleteCartItem.pending] : (state,action)=>{
            state.isLoadingCart = true;
        },
        [deleteCartItem.fulfilled] : (state,action) => {
            state.isLoadingCart = false;
            state.success = true;
            state.message = "Cart item deleted";
        },
        [deleteCartItem.rejected ] : (state,action) => {
            state.isLoadingCart = false;
            state.error = true;
            state.message = action.payload;
        },
    }
})


export const { clearErrors ,clearSuccess,clearCart,setLoading,clearLoading,setError } = cartSlice.actions;
export default cartSlice.reducer;