import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Blog from './pages/Blog';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import SettingProvider from './components/SettingProvider';
import { CartProvider } from "react-use-cart";
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import axios from 'axios';
import Registration from './pages/Registration';
import Login from './pages/Login';
import UserProvider from './components/UserProvider';
import DashBoard from './pages/user/DashBoard';
import Pro from './pages/user/Pro';
import AddressBoook from './pages/user/AddressBook';
import AddAddress from './pages/user/AddAddress';
import UpdateAddress from './pages/user/UpdateAddress';
import OrderList from './pages/user/OrderList';
import OrderDetails from './pages/user/OrderDetails';
import BlogDetails from './pages/BlogDetails';



function App() {
   axios.defaults.baseURL="https://uol-v-2.hostprohub.com/api/";
  return (
   <>
  <ToastContainer />
  <CartProvider>
  <SettingProvider>
  <UserProvider>
   <Routes>
        <Route exact path='/blog' element={<Blog></Blog>}>Blog</Route>
        <Route exact path='/blog/:slug' element={<BlogDetails></BlogDetails>}></Route>
        <Route exact path='/Regostration' element={<Registration></Registration>}>Registration</Route>
        <Route exact path='/' element={<Home></Home>}>Home</Route>
        <Route exact path='/cart' element={<Cart></Cart>}>Cart</Route>
        <Route exact path='/product/:slug' element={<ProductDetails></ProductDetails>}></Route>
        <Route exact path='/checkout' element={<Checkout></Checkout>}></Route>
        <Route exact path='/login' element={<Login></Login>}></Route>
        <Route exact path='/user/dashboard' element={<DashBoard></DashBoard>}></Route>
        <Route exact path='/user/profile' element={<Pro></Pro>}></Route>
        <Route exact path='/user/addressbook' element={<AddressBoook></AddressBoook>}></Route>
        <Route exact path='/user/add-address' element={<AddAddress></AddAddress>}></Route>
        <Route exact path='/user/update-address/:id' element={<UpdateAddress></UpdateAddress>}></Route>
        <Route exact path='/user/order-list' element={<OrderList></OrderList>}>Order</Route>
        <Route exact path='/user/order/order-details/:id' element={<OrderDetails></OrderDetails>}>Order</Route>
        
    </Routes>
    </UserProvider>
    </SettingProvider>
    </CartProvider>
   </>
  );
}

export default App;
