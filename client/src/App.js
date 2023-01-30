import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './Pages/NotFound'
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Blogs from "./Pages/Blog/Blogs";
import Products from "./Pages/Product/Products";
import Cart from "./Pages/Product/Cart";
import Wishlist from "./Pages/Product/Wishlist";
import ProductDetails from "./Pages/Product/ProductDetails";
import HelpFAQ from './Pages/HelpFAQ'
import Account from './Pages/Profile/Account'
import BlogDetails from "./Pages/Blog/BlogDetails";
import LoginRegister from './Pages/Profile/LoginRegister'
import ForgotPassword from "./Pages/Profile/ForgotPassword";
import ResetPassword from "./Pages/Profile/ResetPassword";
import UpdatePassword from "./Pages/Profile/UpdatePassword";
import UpdateProfile from "./Pages/Profile/UpdateProfile";
import Order from "./Pages/Product/Order";
import OrderDetails from "./Pages/Product/OrderDetails";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { clearUserError, loadUser } from "./features/user/userSlice";
import CheckOut from "./Pages/Product/CheckOut.js"
import Payment from "./Pages/Product/Payment.js"
import store from "./store";
import WithNavAndFootBarRoute from "./Utils/WithNavAndFootBarRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLayoutEffect } from "react";

function App() {
  
  useLayoutEffect(()=>{
    (async()=>{
      await store.dispatch(loadUser());
      store.dispatch(clearUserError());
    })();
  },[])
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRegister/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/password/update' element={<UpdatePassword/>}/>
            <Route path='/account/update' element={<UpdateProfile/>}/>
          </Route>
          <Route path="/password/forgot" element={<ForgotPassword/>}/>
          <Route path='/password/reset/:token' element={<ResetPassword/>}/>
          <Route element={<WithNavAndFootBarRoute/>}>
            <Route element={<ProtectedRoute/>}>
              <Route path='/account' element={<Account/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout" element = {<CheckOut/>}/>
              <Route path="/payment" element = {<Payment/>}/>
              <Route path='/orders' element={<Order/>}/>
              <Route path='/order/:id' element={<OrderDetails/>}/>
            </Route>
            <Route path="/" element={<Home/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/product/:id' element={<ProductDetails/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path='/blogs' element={<Blogs/>}/>
            <Route path='/blog/:id' element={<BlogDetails/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/help' element={<HelpFAQ/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
      </Router>
    </>
  );
}

export default App;
