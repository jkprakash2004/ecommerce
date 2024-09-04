const url="http://localhost:3224/api/product/category"


const cates=async(category)=>{
    const res=await fetch(url,{
        method:"post",
        headers:{"content-type" : "application/json"},
        body:JSON.stringify({category:category})
    })
    const response=await res.json()                        
    return response.data
}

export default cates