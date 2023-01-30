import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoadingProduct:true,
    product:null,
}

export const getProductDetails = createAsyncThunk("product/details",async(id,ThunkAPI)=>{
    try{
        const {data} = await axios.get(`/api/v1/product/${id}`)
        return data;
    }
    catch(error){
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})


const productDetailSlice = createSlice({
    name:"product",
    initialState,
    reducers : {
        clearErrors : (state) => {
            state.error = null;
        },
        setProductDetailLoading :(state)=>{
            state.isLoadingProduct = true;
        },
        clearProductDetailLoading : (state)=>{
            state.isLoadingProduct = false;
        }
    },
    extraReducers:{
        [getProductDetails.pending] : (state)=>{
            state.isLoadingProduct = true;
        },
        [getProductDetails.fulfilled] : (state,action) => {
            state.isLoadingProduct = false;
            state.product = action.payload.product;

        },
        [getProductDetails.rejected] : (state,action) => {
            state.isLoadingProduct = false;
            state.error = action.payload;
        }
    }
})

export const { clearErrors } = productDetailSlice.actions;
export default productDetailSlice.reducer;