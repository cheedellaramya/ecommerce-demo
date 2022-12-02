import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
    name:'loginInfo',
    initialState:{isLoggedIn:sessionStorage.getItem('isLoggedIn')},
    reducers:{
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
        }
    }
})
export const loginActions = loginSlice.actions;
export default loginSlice;