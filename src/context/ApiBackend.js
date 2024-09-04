const Domain="http://localhost:3224"
const ApiUrl={
    productFetch:{
        url:`${Domain}/api/product`,
        method:"get"
    },
    fetchOneCategory:{
        url:`${Domain}/api/product/oneCategory`,
        method:"get"
    },
    fetchCategory:{
        url:`${Domain}/api/product/category`,
        method:"post"
    },
    getProductDetails:{
        url:`${Domain}/api/product/productDetails`,
        method:"post"
    },
    postAddCart:{
        url:`${Domain}/api/product/addProduct`,
        method:"post"
    },
    getAllCart:{
        url:`${Domain}/api/product/allCartProduct`,
        method:"get"
    }

}

export default ApiUrl