import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoadingUser:true,
    isAuthenticated:false,
    user:null,
    userError:null,
    userSuccess:null,
}

export const login = createAsyncThunk("user/login",async(userData,ThunkAPI)=>{
    try {
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } =await axios.post("/api/v1/login",userData,config);

        return data.user;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const register = createAsyncThunk("user/register",async(userData,ThunkAPI)=>{
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        return data.user;

    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const loadUser = createAsyncThunk("user/load",async(data,ThunkAPI)=>{
    try{
        const {data} = await axios.get("/api/v1/me");
        return data.user;
    }
    catch(error){
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})


export const logout = createAsyncThunk("user/logout",async(data,ThunkAPI)=>{
    try{
        await axios.get('/api/v1/logout');
    }
    catch(error){
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const updateUser = createAsyncThunk("user/update",async(newData , ThunkAPI)=>{
    try{
        
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        await axios.put('/api/v1/me/update',newData,config);

        return ThunkAPI.fulfillWithValue("Profile updated Successfully")
    }
    catch(error){
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const changePassword = createAsyncThunk("user/password/change",async(newData,ThunkAPI) => {
    try{
        const config = {headers : {"Content-Type":"application/json"}};
        await axios.put("/api/v1/password/update",newData,config);
    }
    catch(error){
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const forgotPassword = createAsyncThunk("user/password/forgot",async(email,ThunkAPI)=>{
    try {
        const config = {headers : {"Content-Type":"application/json"}};

        const {data} = await axios.post("/api/v1/password/forgot",{email},config);

        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const resetPassword = createAsyncThunk("user/password/reset",async(data,ThunkAPI)=>{
    try {
        const config = {headers : {"Content-Type":"application/json"}};
        await axios.put(`/api/v1/password/reset/${data.token}`,{password:data.password,confirmPassword:data.confirmPassword},config);
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.error);
    }
})


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers : {
        clearUserError : (state) =>{
            state.userError = null;
        },
        clearUserSuccess : (state) => {
            state.userSuccess = null;
        }
    },
    extraReducers:{
        [login.pending] : (state) => {
            state.isLoadingUser = true;
        },
        [login.fulfilled] : (state,action) => {
            state.isLoadingUser=false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.userSuccess = "Logged in successfully"
        },
        [login.rejected] : (state,action) => {
            state.isLoadingUser = false;
            state.isAuthenticated = false;
            state.userError = action.payload;
        },
        [register.pending] : (state)=>{
            state.isLoadingUser = true;
        },
        [register.fulfilled] : (state,action) => {
            state.isLoadingUser=false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.userSuccess = "Signed up successfully"
        },
        [register.rejected] : (state,action) => {
            state.isLoadingUser = false;
            state.isAuthenticated = false;
            state.userError = action.payload;
        },
        [loadUser.pending] : (state)=>{
            state.isLoadingUser = true;
        },
        [loadUser.fulfilled] : (state,action) => {
            state.isLoadingUser=false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        [loadUser.rejected] : (state,action) => {
            state.isLoadingUser = false;
            state.isAuthenticated = false;
            state.userError = action.payload;
        },
        [logout.pending] : (state) =>{
            state.isLoadingUser = true;
        },
        [logout.fulfilled] : (state,action) => {
            state.isLoadingUser = false;
            state.isAuthenticated = false;
            state.user = null;
            state.userSuccess="Logged out successfully"
        },
        [logout.rejected] : (state,action) => {
            state.isLoadingUser = false;
            state.userError = action.payload;
        },
        [updateUser.pending] : (state) =>{
            state.isLoadingUser = true;
        },
        [updateUser.fulfilled] : (state,action) => {
            state.isLoadingUser = false;
            state.isAuthenticated = true;
            state.userSuccess = action.payload;
        },
        [updateUser.rejected] : (state,action) => {
            state.isLoadingUser = false;
            state.userError = action.payload
        },
        [changePassword.pending] : (state) =>{
            state.isLoadingUser = true;
        },
        [changePassword.fulfilled] : (state,action) => {
            state.isLoadingUser = false;
            state.isAuthenticated = true;
            state.userSuccess = "Password updated successfully";
        },
        [changePassword.rejected] : (state,action) => {
            state.isLoadingUser = false;
            state.userError = action.payload
        },
        [forgotPassword.pending] : (state)=>{
            state.isLoadingUser = true;
        },
        [forgotPassword.fulfilled] : (state,action) => {
            state.isLoadingUser = false;
            state.userSuccess = action.payload.message
        },
        [forgotPassword.rejected] : (state,action) => {
            state.isLoadingUser = false;
            state.userError = action.payload
        },
        [resetPassword.pending] : (state) => {
            state.isLoadingUser = true;
        },
        [resetPassword.fulfilled] : (state) =>{
            state.isLoadingUser = false;
            state.userSuccess = "Password updated successfully"
        },
        [resetPassword.rejected] : (state,action) => {
            state.isLoadingUser = false;
            state.userError = action.payload;
        }
    }
})

export const { clearUserSuccess,clearUserError } = userSlice.actions;

export default userSlice.reducer;