import React, { useContext, useEffect, useState } from "react";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { UserContext } from "../../components/UserProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toaster from "../../components/common/Toaster";
import Layout from '../../layouts/Layout'
const Pro=()=>{
      const{userData,updateUserData} = useContext(UserContext)
      const navigate = useNavigate();
      const [name, setName] = useState('');
      const[phone, setPhone] =useState('');
      const[email,setEmail] =useState('');
      const[dob,setDob]= useState('');
      const[gender,setGender]= useState('');
      const[errorList,setErrorList]= useState('');
      const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
      const phoneRegex = /^\d{11}$/;

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhone(newPhoneNumber);

    if (phoneRegex.test(newPhoneNumber)) {
      setIsValidPhoneNumber(true);
    } else {
      setIsValidPhoneNumber(false);
    }
  };


      useEffect(()=>{
        if(userData?.token){
            axios.get('get-edit-customer/'+userData?.id)
            .then(response=>{
                if(response.data.success==false){
                  Toaster(response.data.message,'warn')
                }
                else{
                    setName(response?.data?.customer_name);
                    setPhone(response?.data?.customer_contact);
                    setGender(response?.data?.customer_gender);
                    setEmail(response?.data?.customer_email);
                    setDob(response?.data?.customer_dob);
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
      },[])

      const updateProfile=(e)=>{
            e.preventDefault();

            var obj={
              id:userData?.id,
              customer_name:name,
              customer_email:email,
              customer_contact:phone,
              customer_dob:dob,
              customer_gender:gender

            }
            axios.post('https://uol-v-2.hostprohub.com/api/get-edit-customer/'+userData?.id,obj)
            .then(response=>{
              if(response.data.success_message){

                //localStorage.removeItem('user')

                const updatedState={...userData};

                updatedState.name=name;
                updatedState.email=email;
                updatedState.phone=phone;

                //localStorage.setItem('user', JSON.stringify(updatedState));

                updateUserData(updatedState) 
                Toaster('User Profile Update Successfully','success')
                navigate('/user/dashboard' ,{replace:true})

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
        This is Profile Page <br /><br />
        <form method="POST" onSubmit={(e)=>updateProfile(e)}>
        {/* <input type="text" name="name" id="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/> <br />
        {errorList && <span className=" text-red-600">{errorList?.customer_name}</span>} <br />
        <input type="text" name="phone" id="phone" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/> <br />
        {errorList && <span className=" text-red-600">{errorList?.customer_contact}</span>} <br />
        <input type="text" className='border-4 bg-slate-300' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/> <br />
        {errorList && <span className=" text-red-600">{errorList?.customer_email}</span>} <br />
        <input type="text" className='border-4 bg-slate-300' placeholder='dob' value={dob} onChange={(e)=>setDob(e.target.value)}/> <br />
        {errorList && <span className=" text-red-600">{errorList?.customer_dob}</span>}         
        <div>
      <input type="radio" value={'male'} name="default-radio" checked={gender=='male'?true:false} onChange={(e)=>setGender(e.target.value)} />
       <label for='male'>Male</label><br /><br />

       <input type="radio" value={'female'} name="default-radio" checked={gender=='female'?true:false} onChange={(e)=>setGender(e.target.value)} />
       <label for='female'>Female</label><br /><br />

       <input type="radio" value={'other'} name="default-radio" checked={gender=='other'?true:false} onChange={(e)=>setGender(e.target.value)} />
       <label for='other'>Other</label><br /><br />
       {errorList && <span className=" text-red-600">{errorList?.customer_gender}</span>}
      </div>
      <button className="bg-blue-300 rounded-lg p-2">Update</button> */}



        {/* <div className=' p-12 bg-gradient-to-r from-white via-indigo-400 to-emerald-500  '>
          
            <h1 className="text-3xl text-white font-bold mb-4">
               Registration Here     
               </h1>
   
             <input type="text" className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2' placeholder='Name'
             value={name} onChange={(e)=>setName(e.target.value)}
             /> <br /><br />
   
   {errorList && !name && <span className='text-red-600 text-lg'>{errorList?.customer_name}</span>}
   
           <input
           type="text"
           className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2'     
           value={phone}
           placeholder="Phone Number"
            onChange={handlePhoneNumberChange}
           />
           
         {errorList && !phone && <span className=" text-red-600 text-lg">{errorList?.customer_contact}</span>}
   
   <input type="text" className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
   
   
   <input type="text" className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2' placeholder='Dob' value={dob} onChange={(e)=>setDob(e.target.value)}/>  
   
   <div className=' ' >
         <input className='mr-1' type="radio" value={'male'} name="default-radio" checked={gender=='male'?true:false}  onChange={(e)=>setGender(e.target.value)} />
          <label for='male' className='mr-4'>Male</label>
   
          <input className='mr-1' type="radio" value={'female'} name="default-radio" checked={gender=='female'?true:false}  onChange={(e)=>setGender(e.target.value)} />
          <label for='female' className='mr-4'>Female</label>
   
          <input className='mr-1' type="radio" value={'other'} name="default-radio" checked={gender=='other'?true:false}  onChange={(e)=>setGender(e.target.value)} />
          <label for='other' className='mr-4'>Other</label>
         </div>
         
   <div>

   </div>
              <div className='bg-blue-200 p-2 rounded-lg w-[10rem]' >
                <button className='text-black font-semibold hover:font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300'>Register</button>
              </div>
    
          </div> */}

<div className='p-4 md:p-12 bg-gradient-to-r from-white via-indigo-400 to-emerald-500'>
    <h1 className="text-3xl text-white font-bold mb-4">
        Your Profile
    </h1>

    <input
        type="text"
        className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
    /> <br />

    <input
        type="text"
        className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2'
        value={phone}
        placeholder="Phone Number"
        onChange={handlePhoneNumberChange}
    /><br />

    <input
        type="text"
        className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    /><br />

    <input
        type="text"
        className='border-2 bg-slate-100 w-full md:w-[20rem] h-[2rem] rounded-lg pl-2 mb-2'
        placeholder='Dob'
        value={dob}
        onChange={(e) => setDob(e.target.value)}
    />

    <div className='flex mb-2'>
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
    </div>

    <div className='bg-blue-200 p-2 rounded-lg w-full md:w-[10rem]'>
        <button className='text-black font-semibold hover:font-bold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 w-full'>
            Update
        </button>
    </div>
</div>



          
        </form>
    </DashBoardLayout>
    </Layout>
    </>
)
}
export default Pro;

