import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Banner from "../../components/banner/Banner";
import Products from "../../components/products/Products";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation()
    const justLoggedIn = location.state?.justLoggedIn
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(()=> {
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
            <Products />
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