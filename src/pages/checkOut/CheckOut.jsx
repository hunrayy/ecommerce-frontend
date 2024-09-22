
import CheckoutHeader from "../../components/checkoutHeader/CheckoutHeader"
import "./checkout.css"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import Form from 'react-bootstrap/Form';
import { CartContext } from "../cart/CartContext";
import { CurrencyContext } from "../../components/all_context/CurrencyContext";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { toast } from "react-toastify"; 
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../../components/loader/Loader";
import { calculateTotal } from "../cart/CartTotal";
import CartTotal from "../cart/CartTotal";
const CheckOut = () => {
  const use_auth = useAuth()
  const navigate = useNavigate()
  const { cartProducts, addToCart, updateCartItemQuantity } = useContext(CartContext);
  const { selectedCurrency, convertCurrency, currencySymbols, currentCurrencyCode } = useContext(CurrencyContext);


  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: use_auth.user.user?.email,
    firstname: use_auth.user.user?.firstname,
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    country: "", //initially empty, no default country
    state: "",
    totalPrice: "",
    currency: currentCurrencyCode
  })

  // Form errors state
  const [errors, setErrors] = useState({});

    // Handle country selection and dynamically load states
    const handleCountryChange = (e) => {
      const selectedCountry = e.target.value;
      setFormData((prevData) => ({ ...prevData, country: selectedCountry, state: "" })); // Clear the state when the country changes
  
      // Find the selected country's states and update the state dropdown
      const countryData = countries.find((country) => country.name === selectedCountry);
      if (countryData) {
        setStates(countryData.states); // Update the states based on the selected country
      } else {
        setStates([]); // Clear states if no country found (just in case)
      }
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({...prevData, [name]: value}))
    }

    //validate the form
    const validateForm = () => {
      const newErrors = {}
      if (!formData.lastname) newErrors.lastname = "Last name is required"
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
      else if (!/^\d+$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";

        // Country validation
      if (!formData.country) newErrors.country = "Country is required";
      
      // State validation based on available states
      if (states.length > 0 && !formData.state) {
        newErrors.state = "State/Region is required";
      } else if (states.length === 0 && !formData.state) {
        setFormData((prevData) => ({ ...prevData, state: formData.country })); // Automatically set state to country name
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

      // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const token = Cookies.get("authToken")
      if (validateForm()) {
        setLoading(true)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/paypal/make-payment`, formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ).then((feedback) => {
          // console.log(feedback)
          const links = feedback.data.links;

          // Find the link with rel: "approve"
          const approveLink = links.find(link => link.rel === "approve");

          if (approveLink) {
            // Redirect the user to PayPal approval page
            window.location.href = approveLink.href;
          } else {
            // Handle the error if the approval link is missing
            toast.error("There was an issue connecting to the payment provider. Please try again.");
          }


        }).finally(()=> {
          setLoading(false)
        })
      } else {
        toast.error("Please correct the errors in the form.");
      }
    };


  useEffect(() => {
    if(!use_auth.user.is_user_logged){
      navigate("/", {replace: true})
    }
  
    const total = calculateTotal(cartProducts, convertCurrency, selectedCurrency); // Pass context values
    setFormData((prevData) => ({
      ...prevData,
      totalPrice: total.toString(), // Convert total to string
      currency: selectedCurrency
    }));

    axios.get("https://countriesnow.space/api/v0.1/countries/states").then((feedback) => {
      setCountries(feedback.data.data)
    }).catch((error) => {
      // console.error("Error fetching countries and states:", error)
      toast.error("Failed to fetch countries and states. Please try again later.");
    })
  }, [cartProducts, selectedCurrency, convertCurrency])
  return <div>
    <CheckoutHeader />
    {loading && <Loader />}
    <section className=" checkout-container">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 mb-4">
            {/* <!-- Checkout --> */}
            <div className="card shadow-0 border">
              <div className="p-4">
                <div className="row">
                  <h5 className="card-title mb-3">Contact</h5>
                  <div className="mb-3 form-floating">
                    <input type="email" placeholder="Email" value={formData.email} disabled className="form-control form-control-lg" />
                    <label className="mx-4">Email</label>
                  </div>
                  <h5 className="card-title mb-3">Delivery</h5>

                  <div className="col-12 mb-3 form-floating">
                    <Form.Select size="lg" className={`form-select-lg ${errors.country && 'is-invalid'}`} style={{fontSize: "14px"}} name="country" value={formData.country} onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.iso3} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                    </Form.Select>
                    <label className="mx-3">Country</label>
                    {errors.country && <small className="text-danger">{errors.country}</small>}

                  </div>
                 

                  <div className="col-12 col-lg-6 mb-3 form-floating">
                    <input type="text" id="typeText" placeholder="First name" value={formData.firstname} disabled className="form-control" />
                    <label className="mx-3">First name</label>
                  </div>

                  <div className="col-12 col-lg-6 form-floating mb-3">
                    <input type="text" id="typeText" placeholder="Last name" className={`form-control ${errors.address && 'is-invalid'}`} name="lastname" value={formData.lastname} onChange={handleInputChange} />
                    <label className="mx-3">Last name</label>
                    {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
                  </div>

                  <div className="col-12 form-floating mb-3">
                    <input type="text" id="typeText" placeholder="address" className={`form-control ${errors.address && 'is-invalid'}`} name="address" value={formData.address} onChange={handleInputChange} />
                    <label className="mx-3">Address</label>
                    {errors.address && <small className="text-danger">{errors.address}</small>}
                  </div>

                  <div className="col-12 col-lg-4 mb-3 form-floating">
                    <Form.Select
                      size="lg"
                      className={`form-select-lg ${errors.state && 'is-invalid'}`}
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      <option value="">Select State/Region</option>
                      {states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </Form.Select>
                    <label className="mx-3">State/Region</label>
                    {errors.state && <small className="text-danger">{errors.state}</small>}
                  </div>

                  <div className="col-12 col-lg-4 form-floating mb-3">
                    <input type="text" id="typeText" placeholder="City" className={`form-control ${errors.city && 'is-invalid'}`} name="city" value={formData.city} onChange={handleInputChange} />
                    <label className="mx-3">City</label>
                    {errors.city && <small className="text-danger">{errors.city}</small>}

                  </div>

                  <div className="col-12 col-lg-4 form-floating mb-3">
                    <input type="text" id="typeText" placeholder="Postal code" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                    <label className="mx-3">Postal Code(optional)</label>
                  </div>

                  <div className="mb-5 form-floating">
                    <input type="number" placeholder="Phone number" className={`form-control form-control-lg ${errors.phoneNumber && 'is-invalid'}`} name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                    <label className="mx-4">Phone number</label>
                    {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                  </div>
                </div>

                {/* <hr className="my-4" /> */}

                <h5 className="card-title">Payment</h5>
                <small className="mb-3">All transactions are secure and encrypted.</small><br />
                <small><b>Before making payment, kindly ensure  that your desired payment currency is supported by Paypal</b></small>

                <div className="row mb-3 mt-2">
                  <div className="col-lg-12 mb-3">
                    {/* <!-- Default checked radio --> */}
                    <div className="form-check h-100 border rounded-3">
                      <div className="p-3">
                        <input className="form-check-input" type="radio" readOnly checked />
                        <h5 className="col-3" style={{fontFamily: "Outfit"}}>Paypal</h5>
                        <small>After clicking pay now, you will be redirected to make payment</small>
                      </div>
                        <div>
                          <img style={{width: "100%", height: "auto", maxWidth: "250px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2wrfKVK1n5mjpmuHbIKlNb3PbTLBdwFEAw&s" alt="paypal logo" />
                        </div>
                    </div>
                  </div>
                </div>



                <div className="d-none d-lg-grid">
                  <button className="btn btn-lg shadow-0 border " onClick={handleSubmit} style={{backgroundColor: "black", color: "white", fontWeight: "900"}}>Pay now</button>
                </div>
              </div>
          <div className=" checkout-item-summary">
            <div className=" justify-content-lg-end">
              <div className="" style={{ maxWidth: "320px" }}>
                <h6 className="mb-3">Summary</h6>

                
                {cartProducts.products.map((product, index) => {
                  // console.log(product)
                  const currencySymbol = currencySymbols[selectedCurrency];
                  let convertedPrice = convertCurrency(product.price, 'NGN', selectedCurrency);
                    convertedPrice = Number(convertedPrice);
                  return <div className="d-flex align-items-center mb-4" key={index}>
                    <div className="me-3 position-relative">
                      {product.quantity > 1 && <span className=" bg-dark position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary ">
                        {product.quantity}
                      </span>}
                      <img src={product.img} style={{ height: "auto", width: "100%", maxWidth: "60px"}} className="img-sm rounded border" />
                    </div>
                    <div>
                      {product.name}
                      <div className=" text-muted">{product.lengthPicked}
                        <div className=" text-muted">{currencySymbol}{convertedPrice.toLocaleString()}  {product.quantity > 1 && <span>&nbsp; * &nbsp; {product.quantity}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                })}
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2 fw-bold">Total price:</p>
                  <p className="mb-2 fw-bold"><CartTotal /></p>
                </div>


                {/* <div className="d-grid d-lg-none" style={{background: "red", wdth: "100%"}}> */}
                    <button className="btn btn-lg shadow-0 border" onClick={handleSubmit} style={{backgroundColor: "black", color: "white", fontWeight: "900", width: "100%"}}>Pay now</button>
                  {/* </div> */}
              </div>
            </div>
            </div>
            {/* <!-- Checkout --> */}
          </div>

          </div>
        </div>
      </div>
    </section>

  </div>
}
export default CheckOut
