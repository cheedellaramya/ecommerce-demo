import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {cartActions} from '../store/cartSlice';
import {Modal} from 'bootstrap';


 function Product() {
     const {id}=useParams();
    const[product,setProduct] = useState([])
    const isLoggedIn = useSelector((state)=>state.loginInfo.isLoggedIn)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let myModal;

    const addToCart = ()=>{
        if(isLoggedIn){
            dispatch(cartActions.addToCart(product))
        }
        else{
            myModal = new Modal(document.getElementById('basicModal'), {});
            myModal.show(); 
        }
    }
    const redirectToLogin=()=>{
            myModal.hide();
            navigate("/login?redirect=/products/"+id)
    }
    
    useEffect(()=>{
        const getProduct = async()=>{
            const response = await fetch(`http://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
        }
    
    getProduct();   
    },[]);

    return (
    
        <div className="container py-5">
            <div className="row py-4">
                <div className="col-md-6">
                    <img src = {product.image} alt={product.title} height='400px' width='400px'/>
                </div>
                <div className="col-md-6">
                    <h4 className='text-uppercase'>{product.category}</h4>
                    <h1 className='display-5'>{product.title}</h1>
                    <p className='lead'>Rating {product.rating && product.rating.rate}
                        <i className='fa fa-star'></i>
                    </p>
                    <h3 className='display-6 fw-bold my-4'>${product.price}</h3>
                    <p className='lead'>{product.description}</p>
                    <button className='btn btn-outline-dark px-4 py-2'onClick={addToCart}>Add to cart</button>
                    <NavLink to ='/cart' className='btn btn-dark px-3 py-2 ms-2'>Go to cart</NavLink>

                </div>
            </div>

            <div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <h3>Please <button  onClick ={redirectToLogin}>Login</button>to continue</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;

