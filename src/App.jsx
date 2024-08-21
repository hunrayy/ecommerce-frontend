

import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import SingleProduct from "./pages/singleProduct/singleProduct"
import { Route, Routes } from "react-router-dom"
// import { CartProvider } from "./pages/cart/CartContext"
import CartProvider from "./pages/cart/CartContext"
import ShippingPolicy from "./pages/shippingPolicy/ShippingPolicy"
import RefundPolicy from "./pages/refundPolicy/RefundPolicy"
import PageNotFound from "./pages/pageNotFound/PageNotFound"
import AdminDashboard from "./pages/adminDashboard/AdminDashboard"
import DeliveryPolicy from "./pages/deliveryPolicy/DeliveryPolicy"
import AdminLogin from "./pages/adminLogin/AdminLogin"


function App() {


  return (
    <>
    <CartProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:product_id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/policies/shipping-policy" element={<ShippingPolicy />} />
      <Route path="/policies/refund-policy" element={<RefundPolicy />} />
      <Route path="/policies/delivery-policy" element={<DeliveryPolicy />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="*" element={<PageNotFound />} />
      

    </Routes>

    </CartProvider>
  
    </>
  )
}

export default App
