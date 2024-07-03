


import Logo from "../../Logo/Logo"
import "./adminHeader.css"
const AdminHeader = () => {
    return <div>
        <div className="admin-header-container">
        <div className="d-flex align-items-center" style={{gap: "20px"}}>
            <i class="fa-solid fa-bars d-block d-md-none" style={{fontSize: "25px"}}></i>
            <Logo  />
        </div>
        
        <div className="admin-logo-container">
            <div className="admin-icon-container" style={{fontFamily: "Courier New, Courier, monospace"}}>
                Today: mar 23 <i class="fa-regular fa-calendar"></i>
            </div>
            <div className="admin-icon-container">
                <span className="d-none d-md-block">Settings</span> <i class="fa-solid fa-gear"></i>
            </div>
            <div className="admin-icon-container">
            <span className="d-none d-md-block">Notifications</span> <i class="fa-regular fa-bell"></i>
            </div>
        </div>
        </div>

    </div>
}
export default AdminHeader