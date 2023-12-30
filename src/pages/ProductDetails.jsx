import React,{ useEffect, useState } from 'react';
import Toaster from '../components/common/Toaster';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Layout from '../layouts/Layout';
import { useCart } from 'react-use-cart';

const ProductDetails=()=>{

    const [productDetails, setProductDetails] = useState()
    const [productPrice, setProductPrice] = useState(0);
    const [attributeId, setAttributeId] =useState();
    const [selectedAttribute,setSelectedAttribute]=useState();
    const [quantity,setQuantity]=useState(1)

    const {slug} = useParams();

    const { addItem } = useCart();

    useEffect(()=>{
        axios.get('https://uol-v-2.hostprohub.com/api/get-product/' + slug)
        .then((response)=>{
            setProductDetails(response.data.data)
            setProductPrice(response?.data?.data?.final_product_price)
        })
        .catch((error)=>{
        console.log(error)
        })
    },[])
        console.log(productDetails)
        console.log(attributeId)
        
   return(
    <Layout>
    <h1 className="text-3xl font-bold underline">
       Product Details   
    </h1>
    {
        productDetails &&(
           
            <div>
                {/* New Design */}
                <div className='flex flex-wrap gap-8 justify-center'>
                    <div className='bg-gray-00 hidden md:flex'>
                    <img className='w-80 h-80' src={productDetails.image.large} alt="" />
                    </div>
                    <div className='bg-gray-00'>
                    <div className='grid grid-rows-3 grid-flow-col'>
                        <div>
                            <p className='text-lg font-bold '>{productDetails?.name}</p>
                            <p className='text-lg font-serif mt-4'>৳{productPrice}</p>
                        </div>
                        
               <div className='flex flex-wrap'>
               {
                 productDetails?.attributes?.map((attribute,index)=>{
                    return(
                        <div>
                            
                            <div className='mt-10'>
                            <button
                                className={`p-2 rounded-lg mr-4 ${attributeId === attribute?.id ? 'bg-green-600 text-white' : 'bg-green-200'}`}
                                onClick={() => {
                                    setProductPrice(attribute.attribute_final_price);
                                    setAttributeId(attribute?.id);
                                    // setSelectedAttribute(attribute)     
                                }}
                            >
                                {attribute.attribute_value} <br />
                                {/* attribute?.id:{attribute?.id} <br />
                                attributeId {attributeId} */}
                            </button>

                            </div>

                            
                        </div>
                    )
                 })                   
               }
               </div>

                        <div>
                <div className='flex flex-wrap mt-6 '>
                <div>
                    <input className='border-solid border-2 border-indigo-600 mr-4 text-center' type="number" name='quantity' min={1} max={100} value={quantity} 
                onChange={(e)=>setQuantity(e.target.value)} />
                </div>


                <div><button className='bg-blue-500 text-white font-bold p-2 rounded-lg mr-10 mt-[-2rem]'
                onClick={(e)=>{
                    e.preventDefault();
                    if(!selectedAttribute){
                        Toaster('Please Select Variation First!','warn')
                    }
                    
                    else if(Number(selectedAttribute.stock)>0){
                       
                        addItem({
                            id: selectedAttribute?.id + '-' + selectedAttribute?.product_id,
                            product_id: selectedAttribute?.id,
                            image: productDetails?.image?.small,
                            name: productDetails?.name,
                            price: selectedAttribute?.attribute_final_price,
                            stock: selectedAttribute?.stock,
                            slug: productDetails?.slug
                          },quantity);
                          console.log('ID:', selectedAttribute?.id + '-' + selectedAttribute?.product_id);
                          Toaster('Product added to cart', 'success');
                          
                    }
                    else{
                        Toaster('Product is out of stock','warn')
                    }
                }}
                >Add To Cart</button></div>
                </div>
                        </div>
                        
                    </div>
                    </div>

                </div>
           </div>
           
        )
    }
    </Layout>
   )
}
export default ProductDetails