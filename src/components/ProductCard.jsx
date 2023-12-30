import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/productCard.css'
import { useCart } from 'react-use-cart';

import Toaster from './common/Toaster';
const ProductCard=(props)=>{

    const {product} =props
    console.log(product)

    const { addItem } = useCart();

   return(
    <>
    <Link to={`product/${product?.slug}`}>
      <div className='shadow-2xl h-[25rem]'>
      {/* <h1 className="text-3xl font-bold underline">
     Product Card Page
    </h1> */}

      <div className='relative'>
      <img src={product?.image.large} alt=""  className='w-[15rem] h-[15rem] p-4  ml-[1.5rem] 
      transform hover:scale-110 transition hover:delay-300
     
      '/>

        {Number(product?.stock)>0 ? (
          Number(product?.discounted_price) > 0 && (
            <div className='absolute top-2 left-2 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-indigo-700/10'>
              {product.discount} OFF
            </div>
          )
        ) : (
          <div className='absolute top-0 left-0 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-indigo-700/10'>
            Out Of Stock
          </div>
        )}

      </div>
     <div  className='text-center font-bold text-lg'> <p>{product.name}</p></div>
     {/* grid-cols-1 lg:grid-cols-2 */}
    <div className='flex flex-col md:flex-row mt-8  '>

      <div className='flex-grow text-lg ml-4 mt-2'>
      {
        Number(product?.discounted_price)>0 ?
        (
            <div className='flex items-center discounted-price'>
                <div className='discounted'>{product.formatted_final_product_price}</div>
                <div className='regular'>{product.formatted_regular_price}</div>

            </div>
        )
        :
        (
            <div className='regular-price'>
                {product.formatted_final_product_price}
            </div>
        )
    }
      </div>
      
        <div className='flex-grow '>
        <button
          className='bg-black text-white p-2 btn b1'
          onClick={(e) => {
            e.preventDefault();
            if (product?.stock > 0) {
              addItem({
                id: product?.id,//cart
                product_id: product?.id,//order
                image: product?.image?.large,
                name: product?.name,
                price: product?.final_product_price,
                stock: product?.stock,
                slug: product?.slug
              });
              Toaster('Product added to cart', 'success');
            } else {
              Toaster('Product is out of stock', 'warn');
            }
          }}
        >
          Add To Cart
        </button>   
        </div>
    </div>


    
   
      </div>
    </Link>   
      </>
   )
}
export default ProductCard