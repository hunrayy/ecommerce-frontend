import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Banner from "../../components/banner/Banner";
import Products from "../../components/products/Products";
import Footer from "../../components/footer/Footer";
import FooterVideo from "../../components/footerVideo/FooterVideo";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation()
    const justLoggedIn = location.state?.justLoggedIn
    const [showPaginationButtons, setShowPaginationButtons] = useState(false)
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(()=> {
        // console.log(user)
        // Redirect logic before rendering the component
        if (user && user.is_user_logged && user.user.is_an_admin && user.user.user === "admin") {
            navigate(`/admin/dashboard/${user.user.token}`);
             // Prevent any content rendering before redirect
        }
       
    })
    
    return (
        <div className="home-page-container">   
            {justLoggedIn &&
                <div className="arrow-box">
                    <b>Welcome back {user?.user?.firstname}!</b>
                </div>
            }
            <Navbar />
            <Banner />
            <div className="container">
                <header style={{marginTop: "50px"}}>
                    <h3>New products</h3>
                </header>

            </div>




            {/* <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        margin: "0",
        padding: "20px"
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: "0", color: "#333" }}>Your Order Receipt</h1>
          <p style={{ margin: "5px 0", color: "#777" }}>
            Thank you for shopping with us!
          </p>
        </div>

        <div>
          <p>Dear Henry,</p>
          <p>
            Thank you for your payment! We're pleased to inform you that your
            transaction has been successfully processed.
          </p>
        </div>
        <hr />

        <div style={{ display: "flex", fontSize: "5px" }}>
          <div style={{ marginRight: "20px", flex: "1" }}>
            <h5 style={{ color: "purple" }}>Order Details</h5>
            <p style={{margin: "5px 0"}}>
              <strong>Tracking ID:</strong> 3511199327
            </p>
            <p style={{margin: "5px 0"}}>
              <strong>Transaction ID:</strong> 729535806
            </p>
            <p style={{margin: "5px 0"}}>
              <strong>Phone number:</strong> 123456
            </p>
            <p>
              <strong>Date:</strong> October 21, 2024
            </p>
          </div>
          <div style={{flex: "1"}}>
            <h5 style={{ color: "purple" }}>Shipping Details</h5>
            <p style={{margin: "5px 0"}}>
              <strong>Country:</strong> United States
            </p>
            <p style={{margin: "5px 0"}}>
              <strong>State:</strong> Georgia
            </p>
            <p style={{margin: "5px 0"}}>
              <strong>City:</strong> Columbia
            </p>
            <p style={{margin: "5px 0"}}>
              <strong>Address:</strong> 92 bungana drive
            </p>
            <p style={{margin: "5px 0"}}>
              <strong>Postal code:</strong> 123456
            </p>
            <p>
              <strong>Expected date of delivery:</strong> 04/11/2024
            </p>
          </div>
        </div>
        <hr />
        <h6 style={{ fontWeight: "bold" }}>Summary</h6>

        <div
          style={{
            display: "flex",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "20px",
            alignItems: "center",
            backgroundColor: "#fafafa"
          }}
        >
          <img
            src="https://res.cloudinary.com/dih28iada/image/upload/v1729189345/beautybykiara/wvrxhfnhbglutfaaz7r7.jpg"
            alt="Product Image"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "20px"
            }}
          />
          <div style={{ flexGrow: 1 }}>
            <h3 style={{ margin: "0", color: "#333", fontSize: "18px" }}>
              Product Name 1
            </h3>
            <p style={{ margin: "5px 0", color: "#777", fontSize: "14px" }}>
              Quantity: 2
            </p>
            <p style={{ margin: "5px 0", color: "#777", fontSize: "14px" }}>
              Price: $50.00
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "5px 0", color: "#555", fontSize: "14px" }}>
              Total: $100.00
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "20px",
            alignItems: "center",
            backgroundColor: "#fafafa"
          }}
        >
          <img
            src="https://res.cloudinary.com/dih28iada/image/upload/v1729167481/beautybykiara/x26ajoag65kvuqdals4j.jpg"
            alt="Product Image"
            style={{
                width: "100%",
                height: "auto",
                maxWidth: "80px",
                objectFit: "contain",
                borderRadius: "8px",
                marginRight: "20px"
            }}
          />
          <div style={{ flexGrow: 1 }}>
            <h3 style={{ margin: "0", color: "#333", fontSize: "18px" }}>
              Product Name 2
            </h3>
            <p style={{ margin: "5px 0", color: "#777", fontSize: "14px" }}>
              Quantity: 1
            </p>
            <p style={{ margin: "5px 0", color: "#777", fontSize: "14px" }}>
              Price: $75.00
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "5px 0", color: "#555", fontSize: "14px" }}>
              Total: $75.00
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <h5 style={{ margin: "0", color: "#333" }}>Total: $185.00</h5>
        </div>

        <div
          style={{
            background: "purple",
            padding: "10px",
            textAlign: "center",
            color: "white",
            marginTop: "20px"
          }}
        >
          <p>
          If you have any question or need assistance, feel free to contact our support team. 
          </p>
          <p>
          Thank you for choosing us! We look forward to serving you again. 
          </p>
        </div>
      </div>
    </div> */}
            <Products showPaginationButtons={showPaginationButtons} />
            <FooterVideo />
            <Footer />
        </div>
    );

};

export default Home;



























// import "./home.css"
// import Navbar from "../../components/navbar/Navbar"
// import Banner from "../../components/banner/Banner"
// import Products from "../../components/products/Products"
// import Footer from "../../components/footer/Footer"
// import { useState, useEffect } from "react"
// import { useAuth } from "../../components/AuthContext/AuthContext"
// import { useNavigate } from "react-router-dom"
// const Home = () => {
//     const use_auth = useAuth()
//     const navigate = useNavigate()
//     useEffect(()=> {
//         use_auth.user.is_user_logged && 
//         use_auth.user.user.is_an_admin && 
//         use_auth.user.user.user === "admin" &&
//         navigate(`/admin/dashboard/${use_auth.user.user.token}`)
//     }, [use_auth.user])


//     if(use_auth.user.is_user_logged &&
//         use_auth.user.user.is_an_admin && 
//         use_auth.user.user.user === "admin"){

//         return null;
//     }

//     return <div>
//         <div className="home-page-container">
//         <Navbar />
//         <Banner />
//         <Products />
//         <Footer />
//         </div>
//     </div>
// }
// export default Home