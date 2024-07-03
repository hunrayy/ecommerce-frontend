import { useState } from "react";
import "./adminDashboard.css";
import AdminHeader from "../../components/adminUtilities/adminHeader/AdminHeader";
import Dashboard from "../../components/adminUtilities/dashboard/Dashboard";
import CreateProduct from "../../components/adminUtilities/createProduct/createProduct";

const AdminDashboard = () => {
    const [shownav, setShownav] = useState(false);
    const [pages, setPages] = useState({
        dashboard_page: true,
        createProduct_page: false,
        viewProducts_page: false,
        search_page: false,
        settings_page: false,
        notifications_page: false
    });

    const showPage = (page) => {
        setPages({
            dashboard_page: page === 'dashboard',
            createProduct_page: page === 'createProduct',
            viewProducts_page: page === 'viewProducts',
            search_page: page === 'search',
            settings_page: page === 'settings',
            notifications_page: page === 'notifications'
        });
        setShownav(false);  // Close the sidebar when a page is selected
    };

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

