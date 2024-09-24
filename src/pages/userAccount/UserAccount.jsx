import React, { useState } from 'react';
import './userAccount.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserAccount = () => {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+123 456 7890',
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: '1234',
      date: '2023-09-23',
      total: '₦15,000',
      status: 'Completed',
      products: [
        {
          name: 'Curly Lace Front Wig',
          quantity: 1,
          price: '₦10,000',
          image: 'https://via.placeholder.com/150', // Example image
        },
        {
          name: 'Straight Hair Bundle',
          quantity: 2,
          price: '₦5,000',
          image: 'https://via.placeholder.com/150', // Example image
        },
      ],
    },
    {
      id: '5678',
      date: '2023-08-15',
      total: '₦10,500',
      status: 'Pending',
      products: [
        {
          name: 'Silky Hair Extensions',
          quantity: 3,
          price: '₦3,500',
          image: 'https://via.placeholder.com/150', // Example image
        },
      ],
    },
  ];

  const handleViewMore = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* User Profile Section */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body text-center">
              <img
                src="https://via.placeholder.com/150"
                className="rounded-circle mb-3 img-fluid"
                alt="User Profile"
                style={{ border: '3px solid #6A0DAD' }}
              />
              <h3 className="card-title mb-0" style={{ color: '#6A0DAD' }}>{user.name}</h3>
              <p className="text-muted mb-4">{user.email}</p>
              <button className="btn btn-outline-purple btn-block">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="col-md-8">
          <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body">
              <h4 style={{ color: '#6A0DAD' }}>Account Overview</h4>
              <hr />

              {/* Personal Information */}
              <div className="mb-4">
                <h5 style={{ color: '#6A0DAD' }}>Personal Information</h5>
                <p><strong>Full Name: </strong>{user.name}</p>
                <p><strong>Email: </strong>{user.email}</p>
                <p><strong>Phone: </strong>{user.phone}</p>
                <button className="btn btn-outline-purple btn-sm">Update Information</button>
              </div>

              {/* Order History Section */}
              <div className="mb-4">
                <h5 style={{ color: '#6A0DAD' }}>Order History</h5>
                <table className="table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.total}</td>
                        <td>
                          <span className={`badge bg-${order.status === 'Completed' ? 'success' : 'warning'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-purple btn-sm"
                            onClick={() => handleViewMore(order)}
                          >
                            View More
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Account Settings Section */}
              <div>
                <h5 style={{ color: '#6A0DAD' }}>Account Settings</h5>
                <button className="btn btn-outline-purple btn-block">Change Password</button>
                <button className="btn btn-outline-danger btn-block mt-2">Log Out</button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal for Product Details */}
      {selectedOrder && (
        <div
          className={`modal fade ${showModal ? 'show' : ''}`}
          style={{
            display: showModal ? 'block' : 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark background overlay
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order #{selectedOrder.id} Details</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Date: </strong>{selectedOrder.date}</p>
                <p><strong>Total: </strong>{selectedOrder.total}</p>
                <p><strong>Status: </strong>{selectedOrder.status}</p>

                <h5 style={{ color: '#6A0DAD' }}>Products Ordered</h5>
                <div className="product-list">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="card mb-3" style={{ borderRadius: '10px' }}>
                      <img src={product.image} className="card-img-top" alt={product.name} style={{ borderRadius: '10px 10px 0 0' }} />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text"><strong>Quantity: </strong>{product.quantity}</p>
                        <p className="card-text"><strong>Price: </strong>{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccount;








































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import "./userAccount.css"
// import Navbar from '../../components/navbar/Navbar'

// const UserAccount = () => {
// //   const [user, setUser] = useState(null);
// //   const [orders, setOrders] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const token = Cookies.get('authToken');

// //   // Fetch user data and order history on mount
// //   useEffect(() => {
// //     setIsLoading(true);

// //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/account`, {
// //       headers: {
// //         Authorization: `Bearer ${token}`
// //       }
// //     })
// //       .then(response => {
// //         setUser(response.data.user);
// //         setOrders(response.data.orders);
// //         setIsLoading(false);
// //       })
// //       .catch(err => {
// //         setError('Error loading account information');
// //         setIsLoading(false);
// //       });
// //   }, [token]);

// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>{error}</div>;
// //   }

//   return <div>
//     <Navbar />
//     <div className="user-account-page-container">
//       <div className="account-page">
//         <h2>My Account</h2>
//         {/* {user && ( */}
//           <div className="account-details">
//             <section className="personal-info">
//               <h3>Personal Information</h3>
//               <p><strong>Name:</strong> john Doe</p>
//               <p><strong>Email:</strong> johndoe@gmail.com</p>
//               <p><strong>Phone:</strong> +54567899976677</p>
//               <Link to="/edit-profile">Edit Profile</Link>
//             </section>

//             <section className="order-history">
//               <h3>Order History</h3>
//               {/* {orders.length > 0 ? (
//                 <ul className="order-list">
//                   {orders.map((order) => (
//                     <li key={order.id}>
//                       <Link to={`/order/${order.id}`}>
//                         <div>Order #{order.orderNumber}</div>
//                         <div>{order.date}</div>
//                         <div>Total: {order.total} {order.currency}</div>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No orders found.</p>
//               )} */}
//                 <ul className="order-list">
//                 <li>
//                       <Link>
//                         <div>Order #7678787788</div>
//                         <div>24th of may 2024</div>
//                         <div>Total: 4000000 naira</div>
//                       </Link>
//                     </li>
//                 </ul>

//             </section>

//             <section className="address-book">
//               <h3>Address Book</h3>
//               {/* <p>{user.address ? `${user.address.street}, ${user.address.city}, ${user.address.zip}` : 'No address on file'}</p> */}
//               <p>user address</p>
//               <Link to="/manage-address">Manage Addresses</Link>
//             </section>
//           </div>
//         {/* )} */}
//       </div>
      
//     </div>
    
//   </div>
// };

// export default UserAccount;
