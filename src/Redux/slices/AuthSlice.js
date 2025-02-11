import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import axios from "axios";
import toast from "react-hot-toast";


const initialState = {
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || undefined,
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    token : localStorage.getItem("token") || "",

}

export const login = createAsyncThunk('auth/login',async (data)=>{
    try {
        const response =  axios.post('http://localhost:8000/crmapp/api/v1/auth/signin',data);
        toast.promise(response, {
            loading: 'Submitting form',
            success: 'Successfully signin',
            error: 'Something went wrong, try again'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const signup = createAsyncThunk('/auth/signup', async (data) => {
    try {
        const response = axios.post("http://localhost:8000/crmapp/api/v1/auth/signup", data);
        toast.promise(response, {
            loading: 'Submitting form',
            success: 'Successfully signed up',
            error: 'Something went wrong, try again'
        });
        return await response;
    } catch(error) {
        console.log("printing error", error);
    }
});

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers : {
        logout : (state) => {
            localStorage.clear(),
            state.role = "",
            state.data = undefined,
            state.isLoggedIn = false,
            state.token =  "";
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            if (!action.payload) return;
            state.isLoggedIn = (action.payload?.data.token !== undefined);
            state.data = action.payload.data.userData;
            console.log(action.payload.data);
            state.token = action.payload.data.token;
            state.role = action.payload.data?.userData?.userType;
            localStorage.setItem("role", action.payload.data?.userData?.userType);
            localStorage.setItem('data', JSON.stringify(action.payload.data?.userData));
            localStorage.setItem('isLoggedIn',(action.payload.data?.token !== undefined));
            localStorage.setItem('token',action.payload.data.token);
        });
    }
});

export const  {logout} =  authSlice.actions;
export default authSlice.reducer;
