import React from 'react';
import Toaster from '../components/common/Toaster';
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import '../assets/css/cart.css'
import Layout from '../layouts/Layout';
const Cart=()=>{
    const {items,updateItemQuantity,removeItem,cartTotal} =useCart()
   return(
    <>
   {/* <h1 className="text-3xl font-bold underline">
    Cart Page
    </h1> */}
    
    <Layout>
     <div className=' bg-gray-300 responsive'>

     <h1 className="text-xl text-blue-600 text-center mb-4 font-bold hover:underline">
    Your Cart
    </h1>

     <div >    
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="hidden sm:block px-6 py-3">
                          Image
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Subtotal
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                      
                    </tr>
                </thead>
                <tbody>
                {
                    items?.map((product,index)=>{
                        return(
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            
                            <th scope="row" class="hidden sm:block px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <td class="px-6 py-4"><Link to={`/product/${product.slug}`}>
                                    <img src={product?.image} alt="" 
                                className="w-[10rem] h-[10rem]"/></Link></td>
                            </th>

                              
                            
                            <td class="px-6 py-4 text-lg text-black font-bold ">{product.name}</td>
                            <td class="px-6 py-4 text-lg text-black font-bold">{product.price}</td>

                            {/* <div className='flex flex-wrap px-6 py-4 text-lg text-black font-bold'>
                            <div><button className= {product.quantity==1 ? "bg-blue-800 text-white px-2 py-2 rounded-lg cursor-not-allowed opacity-50 " : "bg-blue-800 text-white px-2 py-2 rounded-lg "}
                            onClick={()=>
                            {
                              if(product.quantity>1){
                                updateItemQuantity(product.id, product.quantity - 1)
                                Toaster('Product Deleted', 'error')
                              }
                              else{
                                Toaster('Press Delete', 'warnNotify')
                              }
                            }
                            }

                            >-</button></div>
                            <div><td className='px-6 py-6 '>{product.quantity}</td></div>
                            <div><button className='bg-blue-800 text-white px-2 py-2 rounded-lg '
                            onClick={()=>
                            {
                              if(product.stock>product.quantity){
                                updateItemQuantity(product.id, product.quantity +1)
                                Toaster('Product added to cart', 'success')
                              }
                              else{
                                Toaster('Stock Out', 'error')
                              }
                            }
                            }
                            >+</button></div>
                            </div> */}


    <td class="px-6 py-4 text-lg text-black font-bold">

    <div className='flex flex-wrap'>

    <div>
      <button
        className={
          product.quantity === 1
            ? "bg-blue-800 text-white px-2 py-2 rounded-lg cursor-not-allowed opacity-50 "
            : "bg-blue-800 text-white px-2 py-2 rounded-lg "
        }
        onClick={() => {
          if (product.quantity > 1) {
            updateItemQuantity(product.id, product.quantity - 1);
            Toaster('Product Deleted', 'error');
          } else {
            Toaster('Press Delete', 'warnNotify');
          }
        }}
      >
        -
      </button>
    </div>

    <div className="px-2 py-2">{product.quantity}</div>


    <div>
      <button
        className="bg-blue-800 text-white px-2 py-2 rounded-lg "
        onClick={() => {
          if (product.stock > product.quantity) {
            updateItemQuantity(product.id, product.quantity + 1);
            Toaster('Product added to cart', 'success');
          } else {
            Toaster('Stock Out', 'error');
          }
        }}
      >
        +
      </button>
    </div>

    </div>

    </td>

                            <td className='mx-[2rem] text-lg text-black font-bold'>{(Number(product.price) * Number(product.quantity)).toFixed(2)}</td>
                            
                            <td className="mt-[5.5rem]">
              <button
                className="bg-red-500 text-white p-2 rounded-lg"
                onClick={() => {
                  removeItem(product.id);
                  Toaster('Product deleted from cart', 'error');
                }}
              >
                Delete
              </button>
            </td>
          
              </tr>                  
                      ) })}       
              </tbody>
              

            </table>

        </div>
    </div>
    
    <div className='bg-white container  px-4 py-4 mt-0 text-right'>

          <div className='text-lg text-black font-bold'>Total Price: {cartTotal.toFixed(2)}</div>
          <Link to={'/checkout'}>
            <button className='bg-blue-500 text-white  p-2 rounded-lg mt-4 hover:bg-green-700 '>
              Check out
            </button>
          </Link>
    </div>

     </div>
     </Layout>
    </>
   )
}
export default Cart