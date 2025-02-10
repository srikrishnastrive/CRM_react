function Signup() {
    return (
       <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
            <div className="card-body flex items-center">
                <div className="w-full flex justify-center mb-4">
                    <h2 className="card-title text-4xl text-white ">Login</h2>
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        autoComplete="one-time-code"
                        placeholder="User id "
                        className="input input-bordered input-primary w-full max-w-xs text-white" />
                </div>
                <div className="w-full">
                    <input
                        type="email"
                        autoComplete="one-time-code"
                        placeholder="Email"
                        className="input input-bordered input-primary w-full max-w-xs text-white" />
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        autoComplete="one-time-code"
                        placeholder="Password"
                        className="input input-bordered input-primary w-full max-w-xs text-white " /> 
                </div>
               
                <details className="dropdown mb-4 w-full">
                    <summary className="btn">User type</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
                        <li><a>Customer 1</a></li>
                        <li><a>Engineer</a></li>
                    </ul>
                    </details>
               
                <div className="card-actions w-full mt-4">
                <button className="btn btn-warning w-full font-bold hover:bg-accent-focus">Submit</button>
                </div>
            </div>
            </div>
       </div>
        
    )
}

export default Signup;
