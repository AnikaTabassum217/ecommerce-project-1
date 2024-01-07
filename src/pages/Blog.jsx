import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Toaster from '../components/common/Toaster';
import axios from 'axios';
import Layout from '../layouts/Layout'
import '../assets/css/blog.css'
const Blog=()=>{

    const[blog,setBlog]=useState();

    useEffect(()=>{
      axios.get('https://uol-v-2.hostprohub.com/api/blogs')
      .then((response)=>{
        setBlog(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])
console.log(blog)

   return(
    <>
    <Layout>
    {/* <h1 className="text-3xl font-bold underline">
        Blog Page
    </h1> */}
    {
        blog && blog.map((b,index)=>{
            return(            

          <>
              <div key={index}>
                {/* // */}
                <div className='bg-gradient-to-r from-indigo-200 via-indigo-300 to-steal-500 md:flex   gap-2 px-40 p-8'>

                <div className='bg-gray-00 w-[22rem] h-[22rem]' > <img className='shadow-2xl responsive-img  ' src={b.image} alt="" />
                </div>

                <div className='grid grid-rows-3 grid-flow-col gap-4 ml-[6rem] justify-start w-[24rem] h-[14rem]'>  
                <div className='bg-gray-00 text-lg font-bold italic responsive-title'><p>{b.title}</p></div>
                  
                 

              <div class='hidden md:flex flex-col  '>

              <div class='mb-0'>
                Production: <span class='font-bold'>{ b.date }</span>
              </div>

              <div class='mb-0 mt-[0rem] '>
                Expire: <span class='font-bold'>{ b.expire_date }</span>
              </div>

              </div>
              <Link
              to={`/blog/${b.slug}`}  //b  parameter if "to={`/blog/${blog.slug}`}" then "(b,index)" it will be (blog,index)                  
          >
              <div  className='responsive-btn'>
                <button className='bg-blue-600 text-white p-2 rounded-lg'>Next <span className='ml-2 text-white'>-&gt;</span></button>
              </div>
              </Link>
               
                </div>
                
                </div>
              </div>
          </>
            
            )
        })
    }
            
    </Layout>
    </>
   )
}
export default Blog

