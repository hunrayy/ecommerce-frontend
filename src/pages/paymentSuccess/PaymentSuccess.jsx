import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentSuccess = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the query parameters
        const token = searchParams.get('token');
        const PayerID = searchParams.get('PayerID');

        // If token or PayerID is missing, redirect to home
        if (!token || !PayerID) {
            navigate('/');
            return;
        }

        // Validate payment with the backend
        const validatePayment = async () => {
            try {
                const response = await fetch(`/api/paypal/validate-payment?token=${token}&PayerID=${PayerID}`);
                const data = await response.json();

                if (data.success) {
                    setPaymentConfirmed(true); // Payment confirmed
                } else {
                    setError('Payment could not be verified.');
                }
            } catch (err) {
                setError('Error validating payment.');
            } finally {
                setLoading(false);
            }
        };

        validatePayment();
    }, [searchParams, navigate]);

    if (loading) {
        return null // Show loading state while validating
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
                            <button className="btn btn-outline-success btn-lg" onClick={() => navigate('/order-details')}>
                                View Order Details
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
