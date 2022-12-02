import React from 'react'
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from "../store/loginSlice";
export default function Navbar() {
    const cartQty = useSelector((state)=>state.cart.totalQuantity);
    
    const isLoggedIn = useSelector((state)=>state.loginInfo.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Logout = ()=>{
      dispatch(loginActions.logout())
      sessionStorage.setItem("isLoggedIn", false);
      navigate("/login?redirect=/")
    }
    
    
  return (

    
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="#">Navbar</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Products">Products</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="#">About</NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="#">Contact</NavLink>
              </li> */}
            </ul>
            <div className="buttons">
            {!isLoggedIn &&<NavLink to="/login?redirect=/" className="btn btn-outline-dark"> <i className="fa fa-sign-in me-1"></i>Login
             </NavLink>}
             {!isLoggedIn && <NavLink to="/register" className="btn btn-outline-dark ms-2"> <i className="fa fa-user-plus me-1"></i>Register
             </NavLink>}
             {isLoggedIn &&<NavLink to="/cart" className="btn btn-outline-dark ms-2"> <i className="fa fa-shopping-cart me-1"></i>Cart({cartQty})
             </NavLink>}
             {isLoggedIn && <button className="btn btn-outline-dark ms-2" onClick={Logout}> <i className="fa fa-sign-out me-1" ></i>Logout</button>
             }

            </div>
          </div>
        </div>
      </nav>
    </div>   
  )
}
