import React, { useEffect, useState } from 'react'
import { fetchOneCategory } from '../redux/features/product/postpdtSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
const CategoryList = () => {
    const dispatch=useDispatch()
    const oneCategory=useSelector((state)=>state.product.oneCategory)
    const load=useSelector((state)=>state.product.loading)    
    const categoryLoading=new Array(13).fill(null)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{         
        
        dispatch(fetchOneCategory())        
    },[])

  return (
    <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 overflow-hidden scrollbar-none'>
                {

                    load ? (
                        categoryLoading.map((el,index)=>{
                                return(
                                    <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                    </div>
                                )
                        })  
                    ) :
                    (
                        oneCategory?.map((product,index)=>{
                            return(
                                <Link to={"product/"+product?._id} className='cursor-pointer' key={product?.category}>
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                        <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                    </div>
                                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
  )
}

export default CategoryList