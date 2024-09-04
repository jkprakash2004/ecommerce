import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url="http://localhost:3224/api/sign"

const initialState={
    data:[],
    load:false
}

export const getSign=createAsyncThunk("sign/getSign",async(signData)=>{
    const res=await axios.post(url,signData)
    return res.data
})

export const getData=createAsyncThunk("sign/getData",async()=>{
    try{
        const responce=await fetch(url)
        const res=await responce.json()
        return res.data    
    }catch(err){
           return err
    }
})



export const signSlice=createSlice({
    name:"sign",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(getSign.pending,(state,action)=>{
                state.load=true
            })
            .addCase(getSign.fulfilled,(state,action)=>{
                state.data=action.payload
                state.load=false
            })
            .addCase(getData.pending,(state,action)=>{
                state.load=true
            })
            .addCase(getData.fulfilled,(state,action)=>{
                state.data=action.payload
            })
    }
})


export default signSlice.reducer

