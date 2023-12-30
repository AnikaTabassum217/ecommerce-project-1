import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { UserContext } from "../../components/UserProvider";
import axios from "axios";
import Toaster from "../../components/common/Toaster";

const UpdateAddress=()=>{
    const{id}=useParams()
    const {userData,updateUserData} = useContext(UserContext)
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
   

   useEffect(()=>{
    if(userData?.token && id && !address){
       axios.get('edit-customer-address/'+id)
      //axios.get('https://uol-v-2.hostprohub.com/api/get-customer-addresses/'+address?.id)
        .then(response=>{
            console.log(response.data)
            if(response.data.success==false){
              Toaster(response.data.message,'warn')
            }
            else{
               setCustomerName(response?.data?.data?.name);
                  setAddress(response?.data?.data?.address)
                  setPhone(response?.data?.data?.phone);
                  setCity(response?.data?.data.shipping_id==1? 'inside_dhaka':'outside_dhaka');
                  setArea(response?.data?.data?.area)
                  setZip(response?.data?.data?.zip);
                  setEmail(response?.data?.data?.email);
                  Toaster("Customer addresses loaded",'success')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  },[userData,address])


  
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

     const UpdateAddress=(e)=>{
      e.preventDefault();

      var obj={
        
        id:address?.id,
        name:customerName,
        customer_id: userData?.id ? userData.id : null,
        email:email,
        phone:phone,
        address:address,
        area:area,
        city: city,
        zip: zip,
        shipping_id: 0,

      //   name:customerName,
      //   customer_id:10,
      //   email:email,
      //   phone:phone,
      //   address:address,
      //   area:area,
      //   city: city,
      //   zip: zip,
      //   area_id:null,
      //   shipping_id:null,
      //   is_default:0
      }
      axios.put('https://uol-v-2.hostprohub.com/api/update-customer-address/'+id,obj)
      .then(response=>{
        if(response?.data?.message){
            Toaster("Update Address Successful",'success');
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
            <div>
             Update Address
                
     <form method='POST'  
     onSubmit={(e)=>UpdateAddress(e)}
     >
     

<div className='p-4 md:p-12 bg-gradient-to-r from-emerald-500 via-indigo-400 to-white'>
    <h1 className="text-3xl text-white font-bold mb-4">
        Update Profile
    </h1>

    <input
        type="text"
        className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2'
        placeholder='Name'
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
    /> <br/>

    {/* <input
        type="text"
        className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2'
        placeholder="Phone Number"
        value={phone} onChange={handlePhoneNumberChange}
    /> */}
    <input className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2' 
    type='text' title='phone' placeholder='Phone Number' 
            value={phone} 
            onChange={(e)=>{setPhone(e.target.value)}}
    /><br/>

    <input
        type="text"
        className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    /><br/>

<select className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2' value={city} title='city' placeholder='city'
             onChange={(e)=>{setCity(e.target.value)}}
             >
               <option value={null}>City</option>
               <option value={'inside_dhaka'}>Inside Dhaka</option>
               <option value={'outside_dhaka'}>Outside Dhaka</option>
            </select><br/>
          
            <select name='' 
            className="border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2"
            value={area} 
            onChange={(e)=>setArea(e.target.value)}
            >
               {
                  city=='inside_dhaka' && (
                     insideDhaka && insideDhaka.map((zone,index)=>{
                        return<option key={index} value={zone.value}>{zone.name}</option>
                     })
                  )
               }
               {
                   city=='outside_dhaka' && (
                     outsideDhaka && outsideDhaka.map((zone,index)=>{
                        return<option key={index} value={zone.value}>{zone.name}</option>
                     })
                  )
               }

            </select><br/>

            <input className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2' type='text' title='address' placeholder='address' 
            value={address} 
            onChange={(e)=>{setAddress(e.target.value)}}
            /><br/>

<input className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2' type="text" placeholder='Zip Code' 
            value={zip} 
            onChange={(e)=>{setZip(e.target.value)}}
             /><br/>

    {/* <div className='flex mb-2'>
        <input
            className='mr-1'
            type="radio"
            value={'male'}
            name="default-radio"
            checked={gender === 'male' ? true : false}
            onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor='male' className='mr-4'>Male</label>

        <input
            className='mr-1'
            type="radio"
            value={'female'}
            name="default-radio"
            checked={gender === 'female' ? true : false}
            onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor='female' className='mr-4'>Female</label>

        <input
            className='mr-1'
            type="radio"
            value={'other'}
            name="default-radio"
            checked={gender === 'other' ? true : false}
            onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor='other'>Other</label>
    </div> */}

    <div className='bg-blue-200 p-2 rounded-lg w-full md:w-[10rem]'>
        <button className='text-black font-semibold hover:font-bold transition ease-in-out delay-150 
        hover:-translate-y-1 hover:scale-110 duration-300 w-full'>
            Update
        </button>
    </div>
</div>


     </form>
            </div>
         </DashBoardLayout>
        </Layout>
    </>
)
}
export default UpdateAddress


