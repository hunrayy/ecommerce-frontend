import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BasicLoader from '../../components/loader/BasicLoader';
import { CartContext } from '../cart/CartContext';
import { useAuth } from "../../components/AuthContext/AuthContext";
import Cookies from 'js-cookie';

const PaymentSuccess = () => {
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const use_auth = useAuth()
    
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [paymentPreviouslyMade, setPaymentPreviouslyMade] = useState(false);
    const [searchParams] = useSearchParams();
    const [cartLoading, setCartLoading] = useState(true); // New state for cart loading
    const navigate = useNavigate();
    
    const transactionId = searchParams.get('transaction_id'); // Get transaction_id from URL
    const tx_ref = searchParams.get('tx_ref'); // Get tx_ref from URL
    const reference = searchParams.get('reference'); // Get tx_ref from URL
    const detailsToken = searchParams.get('details')

    // const saveProductsToDb = async () => {
    //     const authToken = Cookies.get("authToken");
    //     try {
    //         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/save-products-to-db-after-payment`, {
    //             // cartProducts: cartProducts.products,
    //             transactionId // Send transaction_id to the backend
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${authToken}`,
    //                 detailsToken: detailsToken
    //             }
    //         });
    //         console.log(response)

    //         if (response.data.code === "success") {
    //             localStorage.removeItem('cart_items'); //clear cart items in local storage
    //             setCartProducts((prev) => ({
    //                 ...prev,
    //                 products: []
    //             }))
    //             setPageLoading(false);
    //             setPaymentConfirmed(true);
    //         } else if (response.data.code === "error") {
    //             setError(response.data.reason);
    //             setPageLoading(false);
    //         }
    //     } catch (err) {
    //         setError("An error occurred while saving products to the database.");
    //         setPageLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     if (cartProducts && cartProducts.products) {
    //         if (cartProducts.products.length > 0) {
    //             setCartLoading(false); // Mark cart as fully loaded
    //         } 
    //         // else {
    //         //     setError("No cart products available.");
    //         //     setCartLoading(false);
    //         // }
    //     }
    // }, [cartProducts]);

    // useEffect(() => {
    //     if (cartProducts.products && cartProducts.products.length > 0 && !cartLoading) {
    //         // Trigger save to DB after payment validation only when cart is fully loaded
    //         saveProductsToDb();
    //     }
    // }, [cartLoading]);

    useEffect(() => {
        console.log(tx_ref)
        const validatePayment = async (retryCount = 0) => {
        const authToken = Cookies.get("authToken");
        console.log(authToken)

            try {
                // const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/flutterwave/validate-payment`, {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/paystack/validate-payment`, {
                    params: {
                        tx_ref: tx_ref,
                        reference: reference,
                        detailsToken: detailsToken
                    },headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                console.log(response)

                if (response.data.code == "success") {
                    // setCartLoading(false)
                    localStorage.removeItem('cart_items'); //clear cart items in local storage
                    setCartProducts((prev) => ({
                        ...prev,
                        products: []
                    }))
                    setPageLoading(false);
                    setPaymentConfirmed(true);


                } else if (response.data.code === "already-made") {
                    setPaymentPreviouslyMade(true);
                } else if(response.data.code == 'error'){
                    setError(`Payment verification failed: ${response.data.message}`);
                }else {
                    setError(`Payment verification failed: ${response.data.message}`);
                }
            } catch (err) {
                console.log(err.message)
                if (retryCount < 3) {
                    setTimeout(() => {
                        validatePayment(retryCount + 1);
                    }, 2000);
                } else {
                    setError('Error validating payment after multiple attempts.');
                }
            } finally {
                setPageLoading(false);
            }
        };

        // Start the validation process
        validatePayment();
    }, [searchParams, navigate]);

    useEffect(()=> {
        !use_auth?.user?.is_user_logged && !use_auth.loading && navigate("/", {replace: true})
    }, [use_auth.loading])
    
    if(use_auth.loading){
        return null
    }

    if (pageLoading) {
        return (
            <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BasicLoader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-danger text-center mt-5">
                    <p style={{textWrap: "wrap"}}>
                    {error}

                    </p>
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
                            <Link to="/user-account" className="btn btn-outline-success btn-lg me-3 mt-2 mt-lg-0">
                                View Order Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (paymentPreviouslyMade) {
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
                            <div className="row">
                                <Link to="/" className="btn btn-success btn-lg me-3 col-md-5" onClick={() => navigate('/')}>
                                    Back to Home
                                </Link>
                                <Link to="/user-account" className="btn btn-outline-success btn-lg mt-md-0 mt-2 col-md-6">
                                    View Order Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default PaymentSuccess;


    // useEffect(() => {
    //     const validatePayment = async (retryCount = 0) => {
    //         const authToken = Cookies.get("authToken")
    //         try {
    //             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/paypal/validate-payment?token=${token}&PayerID=${PayerID}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${authToken}`
    //                 }
    //             });
    //             console.log(response)
    //             // const data = response.data;
    //             // console.log(data)
    
    //             // if (data.code == "already-made") {
    //             //     setPaymentPreviouslyMade(true)
    //             // } else if (data.success) {
    //             //     // Save product to database
    //             //     saveProductsToDb()
    //             // } else {
    //             //     setError('We encountered an issue verifying your payment. Please try again or contact support.');
    //             // }
    //         } catch (err) {
    //             if (retryCount < 3) {
    //                 // Retry the payment validation up to 3 times before showing error
    //                 setTimeout(() => {
    //                     validatePayment(retryCount + 1);
    //                 }, 2000); // Wait 2 seconds before retrying
    //             } else {
    //                 console.log(err.message)
    //                 setError('Error validating payment after multiple attempts.');
    //             }
    //         } finally {
    //             setPageLoading(false);
    //         }
    //     };
    
    //     // Start the validation process
    //     validatePayment();
    // }, [searchParams, navigate]);
    