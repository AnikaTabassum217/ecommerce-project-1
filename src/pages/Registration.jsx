import React, { useEffect, useState } from 'react';
import Toaster from '../components/common/Toaster';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../assets/css/registration.css';
import Navbar from '../layouts/Navbar';
import Layout from '../layouts/Layout';

const Registration=()=>{
    const[name, setName]= useState();
    const[phoneNumber,setPhoneNumber]=useState();
    const[email,setEmail] =useState();
    const[dob,setDob] = useState();
    const[gender, setGender] = useState()

    const[password, setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')
    const[isPasswordMatched, setIsPasswordMatched] = useState(0)
    const [errorList, setErrorList] = useState('')

    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [message, setMessage] = useState("")

  const phoneRegex = /^\d{11}$/;

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);

    if (phoneRegex.test(newPhoneNumber)) {
      setIsValidPhoneNumber(true);
    } else {
      setIsValidPhoneNumber(false);
    }
  };

    useEffect(()=>{
        if(password!==confirmPassword){
            setIsPasswordMatched(1)
        }
        else if(password==confirmPassword & confirmPassword?.length>5){
            setIsPasswordMatched(2)
        }
        
    },[confirmPassword])

    const signUp=(e)=>{
        e.preventDefault();
        let isValidated = true;

        if(isValidated){
            var signUpData={
                customer_password: password,
                customer_password_confirmation: confirmPassword,//In Backend confirmPassword off. So without confirmPassword registration done
                customer_name:name,
                customer_contact:phoneNumber,
                customer_email:email,
                customer_dob:dob,
                customer_gender:gender,
            };
            axios.post('register-customer',signUpData)
            .then(response=>{
                console.log(response);
                if(response?.data?.success_message){
                    Toaster("Registration Successful",'success');
                     Navigate('/',{relace:true})
    
                }
                else{
                    Toaster("Somethhing went wrong", 'error')
                    setErrorList(response.data.message)
                }
            })
            .catch((error)=>{
                console.log(error)
            })

        }
        else{
            Toaster('Please fill up the form with correct data', 'warn')
        }

       
    }
   return(
    <>
        <Layout>
        <form method='post' onSubmit={(e)=>signUp(e)}>

          <div className='bg-gradient-to-r from-white via-indigo-400 to-emerald-500 min-h-screen flex items-center justify-center'>
            
         <div className='grid justify-center space-y-2 p-12 bg-opacity-80 backdrop-filter backdrop-blur-md  rounded-lg shadow-lg w-[30rem] h-[30rem] rounded-tl-[10%] rounded-bl-[10%] custom-border-radius'>
         <h1 className="text-3xl text-white font-bold mb-4">
            Registration Here     
            </h1>

          <input type="text" className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2' placeholder='Name'
          value={name} onChange={(e)=>setName(e.target.value)}
          />

{errorList && !name && <span className='text-red-600 text-lg'>{errorList?.customer_name}</span>}

        <input
        type="text"
        className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2'     
        value={phoneNumber}
        placeholder="Phone Number"
         onChange={handlePhoneNumberChange}
        />
        {/* {!isValidPhoneNumber && <div className="text-red-600">Invalid number</div>} */}
      {errorList && !phoneNumber && <span className=" text-red-600 text-lg">{errorList?.customer_contact}</span>}

<input type="text" className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>


<input type="text" className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2' placeholder='Dob' value={dob} onChange={(e)=>setDob(e.target.value)}/>  

<div className=' ' >
      <input className='mr-1' type="radio" value={'male'} name="default-radio" onChange={(e)=>setGender(e.target.value)} />
       <label for='male' className='mr-4'>Male</label>

       <input className='mr-1' type="radio" value={'female'} name="default-radio" onChange={(e)=>setGender(e.target.value)} />
       <label for='female' className='mr-4'>Female</label>

       <input className='mr-1' type="radio" value={'other'} name="default-radio" onChange={(e)=>setGender(e.target.value)} />
       <label for='other' className='mr-4'>Other</label>
      </div>
      
<div>
  <input
    type="text"
    className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2 mb-2'
    placeholder='Password'
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <input
    className='border-2 bg-slate-100 w-[20rem] h-[2rem] rounded-lg pl-2 mt-2'
    type="text"
    placeholder='Confirm Password'
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
</div>

            {isPasswordMatched === 1 && <span className='text-red-600 text-lg'>Password Not matched</span>}
            {isPasswordMatched === 2 && <span className='text-green-700'>Password matched</span>}
            {/* <button className='bg-blue-200 p-2 rounded-lg w-[10rem]'>
              <p className=''>Register</p>
            </button> */}
            <div className='bg-blue-200 p-2 rounded-lg w-[10rem]' >
               <button className='text-black font-semibold hover:font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300'>Register</button>
            </div>
         </div>
          </div>
        
        </form>
        </Layout>
    </>
   )
}
export default Registration