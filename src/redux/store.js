import { configureStore } from "@reduxjs/toolkit";
import signReducer from "./features/user/signSlice";
import postpdtReducer from "./features/product/postpdtSlice";
export const store=configureStore({
    reducer:{
        sign:signReducer,
       product:postpdtReducer,
    }
    
})