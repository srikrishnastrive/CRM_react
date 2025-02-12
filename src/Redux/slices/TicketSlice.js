import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import toast from "react-hot-toast";



const initialState = {
    ticketsList : [],
}

export const getAllTicketsforTheUser = createAsyncThunk('tickets/getAllTicketsforTheUser',async()=>{
    try {
        const response = axios.get('http://localhost:8000/crmapp/api/v1/getMyAssignedTickets',{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        });
        toast.promise(response,{
            success:'Successfully loaded all the tickets',
            loading:'Fetching tickets belonging to you',
            error:'Something went wrong',
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
})



const ticketSlice = createSlice({
    name : 'tickets',
    initialState,
    reducers:{},
    extraReducers : (builder) =>{
        builder.addCase(getAllTicketsforTheUser.fulfilled,(state,action)=>{
            if (!action.payload?.data) return;
            state.ticketsList = action?.payload?.data?.result;
           
        })
    }
});

export default ticketSlice.reducer;
