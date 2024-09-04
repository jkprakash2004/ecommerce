import { useEffect } from "react"
import ApiUrl from "../context/ApiBackend"


const addCart=async(e,id,userId)=>{    
    e?.preventDefault()
    
    const responce=await fetch(ApiUrl.postAddCart.url,{
        method:ApiUrl.postAddCart.method,        
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            productId:id,
            userId,userId,
            quentity:1
        })
    })
    const res=await responce.json()
    return res.data
}

export default addCart