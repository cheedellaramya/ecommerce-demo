import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";

const store = configureStore({
    reducer:{
        product : productSlice.reducer,
        cart : cartSlice.reducer,
        loginInfo : loginSlice.reducer
    }
 });
 
 export default store;