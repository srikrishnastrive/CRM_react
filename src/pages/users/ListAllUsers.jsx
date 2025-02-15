import { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import DataTable from "react-data-table-component";
import UserDetailsModal from "../../components/UserDetailsModal";


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
        id : ''
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
                            clientName:row.clientName,
                            id:row._id
                        });
                        document.getElementById('my_modal_2').showModal()}
                     } 
                    columns={columns}
                    data={usersList} />
                }
            </div>
          
           <UserDetailsModal key={userDisplay.email} user={userDisplay} resetTables = {loadUsers}/>

        </HomeLayout>
    )
}


export default ListAllUsers;
