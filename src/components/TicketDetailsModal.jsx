import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../Redux/slices/TicketSlice";


function TicketDetailsModal({ticket}){
    const [currentTicket,setCurrentTicket] = useState(ticket);
    const dispatch = useDispatch();
    function handleTicketChange(e){
        const {name,value} = e.target;
        setCurrentTicket({
            ...currentTicket,
            [name]:value
        })
        console.log(currentTicket);
    }

    async function handleFormSubmit(){
       const response = await dispatch(updateTicket(currentTicket));
       const modal = document.getElementById('ticket_modal');
       modal.close();
    }
    
    return (
        <>
        
        
        <dialog id="ticket_modal" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{currentTicket.title}</h3>
           
            <textarea
                className="bg-white text-black my-2 rounded-lg resize-none"
                name="description"
                cols="50"
                rows="7"
                value={currentTicket.description} 
                onChange={handleTicketChange}
                
            />

            <h1 className=" text-lg text-white">
                Priority :
                <select name= "ticketPriority" className="mx-2 p-1 bg-white text-black" onChange={handleTicketChange}>
                    <option value="1" selected={currentTicket.ticketPriority == 1}>1</option>
                    <option value="2" selected={currentTicket.ticketPriority == 2}>2</option>
                    <option value="3" selected={currentTicket.ticketPriority == 3}>3</option>
                    <option value="4" selected={currentTicket.ticketPriority >= 4}>4</option>
                  
                </select>
            </h1>

            <h1 className="text-lg text-white my-4">
                    Status: 
                    <select name="status" className="p-1 mx-2 bg-white text-black" onChange={handleTicketChange} >
                        <option value="open" selected={currentTicket.status == "open"}>open</option>
                        <option value="inProgress" selected={currentTicket.status == "inProgress"}>inProgress</option>
                        <option value="resolved" selected={currentTicket.status == "resolved"}>resolved</option>
                        <option value="onHold" selected={currentTicket.status == "onHold"}>onHold</option>
                        <option value="cancelled" selected={currentTicket.status == "cancelled"}>cancelled</option>

                    </select>
                </h1>

            <div className="modal-action">
                <button onClick={handleFormSubmit} className="btn-success px-4 py-2 rounded-md hover:bg-green-400 transition-all ease-in-out">Update ticket</button>
            </div>
        </div>
       
        </dialog>
        </>
    )
}

export default TicketDetailsModal;
