import React, { useState, useEffect } from 'react';
import './userAccount.css';
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import { useAuth } from '../../components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserAccount = () => {
  const use_auth = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstname: '',
    email: '',
    phone: '+123 456 7890',
  });
  const getUserDetails = async() => {
    const token = Cookies.get("authToken")
    const feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-user-details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(feedback)
  }


  useEffect(()=> {
    !use_auth?.user?.is_user_logged && navigate("/", {replace: true})
    getUserDetails()
  }, [])

  return (
    <div className='user-account-page-container'>
      <div className="container">
        <Navbar />
        <div className="row mt-5">
          {/* User Profile Section */}
          <div className="col-md-4 mt-5">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo0WeqO2Wp-Q5SdztFjtST0SdW9lkAGJafdQ&s"
                  className="rounded-circle mb-3 img-fluid"
                  alt="User Profile"
                  style={{ border: '3px solid #6A0DAD' }}
                />
                <h3 className="card-title mb-0" style={{ color: '#6A0DAD' }}>{user.name}</h3>
                <p className="text-muted mb-4">{user.email}</p>
                {/* <button className="btn btn-outline-purple btn-block  mb-3">Edit Profile</button> */}
              </div>
            </div>
          </div>

          {/* Account Overview */}
          <div className="col-md-8 my-5">
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
                  <div className="card p-3">
                    <div className="row">
                      <div className="d-flex align-items-center">
                        <div style={{width: "100%"}}><b>Order Id: 983637829</b><br />
                          <p className="text-muted">Date: 16 Dec 2024</p>
                        </div>
                          <p className="badge bg-warning">Pending...</p>
                      </div>
                      <hr />
                      <div className="col-md-4">
                        <p className="text-muted">
                          Contact <br />
                          John Doe <br />
                          Phone +23476453738378 <br />
                          Email: johndoe@gmail.com

                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="text-muted">
                          Shipping address <br />
                          600 Markley street, Suite 897383939, city, Dc, United States
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="text-muted">
                          Payment <br />
                          Shipping fee USD 56 <br />
                          Total paid: USD 123,433
                        </p>
                      </div>
                      <hr />
                      <div className="col-lg-3 col-md-6 col-sm-6 col-6 ">
                        <div className="text-muted">
                          <img style={{width: "100%", height: "auto", maxWidth: "70px", maxHeight: "100px", objectFit: "contain"}} src="https://www.bundlesbynmeri.com/cdn/shop/files/069EC622-D344-40A0-9DE4-237406C3FCF4.jpg?v=1700781640&width=360" alt="" />
                        <div>
                          <small>Silky double drawn burmese hair 2-3 donors</small> <br />
                        <small>16"16"16</small><br />
                        <small>USD 7252</small> * 3
                        </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-6 ">
                        <div className="text-muted">
                          <img style={{width: "100%", height: "auto", maxWidth: "70px", maxHeight: "100px", objectFit: "contain"}} src="https://www.bundlesbynmeri.com/cdn/shop/files/069EC622-D344-40A0-9DE4-237406C3FCF4.jpg?v=1700781640&width=360" alt="" />
                        <div>
                          <small>Silky double drawn burmese hair 2-3 donors</small> <br />
                        <small>16"16"16</small><br />
                        <small>USD 7252</small> * 3
                        </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-6 ">
                        <div className="text-muted">
                          <img style={{width: "100%", height: "auto", maxWidth: "70px", maxHeight: "100px", objectFit: "contain"}} src="https://www.bundlesbynmeri.com/cdn/shop/files/069EC622-D344-40A0-9DE4-237406C3FCF4.jpg?v=1700781640&width=360" alt="" />
                        <div>
                          <small>Silky double drawn burmese hair 2-3 donors</small> <br />
                        <small>16"16"16</small><br />
                        <small>USD 7252</small> * 3
                        </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-6 ">
                        <div className="text-muted">
                          <img style={{width: "100%", height: "auto", maxWidth: "70px", maxHeight: "100px", objectFit: "contain"}} src="https://www.bundlesbynmeri.com/cdn/shop/files/069EC622-D344-40A0-9DE4-237406C3FCF4.jpg?v=1700781640&width=360" alt="" />
                        <div>
                          <small>Silky double drawn burmese hair 2-3 donors</small> <br />
                        <small>16"16"16</small><br />
                        <small>USD 7252</small> * 3
                        </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-6 ">
                        <div className="text-muted">
                          <img style={{width: "100%", height: "auto", maxWidth: "70px", maxHeight: "100px", objectFit: "contain"}} src="https://www.bundlesbynmeri.com/cdn/shop/files/069EC622-D344-40A0-9DE4-237406C3FCF4.jpg?v=1700781640&width=360" alt="" />
                        <div>
                          <small>Silky double drawn burmese hair 2-3 donors</small> <br />
                        <small>16"16"16</small><br />
                        <small>USD 7252</small> * 3
                        </div>
                        </div>
                      </div>
                      
                      

                    

                    </div>

                  </div>
                </div>

                {/* Account Settings Section */}
                <div>
                  <h5 style={{ color: '#6A0DAD' }}>Account Settings</h5>
                  <button className="btn btn-outline-purple btn-block">Change Password</button>
                  <button className="btn btn-outline-danger btn-block">Log Out</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer />

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
