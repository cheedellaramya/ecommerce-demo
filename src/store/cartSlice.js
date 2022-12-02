import {createSlice} from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        itemsList:[],
        totalQuantity:0,
        cartTotal:0
    },
    reducers:{
        addToCart(state,action){
            const newItem = action.payload;//which eceives from add to cart functionaity 
            //to check item is already available or not
            console.log(newItem);
            const existingItem = state.itemsList.find((item)=>item.id === newItem.id);
            if(existingItem){
                existingItem.quantity++;
                existingItem.price += newItem.price;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
                // state.cartTotal = state.cartTotal + existingItem.totalPrice;

             }else{
                state.itemsList.push({
                    id : newItem.id,
                    title: newItem.title,
                    price : newItem.price,
                    description : newItem.description,
                    category: newItem.category,
                    quantity: 1,
                    image: newItem.image,
                    totalPrice: newItem.price
                })
                state.totalQuantity++;
                // state.cartTotal =state.cartTotal + state.itemsList[state.itemsList.length-1].totalPrice ;
             }
        },
        removeFromCart(state,action){
            
            //[{id:1, tp:100}, {id:2, tp:200}]
            //action.payload.id = 2

            // const foundObj = state.itemsList.filter((value) => value.id === action.payload);
           
            const remainingItems = state.itemsList.filter((item)=>item.id !== action.payload );
            state.itemsList = remainingItems;
            state.totalQuantity = state.totalQuantity - 1;

        },
        changeQuantity(state,action){
            const index = state.itemsList.findIndex((product)=>product.id === action.payload.id);
            state.itemsList[index].quantity = action.payload.quantity;
                    
            state.itemsList[index].totalPrice = state.itemsList[index].quantity * state.itemsList[index].price;
        },
        getTotal(state,action){
            let CT=0;
            state.itemsList.forEach((item)=>{
                CT += item.totalPrice 
            })
            state.cartTotal= CT
        }

    }
})
export const cartActions = cartSlice.actions;
export default cartSlice;