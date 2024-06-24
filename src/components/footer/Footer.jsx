



import Logo from "../Logo/Logo"
import { Link } from "react-router-dom"
const Footer = () => {
    return <div>
        <footer className="text-center text-lg-start text-muted" style={{backgroundColor: "black"}}>

  <section className="p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    <div className="container">
      <div className="row d-flex">
       
        <div className="col-md-6 col-sm-12 mb-2 mb-md-0 d-flex justify-content-center justify-content-md-start">
          <div className="">
            <div className="input-group" style={{maxWidth: "400px"}}>
              <input type="email" className="form-control border" placeholder="Email" aria-label="Email" aria-describedby="button-addon2" />
              <button className="btn btn-light border" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                Subscribe
              </button>
            </div>
          </div>
        </div>
       

       
        <div className="col-md-6 col-sm-12 float-center">
          <div className="float-md-end">
            <a className="btn btn-icon btn-light text-secondary px-3 border" title="Facebook" target="_blank" href="#"><i className="fab fa-facebook-f fa-lg"></i></a>
            <a className="btn btn-icon btn-light text-secondary px-3 border" title="Instagram" target="_blank" href="#"><i className="fab fa-instagram fa-lg"></i></a>
            <a className="btn btn-icon btn-light text-secondary px-3 border" title="Youtube" target="_blank" href="#"><i className="fab fa-youtube fa-lg"></i></a>
            <a className="btn btn-icon btn-light text-secondary px-3 border" title="Twitter" target="_blank" href="#"><i className="fab fa-twitter fa-lg"></i></a>
          </div>
        </div>
        
      </div>
    </div>
  </section>
 


  <section className="">
    <div className="container text-center text-md-start mt-5 mb-4">
      
      <div className="row mt-3">
      
        <div className="col-12 col-lg-3 col-sm-12">
       
            {/* <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" /> */}
            <Logo />
  
          <p className="mt-3">
            © 2023 Copyright: MDBootstrap.com.
          </p>
        </div>
     

       
        <div className="col-6 col-sm-4 col-lg-2">
          
          <h6 className="text-uppercase text-dark fw-bold mb-2">
            Store
          </h6>
          <ul className="list-unstyled mb-4">
            <li><a className="text-muted" href="#">About us</a></li>
            <li><a className="text-muted" href="#">Find store</a></li>
            <li><a className="text-muted" href="#">Categories</a></li>
            <li><a className="text-muted" href="#">Blogs</a></li>
          </ul>
        </div>
        

        
        <div className="col-6 col-sm-4 col-lg-2">
          
          <h6 className="text-uppercase text-dark fw-bold mb-2">
            Information
          </h6>
          <ul className="list-unstyled mb-4">
            <li><a className="text-muted" href="#">Help center</a></li>
            <li><a className="text-muted" href="#">Money refund</a></li>
            <li><a className="text-muted" href="#">Shipping info</a></li>
            <li><a className="text-muted" href="#">Refunds</a></li>
          </ul>
        </div>
        

        
        <div className="col-6 col-sm-4 col-lg-2">
          
          <h6 className="text-uppercase text-dark fw-bold mb-2">
            Support
          </h6>
          <ul className="list-unstyled mb-4">
            <li><a className="text-muted" href="#">Help center</a></li>
            <li><a className="text-muted" href="#">Documents</a></li>
            <li><a className="text-muted" href="#">Account restore</a></li>
            <li><a className="text-muted" href="#">My orders</a></li>
          </ul>
        </div>
        

       
        <div className="col-12 col-sm-12 col-lg-3">
         
          <h6 className="text-uppercase text-dark fw-bold mb-2">Our apps</h6>
          <a href="#" className="mb-2 d-inline-block"> <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/misc/btn-appstore.webp" height="38" /></a>
          <a href="#" className="mb-2 d-inline-block"> <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/misc/btn-market.webp" height="38" /></a>
        </div>
       
      </div>
      
    </div>
  </section>
 
  <div className="container">
    <div className="py-4 border-top">
      <div className="d-flex justify-content-between">
        
        <div className="text-dark">
          <i className="fab fa-lg fa-cc-visa"></i>
          <i className="fab fa-lg fa-cc-amex"></i>
          <i className="fab fa-lg fa-cc-mastercard"></i>
          <i className="fab fa-lg fa-cc-paypal"></i>
        </div>

      </div>
    </div>
  </div>
</footer>


    </div>
}
export default Footer