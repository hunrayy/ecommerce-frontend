import { useState, useEffect } from "react";
import "./adminDashboard.css";
import AdminHeader from "../../components/adminUtilities/adminHeader/AdminHeader";
import Dashboard from "../../components/adminUtilities/dashboard/Dashboard";
import CreateProduct from "../../components/adminUtilities/createProduct/CreateProduct";
import AllProducts from "../../components/adminUtilities/allProducts/AllProducts";
import SearchComponent from "../../components/adminUtilities/searchComponent/SearchComponent";
import AdminNotification from "../../components/adminUtilities/adminNotification/AdminNotification";
import AdminShippingPolicy from "../../components/adminUtilities/adminShippingPolicy/AdminShippingPolicy";
import { useAuth } from "../../components/AuthContext/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const use_auth = useAuth()
    const navigate = useNavigate()
    const [shownav, setShownav] = useState(false);
    const [pages, setPages] = useState({
        dashboard_page: true,
        createProduct_page: false,
        viewProducts_page: false,
        search_page: false,
        settings_page: false,
        notifications_page: false,
        shipping_policy_page: false
    });
    const [pagesDropdown, setPagesDropdown] = useState(false)

    const showPage = (page) => {
        setPages({
            dashboard_page: page === 'dashboard',
            createProduct_page: page === 'createProduct',
            viewProducts_page: page === 'viewProducts',
            search_page: page === 'search',
            settings_page: page === 'settings',
            notifications_page: page === 'notifications',
            shipping_policy_page: page === 'shipping_policy'
        });
        setShownav(false);  // Close the sidebar when a page is selected
    };
    const token = Cookies.get("authToken")
    useEffect(() => {
        //make an api call to validate the admin's token on page load
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/is-admin-token-active`, {data: null}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((feedback) => {
            console.log(feedback)
            if(feedback.data.code === "invalid-jwt"){
                return navigate("/", {replace: true})
            }
        })

    })

    return (
        <div>
            <AdminHeader shownav={shownav} setShownav={setShownav} />
            <div className="admin-page-container">
                <div className={shownav ? "admin-sidebar-black" : ""} onClick={() => { shownav ? setShownav(false) : null }}>
                    <div className={`admin-page-sidebar-container ${shownav ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div style={{ padding: "10px", cursor: "pointer", width: "fit-content", fontSize: "20px" }} className="admin-cancel-menubar" onClick={() => setShownav(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className="admin-sidebar-icon-wrapper" onClick={() => showPage('dashboard')}>
                            <i className="fa-solid fa-desktop"></i> <span>Dashboard</span>
                        </div>
                        <div className="admin-sidebar-icon-wrapper" onClick={() => showPage('createProduct')}>
                            <i className="fa-solid fa-plus"></i> <span>Create product</span>
                        </div>
                        <div className="admin-sidebar-icon-wrapper" onClick={() => showPage('viewProducts')}>
                            <i className="fa-solid fa-eye"></i> <span>View products</span>
                        </div>   
                        <div className="dmin-sidebar-dropdown-container">
    <div className="admin-sidebar-icon-wrapper" onClick={() => setPagesDropdown(!pagesDropdown)}>
        <i className="fa-solid fa-book"></i> <span>Pages</span> {pagesDropdown ? <i class="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>}
    </div>
    <div className={`admin-sidebar-dropdown-wrapper ${pagesDropdown ? 'open' : ''}`}>
        <div onClick={() => showPage('shipping_policy')}>Shipping policy</div>
        <div>Cart</div>
        <div>Page</div>
        <div>Hgdhagh</div>
        <div>Home</div>
    </div>
</div>

                        <div className="admin-sidebar-icon-wrapper" onClick={() => showPage('search')}>
                            <i className="fa-solid fa-magnifying-glass"></i> <span>Search</span>
                        </div>
                        <div className="admin-sidebar-icon-wrapper" onClick={() => showPage('settings')}>
                            <i className="fa-solid fa-gear"></i> <span>Settings</span>
                        </div>
                        <div className="admin-sidebar-icon-wrapper" onClick={() => showPage('notifications')}>
                            <i className="fa-solid fa-bell"></i> <span>Notifications</span>
                        </div>
                    </div>
                    
                </div>

                <div className="admin-dashboard-content">
                    {pages.dashboard_page && <Dashboard />}
                    {pages.createProduct_page && <CreateProduct />}
                    {pages.viewProducts_page && <AllProducts />}
                    {pages.search_page && <SearchComponent />}
                    {pages.notifications_page && <AdminNotification />}
                    {pages.shipping_policy_page && <AdminShippingPolicy />}
                    
                    {/* Add other components as needed */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;


































// import "./adminDashboard.css"
// import AdminHeader from "../../components/adminUtilities/adminHeader/AdminHeader"
// import Dashboard from "../../components/adminUtilities/dashboard/Dashboard"
// const AdminDashboard = () => {
//     return <div>
//         <AdminHeader />
//         <div className="admin-page-container">
//             <div className="admin-page-sidebar-container">
//                 <div style={{padding: "10px", cursor: "pointer", width: "fit-content", fontSize: "20px"}} className="d-block d-md-none">
//                     <i class="fa-solid fa-xmark"></i>
//                 </div>
//                 <div className="admin-sidebar-icon-wrapper">
//                     <i class="fa-solid fa-desktop"></i> <span>Dashboard</span>
//                 </div>
//                 <div className="admin-sidebar-icon-wrapper">
//                     <i class="fa-solid fa-plus"></i> <span>Create product</span>
//                 </div>
//                 <div className="admin-sidebar-icon-wrapper">
//                     <i class="fa-solid fa-eye"></i> <span>View products</span>
//                 </div>
//                 <div className="admin-sidebar-icon-wrapper">
//                     <i class="fa-solid fa-magnifying-glass"></i> <span>Search</span>
//                 </div>
//                 <div className="admin-sidebar-icon-wrapper">
//                     <i class="fa-solid fa-gear"></i> <span>Settings</span>
//                 </div>
//                 <div className="admin-sidebar-icon-wrapper">
//                     <i class="fa-solid fa-bell"></i> <span>Notifications</span>
//                 </div>
//             </div>
//             <div className="admin-dashboard-content">
//                 <Dashboard />
//             </div>
//         </div>


//     </div>
// }
// export default AdminDashboard

