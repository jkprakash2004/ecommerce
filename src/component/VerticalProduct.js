import React, {  useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import displayINRCurrency from '../helpers/displayCurrency'
import "./styles/vertical.css"
import { Link } from 'react-router-dom'
import cates from '../helpers/productFetch'
const VerticalProduct = ({category}) => {                     
    const loadingList = new Array(13).fill(null)         
    const [data,setData]=useState()
    const [loading,setLoding]=useState(false)
    const fetData=async()=>{                         
        setLoding(true)
        const res=await cates(category)        
        setData(res)
        setLoding(false)
    }

    useEffect(()=>{        
        fetData()
    },[])    

    const scrollElement = useRef()            
    const scrollRight = () =>{
        console.log(scrollElement.current);
        scrollElement.current.scrollLeft += 100
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

    const handleAddToCart=()=>{

    }

  return (
    <div className='vertical'>
            <h2 className='text-2xl font-semibold py-4 ' style={{textTransform:"capitalize"}}>{category}</h2>
        <div className='container relative' ref={scrollElement}>                                           
        <div className='flex items-center gap-4 md:gap-6 overflow-hidden scrollbar-none transition-all' ref={scrollElement}>

            <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 

            {

                    loading ? (
                        loadingList.map((product,index)=>{
                            return(
                                    <div className='w-full min-w-[280px]  md:min-w-[250px] max-w-[280px] md:max-w-[200px]  bg-white rounded-sm shadow ' key={index}>
                                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex   animate-pulse'>
                                        </div>
                                            <div className='p-4 grid gap-3'>
                                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                            <p className='capitalize     text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                </div>
                                            <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                            </div>
                    </div>
        )
    })
) : (
                    data?.map((product,index)=>{
                        return(
                            <Link to={"product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow '>
                            <div className='bg-white h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img src={product.productImage} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                    <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price)  }</p>
                                </div>
                                <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
        )
    })
)

}

        </div>                                                    
    </div>

    </div>
  )
}

export default VerticalProduct