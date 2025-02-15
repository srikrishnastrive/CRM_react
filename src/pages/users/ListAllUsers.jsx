import { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import DataTable from "react-data-table-component";


function ListAllUsers(){
    const [usersList,setUsersList] = useState([]);

    const columns = [
        {
            name: 'User Id',
            selector: row => row._id,
            reorder: true,
        },
        {
            name: 'Email',
            selector: row => row.name,
            reorder: true,
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
            reorder: true,
        },
        {
            name: 'Type',
            selector: row => row.userType,
            reorder: true,
        },
        
    ];

    const [userDisplay,setUserDisplay] = useState({
        name : '',
        email : '',
        userType: '',
        userStatus :'',
        clientName : '',
    })
    async function loadUsers(){
        const response = await axios.get('http://localhost:8000/crmapp/api/v1/users',{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        });
        
        setUsersList(response?.data?.result);
    }

    useEffect(()=>{
        loadUsers();
    },[]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                {usersList &&  
                <DataTable
                    onRowClicked={(row)=> {
                        console.log(row);
                        setUserDisplay({
                            name:row.name,
                            email:row.email,
                            userType:row.userType,
                            userStatus:row.userStatus,
                            clientName:row.clientName
                        });
                        document.getElementById('my_modal_2').showModal()}
                     } 
                    columns={columns}
                    data={usersList} />
                }
            </div>
          
            <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">User Details!</h3>
                <p className="py-4">Name <span className="text-yellow-500"> : {userDisplay.name} </span></p>
                <p className="py-4">Email  <span className="text-yellow-500">: {userDisplay.email} </span></p>
                <p className="py-4">UserType  <span className="text-yellow-500">: {userDisplay.userType}</span></p>
                <p className="py-4">UserStatus <span className="text-yellow-500"> : {userDisplay.userStatus}</span></p>
                <p className="py-4">ClientName <span className="text-yellow-500">>:  {userDisplay.clientName}</span></p>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>

        </HomeLayout>
    )
}


export default ListAllUsers;
