import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoadingBlog : true,
    blog : {},
    myComment : "",
    blogError: null,
    blogSuccess : null,
}

export const getBlogDetails = createAsyncThunk("/blog/details",async(id,ThunkAPI)=>{
    try {
        const {data} = await axios.get(`/api/v1/blog/${id}`);
        return data;
    } catch (error) {
        ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const createBlogComment = createAsyncThunk("/blog/comment/create",async(blogData,ThunkAPI)=>{
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const {data } = await axios.post(`/api/v1/blogs/review/${blogData.id}`,{"comment":blogData.comment},config)
        return data
    } catch (error) {
        console.log(error);
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const getMyComment = createAsyncThunk("/blog/me/comment",async(id,ThunkAPI)=>{
    try {
        const { data } = await axios.get(`/api/v1/blogs/review/${id}`);
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    } 
})

const blogDetailSlice = createSlice({
    name:"blog",
    initialState,
    reducers : {
        clearBlogErrors : (state) => {
            state.blogError = null;
        },
        clearBlogSuccess : (state) =>{
            state.blogSuccess = null;
        }
    },
    extraReducers:{
        [getBlogDetails.pending] : (state)=>{
            state.isLoadingBlog = true;
        },
        [getBlogDetails.fulfilled] : (state,action) => {
            state.isLoadingBlog = false;
            state.blog = action.payload.blog;

        },
        [getBlogDetails.rejected] : (state,action) => {
            state.isLoadingBlog = false;
            state.blogError = action.payload;
        },
        [createBlogComment.pending] : (state)=>{
            state.isLoadingBlog = true;
        },
        [createBlogComment.fulfilled] : (state,action) => {
            state.isLoadingBlog = false;
            state.blogSuccess = "Your Blog review saved"

        },
        [createBlogComment.rejected] : (state,action) => {
            state.isLoadingBlog = false;
            state.blogError = action.payload;
        },
        [getMyComment.pending] : (state)=>{
            state.isLoadingBlog = true;
        },
        [getMyComment.fulfilled] : (state,action) => {
            state.isLoadingBlog = false;
            state.myComment = action.payload.comment?action.payload.comment.comment:""

        },
        [getMyComment.rejected] : (state,action) => {
            state.isLoadingBlog = false;
            state.blogError = action.payload;
        },
    }
})

export const { clearBlogErrors,clearBlogSuccess } = blogDetailSlice.actions;
export default blogDetailSlice.reducer;