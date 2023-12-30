import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layouts/Layout";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { UserContext } from "../../components/UserProvider";
import axios from "axios";
import '../../assets/css/orderList.css'

const OrderList=()=>{

    const {userData} = useContext(UserContext)
    const[orders,setOrders]=useState();

    useEffect(()=>{
        if(userData?.token && !orders){
            axios.get('get-customer-orders/'+userData?.id)
            .then(response=>{
                setOrders(response?.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    },[userData,orders])
return(
    <>
       <Layout>
         <DashBoardLayout>
            <div className="shadow-2xl w-[47rem] p-8 mt-4">
            {/* This is Order List <br /> */}
            <thead className="text-lg text-gray-700 ml-10">
                                <tr className='bg-gray-00 py-4 ConHeaderOrder'>
                                    <th scope="col" className="p-3 ConMainHeaderTable">
                                        Order Number
                                    </th>
                                    <th scope="col" className="px-6 ConMainHeaderTable">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 ConMainHeaderTable">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 ConMainHeaderTable">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 ConMainHeaderTable">
                                        Action
                                    </th>
                                </tr>
            </thead>
            <tbody className=" bg-gray-00 text-lg ">
                {orders && orders.length > 0 ? (
                    orders.map((order, index) => (
                    <tr key={index}>
                        <td className="px-8">#{order.order_number}</td>
                        <td>{order.order_date_time}</td>
                        <td className="px-8">{order.status}</td>
                        <td className="px-10">{order.pay_amount}</td>
                        <td className="px-8">
                       
                        <Link to={`/user/order/order-details/${order.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
<path fill="none" d="M0 0h24v24H0z"></path>
<path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
</svg>
                        </Link>
                        </td>
                    </tr>
                    ))
                ):(
                    <tr className='text-center'><td colspan="100%"><h2 className='text-2xl 
                    font-bold text-amber-500 mt-3'>No Orders Found!</h2></td></tr>
                )}
                </tbody>

            </div>
         </DashBoardLayout>
        </Layout>
    </>
)
}
export default OrderList