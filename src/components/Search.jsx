import React from 'react'
import { useDispatch } from 'react-redux';
import { productActions } from "../store/productSlice";


const Search = () => {
    const dispatch=  useDispatch()
    const searchInput = (e)=>{
        const searchStr = e.target.value;
        console.log(searchStr)
        dispatch(productActions.searchProducts(searchStr))      
    }

    return (
        <div>
            <input type = "text" id = "search" onKeyUp={searchInput} placeholder='Type here to search...'
             style={{marginLeft:"40%",marginTop:"20px",textAlign:"center",padding:"0px 50px"}}/>
        </div>
    )
}
export default Search;
