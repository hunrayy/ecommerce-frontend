// import React, { useEffect, useContext, useState, useRef } from 'react';
// import CheckoutHeader from "../../components/checkoutHeader/CheckoutHeader";
// import "./checkout.css";
// import axios from "axios";
// import Form from 'react-bootstrap/Form';
// import { CartContext } from "../cart/CartContext";
// import { CurrencyContext } from "../../components/all_context/CurrencyContext";
// import { useAuth } from "../../components/AuthContext/AuthContext";

// const CheckOut = () => {
//     const use_auth = useAuth();
//     const { cartProducts } = useContext(CartContext);
//     const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);

//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [states, setStates] = useState([]);

//     // Form state with error handling
//     const [formData, setFormData] = useState({
//         email: use_auth.user.user?.email || '',
//         firstname: '',
//         lastname: '',
//         address: '',
//         city: '',
//         postalCode: '',
//         phoneNumber: '',
//         country: '',
//         state: '',
//         errors: {}
//     });

//     const inputRefs = useRef({
//         email: React.createRef(),
//         firstname: React.createRef(),
//         lastname: React.createRef(),
//         address: React.createRef(),
//         city: React.createRef(),
//         postalCode: React.createRef(),
//         phoneNumber: React.createRef(),
//         country: React.createRef(),
//         state: React.createRef()
//     });

//     useEffect(() => {
//         // Fetch countries and their states
//         axios.get("https://countriesnow.space/api/v0.1/countries/states")
//             .then((response) => {
//                 setCountries(response.data.data); // Store countries and states
//             })
//             .catch((error) => {
//                 console.error("Error fetching countries and states:", error);
//             });

//         console.log(use_auth.user.user);
//     }, []);

//     const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [id]: value,
//             errors: { ...prevState.errors, [id]: '' } // Clear error for changed field
//         }));
//     };

//     const handleCountryChange = (e) => {
//         const countryName = e.target.value;
//         setSelectedCountry(countryName);

//         // Find the selected country and set its states
//         const country = countries.find(c => c.name === countryName);
//         if (country) {
//             setStates(country.states);
//             setFormData((prevState) => ({
//                 ...prevState,
//                 country: countryName,
//                 state: ''
//             }));
//         } else {
//             setStates([]);
//             setFormData((prevState) => ({
//                 ...prevState,
//                 country: '',
//                 state: ''
//             }));
//         }
//     };

//     const handleStateChange = (e) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             state: e.target.value
//         }));
//     };

//     const validateForm = () => {
//         const { email, firstname, lastname, address, city, phoneNumber } = formData;
//         let isValid = true;
//         const errors = {};

//         // Email validation
//         if (!email) {
//             errors.email = 'Email is required';
//             isValid = false;
//         }

//         // First name validation
//         if (!firstname) {
//             errors.firstname = 'First name is required';
//             isValid = false;
//         }

//         // Last name validation
//         if (!lastname) {
//             errors.lastname = 'Last name is required';
//             isValid = false;
//         }

//         // Address validation
//         if (!address) {
//             errors.address = 'Address is required';
//             isValid = false;
//         }

//         // City validation
//         if (!city) {
//             errors.city = 'City is required';
//             isValid = false;
//         }

//         // Phone number validation
//         const phoneNumberPattern = /^\+?\d{1,15}$/;
//         if (!phoneNumber || !phoneNumberPattern.test(phoneNumber)) {
//             errors.phoneNumber = 'Phone number is invalid';
//             isValid = false;
//         }

//         setFormData((prevState) => ({
//             ...prevState,
//             errors
//         }));

//         // Scroll to the first error if there are any
//         if (!isValid) {
//             const firstErrorField = Object.keys(errors)[0];
//             if (inputRefs.current[firstErrorField] && inputRefs.current[firstErrorField].current) {
//                 inputRefs.current[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             }
//         }

//         return isValid;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault(); // Prevent default form submission
//         if (validateForm()) {
//             console.log("Form Data:", formData);
//             // Proceed with form submission or further actions
//         } else {
//             console.log("Form is invalid!");
//         }
//     };

//     const currencySymbol = currencySymbols[selectedCurrency] || ''; // Default to empty string if not found

//     return (
//         <div>
//             <CheckoutHeader />
//             <section className="checkout-container">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-xl-8 col-lg-8 mb-4">
//                             <div className="card shadow-0 border">
//                                 <div className="p-4">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="row">
//                                             <h5 className="card-title mb-3">Contact</h5>
//                                             <div className="mb-3 form-floating">
//                                                 <input type="email" id="email" placeholder="Email" value={formData.email} disabled className="form-control form-control-lg" />
//                                                 <label className="mx-4">Email</label>
//                                             </div>

//                                             <h5 className="card-title mb-3">Delivery</h5>

//                                             {/* Country dropdown */}
//                                             <div className="col-12 mb-3 form-floating" ref={inputRefs.current.country}>
//                                                 <Form.Select id="country" size="lg" className="form-select-lg" style={{ fontSize: "14px" }} onChange={handleCountryChange} value={formData.country}>
//                                                     <option value="">Select a country</option>
//                                                     {countries.map((country) => (
//                                                         <option key={country.iso2} value={country.name}>
//                                                             {country.name}
//                                                         </option>
//                                                     ))}
//                                                 </Form.Select>
//                                                 <label className="mx-3">Country</label>
//                                                 {formData.errors.country && <div className="invalid-feedback">{formData.errors.country}</div>}
//                                             </div>

//                                             {/* State dropdown */}
//                                             <div className="col-12 col-lg-4 mb-3 form-floating" ref={inputRefs.current.state}>
//                                                 <Form.Select id="state" size="lg" className="form-select-lg" style={{ fontSize: "14px" }} onChange={handleStateChange} value={formData.state}>
//                                                     <option value="">Select a state</option>
//                                                     {states.map((state) => (
//                                                         <option key={state.name} value={state.name}>
//                                                             {state.name}
//                                                         </option>
//                                                     ))}
//                                                 </Form.Select>
//                                                 <label className="mx-3">State/Region</label>
//                                                 {formData.errors.state && <div className="invalid-feedback">{formData.errors.state}</div>}
//                                             </div>

//                                             <div className="col-12 col-lg-6 mb-3 form-floating" ref={inputRefs.current.firstname}>
//                                                 <input type="text" id="firstname" placeholder="First name" value={formData.firstname} onChange={handleInputChange} className={`form-control ${formData.errors.firstname ? 'is-invalid' : ''}`} />
//                                                 <label className="mx-3">First name</label>
//                                                 {formData.errors.firstname && <div className="invalid-feedback">{formData.errors.firstname}</div>}
//                                             </div>

//                                             <div className="col-12 col-lg-6 form-floating mb-3" ref={inputRefs.current.lastname}>
//                                                 <input type="text" id="lastname" placeholder="Last name" value={formData.lastname} onChange={handleInputChange} className={`form-control ${formData.errors.lastname ? 'is-invalid' : ''}`} />
//                                                 <label className="mx-3">Last name</label>
//                                                 {formData.errors.lastname && <div className="invalid-feedback">{formData.errors.lastname}</div>}
//                                             </div>

//                                             <div className="col-12 form-floating mb-3" ref={inputRefs.current.address}>
//                                                 <input type="text" id="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className={`form-control ${formData.errors.address ? 'is-invalid' : ''}`} />
//                                                 <label className="mx-3">Address</label>
//                                                 {formData.errors.address && <div className="invalid-feedback">{formData.errors.address}</div>}
//                                             </div>

//                                             <div className="col-12 col-lg-6 mb-3 form-floating" ref={inputRefs.current.city}>
//                                                 <input type="text" id="city" placeholder="City" value={formData.city} onChange={handleInputChange} className={`form-control ${formData.errors.city ? 'is-invalid' : ''}`} />
//                                                 <label className="mx-3">City</label>
//                                                 {formData.errors.city && <div className="invalid-feedback">{formData.errors.city}</div>}
//                                             </div>

//                                             <div className="col-12 col-lg-6 mb-3 form-floating" ref={inputRefs.current.postalCode}>
//                                                 <input type="text" id="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} className={`form-control ${formData.errors.postalCode ? 'is-invalid' : ''}`} />
//                                                 <label className="mx-3">Postal Code</label>
//                                                 {formData.errors.postalCode && <div className="invalid-feedback">{formData.errors.postalCode}</div>}
//                                             </div>

//                                             <div className="col-12 col-lg-6 mb-3 form-floating" ref={inputRefs.current.phoneNumber}>
//                                                 <input type="text" id="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} className={`form-control ${formData.errors.phoneNumber ? 'is-invalid' : ''}`} />
//                                                 <label className="mx-3">Phone Number</label>
//                                                 {formData.errors.phoneNumber && <div className="invalid-feedback">{formData.errors.phoneNumber}</div>}
//                                             </div>

//                                             <div className="d-flex justify-content-between">
//                                                 <button type="submit" className="btn btn-dark btn-lg">
//                                                     <div className="d-flex align-items-center">
//                                                         <span className="mx-2">Place Order</span>
//                                                     </div>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-xl-4 col-lg-4 mb-4">
//                             <div className="card shadow-0 border">
//                                 <div className="p-4">
//                                     <h5 className="card-title mb-3">Order Summary</h5>
//                                     {cartProducts.products.map((product) => (
//                                         <div key={product.id} className="d-flex justify-content-between mb-2">
//                                             <span>{product.name}</span>
//                                             <span>{convertCurrency(product.price)}</span>
//                                         </div>
//                                     ))}
//                                     <div className="d-flex justify-content-between mt-3">
//                                         <h5>Total</h5>
//                                         <h5>{convertCurrency}</h5>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default CheckOut;

















































import CheckoutHeader from "../../components/checkoutHeader/CheckoutHeader"
import "./checkout.css"
import axios from "axios"
import { useEffect, useContext, useState } from "react"
import Form from 'react-bootstrap/Form';
import { CartContext } from "../cart/CartContext";
import { CurrencyContext } from "../../components/all_context/CurrencyContext";
import { useAuth } from "../../components/AuthContext/AuthContext";

const CheckOut = () => {
    const use_auth = useAuth()
    const { cartProducts, addToCart, updateCartItemQuantity } = useContext(CartContext);
    const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);

    useEffect(() => {
        // Fetch countries and their states
        axios.get("https://countriesnow.space/api/v0.1/countries/states")
            .then((response) => {
                setCountries(response.data.data); // Store countries and states
            })
            .catch((error) => {
                console.error("Error fetching countries and states:", error);
            });

        console.log(use_auth.user.user);
    }, []);

    // Handle country change and dynamically update states
    const handleCountryChange = (e) => {
        const countryName = e.target.value;
        setSelectedCountry(countryName);

        // Find the selected country and set its states
        const country = countries.find(c => c.name === countryName);
        if (country) {
            setStates(country.states);
        } else {
            setStates([]);
        }
    };

    // Validate all input fields except disabled ones and the optional postal code
    const validateForm = () => {
        const formElements = document.querySelectorAll("input, select");
        let isValid = true;
        let firstInvalidElement = null;

        formElements.forEach((element) => {
            // Skip validation for disabled fields and postal code
            if (!element.disabled && element.id !== "postalCode") {
                if (element.value === "") {
                    element.classList.add("is-invalid");
                    isValid = false;
                    // Set the first invalid element to scroll to
                    if (!firstInvalidElement) {
                        firstInvalidElement = element;
                    }
                } else {
                    element.classList.remove("is-invalid");
                }
            }
        });

        // Scroll to the first invalid element if any
        if (firstInvalidElement) {
            firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            console.log("Form is valid!");
            // Proceed with form submission or further actions
        } else {
            console.log("Form is invalid!");
        }
    };

    return (
        <div>
            <CheckoutHeader />
            <section class=" checkout-container">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-8 col-lg-8 mb-4">
                            <div class="card shadow-0 border">
                                <div class="p-4">
                                    <div class="row">
                                        <h5 class="card-title mb-3">Contact</h5>
                                        <div class="mb-3 form-floating">
                                            <input type="email" placeholder="Email" value={use_auth.user.user?.email} disabled class="form-control form-control-lg" />
                                            <label class="mx-4">Email</label>
                                        </div>

                                        <h5 class="card-title mb-3">Delivery</h5>

                                        {/* Country dropdown */}
                                        <div class="col-12 mb-3 form-floating">
                                            <Form.Select size="lg" className="form-select-lg" style={{ fontSize: "14px" }} onChange={handleCountryChange}>
                                                <option value="">Select a country</option>
                                                {countries.map((country) => (
                                                    <option key={country.iso2} value={country.name}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <label class="mx-3">Country</label>
                                        </div>

                                        {/* State dropdown */}
                                        <div class="col-12 col-lg-4 mb-3 form-floating">
                                            <Form.Select size="lg" className="form-select-lg" style={{ fontSize: "14px" }}>
                                                <option value="">Select a state</option>
                                                {states.map((state) => (
                                                    <option key={state.name} value={state.name}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <label class="mx-3">State/Region</label>
                                        </div>

                                        <div class="col-12 col-lg-6 mb-3 form-floating">
                                            <input type="text" id="typeText" placeholder="First name" value={use_auth.user.user?.firstname} disabled class="form-control" />
                                            <label class="mx-3">First name</label>
                                        </div>

                                        <div class="col-12 col-lg-6 form-floating mb-3">
                                            <input type="text" id="typeText" placeholder="Last name" class="form-control" />
                                            <label class="mx-3">Last name</label>
                                        </div>

                                        <div class="col-12 form-floating mb-3">
                                            <input type="text" id="typeText" placeholder="address" class="form-control" />
                                            <label class="mx-3">Address</label>
                                        </div>

                                        <div class="col-12 col-lg-4 form-floating mb-3">
                                            <input type="text" id="typeText" placeholder="City" class="form-control" />
                                            <label class="mx-3">City</label>
                                        </div>

                                        {/* Postal code (optional, no validation) */}
                                        <div class="col-12 col-lg-4 form-floating mb-3">
                                            <input type="text" id="postalCode" placeholder="Postal code" class="form-control" />
                                            <label class="mx-3">Postal Code (optional)</label>
                                        </div>

                                        <div class="mb-5 form-floating">
                                            <input type="number" placeholder="Phone number" class="form-control form-control-lg" />
                                            <label class="mx-4">Phone number</label>
                                        </div>
                                    </div>

                                    <h5 class="card-title">Payment</h5>
                                    <small className="mb-3">All transactions are secure and encrypted.</small><br />
                                    <small><b>Before making payment, kindly ensure that your desired payment currency is supported by Paypal</b></small>

                                    <div class="row mb-3 mt-2">
                                        <div class="col-lg-12 mb-3">
                                            <div class="form-check h-100 border rounded-3">
                                                <div className="p-3">
                                                    <input class="form-check-input" type="radio" readOnly checked />
                                                    <h5 className="col-3" style={{ fontFamily: "Outfit" }}>Paypal</h5>
                                                    <small>After clicking pay now, you will be redirected to make payment</small>
                                                </div>
                                                <div>
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2wrfKVK1n5mjpmuHbIKlNb3PbTLBdwFEAw&s" alt="paypal logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-none d-lg-grid">
                                        <button class="btn btn-lg shadow-0 border " style={{ backgroundColor: "black", color: "white", fontWeight: "900" }} onClick={handleSubmit}>
                                            Pay now
                                        </button>
                                    </div>
                                </div>

                                <div className="checkout-item-summary">
                                    <div class="justify-content-lg-end">
                                        <div class="" style={{ maxWidth: "320px" }}>
                                            <h6 class="mb-3">Summary</h6>

                                            {cartProducts.products.map((product) => {
                                                const currencySymbol = currencySymbols[selectedCurrency];
                                                let convertedPrice = convertCurrency(product.price, 'NGN', selectedCurrency);
                                                convertedPrice = Number(convertedPrice);
                                                return (
                                                    <div class="d-flex align-items-center mb-4">
                                                        <div class="me-3 position-relative">
                                                            {product.quantity > 1 && (
                                                                <span class=" bg-dark position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                                                                    {product.quantity}
                                                                </span>
                                                            )}
                                                            <img src={product.img} style={{ height: "auto", width: "100%", maxWidth: "60px" }}  alt="product image" class="img-sm rounded border" />
                                                        </div>
                                                        <div>
                                                            {product.name}
                                                            <div class="text-muted">{product.lengthPicked}</div>
                                                            <div class="text-muted">
                                                                {currencySymbol}{convertedPrice.toLocaleString()} {product.quantity > 1 && (
                                                                    <span>&nbsp; * &nbsp; {product.quantity}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <hr />
                                            <div class="d-flex justify-content-between">
                                                <p class="mb-2">Total price:</p>
                                                <p class="mb-2 fw-bold">{currencySymbols[selectedCurrency]}{convertCurrency(cartProducts.totalPrice, 'NGN', selectedCurrency).toLocaleString()}</p>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p class="mb-2">Shipping fee:</p>
                                                <p class="mb-2 fw-bold">---</p>
                                            </div>
                                            <hr />
                                            <div class="d-flex justify-content-between">
                                                <p class="mb-2">Total:</p>
                                                <p class="mb-2 fw-bold">{currencySymbols[selectedCurrency]}{convertCurrency(cartProducts.totalPrice, 'NGN', selectedCurrency).toLocaleString()}</p>
                                            </div>

                                            <button class="btn btn-lg shadow-0 border w-100 mt-2" style={{ backgroundColor: "black", color: "white", fontWeight: "900" }} onClick={handleSubmit}>
                                                Pay now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CheckOut;

















































// import CheckoutHeader from "../../components/checkoutHeader/CheckoutHeader"
// import "./checkout.css"
// import axios from "axios"
// import { useEffect, useContext } from "react"
// import Form from 'react-bootstrap/Form';
// import { CartContext } from "../cart/CartContext";
// import { CurrencyContext } from "../../components/all_context/CurrencyContext";
// import { useAuth } from "../../components/AuthContext/AuthContext";
// const CheckOut = () => {
//   const use_auth = useAuth()
//   const { cartProducts, addToCart, updateCartItemQuantity } = useContext(CartContext);
//   const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);


//   useEffect(() => {
//     console.log(use_auth.user.user)
//     axios.get("https://countriesnow.space/api/v0.1/countries/states").then((feedback) => {
//       console.log(feedback)
//     })
//   }, [])
//   return <div>
//     <CheckoutHeader />
//     <section class=" checkout-container">
//       <div class="container">
//         <div class="row">
//           <div class="col-xl-8 col-lg-8 mb-4">
//             {/* <!-- Checkout --> */}
//             <div class="card shadow-0 border">
//               <div class="p-4">
//                 <div class="row">
//                   <h5 class="card-title mb-3">Contact</h5>
//                   <div class="mb-3 form-floating">
//                     <input type="email" placeholder="Email" value={use_auth.user.user.email} disabled class="form-control form-control-lg" />
//                     <label class="mx-4">Email</label>
//                   </div>
//                   <h5 class="card-title mb-3">Delivery</h5>

//                   <div class="col-12 mb-3 form-floating">
//                     <Form.Select size="lg" className="form-select-lg" style={{fontSize: "14px"}}>
//                       <option>Nigeria</option>
//                       <option>America</option>
//                       <option>Ghana</option>
//                       <option>Tanzania</option>
//                       <option>Uganda</option>
//                       <option>Trinidad</option>
//                     </Form.Select>
//                     <label class="mx-3">Country</label>
//                   </div>
                 

//                   <div class="col-12 col-lg-6 mb-3 form-floating">
//                     <input type="text" id="typeText" placeholder="First name" value={use_auth.user.user.firstname} disabled class="form-control" />
//                     <label class="mx-3">First name</label>
//                   </div>

//                   <div class="col-12 col-lg-6 form-floating mb-3">
//                     <input type="text" id="typeText" placeholder="Last name" class="form-control" />
//                     <label class="mx-3">Last name</label>
//                   </div>

//                   <div class="col-12 form-floating mb-3">
//                     <input type="text" id="typeText" placeholder="address" class="form-control" />
//                     <label class="mx-3">Address</label>
//                   </div>

//                   <div class="col-12 col-lg-4 mb-3 form-floating">
//                     <Form.Select size="lg" className="form-select-lg" style={{fontSize: "14px"}}>
//                       <option>Lagos</option>
//                       <option>Anambra</option>
//                       <option>Osun</option>
//                       <option>Lagos</option>
//                       <option>Imo</option>
//                       <option>Akwa Ibom</option>
//                     </Form.Select>
//                     <label class="mx-3">State/Region</label>
//                   </div>

//                   <div class="col-12 col-lg-4 form-floating mb-3">
//                     <input type="text" id="typeText" placeholder="City" class="form-control" />
//                     <label class="mx-3">City</label>
//                   </div>

//                   <div class="col-12 col-lg-4 form-floating mb-3">
//                     <input type="text" id="typeText" placeholder="Postal code" class="form-control" />
//                     <label class="mx-3">Postal Code(optional)</label>
//                   </div>

//                   <div class="mb-5 form-floating">
//                     <input type="email" placeholder="Phone number" class="form-control form-control-lg" />
//                     <label class="mx-4">Phone number</label>
//                   </div>
//                 </div>

//                 {/* <hr class="my-4" /> */}

//                 <h5 class="card-title">Payment</h5>
//                 <small className="mb-3">All transactions are secure and encrypted.</small><br />
//                 <small><b>Before making payment, kindly ensure  that your desired payment currency is supported by Paypal</b></small>

//                 <div class="row mb-3 mt-2">
//                   <div class="col-lg-12 mb-3">
//                     {/* <!-- Default checked radio --> */}
//                     <div class="form-check h-100 border rounded-3">
//                       {/* <div class="p-3">
//                         <label class="form-check-label" for="flexRadioDefault1">
//                           Express delivery <br />
//                           <small class="text-muted">3-4 days via Fedex </small>
//                         </label>
//                       </div> */}
//                       <div className="p-3">
//                         <input class="form-check-input" type="radio" readOnly checked />
//                         <h5 className="col-3" style={{fontFamily: "Outfit"}}>Paypal</h5>
//                         <small>After clicking pay now, you will be redirected to make payment</small>
//                       </div>
//                         <div>
//                           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2wrfKVK1n5mjpmuHbIKlNb3PbTLBdwFEAw&s" alt="paypal logo" />
//                         </div>
//                     </div>
//                   </div>
//                 </div>



//                 <div class="d-none d-lg-grid">
//                   <button class="btn btn-lg shadow-0 border " style={{backgroundColor: "black", color: "white", fontWeight: "900"}}>Pay now</button>
//                 </div>
//               </div>
//           <div className=" checkout-item-summary">
//             <div class=" justify-content-lg-end">
//               <div class="" style={{ maxWidth: "320px" }}>
//                 <h6 class="mb-3">Summary</h6>

                
//                 {cartProducts.products.map((product) => {
//                   // console.log(product)
//                   const currencySymbol = currencySymbols[selectedCurrency];
//                   let convertedPrice = convertCurrency(product.price, 'NGN', selectedCurrency);
//                     convertedPrice = Number(convertedPrice);
//                   return <div class="d-flex align-items-center mb-4">
//                     <div class="me-3 position-relative">
//                       {product.quantity > 1 && <span class=" bg-dark position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary ">
//                         {product.quantity}
//                       </span>}
//                       <img src={product.img} style={{ height: "auto", width: "100%", maxWidth: "60px"}} class="img-sm rounded border" />
//                     </div>
//                     <div>
//                       {product.name}
//                       <div class=" text-muted">{product.lengthPicked}
//                         <div class=" text-muted">{currencySymbol}{convertedPrice.toLocaleString()}  {product.quantity > 1 && <span>&nbsp; * &nbsp; {product.quantity}</span>}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 })}
//                 <hr />
//                 <div class="d-flex justify-content-between">
//                   <p class="mb-2 fw-bold">Total price:</p>
//                   <p class="mb-2 fw-bold">$149.90</p>
//                 </div>


//                 <div class="d-grid d-lg-none">
//                     <button class="btn btn-lg shadow-0 border " style={{backgroundColor: "black", color: "white", fontWeight: "900"}}>Pay now</button>
//                   </div>
//               </div>
//             </div>
//             </div>
//             {/* <!-- Checkout --> */}
//           </div>

//           </div>
//         </div>
//       </div>
//     </section>

//   </div>
// }
// export default CheckOut