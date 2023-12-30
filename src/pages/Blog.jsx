import React from 'react';
import Toaster from '../components/common/Toaster';
const Blog=()=>{
   return(
    <>
    <h1 className="text-3xl font-bold underline">
        Blog Page
       
    </h1>

    <button onClick={()=>{
           Toaster('Product removed from cart', 'error'); 
        }}>Delete</button>
    
    </>
   )
}
export default Blog