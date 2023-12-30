import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import '../../assets/css/orderDetails.css'
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../../components/UserProvider";
import Toaster from "../../components/common/Toaster";
import Swal from "sweetalert2";

const OrderDetails = () => {

    const { userData, updateUserData } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState();

    useEffect(() => {

        if (userData?.token && !order) {
            axios
                .get("get-order/" + id)
                .then(response => {
                   if(response.data.success){

                    setOrder(response?.data?.data);
                   }

                }).catch(error => {
                    console.log(error);
                })
        }

    }, [userData, order])

console.log(order)

    return (
        <>
            <Layout>

               <div className="flex flex-wrap">
                 <div><h3 className="text-xl font-bold">Order detail: {order?.order_number}</h3></div>
                 <div className="flex flex-wrap justify-end text-blue-700   time">
                    <div className="ml-2">Time:</div> 
                    <div className="font-bold">{order?.time}</div>
                 </div>              
               </div>
               {/* Order Information */}
               <div>
                <p  className="ml-[2rem] font-semibold text-3xl">Order Information</p>

                <div className="flex flex-wrap text-green-700 mt-2">
                <div className="ml-[4rem]  text-2xl">Order Status:</div>
                <div className="ml-[1rem] mt-1 font-bold uppercase ">{order?.status}</div>
                </div>

                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Payment Method:</div>
                <div className="ml-[1rem] mt-1 font-bold uppercase ">{order?.payment_method}</div>
                </div>

                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Payment Status:</div>
                <div className="ml-[1rem] mt-1 font-bold uppercase ">{order?.payment_status}</div>
                </div>

                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Subtotal:</div>
                <div className="ml-[1rem] mt-1 font-bold uppercase ">৳{order?.subtotal}</div>
                </div>
                
                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Discount:</div>
                <div className="ml-[1rem] mt-1 font-bold uppercase ">৳{order?.discount}</div>
                </div>
                
                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Shipping Fee:</div>
                <div className="ml-[1rem] mt-1 font-bold uppercase ">৳{order?.shipping_charges}</div>
                </div>

                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Total:</div>
                <div className="ml-[1rem] mt-1 font-bold uppercase ">৳{Number(order?.subtotal)+Number(order?.discount)+Number(order?.shipping_charges)}</div>
                </div>

                <p  className="ml-[2rem] mt-[2rem] font-semibold text-3xl">Reciever Information</p>
                
                <div className="flex flex-wrap text-green-700 mt-2">
                <div className="ml-[4rem]  text-2xl">Full Name:</div>
                <div className="ml-[1rem] mt-1 font-bold  ">{order?.shipping_name}</div>
                </div>

                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Phone:</div>
                <div className="ml-[1rem] mt-1 font-bold  ">{order?.shipping_phone}</div>
                </div>

                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Email:</div>
                <div className="ml-[1rem] mt-1 font-bold  ">{order?.shipping_email}</div>
                </div>

                <div className="flex flex-wrap text-green-700 ">
                <div className="ml-[4rem]  text-2xl">Address:</div>
                <div className="ml-[1rem] mt-1 font-bold  ">{order?.shipping_address}</div>
                </div>
               </div>


{/* {order?.order_details.map()} */}
<p  className="ml-[2rem] font-semibold text-3xl mt-2">Products</p>
                <div className="mx-[4rem] mt-2">
                <thead className="text-lg text-gray-700 ">
                                <tr className='bg-gray-100 py-4 ConHeaderOrder '>
                                    <th scope="col" className="p-3 ConMainHeaderTable">
                                      # 
                                    </th>
                                    <th scope="col" className="p-3 ConMainHeaderTable">
                                       Product
                                    </th>
                                    <th scope="col" className="px-6 ConMainHeaderTable">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 ConMainHeaderTable">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 ConMainHeaderTable">
                                        Total
                                    </th>
                                   
                                </tr>
            </thead>
                                               
                <tbody className="mt-4">
                {order?.order_details?.map((product,index)=>{
                    return(
                        <tr key={index} >
                            <td className="mt-4">{index + 1}</td>
                            <td className="mt-4">{product.product_name}</td>
                            <td className="mt-4">{product.amount}</td>
                            <td className="ml-[2rem]">{product.product_quantity}</td>
                            <td>{product.Total}</td>
                        </tr>
                    )
                })}
                </tbody>
                </div>
            </Layout>
        </>
    );
}

export default OrderDetails;