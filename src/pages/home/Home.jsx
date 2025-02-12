import { useEffect } from "react";
import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import {getAllTicketsforTheUser} from '../../Redux/slices/TicketSlice';

export default function Home(){

    const dispatch = useDispatch();

    const ticketsState = useSelector((state)=> state.tickets);
    const authState = useSelector((state)=> state.auth);
   
    async function loadTickets() {
        const response = await dispatch(getAllTicketsforTheUser());
    }
    useEffect(()=>{
        loadTickets();
    },[authState.token]);
    
    return(
        <>
            <HomeLayout>
                <Card/>
            </HomeLayout>
            
        </>
    )
}
