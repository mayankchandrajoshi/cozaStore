import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoadingAddress : true,
    address : null,
    successAddress : false,
    errorAddress : null
}

export const setAddress = createAsyncThunk("/me/address",async(address,ThunkApi)=>{
    try {
        const {data} = await axios.get(`https://api.postalpincode.in/pincode/${address.pincode}`);
        if(!data[0].PostOffice) return ThunkApi.rejectWithValue("Please Enter valid Pincode");

        const pinCodeState = data[0].PostOffice[0].State;
        if(pinCodeState!=address.state)return ThunkApi.rejectWithValue(`This pincode is not available for ${address.state}`);

        localStorage.setItem("address",JSON.stringify(address));
        
        return ThunkApi.fulfillWithValue(address);
    } catch (error) {
       return ThunkApi.rejectWithValue("This is currently unavailable.Sorry for inconvience");
    }
})

const addressSlice = createSlice({
    name:'address',
    initialState,
    reducers:{
        setAddressLoading : (state,action) => {
            state.isLoadingAddress = true;
        },
        clearAddressLoading : (state,action) => {
            state.isLoadingAddress = false;
        },
        clearAddressError : (state,action)=>{
            state.errorAddress = null;
        },
        clearAddressSuccess : (state,action) =>{
            state.successAddress= false;
        },
        loadAddress : (state,action)=>{
            state.address = JSON.parse(localStorage.getItem("address"));
        }
    },extraReducers:{
        [setAddress.pending]:(state,action)=>{
            state.isLoadingAddress = true;
        },
        [setAddress.fulfilled] : (state,action) => {
            state.isLoadingAddress = false;
            state.address = action.payload;
            state.successAddress = true;
        },
        [setAddress.rejected] : (state,action) =>{
            state.isLoadingAddress = false;
            state.errorAddress = action.payload;
        }
    }
})

export const {setAddressLoading,clearAddressLoading,clearAddressError,clearAddressSuccess,loadAddress} = addressSlice.actions;
export default addressSlice.reducer;