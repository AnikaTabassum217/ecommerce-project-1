import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layouts/Layout";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { UserContext } from "../../components/UserProvider";
import Graph from '../../assets/images/graph.png'


const DashBoard=()=>{
    const {userData} = useContext(UserContext)
return(
    <>
       <Layout>
         <DashBoardLayout>
            <p className="text-center mb-2"> DashBoard</p>
            <div className="grid grid-rows-3 grid-flow-col gap-4">
            <div className="bg-blue-200 h-[10rem] p-2 shadow-xl">
            
                <p className="font-bold text-lg italic">{userData?.name}</p>
                <p className=" mt-2 text-base font-serif ">{userData?.email}</p>
                <p className="text-base font-serif">{userData?.phone}</p>              
                <p className="text-base font-serif">{userData?.area}</p>
                <p className="text-base font-serif">{userData?.address}</p>
            </div>
            <div className="bg-blue-00 mt-[-6rem]">
               <div className="hidden md:flex gap-2 text-lg font-semibold">
                    <div className="bg-blue-200  shadow-2xl mr-7">
                       <div className="grid grid-rows-3 grid-flow-col gap-4 p-4 w-[14rem] h-[10rem]">
                        <div>Weekly Sales</div>
                        <div>$50,000</div>
                        <div>Increased By 5%</div>
                       </div>
                    </div>
                    <div className="bg-blue-200 shadow-2xl mr-7">
                    <div className="grid grid-rows-3 grid-flow-col gap-4 p-4 w-[14rem] h-[10rem] ">
                        <div>Weekly Orders</div>
                        <div>$20,000</div>
                        <div>Increased By 10%</div>
                    </div>
                    </div>
                    <div className="bg-blue-200 shadow-2xl">
                    <div className="grid grid-rows-3 grid-flow-col gap-4 p-4 w-[14rem] h-[10rem]">
                        <div>Visitors Online</div>
                        <div>$20,000</div>
                        <div>Increased By 10%</div>
                    </div>
                    </div>
               </div>
            </div>

            <div className="bg-blue-00 shadow-2xl">3
            <div className="grid grid-cols-1 gap-2 ">
                    <div className="bg-blue-00 ">1
                    <img src={Graph} className="mt-[-10rem]"/>
                    </div>
                    {/* <div className="bg-gray-200">2</div> */}
                   
               </div>
            </div>
            </div>
         </DashBoardLayout>
        </Layout>
    </>
)
}
export default DashBoard