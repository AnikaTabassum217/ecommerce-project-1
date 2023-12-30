import React,{ useContext } from 'react';
import Layout from '../layouts/Layout';
import { SettingContext } from '../components/SettingProvider';
import ProductCard from '../components/ProductCard';

import Slider from 'react-slick';

const Home=()=>{
    const SettingDataFromContext = useContext(SettingContext)

    console.log(SettingDataFromContext)

    var slickSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
  };

  var slickCategorySettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      
  responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


   return(
    <>
    <Layout>
    {/* <h1 className="text-3xl font-bold underline">
      Home Page!
    </h1> */}

  <div className='p-8 px-20'>
  <Slider {...slickSettings}>
    {
        SettingDataFromContext?.hompageBanner.map((banner,index)=>{
            return(
                <div key={index}>
                <img src={banner.banner_image} alt="" className="h-[26rem] w-[96rem]" />
                </div>
            )
        })
    }

    </Slider>

    <br />
    <br />

    <Slider {...slickCategorySettings}>
        {
            SettingDataFromContext?.categories.map((category,index)=>{
                return(
                    <div className="mx-8 " key={index}>

                    <div className='bg-gray-200 w-[15rem] h-[15rem] p-1 space-x-4  hover:bg-white transform hover:scale-110 transition hover:delay-300 hover:text-blue-600'>
                    <img className='w-[10rem] h-[10rem] m-auto' src={category.image} alt="" />
                    <p className='text-center text-black font-semibold'>{category.name}</p>
                    </div>
        

                    </div>
                )
            })
        }

    </Slider>

    <br />
    <br />

     <div className='grid grid-cols-2 lg:grid-cols-4 space-x-4 '>
     {
        SettingDataFromContext?.popular?.data.map((product,index)=>{
            return(
                <div key={index}>
                  <ProductCard product={product}/>
                </div>
            )

        })
    }
     </div>
  </div>

    </Layout>
    
    </>
   )
}
export default Home