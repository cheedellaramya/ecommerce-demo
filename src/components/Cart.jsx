import React from 'react'
import './Cart.css';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { productActions } from '../store/productSlice';
import { NavLink } from 'react-router-dom';

 const Cart = () => {
    const itemsList = useSelector((state)=>state.cart.itemsList);
    const cartTotal = useSelector((state)=>state.cart.cartTotal);
    const isLoggedIn = useSelector((state)=>state.loginInfo.isLoggedIn)
    
    console.log(itemsList);
    const dispatch = useDispatch();
    const updateQuantity=(e,id)=>{
        const qty = e.target.value;
        dispatch(cartActions.changeQuantity({quantity:parseInt(qty),id:id}))

    }
    const removeFromCart =(id)=>{
        dispatch(cartActions.removeFromCart(id))
    }
 useEffect(()=>{
  dispatch(cartActions.getTotal())
 },[itemsList])

  return (
    
    <div>
        <h5>Your shopping cart</h5>
        <br/>
        <br/>

     
   {!isLoggedIn && <h4> Please  <NavLink to='/login?redirect=/cart'>Login</NavLink> to Continue</h4>}
        
   {isLoggedIn && 
      <>
      <table className="table table-image">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
       
          <tbody>
          { itemsList.map((product)=>{ 
            return(
            <tr>
                <td className="w-25">
                    <img src={product.image} className="img-fluid img-thumbnail" alt="Sheep"/>
                </td>
                <td>{product.title}</td>
                <td>{product.price}$</td>
                <td className="qty"><input type="number" min = "1" value= {product.quantity} className="form-control" id="input1" onChange={(e)=>updateQuantity(e,product.id)}/></td>
                <td>{product.totalPrice}</td>
                <td>
                    <a href="#" className="btn btn-danger btn-sm">
                        <i className="fa fa-times" onClick={()=>{removeFromCart(product.id)}}></i>
                       
                    </a>
                </td>
          </tr>
            )
        })}
            
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <h5>Total: <span className="price text-success">${cartTotal}</span></h5>
        </div>

        <div className="border-top-0 d-flex justify-content-between">
          <button type="button" className="btn btn-success">Checkout</button>
        </div>
      </>
       }

 
      </div>
  
    
  )
}
export default Cart;
