

import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import "./refundPolicy.css"
const RefundPolicy = () => {
    return <div>
        <Navbar />
        <div className="shipping-policy-container">
            <div className="shipping-policy-wrapper">
                <p>Refund policy</p>
                <ul type="none" style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    <li>All sales are final, and we don't offer refunds or returns as our products bespoke items and are made to order.</li>

                    <li>However, you are entitled to a refund or exchange   - if you receive the wrong item.</li>

                    <li>- If your order was shipped to a different address   and not what you filled out. Please contact if you’d like to change your address.</li>

                    <li>-In case your order is delayed beyond the 10 working days processing duration during peak times, you can request a refund.</li>

                    <li>- Please note that we cannot provide a refund if the delay is due to the courier service, as we have limited control over that situation.</li>

                    <li>- Please note that we cannot provide a refund if the delay is due to the courier service, as we have limited control over that situation.</li>

                    <li>- Returns and refunds are only accepted under rare circumstances, but please be aware that if you return an order that has been installed, used, lace cut, or passed 7 days since declared delivered, you will not be entitled to a refund.</li>

                    <li>Refunds could take up to 10 working days to reflect </li>

                    <li>
                        <b>- By placing an order you have agreed to these terms and understand the circumstances in which you would be entitled to a refund.</b>
                    </li>
                </ul>


            </div>
        </div>
        <Footer />
    </div>

}
export default RefundPolicy