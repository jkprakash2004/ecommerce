import React,{useState,useEffect} from 'react'
import BannerProduct from "../component/BannerProduct"
import CategoryList from '../component/CategoryList'
import HorizontalProduct from '../component/HorizontalProduct'
import VerticalProduct from "../component/VerticalProduct"
import { fetchData } from '../redux/features/product/postpdtSlice'
import { useSelector,useDispatch } from 'react-redux'

const Home = () => {
  const dispatch=useDispatch()
    const data=useSelector((state)=>state.product.product)
    const cate=data.map((e)=>e.category)
    const dupilcate=[...new Set(cate)]    
    
    useEffect(()=>{
      dispatch(fetchData())
    },[])
    
  return (
    <div>
      <CategoryList />
      <BannerProduct/>
      <HorizontalProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalProduct category={"watches"} heading={"popular's watches"}/>
      {
        dupilcate.map((e,index)=>{
          return(
            <VerticalProduct category={e} heading={"All Products"} key={index}/>        
          )
        })
      }
    </div>
  )
}

export default Home