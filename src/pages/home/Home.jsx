import { useEffect } from "react";
import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import {getAllTicketsforTheUser} from '../../Redux/slices/TicketSlice';
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { BsFillPencilFill } from "react-icons/bs";

export default function Home(){

    const dispatch = useDispatch();

    const ticketsState = useSelector((state)=> state.tickets);
    const authState = useSelector((state)=> state.auth);
   
    async function loadTickets() {
        const response = await dispatch(getAllTicketsforTheUser());
        console.log('called once');
    }
    useEffect(()=>{
        loadTickets();
    },[authState.token]);

    console.log(ticketsState.ticketDistribution.open /ticketsState.ticketsList.length );


    return(
        <>
            <HomeLayout>
            {ticketsState && (
                <div className='mt-10 flex flex-row justify-center items-center gap-5 flex-wrap'>
                <Card 
                    titleText='Open' 
                    status={ticketsState.ticketDistribution.open / ticketsState.ticketsList.length} 
                    quantity={ticketsState.ticketDistribution.open}
                    background='bg-yellow-300' 
                    borderColor='border-green-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <BsFillPencilFill className='inline mr-2' />
                </Card>
                <Card 
                    titleText='In Progress' 
                    status={ticketsState.ticketDistribution.inProgress / ticketsState.ticketsList.length} 
                    quantity={ticketsState.ticketDistribution.inProgress}
                    background='bg-orange-300' 
                    borderColor='border-red-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <TbProgressBolt className='inline mr-2' />
                </Card>
                <Card 
                    titleText='Resolved' 
                    status={ticketsState.ticketDistribution.resolved / ticketsState.ticketsList.length} 
                    quantity={ticketsState.ticketDistribution.resolved}
                    background='bg-purple-300' 
                    borderColor='border-blue-700' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdOutlineDoneAll className='inline mr-2' />
                </Card>
                <Card 
                    titleText='On Hold' 
                    status={ticketsState.ticketDistribution.onHold / ticketsState.ticketsList.length} 
                    quantity={ticketsState.ticketDistribution.onHold}
                    background='bg-gray-300' 
                    borderColor='border-gray-800' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdPending className='inline mr-2' />
                </Card>
                <Card 
                    titleText='Cancelled' 
                    status={ticketsState.ticketDistribution.cancelled / ticketsState.ticketsList.length} 
                    quantity={ticketsState.ticketDistribution.cancelled}
                    background='bg-blue-300' 
                    borderColor='border-violet-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdCancel className='inline mr-2' />
                </Card>
                </div>
            )}
            </HomeLayout>
            
        </>
    )
}
