import axios from "axios";
import React, {  useContext, useState } from "react";
import Toaster from "../components/common/Toaster";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserProvider";
import '../assets/css/login.css'
import Navbar from "../layouts/Navbar";
import Layout from "../layouts/Layout";
const Login=()=>{

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password,setPassword] = useState('');
    let   [errorMsg, setErrorMsg] = useState([]);

    const { userData, updateUserData } = useContext(UserContext);
   

    const login=(e)=>{
        e.preventDefault();

        if (!userName || !password) {
            setErrorMsg('Please fill in both username and password.');
            return
        }

        var loginData={
            user_input: userName,
            password:password
        }
        axios.post('customer/login',loginData)
         .then(response =>{
            console.log(response)
            if(response?.data?.status){
               var userData={
                token: response?.data?.token,
                id:response?.data?.data?.id,
                name:response?.data?.data?.customer_name,
                email:response?.data?.data?.customer_email,
                phone:response?.data?.data?.customer_contact,
                area:response?.data?.data?.customer_area,
                address:response?.data?.data?.customer_area                
               }

                
                localStorage.setItem("user", JSON.stringify(userData));
                updateUserData(userData);

                Toaster('Loggedin Successfully', 'success')
                 setErrorMsg('')
                 navigate('/user/dashboard', {replace: true})
            }
            else if(response?.data?.success==false){
                console.log("wrong")
                Toaster("Something Wrong", 'error') 
                setErrorMsg(response?.data?.message)
            }
         })
         .catch((error)=>{
           console.log(error)
         })
    }
    return(
        <>
           {/* <h1 className="font-bold text-center"> This is Login Page</h1> */}

           
<Layout>
    <form method="POST"  onSubmit={(e) =>login(e)}>
        <div className="bg-gradient-to-r from-blue-200 via-sky-500 to-emerald-500 min-h-screen flex items-center justify-center">
            <div className="grid justify-center space-y-4 p-8 bg-opacity-80 backdrop-filter backdrop-blur-md  rounded-lg shadow-lg">
            {errorMsg && <center><span className="text-red-300 text-lg font-extrabold
            my-6">{errorMsg}</span></center>}
                <label htmlFor="email" className="text-white text-base font-semibold">Enter your Email/Phone</label>
                <input
                    type="text"
                    className="border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-md pl-2 "
                    value={userName}
                    placeholder="Email or Phone"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="password" className="text-white mt-2 text-base font-semibold">Enter your password</label>
                <input
                    type="password"
                    className="border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-md pl-2"
                    value={password}
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-300 text-white text-lg font-bold py-2 px-4 rounded-md hover:bg-blue-400 hover:text-black">Login</button>
            </div>
        </div>
    </form>
</Layout>
        </>
    )
}
export default Login


