



import "./navbar.css"
import Logo from "../Logo/Logo"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../pages/cart/CartContext"
import { useState } from "react"
const Navbar = () => {
  const [shownav, setShownav] = useState(false)

  const { calculateTotalLength } = useContext(CartContext);
  const totalItems = calculateTotalLength();


    return <div>
        <header className="navbar-component-container">
 
  <div className="">
    <div className="">
      <div className="wrapper">
      
       <div style={{display: "flex", alignItems: "center", gap: "30px"}}>
          <div style={{fontSize: "30px"}} className="hamburgermenubar"><i class="fa-solid fa-bars" onClick={()=> setShownav(true)}></i></div>
        <div className="">
            <Link to="/"className="" style={{textDecoration: "none"}}>
              <Logo />
            </Link>
          </div>
          <div className={shownav ? "links-container-show" : "links-container"} onClick={()=> setShownav(false)}>
            <div className={shownav ? "links-wrapper-show" : "links-wrapper"} onClick={(e)=>e.stopPropagation()}>
            <div style={{fontSize: "30px"}} className="cancelmenubar"><i class="fa-solid fa-xmark" onClick={()=> setShownav(false)}></i></div>
              <div>
                <Link to="/" style={{fontWeight: "bold"}}>Home</Link>
              </div>
              <div>
                <a href="#" style={{fontWeight: "bold"}}>Shop all</a>
              </div>
              <div>
                <a href="#" style={{fontWeight: "bold"}}>contact</a>
              </div>
              <div>
                <Link to="/policies/refund-policy" style={{fontWeight: "bold"}}>Refund policy</Link>
              </div>
              <div>
                <Link to="/policies/shipping-policy"style={{fontWeight: "bold"}}>Shipping policy</Link>
              </div>
              {/* <a href="#">Tracking</a> */}

              <div className="navbar-social-icons-wrapper">
                <a style={{color: "white"}} href="">
                  <i class="fa-brands fa-instagram"></i>
                </a>

                <a style={{color: "white"}} href="">
                  <i class="fa-brands fa-x-twitter"></i>
                </a>
              </div>
            </div>
          </div>
       </div>
        

        
        <div className="">
          <div className="d-flex float-end">
            <Link to="/login"style={{fontWeight: "bold"}} className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link>
            <Link to="/cart"style={{fontWeight: "bold"}} className="border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems} </Link>
          </div>
        </div>
    
       
      </div>
    </div>
  </div>

        </header>
        {/* <header className="navbar-component-container">
 
  <div className="py-3 text-center border-bottom">
    <div className="container">
      <div className="d-flex align-items-center row gy-3">
      
        <div className="col-lg-2 col-sm-4 col-4">
          <Link to="/"className="float-start" style={{textDecoration: "none"}}>
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

        </header> */}




    </div>
}
export default Navbar