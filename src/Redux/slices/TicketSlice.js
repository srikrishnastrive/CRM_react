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


export const updateTicket = createAsyncThunk('tickets/updateTicket',async(ticket)=>{
    try {
        const response = axios.patch(`http://localhost:8000/crmapp/api/v1/ticket/${ticket._id}`,ticket,{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        });
        toast.promise(response,{
            success:'Successfully updated the ticket',
            loading:'Fetching tickets belonging to you',
            error:'Something went wrong',
        });
        return await response;
       
    } catch (error) {
        console.log(error);
    }
})

export const createTicket = createAsyncThunk('tickets/createTicket', async (ticket) => {
    try {
        const response = axios.post(`http://localhost:8000/crmapp/api/v1/ticket`, 
        ticket, // req body
        {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: 'Successfully created the ticket',
            loading: 'Creating the ticket',
            error: 'Something went wrong'
        });
        return await response;
        
    } catch(error) {
        console.log(error);
        
    }
});


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
        .addCase(updateTicket.fulfilled,(state,action)=>{
            const updatedTicket = action?.payload?.data?.result;
            state.ticketsList = state.ticketsList.map((ticket)=>{
                if (ticket._id == updateTicket._id) return updatedTicket;
                return ticket;
            });
            state.downloadedTickets = state.downloadedTickets.map((ticket)=>{
                if (ticket._id == updateTicket._id) return updatedTicket;
                return ticket;
            });
            state.ticketDistribution = {
                open : 0,
                inProgress:0,
                resolved : 0,
                onHold : 0,
                cancelled: 0,
            }
            state.downloadedTickets.forEach(ticket => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
            })
        })
        .addCase(createTicket.fulfilled, (state, action) => {
            if(action?.payload?.data == undefined) return;
            const newTicket = action.payload.data;
            state.downloadedTickets.push(newTicket);
            state.ticketsList = state.downloadedTickets;
            state.ticketDistribution =  {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
            state.downloadedTickets.forEach(ticket => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
            });
        });
    }
});

export const {filterTickets} = ticketSlice.actions;

export default ticketSlice.reducer;
