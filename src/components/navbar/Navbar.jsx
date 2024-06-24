



import "./navbar.css"
import Logo from "../Logo/Logo"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../pages/cart/CartContext"
const Navbar = () => {

  const { calculateTotalLength } = useContext(CartContext);
  const totalItems = calculateTotalLength();


    return <div>
        <header className="navbar-component-container">
 
  <div className="py-3 text-center border-bottom">
    <div className="container">
      <div className="d-flex align-items-center row gy-3">
      
        <div className="col-lg-2 col-sm-4 col-4">
          <Link to="/"className="float-start" style={{textDecoration: "none"}}>
            {/* <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" /> */}
            <Logo />
          </Link>
        </div>
        

        
        <div className="order-lg-last col-lg-5 col-sm-8 col-8">
          <div className="d-flex float-end">
            <Link to="/login" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link>
            <a href="#" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-heart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Wishlist</p> </a>
            <Link to="/cart" className="border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems} </Link>
          </div>
        </div>
    
       
      </div>
    </div>
  </div>

        </header>

    </div>
}
export default Navbar