


import "./adminDashboard.css"
import AdminHeader from "../../components/adminUtilities/adminHeader/AdminHeader"
import Dashboard from "../../components/adminUtilities/dashboard/Dashboard"
const AdminDashboard = () => {
    return <div>
        <AdminHeader />
        <div className="admin-page-container">
            <div className="admin-page-sidebar-container">
                <div className="admin-sidebar-icon-wrapper">
                    <i class="fa-solid fa-desktop"></i> <span>Dashboard</span>
                </div>
                <div className="admin-sidebar-icon-wrapper">
                    <i class="fa-solid fa-plus"></i> <span>Create product</span>
                </div>
                <div className="admin-sidebar-icon-wrapper">
                    <i class="fa-solid fa-eye"></i> <span>View products</span>
                </div>
                <div className="admin-sidebar-icon-wrapper">
                    <i class="fa-solid fa-magnifying-glass"></i> <span>Search</span>
                </div>
                <div className="admin-sidebar-icon-wrapper">
                    <i class="fa-solid fa-gear"></i> <span>Settings</span>
                </div>
                <div className="admin-sidebar-icon-wrapper">
                    <i class="fa-solid fa-bell"></i> <span>Notifications</span>
                </div>
            </div>
            <div className="admin-dashboard-content">
                <Dashboard />
            </div>
        </div>


    </div>
}
export default AdminDashboard