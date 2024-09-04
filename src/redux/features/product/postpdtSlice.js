import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import ApiUrl from "../../../context/ApiBackend";
import axios from "axios";

const initialState={
    product:[],    
    oneCategory:[],
    addCart:[],    
    loading:false
}


export const fetchData=createAsyncThunk("product/fetchData",async()=>{
    try{
    const responce=await fetch(ApiUrl.productFetch.url)
    const res=await responce.json()
    return res.data
    }catch(err){
        console.log(err);
    }
})

export const fetchOneCategory=createAsyncThunk("product/fetchOneCategory",async()=>{
    try{
    const responce=await fetch(ApiUrl.fetchOneCategory.url)
    const res=await responce.json()
    return res.data
    }catch(err){
        console.log(err);
    }
})

export const details=createAsyncThunk("product/details",async(id)=>{
    try{
    const responce=await axios.post("http://localhost:3224/api/product/details",id)    
    return responce.data
    }catch(err){
        console.log(err);
    }
})



export const postpdtSlice=createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchData.pending,(state,action)=>{
                state.loading=true
            })
            .addCase(fetchData.fulfilled,(state,action)=>{
                state.loading=false
                state.product=action.payload
            })
            .addCase(fetchOneCategory.pending,(state,action)=>{
                state.loading=true;
            })
            .addCase(fetchOneCategory.fulfilled,(state,action)=>{
                state.oneCategory=action.payload;
                state.loading=false;
            })
            .addCase(details.pending,(state,action)=>{
                 state.loading=true
            })
            .addCase(details.fulfilled,(state,action)=>{
                state.loading=false
                state.addCart=action.payload
           })
            
    }
})


export default postpdtSlice.reducer
