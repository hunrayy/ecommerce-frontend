import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"

const DeliveryPolicy = () => {
    return (
        <div>
            <Navbar />
            <div className="shipping-policy-container">
                <div className="shipping-policy-wrapper">
                    <p>Delivery Policy</p>
                    <ul type="none" style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <li>Our delivery charges vary based on your location and the total weight of your order. The exact delivery cost will be calculated at checkout.</li>

                        <li>We aim to process and dispatch all orders within 2-3 working days. During peak times or sales, processing may take longer.</li>

                        <div>Delivery times depend on your location:
                            <ul type="circle" style={{padding: "10px 15px"}}>
                                <li>Local deliveries (within the city): 1-3 working days</li>
                                <li>National deliveries: 3-7 working days</li>
                                <li>International deliveries: 7-21 working days</li>
                            </ul>
                        </div>

                        <li>Once your order has been dispatched, you will receive a shipping confirmation email with a tracking number. You can use this to track the status of your delivery.</li>

                        <li>We do not offer free delivery. All delivery charges will be clearly stated at checkout before you complete your purchase.</li>

                        <li>Please ensure that the delivery address provided is accurate and complete. We are not responsible for any delays or misdeliveries due to incorrect or incomplete addresses.</li>

                        <li>If you need to change your delivery address after placing an order, please contact us as soon as possible. Changes to the delivery address cannot be made once the order has been dispatched.</li>

                        <li>In case of any delays or issues with delivery, please contact our customer service team for assistance. We will do our best to resolve any problems as quickly as possible.</li>

                        <li>By placing an order with us, you agree to our delivery policy and understand the delivery times and charges applicable to your order.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DeliveryPolicy;
