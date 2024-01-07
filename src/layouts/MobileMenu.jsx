import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserProvider";
import axios from "axios";
import Toaster from "../components/common/Toaster";
const MobileMenu=()=>{

    const [isOpen,setIsOpen]= useState(true);
    const {userData,updateUserData} = useContext(UserContext)

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth > 769) {
            setIsOpen(false);
          }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [isOpen]);

console.log(isOpen)

const logOut=()=>{

    axios.defaults.headers.common["Authorization"]=`Bearer ${userData?.token}`;

    axios.post('https://uol-v-2.hostprohub.com/api/customer/logout')
        .then((response)=>{
            if(response.data.success){
                localStorage.removeItem('user')
                updateUserData(null);
                Toaster('Successfully logged out', 'success')
                //navigate('/', {replace: true})
            }
        })
        .catch((error)=>{
            console.log(error)
        })        
}
return (
    <>
<button className={`bg-gray-00 relative p-4 mt-[-0.5rem] ${isOpen ? 'hidden' : ''}`} onClick={() => setIsOpen(!isOpen)}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
</button>


<div className={`bg-gray-00 absolute p-4  ${isOpen ? '' : 'hidden'}`}>
 
<div className="flex flex-wrap mt-[-0.5rem]">
<button className="bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

<div className="ml-[13rem]">
<Link className={`ml-4 ${window.location.pathname === '/blog' ? "text-green-500" : ""}`} to='/blog'>Blog</Link>   
</div> 
  

  <div className="flex flex-wrap">
  {userData ? (
    <>
      <div className="ml-4">
        <Link to={'/user/dashboard'} className="font-bold hover:underline">{userData?.name}</Link>
      </div>
      <button className="ml-4 mt-[0rem]" onClick={logOut}>Logout</button>
    </>
  ) : (
    <div className="ml-4 flex flex-wrap">
      <div className='hover:underline'>
        {/* <Link className={`${window.location.pathname === '/registration' ? "text-blue-500" : ""}`} to='/registration'>Signup</Link> */}
        <Link className={window.location.pathname=='/Regostration'?"text-blue-500 ":""} to='/Regostration'>Signup</Link>
      </div>
      /
      <div className='ml-2 hover:underline'>
        <Link className={`${window.location.pathname === '/login' ? "text-blue-500" : ""}`} to='/login'>Login</Link>
      </div>
    </div>
  )}
  </div>
</div>


</div>



    </>
)
}

export default MobileMenu;