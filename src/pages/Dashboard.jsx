
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiOutlineDownload } from "react-icons/ai";
import { usePDF } from "react-to-pdf";

import useTickets from "../hooks/useTickets";
import HomeLayout from '../layouts/HomeLayout';
import { useSearchParams } from 'react-router-dom';

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

function Dashboard() {

    const [ticketsState] = useTickets();
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

    const [selectedTicket, setSelectedTicket] = useState({});
    const [searchParams] = useSearchParams();

    const columns = [
        {
            name: 'Ticket Id',
            selector: row => row._id,
            reorder: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            reorder: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            reorder: true,
        },
        {
            name: 'Reporter',
            selector: row => row.assignedTo,
            reorder: true,
        },
        {
            name: 'Priority',
            selector: row => row.ticketPriority,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Assignee',
            selector: row => row.assignee,
            reorder: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            reorder: true,
            sortable: true,

        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
                fontSize: '18px'
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    useEffect(()=>{

    },[])

   
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">
                {searchParams}
                
                <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                    Tickets Records <AiOutlineDownload className="cursor-pointer inline " onClick={() => toPDF()} />
                </div>

                <div ref={targetRef}>
                    {ticketsState && 
                        <DataTable
                            onRowClicked={(row) => {
                                setSelectedTicket(row);
                                document.getElementById('ticket_modal').showModal();
                            }}
                            columns={columns}
                            data={ticketsState.ticketsList}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            customStyles={customStyles}
                        />
                    }
                    
                </div>
            </div>  
        </HomeLayout>
    );
}

export default Dashboard;
