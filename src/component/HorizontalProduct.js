import React,{useEffect, useRef, useState} from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import Product from '../Data'
import { Link } from 'react-router-dom'
import { fetchData } from '../redux/features/product/postpdtSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'



const HorizontalProduct = ({category,heading}) => {
    const dispatch=useDispatch()
    const productData=useSelector((state)=>state.product.product)    
    const load=useSelector((state)=>state.product.loading)    
    const image=productData.map((e)=>e.productImage)
    console.log(image);
    const emptydata=new Array(13).fill(null)
    const [loading,setLoading]=useState(true)

    const [cat,setCat]=useState([])
    
    useEffect(()=>{
        dispatch(fetchData())
        
      },[])
    const scrollElement = useRef()      
      

    const scrollRight = () =>{
        console.log(scrollElement.current);
        scrollElement.current.scrollLeft += 100
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

    console.log(Product);
  return (
    <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

                
           <div className='flex items-center  gap-4 md:gap-6 overflow-hidden scrollbar-none transition-all' ref={scrollElement}>

            <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' style={{zIndex:"999"}} onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight} style={{zIndex:"999"}}><FaAngleRight/></button> 

           
                
                                               
                                               {  
                                               loading ? (
                                                emptydata.map((product,index)=>{
                                                    return(
                                                        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex' key={index}>
                                                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                
                                                            </div>
                                                            <div className='p-4 grid w-full gap-2'>
                                                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                                                <div className='flex gap-3 w-full'>
                                                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                                                </div>
                                                                <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                           ) : (
                                            productData?.map((product,index)=>{
                                                return(
                                                    <div key={index}></div>                                                    
                                                )
                                            })
                                           )
                                               
                                            }
                                
                    
                
                    
                
           
               
            
           </div>
            

    </div>
  )
}

export default HorizontalProduct