import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layouts/Layout";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { UserContext } from "../../components/UserProvider";
import axios from "axios";
import Toaster from "../../components/common/Toaster";

import Delete from '../../assets/images/icons/delete.png'
import Edit from '../../assets/images/icons/edit.png'

const AddressBoook=()=>{
    const {userData} = useContext(UserContext)
    const[addresses, setAddresses] = useState();


    useEffect(()=>{
      
        if( userData?.token && !addresses){
            axios.get('https://uol-v-2.hostprohub.com/api/get-customer-addresses/'+userData?.id)
            .then(response=>{
                console.log(response)
                setAddresses(response.data.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }

       
       

    },[userData,addresses])

    const deleteAddress=(id)=>{
        axios.get('delete-customer-address/'+id)
        .then((response=>{
            console.log(response)
            if(response.data.success){
               Toaster('Address Successfully Deleted','success')
                setAddresses(null)
            }
        }))
      console.log(id)
    }

    const setDefaultAddress = (id) => {
        axios.put("set-as-default-customer-address/" + userData?.id + "/" + id)
            .then(response=>{
                if (response.data.success) {
                    Toaster(response.data.message, 'success')
                    setAddresses(null);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

return(
    <>
       <Layout>
         <DashBoardLayout>
         
            {/* <div>
              {
                addresses?.length>0 ?
                addresses.map((address,index)=>{
                    return(
                        <div className="flex ">
                            <div key={index} className="p-4 ml-32">
                            <p>{address.name}</p>
                            <p>{address.email}</p>
                            <p>{address.phone}</p>
                            <p>{address.address}</p>
                            <p>{address.area}</p>
                            </div>
                            <div className="col-span-4  p-1 areaAdd">
                                                    <p>{address.address}</p>
                                                    <h5 className='mt-2 '><b>{address.is_default === 1 ? (
                                                        <small className="bg-gray-800 text-white text-sm p-1 rounded-md">Default Address</small>
                                                    ) : (
                                                        <button className="site_btn_secondary w-[1rem] hover:underline"
                                                            onClick={() => setDefaultAddress(address.id)}
                                                        >Make This Default</button>
                                                    )}</b></h5>
                                                </div>
                            <div className="ml-32 font-bold hover:underline"
                           
                            >
                            
                            <Link to={`/user/update-address/${address.id}`}>Edit</Link>
                            </div>
                            <div className="ml-32 font-bold hover:underline"
                            onClick={(e)=>deleteAddress(address.id)}
                            >Delete </div>
                        </div>
    
                    )
                })
                :
                <>
                    <div className="p-10 font-bold">
                    You did not added any address yet! Please add a address.

                    <Link to={'/user/add-address/'}>Add Address</Link>

                    </div>
                </>
              }
            </div> */}


            <div className="bg-gradient-to-r from-cyan-500 to-blue-50">
            <Link to={'/user/add-address'} className="font-bold p-2 hover:underline">Add Address</Link>
              {
                addresses?.length>0 ?
                addresses.map((address,index)=>{
                    return(
                        <div className="flex ">
                            {/* ml-32 */}
                            <div key={index} className="p-4 ">
                            
                            <div className=" grid grid-cols-1 md:grid-cols-3">

                                <div className=" w-[15rem]">
                                    <p className="text-lg font-bold">{address.name}</p>
                                    <div className=" font-medium">
                                    <p className="mt-2">{address.email}</p>
                                    <p className="mt-0">{address.phone}</p>
                                    </div>
                                
                                </div>

                                
                                {/* ml-10 */}
                                <div className=" w-[10rem] h-[8rem]">
                                <div className="col-span-4  p-1 areaAdd">
                                <p>{address.address}</p>
                                                    <h5 className='mt-2 '><b>{address.is_default === 1 ? (
                                                        <small className="bg-gray-800 text-white text-sm p-1 rounded-md">Default Address</small>
                                                    ) : (
                                                        <button className="site_btn_secondary w-[1rem] hover:underline"
                                                            onClick={() => setDefaultAddress(address.id)}
                                                        >To Default</button>
                                                    )}</b></h5>
                                </div>
                           
                                </div>

                                <div className="flex flex-wrap mt-10">
                                    <div className="mr-10"><Link to={`/user/update-address/${address.id}`}>
                                    <img className="w-8 h-8 cursor-pointer "  src={Edit} alt="" />
                                    </Link></div>
                                    <div onClick={(e)=>deleteAddress(address.id)}>
                                    <img className="w-8 h-8 cursor-pointer " src={Delete} alt="" />
                                     </div>
                                </div>
                                    
                            </div>
                            </div>
                            
                            <div className="bg-slate-500 grid grid-cols-1 md:grid-cols-2">
                           
                               
                            </div> 

                            
                        </div>
    
                    )
                })
                :
                <>
                    <div className="p-10 font-bold">
                    You did not added any address yet! Please add a address.

                    <Link to={'/user/add-address/'}>Add Address</Link>

                    </div>
                </>
              }
            </div>

 

            
         </DashBoardLayout>
        </Layout>
    </>
)
}
export default AddressBoook