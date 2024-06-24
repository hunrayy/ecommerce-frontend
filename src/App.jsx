

import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { Route, Routes } from "react-router-dom"
import { CartProvider } from "./pages/cart/CartContext"

function App() {


  return (
    <>
    <CartProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

    </Routes>

    </CartProvider>
  
    </>
  )
}

export default App
