import React, { useEffect, useState,useCallback } from 'react'
import { fetchData } from '../redux/features/product/postpdtSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency'
import AllProductVisible from './allProductVisible';
import addCart from '../helpers/addCartProduct';
import getData from "../redux/features/user/signSlice"

const ProductDetails = () => {
  const dispatch=useDispatch()
  const fetchCat=useSelector((state)=>state.product.product)    
  const params=useParams()
  const [loading,setLoading]=useState(false)
  const productImageLoding=new Array(13).fill(null)
  const categorys=[fetchCat.find((e)=>e._id===params.id)]
  const [userId,setUserId]=useState('')

  const users=async()=>{
    const responce=await fetch("http://localhost:3224/api/sign")
    const res=await responce.json()
    const id=res.data.map((e)=>e._id)
    setUserId(id)
    return res.data
  }

  console.log(categorys);
  const ca=categorys.map((e)=>e.category)    
  useEffect(()=>{
    dispatch(fetchData())        
    users()
  },[dispatch])
  
  
const handleAddToCart=async(e,id)=>{
  const data=await addCart(e,id,userId)  
  console.log(data,'kkkk');
}
const handleBuyProduct=()=>{}
const [activeImage,setActiveImage] = useState("")

const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
  x : 0,
  y : 0
})
const [zoomImage,setZoomImage] = useState(false)

const handleMouseEnterProduct = (imageURL)=>{
  setActiveImage(imageURL)
}

const handleZoomImage = useCallback((e) =>{
  setZoomImage(true)
  const { left , top, width , height } = e.target.getBoundingClientRect()
  console.log("coordinate", left, top , width , height)

  const x = (e.clientX - left) / width
  const y = (e.clientY - top) / height

  setZoomImageCoordinate({
    x,
    y
  })
},[zoomImageCoordinate])

const handleLeaveImageZoom = ()=>{
  setZoomImage(false)
}






  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
      <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

<div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
    <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

      {/**product zoom */}
      {
        zoomImage && (
          <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
            <div
              className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
              style={{
                background : `url(${activeImage})`,
                backgroundRepeat : 'no-repeat',
                backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

              }}
            >

            </div>
          </div>
        )
      }
      </div>
              <div className='h-full'>
                  {
                    loading ? (
                      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                        {
                          productImageLoding.map((el,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                              </div>
                            )
                          })
                        }
                      </div>
                      
                    ) : (
                      <div className='flex gap-2 lg:flex-col overflow-hidden scrollbar-none h-full'>
                        {
                          categorys?.map((e,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded p-1' key={index}>
                                <img src={e?.productImage} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(e.productImage)}  onClick={()=>handleMouseEnterProduct(e.productImage)}/>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  }
              </div>
          </div>

    <div>
      {
            loading ? (
              <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
    
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                  <p className='text-red-600 bg-slate-200 w-full'></p>
                  <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                </div>

                <div className='flex items-center gap-3 my-2 w-full'>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                </div>

                <div className='w-full'>
                  <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                  <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                </div>
              </div>
            ) : 
            (
              <div>
                {
                  categorys.map((data,index)=>{
                    return(
                      <div className='flex flex-col gap-1' key={index}>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>

                <div className='text-red-600 flex items-center gap-1'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStarHalf/>
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                  <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-2'>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
                </div>

                <div>
                  <p className='text-slate-600 font-medium my-1'>Description : </p>
                  <p>{data?.description}</p>
                </div>
              </div>
                    )
                  })
                }
              </div>
            )
           }

    </div>
    </div>
    <AllProductVisible category={ca}/>
    </div>
  )
}

export default ProductDetails