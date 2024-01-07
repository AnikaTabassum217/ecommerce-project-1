import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../assets/css/blogDetails.css'

const BlogDetails=()=>{

const [blogDetails,setBlogDetails] = useState();
  const {slug} =useParams();

useEffect(()=>{
    axios.get('https://uol-v-2.hostprohub.com/api/blog/' + slug)
    .then((response)=>{
        setBlogDetails(response?.data?.data)
    })
    .catch((error)=>{
        console.log(error)
    })
},[])

console.log(blogDetails)

return(
<>
            {
  blogDetails && (
<div className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-steal-500 h-screen">
                  
<div className='bg-gradient-to-r from-indigo-200 via-indigo-300 to-steal-500 flex flex-wrap gap-2 px-4 md:px-8 lg:px-16'>
<div className='bg-gray-00 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto'>
  <img className='w-full h-auto mt-3 shadow-2xl' src={blogDetails.image} alt="" />
</div>

<div className='grid grid-rows-3 grid-flow-col gap-4 px-4 md:px-8 lg:px-1 pt-2  md:pt-0 w-full md:w-2/3 lg:w-3/4'>
  
  <div className='bg-gray-00 text-lg font-bold italic mt-[2rem]  '>
    <p>{blogDetails.title}</p>
  </div>

  <div className='bg-gray-00 font-serif mt-[-6rem]  md:mt-[-2rem]'>
    {blogDetails.sub_title}
  </div>

  <div className='bg-gray-00 mt-4 font-serif flex flex-col md:flex-row'>
    <div className='mb-2 md:mb-0 md:mr-6'>
      Production: <span className='font-bold'>{blogDetails.date}</span>
    </div>
    <div>
      Expire: <span className='font-bold'>{blogDetails.expire_date}</span>
    </div>
  </div>
</div>
</div>

</div>
          )
        }
</>
)
}

export default BlogDetails;

