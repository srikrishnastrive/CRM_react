import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Dashboard from "../pages/Dashboard";
import AuthRoutes from "./AuthRoutes";


function MainRoutes(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Home/>}/>
            <Route element={<AuthRoutes allowListedRoles={["engineer","customer"]}/> }>
                <Route path="/resolve" element={<div>Testing</div>}/>
            </Route>
            <Route path="/dashboard" element ={<Dashboard/>}  />
            <Route path="/*" element={<div>No route found</div>}/>
        </Routes>
    )
}

export default MainRoutes;
