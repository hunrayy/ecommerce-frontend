import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import Login from "./pages/login/Login"
import Identification from "./pages/identification/Identification"
import Register from "./pages/register/Register"
import SingleProduct from "./pages/singleProduct/singleProduct"
import { Route, Routes } from "react-router-dom"
import CartProvider from "./pages/cart/CartContext"
import ShippingPolicy from "./pages/shippingPolicy/ShippingPolicy"
import RefundPolicy from "./pages/refundPolicy/RefundPolicy"
import PageNotFound from "./pages/pageNotFound/PageNotFound"
import AdminDashboard from "./pages/adminDashboard/AdminDashboard"
import DeliveryPolicy from "./pages/deliveryPolicy/DeliveryPolicy"
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess"
import AdminLogin from "./pages/adminLogin/AdminLogin"
import VerifyEmailCode from "./pages/verifyEmailCode/VerifyEmailCode"
import ForgotPassword from "./pages/forgotPassword/ForgotPassword"
import ResetPassword from "./pages/resetPassword/ResetPassword"
import { AuthProvider } from "./components/AuthContext/AuthContext"
import CheckOut from "./pages/checkOut/CheckOut"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import UserAccount from "./pages/userAccount/UserAccount"
import AllProducts from "./pages/allProducts/AllProducts"
import AdminForgotPassword from "./pages/adminForgotPassword/AdminForgotPassword"
import AdminResetPassword from "./pages/adminResetPassword/AdminResetPassword"


function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections/all" element={<AllProducts />} />
            <Route path="/product/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/checkout" element={<CheckOut />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/identification/" element={<Identification />} />
            <Route path="/email-verification/:token" element={<VerifyEmailCode />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accounts/password/reset" element={<ForgotPassword />} />
            <Route path='/accounts/password/reset/reset-password/:token' element={<ResetPassword />} />
            <Route path="/user-account" element={<UserAccount />} />
            <Route path="/register/:token" element={<Register />} />
            <Route path="/policies/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/policies/refund-policy" element={<RefundPolicy />} />
            <Route path="/policies/delivery-policy" element={<DeliveryPolicy />} />
            <Route path="/admin/dashboard/:token" element={<AdminDashboard />} />
            <Route path="/beautybykiara/waterfall/admin/login" element={<AdminLogin />} />
            <Route path="/accounts/password/reset/admin/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJIZW5yeSIsImxhc3RuY" element={<AdminForgotPassword />} />
            <Route path="/admin/accounts/password/reset/reset-password/:token" element={<AdminResetPassword />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
