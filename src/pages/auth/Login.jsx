import { useState } from "react";
import { useDispatch } from "react-redux";
import {login} from '../../Redux/slices/AuthSlice';
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginDetails,setLoginDetails] = useState({
        email:'',
        password:''
    });

    

    async function onSubmit() {
        if (!loginDetails.email || !loginDetails.password) return;
    
        try {
            const response = await dispatch(login(loginDetails)).unwrap(); // ✅ Wait for the response
            console.log(response.data.message);
    
            if (response.data.message === 'user validated') {
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
    
    return (
       <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
            <div className="card-body flex items-center">
                <div className="w-full flex justify-center mb-4">
                    <h2 className="card-title text-4xl text-white ">Login</h2>
                </div>
                <div className="w-full">
                    <input
                        type="email"
                        autoComplete="one-time-code"
                        placeholder="email "
                        value={loginDetails.email}
                        onChange={(e)=> setLoginDetails((prev)=> ({...prev,email:e.target.value}))}
                        className="input input-bordered input-primary w-full max-w-xs text-white" />
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        autoComplete="one-time-code"
                        placeholder="Password"
                        value={loginDetails.password}
                        onChange={(e)=> setLoginDetails((prev)=> ({...prev,password:e.target.value}))}
                        className="input input-bordered input-primary w-full max-w-xs text-white " /> 
                </div>
                <div className="card-actions w-full mt-4">
                <button onClick={onSubmit} className="btn btn-warning w-full font-bold hover:bg-accent-focus">Submit</button>
                </div>
                <p className="text-l text-white">
                        Donot have an account ? <Link className="text-yellow-200 font-semibold hover:text-white" to="/signup">Signup Instead</Link>
                    </p>
            </div>
            </div>
       </div>
        
    )
}

export default Login;
