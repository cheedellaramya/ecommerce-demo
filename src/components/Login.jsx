import { useEffect } from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginActions } from "../store/loginSlice";


export const  Login=()=>{
    const[state,setState]=useState({
        username:'',
        password:''
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=>state.loginInfo.isLoggedIn)
const handleChange=(event)=>{
    setState({...state,[event.target.name]:event.target.value})
}
const[searchParams,setSearchParams]=useSearchParams();
const redirectTo = searchParams.get("redirect")

useEffect(()=>{
    if(isLoggedIn){
        navigate("/")
    }
},[])

const handleSubmit=(e)=>{
    e.preventDefault();
    fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            crossDomian:true,
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                username: state.username,
                password: state.password
            })
        })
            .then(res=>res.json().then(data=>{
                if(data.token){
                    dispatch(loginActions.login())
                    sessionStorage.setItem("isLoggedIn", true)
                     navigate(redirectTo)
                }
            }))
            .then(json=>console.log(json))
}




    return(
        <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
            <h2 className="text-center mb-4 text-primary">Login Form</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name = 'username' className="form-control border border-primary" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" onChange = {handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name = 'password'className="form-control border border-primary" 
                    id="exampleInputPassword1" onChange = {handleChange}/>
                </div>
                <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p>
                <div className="d-grid">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
            <div className="mt-3">
                <p className="mb-0  text-center">Don't have an account? <a href="signup.html"
                        className="text-primary fw-bold">Sign
                        Up</a></p>
            </div>
        </div>
    </div>
    )
}