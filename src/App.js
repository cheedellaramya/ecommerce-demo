import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {Route,Routes} from 'react-router-dom';
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
  return (
    <div>
        <Navbar/>
          <Routes>
            
                  <Route  path ='/' element= {<Home/>}/>
                  <Route  path ='/products' element= {<Products/>}/>
                  <Route  path ='/products/:id' element= {<Product/>}/>
                  <Route  path = '/cart' element = {<Cart/>}/>
                  <Route  path = '/login' element = {<Login/>}/>
                  <Route  path = '/register' element = {<Register/>}/>

          </Routes>
        
    </div>
  );
}

export default App;
