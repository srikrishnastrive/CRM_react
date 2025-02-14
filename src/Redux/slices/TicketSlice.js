import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import {toast} from "react-hot-toast";



const initialState = {
    downloadedTickets : [],
    ticketsList : [],
    ticketDistribution : {
        open : 0,
        inProgress:0,
        resolved : 0,
        onHold : 0,
        cancelled: 0,
    }
}

export const getAllTicketsforTheUser = createAsyncThunk('tickets/getAllTicketsforTheUser',async(status)=>{
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
    reducers:{
        filterTickets : (state,action) => {
            console.log(action.payload);
            let status = action.payload.status.toLowerCase();
            if(status == "in progress") status = "inProgress";
            if(status == "on hold") status = "onHold";
            state.ticketsList = state.downloadedTickets.filter(
                (ticket) => ticket.status === status
            );
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(getAllTicketsforTheUser.fulfilled,(state,action)=>{
            if (!action.payload?.data) return;
            state.ticketsList = action?.payload?.data?.result;
            state.downloadedTickets = action?.payload?.data?.result;
            const tickets = action?.payload?.data?.result;
            state.ticketDistribution = {
                open : 0,
                inProgress:0,
                resolved : 0,
                onHold : 0,
                cancelled: 0,
            }
            tickets.forEach(ticket => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
            })
           
        })
    }
});

export const {filterTickets} = ticketSlice.actions;

export default ticketSlice.reducer;
