import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoading:true,
    products : [],
    productCount : 0,
    error : null
}

export const getProducts = createAsyncThunk("products/get",async(params,ThunkAPI)=>{
    try {
        const { keyword,page,category,price,tags=[],sort,color,outOfStock } = params;
        
        let query = `/api/v1/products?keyword=${keyword?keyword:""}&page=${page}&sortBy=${(sort&&sort+""!="null")?sort:'{"numofReviews":-1,"_id":-1}'}`;

        if(tags.length>=1){
            query+=`&tags=[${tags}]`;
        }

        if(price){
            if(price.length===2) query+=`&price[gte]=${price[0]}&price[lte]=${price[1]}`;
            else query+=`&price[gte]=${price[0]}`;
        }

        if(outOfStock){
            query +=`&quantity[gte]=0`
        }
        else query+=`&quantity[gt]=0`

        if(color&&color!="null"){
            query+=`&color=${color}`
        }
        if(category&&category!="null"){
            query+=`&category=${category}`
        }
        
        const { data } = await axios.get(query, {
            signal: ThunkAPI.signal,
          });
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers : {
        clearErrors : (state,action) => {
            state.error = null;
        }
    },
    extraReducers:{
        [getProducts.pending] : (state) => {
            state.isLoading=true;
        },
        [getProducts.fulfilled] : (state,action) => {
            state.isLoading = false;
            state.products = action.payload.products;
            state.productCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
        },
        [getProducts.rejected] : (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;