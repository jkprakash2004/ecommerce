import React, { useEffect, useState } from 'react'
import ApiUrl from '../context/ApiBackend'
import { fetchData } from '../redux/features/product/postpdtSlice'
import { useSelector,useDispatch } from 'react-redux'
import displayINRCurrency from '../helpers/displayCurrency'

const AllCartdisplay = () => {
    const dispatch=useDispatch()
    const product=useSelector((state)=>state.product.product)    
    useEffect(()=>{
        dispatch(fetchData())
    },[])
    const [cart,setCart]=useState()
    const [loading,setLoading]=useState(false)
    const loadingCart=new Array(13).fill(null)
    const [quntity,setQuntity]=useState(1)
    const fetchCart=async()=>{
        const responce=await fetch(ApiUrl.getAllCart.url)
        const res=await responce.json()
        setCart(res.data)        
        return res.data
    }


    useEffect(()=>{
        fetchCart()
    },[])
    console.log(cart);            
    
    
    const deleteCartProduct=()=>{}

    const increase=()=>{
        setQuntity((pre)=>pre+1)
    }
    const decrease=()=>{
        if(quntity<0){
            return 1
        }else{
            setQuntity((pre)=>pre-1)
        }
    }
  return (
    <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                        cart?.map((product,index)=>{
                           return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                        
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product.sellingPrice)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={decrease}>-</button>
                                           <span>{quntity}</span> 
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={increase}>+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        
                                    </div>

                                    <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                                </div>
                            )
                        }
                </div>
    

</div>        
    </div>
  )
}

export default AllCartdisplay