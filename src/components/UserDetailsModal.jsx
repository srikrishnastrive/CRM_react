import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


function UserDetailsModal({user,resetTables}){

    const [userDisplay,setUserDisplay] = useState(user);

    async function handleTypeChange(e){
        try {
            const dropdown = document.getElementById('userType-dropdown');
            document.open = !dropdown.open;
            const response = await axios.patch("http://localhost:8000/crmapp/api/v1/user/updateUser",{
                userId : userDisplay.id,
                updates : {
                    ...userDisplay,
                    userType : e.target.textContent
                },
            },{
                
                    headers:{
                        'x-access-token':localStorage.getItem('token')
                    }
                
            });
            if (response?.data?.result){
                toast.success('successfully updated the user');
                const user = response?.data?.result;
                setUserDisplay({
                    name:user.name,
                    email:user.email,
                    userStatus:user.userStatus,
                    userType:user.userType,
                    clientName:user.clientName
                });
                resetTables();
            }

        } catch (error) {
            toast.warning('failed to update');
        }
    }
  
  
    async function handleUserChange(e){
        try {
            const ul = e.target.parentNode.parentNode;
            const name = ul.getAttribute("name");
            console.log(name);
            const dropdown = document.getElementById(`${name}Dropdown`);
            dropdown.open = !dropdown.open;
            const response = await axios.patch("http://localhost:8000/crmapp/api/v1/user/updateUser",{
                userId : userDisplay.id,
                updates : {
                    ...userDisplay,
                    [name] : e.target.textContent
                },
            },{
                
                    headers:{
                        'x-access-token':localStorage.getItem('token')
                    }
                
            });
            if (response?.data?.result){
                toast.success('successfully updated the user');
                const user = response?.data?.result;
                setUserDisplay({
                    ...userDisplay,
                    name:user.name,
                    email:user.email,
                    userStatus:user.userStatus,
                    userType:user.userType,
                    clientName:user.clientName,
                    
                });
                resetTables();
            }
        } catch (error) {
            toast.error('failed to update');
        }
       
        
    }
    

    return(
        
            <dialog id="my_modal_2" className="modal">
            <div className="modal-box text-lg font-semibold">
                <h3 className="font-bold text-lg">User Details!</h3>
                <p className="py-4">Name <span className="text-yellow-500"> : {userDisplay.name} </span></p>
                <p className="py-4">Email  <span className="text-yellow-500">: {userDisplay.email} </span></p>
                <p className="py-4">Type :
                    <span className="text-yellow-500">
                    <details className="dropdown ml-2" id="userTypeDropdown">
                        <summary tabIndex={0} role="button" className="btn m-1">{userDisplay.userType}</summary>
                    <ul name="userType" onClick={handleUserChange} tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>admin</a></li>
                        <li><a>customer</a></li>
                        <li><a>engineer</a></li>
                    </ul>
                    </details>
                    </span>
                    </p>
                <p className="py-4">Status :  
                    <span className="text-yellow-500">
                    <details className="dropdown ml-2" id="userStatusDropdown">
                        <summary tabIndex={0} role="button" className="btn m-1">{userDisplay.userStatus}</summary>
                    <ul name="userStatus" onClick={handleUserChange} tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Approved</a></li>
                        <li><a>Suspended</a></li>
                        <li><a>Rejected</a></li>
                    </ul>
                </details>
                </span>
                </p>
                <p className="py-4">Client Name <span className="text-yellow-500">:  {userDisplay.clientName}</span></p>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>
        
    )
}

export default UserDetailsModal;
