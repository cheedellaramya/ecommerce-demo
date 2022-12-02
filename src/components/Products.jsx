import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";

export default function Products() {
    const[data,setData] = useState([]);
    const[filter,setFilter] = useState('');
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async()=>{
            const response = await fetch('https://fakestoreapi.com/products');
            if(componentMounted){
                setData(await response.clone().json());
                setFilter(await response.json());
                console.log(filter);
            }
            return () =>{
                componentMounted = false;
            }
           
        }
        getProducts();
    },[]);
    
    const filterProduct =(category)=>{
        // const category = cat.toLowerCase();
        const updatedList = data.filter((x)=>x.category === category);
        setFilter(updatedList);
    }
    const ShowProducts = (index)=>{
        return(
            <>
                <div className="buttons d-flex justify-content-center pb-5 mb-5" key = {index}>
                    <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("men's clothing")}>Men's Wear</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("women's clothing")}>Womens Wear</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("jewelery")}>jwellery</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("electronics")}>Electronics</button>
                    
                </div>
                    {filter && filter.map((product, index)=>{ 
                        return(
                            <>
                            <div className="col-md-3 mb-3" key={index}>
                                <div className="card h-100 text-center p-4" key={product.id}>
                                    <img className="card-img-top" 
                                        src={product.image} alt={product.title}
                                        height='250px'/>
                                    <div className="card-body">
                                        <h5 className="card-title lead fw-bold">
                                            {product.title.substring(0,12)}..</h5>
                                        <p className="card-text lead fw-bold">${product.price}</p>
                                        <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark mr-4">Buy Now</NavLink>
                                    </div>
                                </div>
                            </div>
                            </>
                        )
                    })}  
            </>
        )
    }
  return (
    <div>
        <div className="container my-5 py-5">
            <div className="row">
                <div className="col-12 mb-5">
                    <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                    <hr/>
                </div>
            </div>
            <div className="row justify-content-center">
                <ShowProducts/>
            </div>
        </div>
    </div>
  )
}
