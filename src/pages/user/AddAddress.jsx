import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { UserContext } from "../../components/UserProvider";
import axios from "axios";
import Toaster from "../../components/common/Toaster";

const AddAddress=()=>{
    const {userData} = useContext(UserContext)
    const navigate= useNavigate();
    
   const[customerName,setCustomerName] = useState();
   
   const[phone,setPhone] =useState();
   const[city,setCity] = useState();
   const[email,setEmail]=useState();
   

   const[insideDhaka, setInsideDhaka]=useState();
   const[outsideDhaka,setOutsideDhaka]=useState()

   const[area,setArea]=useState();

   const[zip,setZip]=useState();

   const[address, setAddress]=useState();

  
    useEffect(() => {
        if (city === 'inside_dhaka') {
          axios.get("https://uol-v-2.hostprohub.com/api/ec/area-by-district/dhaka")
            .then((response) => {
              console.log(response.data.data.data);
              setInsideDhaka(response.data.data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if(city === 'outside_dhaka'){
           axios.get('https://uol-v-2.hostprohub.com/api/ec/get-cities')
           .then((response) => {
              console.log(response.data.data);
                setOutsideDhaka(response.data.data);
           })
           .catch((error) => {
             console.log(error);
           });
        }
      }, [city]);

     const submit=(e)=>{
      e.preventDefault();

      var obj={
        name:customerName,
        email:email,
        phone:phone,
        address:address,
        area:area,
        city: city,
        zip: zip,
        shipping_id: 0,
      }
      axios.post('https://uol-v-2.hostprohub.com/api/add-customer-address/'+ userData?.id,obj)
      .then(response=>{
        if(response?.data?.message){
            Toaster("Address Add Successful",'success');
              navigate('/user/add-address',{relace:true})

        }
      })
      .catch((error)=>{
        console.log(error)
      })
     }


return(
    <>
       <Layout>
         <DashBoardLayout>
            <div  className=" p-8 bg-gradient-to-r from-green-400 to-blue-500">
             Add Address
                
     <form method='POST'  
     onSubmit={(e)=>submit(e)}
     >    
          <div>  
                <>
                <input className="pl-2 w-1/2  border-solid border-4 border-gray-600 rounded-lg" type="text" name="customer_name"
                    value={customerName}
                    onChange={(e) => { setCustomerName(e.target.value) }}
                    placeholder="Name" />
                <br />
                <input className="pl-2 w-1/2 border-solid border-4 border-gray-600 rounded-lg mt-4" type="text" name="customer_name"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="Email" />
                <br />
                <input className="pl-2 w-1/2 border-solid border-4 border-gray-600 rounded-lg mt-4" type="text" name="customer_name"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                    placeholder=" Phone Number" />
                <br />
                <select className="pl-2 w-1/2 border-solid border-4 border-gray-600 rounded-lg mt-4" name="city" value={city} onChange={(e) => { setCity(e.target.value) }}>
                <option value={null}> City</option>
                <option value={'inside_dhaka'}>Inside Dhaka</option>
                <option value={'outside_dhaka'}>Outside Dhaka</option>
                </select>
                <br />
                <select className="pl-2 w-1/2 border-solid border-4 border-gray-600 rounded-lg mt-4" name="area" value={area} onChange={(e)=> setArea(e.target.value)}>
                    <option>Select Area</option>
                    {city=='inside_dhaka' && (
                    insideDhaka && insideDhaka.map((zone, index)=>{
                        return <option key={index} value={zone.name}>{zone.name}</option>
                    })
                    )}

                    {city=='outside_dhaka' && (
                        outsideDhaka && outsideDhaka.map((zone, index)=>{
                            return <option key={index} value={zone.value}>{zone.name}</option>
                        })
                        )}
                </select> 
                <br />

                <input className="pl-2 w-1/2 border-solid border-4 border-gray-600 rounded-lg mt-4" type="text" name="customer_name"
                    value={zip}
                    onChange={(e) => { setZip(e.target.value) }}
                    placeholder="Zip" />
                <br />

                <input className="pl-2 w-1/2 border-solid border-4 border-gray-600 rounded-lg mt-4" type="text" name="customer_name"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                    placeholder="Address" />
                    </>
               
                <br />
                
                <br />

                <button type="submit" className="  bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-lg mt-2">Submit</button>

          </div>

     </form>
        </div>
         </DashBoardLayout>
        </Layout>
    </>
)
}
export default AddAddress