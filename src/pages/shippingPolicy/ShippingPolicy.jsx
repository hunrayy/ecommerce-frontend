

import "./shippingPolicy.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
const ShippingPolicy = () => {
    return <div>
        <Navbar />
        <div className="shipping-policy-container">
            <div className="shipping-policy-wrapper">
                <p>Shipping policy</p>
                <ul type="none" style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    <li>-International customers, please be aware of any custom duties or fees that may apply to your order upon reaching your country. We cannot be held responsible for clearing your order or paying the customs fee if any.</li>

                    <li>-If you happen to miss your delivery, the courier usually attempts delivery for three consecutive days. If you miss these attempts, please contact us to rearrange shipping. In the event that your tracking info says "returned to sender," there may be an additional shipping fee.</li>

                    <li>-Shipping itself is always express/next-day service. However, please keep in mind that there is a standard processing duration of 2-3 working days on average for our ready-to-ship items. For custom orders and sale orders, the processing duration is typically 4-7 working days.</li>
                </ul>


            </div>
        </div>
        <Footer />
    </div>
}

export default ShippingPolicy