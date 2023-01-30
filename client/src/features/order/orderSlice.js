import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState ={
    isLoadingOrders:true,
    orders:[],
    order:null,
    totalOrdersCount:0,
    orderPerPage :0,
    ordersError : null,
}

// export const createMyOrder = createAsyncThunk("/order/")

export const getMyOrders = createAsyncThunk("/orders/me",async(page,ThunkApi)=>{
    try {
        const query = `/api/v1/orders/me?page=${page?page:1}`;
        const { data } = await axios.get(query);
        return data;
    } catch (error) {
        console.log(error)
        ThunkApi.rejectWithValue(error.response.data.error)
    }
})

export const getOrderDetails = createAsyncThunk("/order/me/detail",async(id,ThunkApi)=>{
    try {
        const { data } = await axios.get(`/api/v1/order/${id}`);
        return data;
    } catch (error) {
        ThunkApi.rejectWithValue(error.response.data.error)
    }
})


const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        clearOrdersError : (state)=>{
            state.ordersError = null;
        }
    },
    extraReducers : {
        [getMyOrders.pending]:(state,action) => {
            state.isLoadingOrders = true;
        },
        [getMyOrders.fulfilled] : (state,action) =>{
            state.isLoadingOrders = false;
            state.orders = action.payload.orders?action.payload.orders:[];
            state.totalOrdersCount = action.payload.totalOrdersCount;
            state.orderPerPage = action.payload.orderPerPage;
        },
        [getMyOrders.rejected] : (state,action) => {
            state.isLoadingOrders = false;
            state.ordersError = action.payload;
        },
        [getOrderDetails.pending] : (state,action) => {
            state.isLoadingOrders = true;
        },
        [getOrderDetails.fulfilled] : (state,action) => {
            state.isLoadingOrders = false;
            state.order = action.payload.order;
        },
        [getOrderDetails.rejected] : (state,action) => {
            state.isLoadingOrders = false;
            state.ordersError = action.payload;
        }
    }
})

export const { clearOrdersError } = orderSlice.actions
export default orderSlice.reducer