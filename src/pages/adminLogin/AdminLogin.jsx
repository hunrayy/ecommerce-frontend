



import Logo from "../../components/Logo/Logo"
const AdminLogin = () => {
    return <div>
               <div style={{padding: "20px", fontSize: "20px"}} className="d-md-none">
       <i class="fa-solid fa-arrow-left" onClick={()=> navigate(-1)}></i>
       </div>
    <div className="login-page-container">
      <div className="login-page-wrapper">
        <Logo />
        <h5>Welcome to beautybykiara</h5>
        <form className="mb-1">
          <div style={{padding: "30px"}}>
            <div className="form-floating">
              <input type="email" placeholder="Email" class="form-control form-control-lg  mb-3" />
              <label>Email</label>
            </div>

            <div className="form-floating">
              <input type="password" placeholder="password" class="form-control form-control-lg mb-5" />
              <label>Password</label>
            </div>
             
            <div class="d-grid">
              <button class="btn btn-lg btn-primary" type="button">
                <b>Continue</b>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    </div>
}
export default AdminLogin