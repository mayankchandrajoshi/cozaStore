import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadingBlogs: true,
  blogs: [],
  blogsCount: 0,
  blogsError: null,
};

export const getBlogs = createAsyncThunk("/blogs", async (params, ThunkAPI) => {
  try {
    const { keyword,category,page,tags } = params;
    let query = `/api/v1/blogs?keyword=${keyword?keyword:""}&page=${page}`;

    if(category){
      query+=`&category=${category}`
    }

    if(tags&&tags.length>=1){
      query+=`&tags=[${tags}]`;
    }
    const { data } = await axios.get(query);
    return data;
  } catch (error) {
    ThunkAPI.rejectWithValue(error.response.data.error);
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: {
    [getBlogs.pending]: (state) => {
        state.isLoadingBlogs=true;
        state.blogsError = null
    },
    [getBlogs.fulfilled]: (state,action) => {
        state.isLoadingBlogs= false;
        state.blogs = action.payload.blogs;
        state.blogsCount = action.payload.blogsCount;
        state.blogsPerPage = action.payload.blogsPerPage
        
    },
    [getBlogs.rejected] : (state,action) =>{
        state.isLoadingBlogs  = false;
        state.blogsError   = action.payload;
    }
  },
});


export default blogSlice.reducer;