import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import BasicLoader from '../../components/loader/BasicLoader'
import Navbar from '../../components/navbar/Navbar'
import './shippingPolicy.css'
import Footer from '../../components/footer/Footer'
const ShippingPolicy = () => {
    const [isLoading, setIsLoading] = useState(false)
    // Initial policy data
    const [policySections, setPolicySections] = useState([
        null,
        null,
        null
    ]);

    const [policyTitle, setPolicyTitle] = useState(null); // Title of the policy
    
    useEffect(()=> {
        let loaderTimeout;
        // Set the loader to be shown if data takes more than 200ms
        loaderTimeout = setTimeout(() => {
            setIsLoading(true)
        }, 200);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get-page`, {
            params: {
                page: "shippingPolicy" 
            }
        }).then((feedback) => {
            console.log(feedback)
            setIsLoading(false)
            if(feedback.data.code === "success"){
                setPolicyTitle(feedback.data.data.title)
                setPolicySections([
                    feedback.data.data.firstSection,
                    feedback.data.data.secondSection,
                    feedback.data.data.thirdSection,

                ])
            }
           
        }).finally(()=> {
            clearTimeout(loaderTimeout)
            setIsLoading(false)
        })
    }, [])

    return (
        <div>
            <Navbar />
            <div className="shipping-policy-container">
                <div className="shipping-policy-wrapper">
                    {isLoading &&<BasicLoader />}
                    {/* Title of the policy */}
                    <p>{policyTitle}</p>

                    {/* List of policy sections */}
                    <div type="none" style={{ display: "flex", flexDirection: "column", gap: "20px"}}>
                        {policySections.map((section, index) => (
                            <p key={index}>{section}</p>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default ShippingPolicy;






















// import "./shippingPolicy.css"
// import Navbar from "../../components/navbar/Navbar"
// import Footer from "../../components/footer/Footer"
// const ShippingPolicy = () => {
//     return <div>
//         <Navbar />
//         <div className="shipping-policy-container">
//             <div className="shipping-policy-wrapper">
//                 <p>Shipping policy</p>
//                 <ul type="none" style={{display: "flex", flexDirection: "column", gap: "20px"}}>
//                     <li>-International customers, please be aware of any custom duties or fees that may apply to your order upon reaching your country. We cannot be held responsible for clearing your order or paying the customs fee if any.</li>

//                     <li>-If you happen to miss your delivery, the courier usually attempts delivery for three consecutive days. If you miss these attempts, please contact us to rearrange shipping. In the event that your tracking info says "returned to sender," there may be an additional shipping fee.</li>

//                     <li>-Shipping itself is always express/next-day service. However, please keep in mind that there is a standard processing duration of 2-3 working days on average for our ready-to-ship items. For custom orders and sale orders, the processing duration is typically 4-7 working days.</li>
//                 </ul>


//             </div>
//         </div>
//         <Footer />
//     </div>
// }

// export default ShippingPolicy