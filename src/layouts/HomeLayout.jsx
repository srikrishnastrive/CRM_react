import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/slices/AuthSlice";
import { useEffect } from "react";


function HomeLayout({children}){
    const navigate = useNavigate();
    const authState = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    async function onLogout(){
        dispatch(logout());
        navigate('/login');
    }

    useEffect(()=>{
        if (!authState.isLoggedIn) navigate('/login');
    },[]);

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 right-0 cursor-pointer mt-4 ml-4">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                        <label htmlFor="my-drawer"><BsFillMenuButtonWideFill size={'32px'} className="cursor-pointer"/></label>
                </div>
                <div className="drawer-side">
                        <label htmlFor="my-drawer"  className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                       
                        <li><Link to="/">Home</Link></li>

                        <li><Link to="/dashboard">Dashboard</Link></li>

                        <li className="absolute bottom-8 w-3/4">
                        <div className="w-full flex justify-center items-center "  >
                        {
                            !authState.isLoggedIn ? (
                                <>
                                      <Link className="btn-primary px-1 py-1 rounded-md font-semibold w-full text-center" to='/login'>Login</Link>
                                      <Link className="btn-secondary px-1 py-1 rounded-md font-semibold w-full text-center" to='/signup'>Signup</Link>
                                </>
                            ):
                                (
                                    <>
                                        <button onClick={onLogout} className="btn-primary px-1 py-1 rounded-md font-semibold w-full text-center" >Logout</button>
                                        <Link className="btn-secondary px-1 py-1 rounded-md font-semibold w-full text-center" >Profile</Link>
                                    </>
                                    
                                )
                        }
                            
                              
                    </div>
                        </li>
                        </ul>
                </div>
            </div>


            <div className="flex justify-center items-start">
                    <div className="w-3/4">
                    {children}
                    </div>
           
            </div>
            
        </div>
    )
}

export default HomeLayout;
