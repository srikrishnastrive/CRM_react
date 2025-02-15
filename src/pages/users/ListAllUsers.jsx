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
    async function loadUsers(){
        const response = await axios.get('http://localhost:8000/crmapp/api/v1/users',{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        });
        console.log(response.data.resulr);
        setUsersList(response?.data?.result);
    }

    useEffect(()=>{
        loadUsers();
    },[]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                {usersList &&  <DataTable          
                    columns={columns}
                    data={usersList} />
                }
            </div>

        </HomeLayout>
    )
}


export default ListAllUsers;
