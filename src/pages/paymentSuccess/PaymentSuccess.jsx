import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BasicLoader from '../../components/loader/BasicLoader'
import { CartContext } from '../cart/CartContext';
import Cookies from 'js-cookie';

const PaymentSuccess = () => {
    const { cartProducts, addToCart, updateCartItemQuantity } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [paymentPreviouslyMade, setPaymentPreviouslyMade] = useState(false)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const saveProductsToDb = async () => {
        const products = cartProducts?.products
        const detailsToken = searchParams.get('details')
        const authToken = Cookies.get("authToken")
        const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/save-products-to-db-after-payment`, {cartProducts: cartProducts.products, detailsToken: detailsToken}, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        if(feedback.data.code == "success"){
            localStorage.clear()
            setPaymentConfirmed(true); // Payment confirmed
        }else if(feedback.data.code == "error"){
           return  <div className="container">
            <div className="alert alert-danger text-center mt-5">
                {feedback.data.reason}
            </div>
        </div>
        }
    }

    useEffect(() => {
        const validatePayment = async (retryCount = 0) => {
            const authToken = Cookies.get("authToken")
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/paypal/validate-payment?token=${token}&PayerID=${PayerID}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                const data = response.data;
                console.log(data)
    
                if (data.code == "already-made") {
                    setPaymentPreviouslyMade(true)
                } else if (data.success) {
                    // Save product to database
                    saveProductsToDb()
                } else {
                    setError('We encountered an issue verifying your payment. Please try again or contact support.');
                }
            } catch (err) {
                if (retryCount < 3) {
                    // Retry the payment validation up to 3 times before showing error
                    setTimeout(() => {
                        validatePayment(retryCount + 1);
                    }, 2000); // Wait 2 seconds before retrying
                } else {
                    setError('Error validating payment after multiple attempts.');
                }
            } finally {
                setLoading(false);
            }
        };
    
        // Start the validation process
        validatePayment();
    }, [searchParams, navigate]);
    

    if (loading) {
        return <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <BasicLoader />
        </div> // Show loading state while validating
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-danger text-center mt-5">
                    {error}
                </div>
            </div>
        );
    }

    if (paymentConfirmed) {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card text-center shadow-lg p-4" style={{ borderRadius: '15px', maxWidth: '500px' }}>
                    <div className="card-body">
                        <div className="mb-4">
                            <i className="bi bi-check-circle-fill success-icon" style={{ fontSize: '100px', color: '#28a745' }}></i>
                        </div>
                        <h3 className="card-title mb-3">Payment Successful!</h3>
                        <p className="card-text">Thank you for your purchase. Your payment has been successfully processed.</p>
                        <div className="mt-4">
                            <button className="btn btn-success btn-lg me-3" onClick={() => navigate('/')}>
                                Back to Home
                            </button>
                            {/* <button className="btn btn-outline-success btn-lg" >
                                View Order Details
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if(paymentPreviouslyMade){
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card text-center shadow-lg p-4" style={{ borderRadius: '15px', maxWidth: '500px' }}>
                    <div className="card-body">
                        <div className="mb-4">
                            <i className="bi bi-check-circle-fill success-icon" style={{ fontSize: '100px', color: '#28a745' }}></i>
                        </div>
                        <h3 className="card-title mb-3">Duplicate Payment Alert!</h3>
                        <p className="card-text">It looks like you've already completed this payment. If you have any questions or concerns, please reach out to our customer support.</p>
                        <div className="mt-4">
                            <button className="btn btn-success btn-lg me-3" onClick={() => navigate('/')}>
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default PaymentSuccess;
