


import "./test.css"
const Login = () => {
  return <div>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-sm" style={{width: "100%", maxWidth: "400px"}}>
            <div class="text-center mb-4">
                <img src="https://via.placeholder.com/150x50?text=Jumia" alt="Jumia Logo" class="img-fluid" />
            </div>
            <h4 class="text-center">Sign In</h4>
            <form action="#" method="post">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" id="email" name="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required />
                </div>
                <button type="submit" class="btn btn-warning btn-block">Login</button>
                <div class="text-center mt-3">
                    <a href="#" class="text-muted">Forgot your password?</a>
                </div>
                <div class="text-center my-3">
                    <span class="text-muted">OR</span>
                </div>
                <div class="social-login text-center">
                    <button type="button" class="btn btn-danger btn-block mb-2">Continue with Google</button>
                    <button type="button" class="btn btn-primary btn-block">Continue with Facebook</button>
                </div>
            </form>
            <div class="text-center mt-4">
                <p class="text-muted">Don't have an account? <a href="#">Register</a></p>
            </div>
        </div>
    </div>

  </div>
}
export default Login























// import "./login.css"
// import Logo from "../../components/Logo/Logo"
// import { Link } from "react-router-dom"
// const Login = () => {
//     return <div>
// <section class="vh-100 gradient-custom-3">
//   <div class="container py-5 h-100">
//     <div class="d-flex justify-content-center align-items-center h-100">
//       <div class="col col-xl-10">
//         <div class="card" style={{borderRadius: "1rem", border: "none"}}>
//           <div class="row g-0">
//             <div class="col-md-6 col-lg-5 d-none d-md-block">
//               <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
//                 alt="login form" class="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
//             </div>
//             <div class="col-md-6 col-lg-7 d-flex align-items-center">
//               <div class="card-body p-4 p-lg-5 text-black">

//                 <form>

//                   <div class="d-flex align-items-center mb-3 pb-1">
//                   <Link to="/" style={{textDecoration: "none"}}><Logo /></Link>
//                   </div>

//                   <h3 class="fw-normal pb-3" style={{letterSpacing: "1px"}}>Login</h3>

//                   <div data-mdb-input-init class="form-outline mb-2">
//                     <label class="form-label" for="form2Example17">Email address</label>
//                     <input type="email" id="form2Example17" class="form-control form-control-lg" />
//                   </div>

//                   <div data-mdb-input-init class="form-outline mb-2">
//                     <label class="form-label" for="form2Example27">Password</label>
//                     <input type="password" id="form2Example27" class="form-control form-control-lg" />
//                   </div>

//                   <div class="pt-1 mb-4">
//                     <button style={{backgroundColor: "purple", color: "white"}} data-mdb-button-init data-mdb-ripple-init class="btn btn-lg btn-block" type="button">Login</button>
//                   </div>

//                   <a class="small text-muted" href="#!">Forgot password?</a>
//                   <p class="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <Link to="/register"
//                       style={{color: "#393f81"}}>Register here</Link></p>
//                   <a href="#!" class="small text-muted">Terms of use.</a>
//                   <a href="#!" class="small text-muted">Privacy policy</a>
//                 </form>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//     </div>
// }
// export default Login