import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoadingProductReview:true,
    productReviews:[],
    productReview:null,
    productReviewSuccess:null,
    productReviewError:null
}

export const createProductReview = createAsyncThunk("/product/review/create",async(reviewData,ThunkAPI)=>{
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/api/v1/product/create/review",reviewData,config);
        return data;
    } catch (error) {
        console.log(error);
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const getProductReviews = createAsyncThunk("/product/reviews",async(id,ThunkAPI)=>{
    try {
        const { data } = await axios.get(`/api/v1/product/reviews/${id}`);
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const getMyProductReview = createAsyncThunk("/product/review",async(id,ThunkAPI)=>{
    try{
        const {data} = await axios.get(`/api/v1/product/review/${id}`);
        return data;
    } catch (error) {
        if(error.response.data.error==="Product Review not found"){
            return ThunkAPI.fulfillWithValue({productReview:null});
        }
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

const productReviewSlice = createSlice({
    name:"productReview",
    initialState,
    reducers : {
        clearProductReviewError : (state) => {
            state.productReviewError= null;
        },
        clearProductReviewSuccess : (state)=>{
            state.productReviewSuccess = null;
        }
    },
    extraReducers:{
        [createProductReview.pending] : (state,action) => {
            state.isLoadingProductReview = true;
        },
        [createProductReview.fulfilled ] : (state,action) =>{
            state.isLoadingProductReview = false;
            state.productReview  = action.payload.productReview;
            state.productReviewSuccess = "Product Review added"
        },
        [createProductReview.rejected] : (state,action) =>{
            state.isLoadingProductReview  = false;
            state.productReviewError= action.payload;
        },
        [getProductReviews.pending] : (state,action) => {
            state.isLoadingProductReview = true;
        },
        [getProductReviews.fulfilled ] : (state,action) =>{
            state.isLoadingProductReview = false;
            state.productReviews  = action.payload.productReviews;
        },
        [getProductReviews.rejected] : (state,action) =>{
            state.isLoadingProductReview  = false;
            state.productReviewError= action.payload;
        },
        [getMyProductReview.pending] : (state,action) => {
            state.isLoadingProductReview = true;
        },
        [getMyProductReview.fulfilled ] : (state,action) =>{
            state.isLoadingProductReview = false;
            state.productReview  = action.payload.productReview;
        },
        [getMyProductReview.rejected] : (state,action) =>{
            state.isLoadingProductReview  = false;
            state.productReviewError= action.payload;
        }
    }
})

export const { clearProductReviewError,clearProductReviewSuccess } = productReviewSlice.actions;
export default productReviewSlice.reducer;