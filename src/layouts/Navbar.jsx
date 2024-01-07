import React,{useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from '../assets/images/icons/cart.png'
import { useCart } from 'react-use-cart';
import { UserContext } from "../components/UserProvider";
import { SettingContext } from "../components/SettingProvider";
import Toaster from "../components/common/Toaster";
import axios from "axios";
import '../assets/css/navbar.css'
import MobileMenu from "./MobileMenu";

const Navbar=()=>{

    const navigate = useNavigate();
    const {userData,updateUserData} = useContext(UserContext)
    const SettingDataFromContext = useContext(SettingContext) 
    const { totalUniqueItems } = useCart();
    const [isProductopen, setIsProductopen]= useState(false)
     //console.log(SettingDataFromContext)
     console.log(isProductopen)
    const logOut=()=>{

        axios.defaults.headers.common["Authorization"]=`Bearer ${userData?.token}`;

        axios.post('https://uol-v-2.hostprohub.com/api/customer/logout')
            .then((response)=>{
                if(response.data.success){
                    localStorage.removeItem('user')
                    updateUserData(null);
                    Toaster('Successfully logged out', 'success')
                    navigate('/', {replace: true})
                }
            })
            .catch((error)=>{
                console.log(error)
            })        
    }
    return(
        <div className="sticky top-0 z-50 bg-gradient-to-r from-white via-slate-200 to-teal-200 w-full h-[2.5rem] ">
        
        <div className="  grid grid-cols-1 md:grid-cols-3 ">

        <div className="block flex-none md:hidden">
            <MobileMenu />
        </div>

        <div className="bg-gray-00 mt-1">
        <div className="hidden md:flex flex-wrap justify-center ">
        <img className="w-8 h-8 mr-2" src={SettingDataFromContext?.headerManagement?.site_logo} alt="" />
         <Link className={window.location.pathname=='/' ?"text-blue-500":""} to='/'>Ecommerce</Link>
            <div>
                <div className="bg-blue-200  rounded-lg p-1 mt-[-0.1rem] ml-2 hover:cursor-pointer  relative" onClick={()=>setIsProductopen(!isProductopen)}>Products</div> 
                <div className={` bg-blue-400 flex flex-col rounded-lg mt-[-0.5rem] p-0 ml-3 absolute ${isProductopen ? 'text-white':'hidden'}`}>
                    <button className="p-2 ">Seed</button>
                    <button className="p-2 ">Honey</button>
                    <button className="p-2 ">Chair</button>
                    <button className="p-2 ">Rice</button>
                </div>
            </div>
        </div>
        </div>

        <div className="bg-gray-00 hidden md:flex  flex-wrap justify-center mt-1">
        <input type="text" className="border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2 " placeholder="Search" />
        </div>
        
        <div className="bg-gray-00 mt-1">      
        <ul>
            <div className="flex flex-wrap  justify-center ">

                <Link to={'/cart'} className='hidden md:flex mx-4 hover:underline relative'>
                    <img src={CartIcon} className='' title='Cart' alt='Cart icon' width={30} />
                    <span className='bg-black text-white rounded-[50%] text-center text-xs absolute 
                    right-[-9%] top-[-6%] w-4 h-4 '>{totalUniqueItems}</span>
                </Link>
            <li className="hidden md:flex">
                <Link className={window.location.pathname=='/blog' ? "text-green-500 ":""} to='/blog'>Blog</Link>
            </li >        
            <li className="md:flex flex-wrap hidden">
                {
                    userData? (
                        <>
                        <Link to={'/user/dashboard'} className="font-bold hover:underline mr-4 ml-4 "><h3>{userData?.name}</h3></Link>
                        <button className="mt-[-0.5rem] " onClick={logOut}>Logout</button>
                        
                        </>
                    ):
                    (
                        <div className="flex flex-wrap">
                        <li className='hover:underline ml-4'>
                             <Link className={window.location.pathname=='/Regostration'?"text-blue-500 ":""} to='/Regostration'>Signup</Link>
                         </li>
                         /
                         <li className='hover:underline '>
                         <Link className={window.location.pathname=='/login'?"text-blue-500":""} to='/login'>Login</Link>
                         </li>
                        </div>
                    )
                }
            </li>
            </div>
        </ul>
        </div>

        </div>
      
        </div>
    )
}
export default Navbar