


import Logo from "../../components/Logo/Logo"
import { Link } from "react-router-dom"
const Register = () => {
    return <div>
        {/* <section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card" style={{borderRadius: "1rem"}}>
          <div class="card-body py-5">

            <div class="">

              <h4 class="fw-bold mb-4">Register</h4>
              <p class="alert alert-danger mb-">Please enter your login and password!</p>

              <div data-mdb-input-init class="form-outline form-white mb-4">
                <label class="form-label" for="typeEmailX">Email</label>
                <input type="email" id="typeEmailX" class="form-control form-control-lg" />
              </div>

              <div data-mdb-input-init class="form-outline form-white mb-4">
                <label  for="typePasswordX">Password</label>
                <input type="password" id="typePasswordX" class="form-control form-control-lg" />
              </div>

              

              <button class="btn btn-block btn-primary mb-5" type="submit">Login</button>

            </div>

            <div>
              <p class="mb-0">Have an account already? <a href="#!" class="fw-bold">Sign Up</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}


<section class="vh-100 gradient-custom-3">
  <div class="container py-5 h-100">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style={{borderRadius: "1rem", border: "none"}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" class="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body  text-black">

                <form>

                  <div class="d-flex align-items-center mb-3 pb-1 ">
                  <Link to="/" style={{textDecoration: "none"}}><Logo /></Link>
                    
                  </div>

                  <h3 class="fw-normal pb-3" style={{letterSpacing: "1px"}}>Register</h3>

                  <div data-mdb-input-init class="form-outline mb-2">
                    <label class="form-label" for="form2Example17">Email address</label>
                    <input type="email" id="form2Example17" class="form-control form-control" />
                  </div>
                  <div data-mdb-input-init class="form-outline mb-2">
                    <label class="form-label" for="form2Example17">Password</label>
                    <input type="password" id="form2Example17" class="form-control form-control" />
                  </div>

                  <div data-mdb-input-init class="form-outline mb-2">
                    <label class="form-label" for="form2Example27">Password confirm</label>
                    <input type="password" id="form2Example27" class="form-control form-control" />
                  </div>

                  <div class="pt-1 mb-">
                    <button style={{backgroundColor: "purple", color: "white"}} data-mdb-button-init data-mdb-ripple-init class="btn btn-lg btn-block" type="button">Register</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="" style={{color: "#393f81"}}>Already have an account? <Link to="/login"
                      style={{color: "#393f81"}}>Login</Link></p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
}
export default Register