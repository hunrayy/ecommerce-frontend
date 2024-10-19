import React, { useState, useEffect } from 'react';
import './trackingPage.css'; // Custom styles for the tracking page

const TrackingPage = () => {
  // Sample order data (this would normally come from an API)
  const [order, setOrder] = useState({
    orderId: 'ORD1234567890',
    date: '2024-10-10',
    shippingAddress: '123 Main St, Lagos, Nigeria',
    paymentMethod: 'Credit Card',
    orderStatus: 'Shipped', // Current status
    trackingSteps: [
      { step: 'Order Placed', date: '2024-10-10', completed: true },
      { step: 'Processing', date: '2024-10-11', completed: true },
      { step: 'Shipped', date: '2024-10-12', completed: true },
      { step: 'Out for Delivery', date: '', completed: false },
      { step: 'Delivered', date: '', completed: false },
    ],
  });

  return (
    <div className="tracking-page-container">
      <h1>Track Your Order</h1>

      <div className="order-info">
        <h2>Order #{order.orderId}</h2>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      </div>

      <div className="tracking-progress">
        <h3>Order Status: {order.orderStatus}</h3>
        <div className="steps">
          {order.trackingSteps.map((step, index) => (
            <div
              key={index}
              className={`step ${step.completed ? 'completed' : ''}`}
            >
              <div className="step-icon">{step.completed ? '✔' : '✖'}</div>
              <div className="step-info">
                <p>{step.step}</p>
                <p className="step-date">{step.completed ? step.date : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-support">
        <p>Need help? <a href="/contact">Contact Support</a></p>
      </div>
    </div>
  );
};

export default TrackingPage;
