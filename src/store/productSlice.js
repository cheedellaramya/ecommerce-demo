import { createSlice } from "@reduxjs/toolkit";
 
const productSlice = createSlice({
    name:'product',
    initialState : {products:[], allProducts:[]},
    reducers:{
        setProducts(state,action){
            
            state.products = action.payload;            
            state.allProducts = state.products
            let categories = new Set();
            state.allProducts.forEach((item)=>{
                categories.add(item.category);
            }) 
            state.categories = [...categories]

        },
        
        searchProducts(state,action){
            state.products = state.allProducts.filter((d)=>d.title.toLowerCase().includes(action.payload.toLowerCase()))
        }
        
        }
    
    }
) 
export const productActions = productSlice.actions;
export default productSlice;