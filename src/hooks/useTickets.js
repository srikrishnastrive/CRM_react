import { useDispatch, useSelector } from "react-redux";
import { filterTickets, getAllTicketsforTheUser } from "../Redux/slices/TicketSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


function useTickets(){
    const ticketState = useSelector((state)=> state.tickets);
    const authState = useSelector((state)=> state.auth);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    async function loadTickets() {
        if (ticketState.downloadedTickets.length === 0){
            await dispatch(getAllTicketsforTheUser());
        }
        await dispatch(getAllTicketsforTheUser());
        if (searchParams.get("status")){
            dispatch(filterTickets({status:searchParams.get("status")}));
        }
        
    }

    useEffect(()=>{
        loadTickets();
    },[authState.token,searchParams.get('status')]);

    return [ticketState];
}

export default useTickets
