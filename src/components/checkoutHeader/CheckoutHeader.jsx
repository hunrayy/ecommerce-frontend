



import Logo from "../Logo/Logo"
import "./checkoutHeader.css"
import { useNavigate } from "react-router-dom"

const CheckoutHeader = () => {
    const navigate = useNavigate()
    return <div>
        <div className="checkout-header-container">
            <Logo />
            <div className="checkout-header-icon-wrapper">
                <i className="fas fa-shopping-cart m-1 me-md-2" onClick={()=> navigate("/cart", {replace: "true"})}></i>
            </div>
        </div>
        {/* ffgfgfgfghhvh */}

    </div>
}

export default CheckoutHeader