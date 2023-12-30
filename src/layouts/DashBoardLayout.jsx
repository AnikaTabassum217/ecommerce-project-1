import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserProvider";
import Toaster from "../components/common/Toaster";
import axios from "axios";

const DashBoardLayout=({children})=>{
 const{userData} =useContext(UserContext)
 const navigate= useNavigate();

 useEffect(()=>{
    if(userData){

      if(!userData?.token){
        Toaster('You need to login first!', 'warn')
        navigate('/login', {replace:true})
      }
      else{
        axios.defaults.headers.common["Authorization"]=`Bearer ${userData?.token}`;
      }

    }
 },[])

  return(
    <>
      <>
      <div className="bg-slate-00 grid grid-cols-7 gap-4 mt-6 p-2">
      <div className=" col-span-2">

<Link to={'/user/dashboard'} className={`mx-4 p-2 rounded-lg  flex w-100 justify-center  mt-4
 bg-blue-400 ${window.location.pathname ==='/user/dashboard'?
'bg-blue-600 text-white':'bg-blue-400'}`}>Dashboard</Link>

<Link to={'/user/profile'} className={`mx-4 p-2 bg-blue-400 rounded-lg flex w-100 justify-center  mt-4 ${window.location.pathname==='/user/profile'?
'bg-blue-800 text-white':'bg-blue-400'}` }>Profile</Link>

<Link to={'/user/addressbook'} className={`mx-4 p-2 bg-blue-400 rounded-lg flex w-100 justify-center  mt-4 ${window.location.pathname==='/user/addressbook'?
'bg-blue-800 text-white':'bg-blue-400'}` }>Address Boook</Link>

<Link to={'/user/order-list'} className={`mx-4 p-2 bg-blue-400 rounded-lg flex w-100 justify-center  mt-4 ${window.location.pathname==='/user/order-list'?
'bg-blue-800 text-white':'bg-blue-400'}` }>Order</Link>

      </div>
       
          <div className="bg-slate-00 col-span-4">
            {children}
            </div>    
    </div>
   

{/* <div className="bg-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">

  <div className="bg-slate-300">DashBoard</div>

  <div>
    {children}
      <div className="bg-slate-400 grid grid-cols-1 md:grid-cols-3">
              <div>Name</div>
              <div>Dhaka</div>
              <div>Make</div>
      </div>

      <div className="bg-slate-500 grid grid-cols-1 md:grid-cols-2">
        <div>E</div>
        <div>D</div>
      </div>
  </div>

</div> */}

      
      </>
    </>
  )
}
export default DashBoardLayout;