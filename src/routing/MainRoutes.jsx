import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Dashboard from "../pages/Dashboard";
import AuthRoutes from "./AuthRoutes";
import ListAllUsers from "../pages/users/ListAllUsers";
import CreateTicket from "../pages/home/createTicket";


function MainRoutes(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/ticket/create" element ={<CreateTicket/>}/>
            <Route element={<AuthRoutes allowListedRoles={["admin"]}/> }>
                <Route path="/users" element={<ListAllUsers/>}/>
            </Route>
            <Route path="/dashboard" element ={<Dashboard/>}  />
            <Route path="/*" element={<div>No route found</div>}/>
        </Routes>
    )
}

export default MainRoutes;
