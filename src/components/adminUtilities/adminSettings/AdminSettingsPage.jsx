import React, { useState, useEffect, useContext } from 'react';
import './adminSettingsPage.css'; // Import custom CSS
import { useAuth } from "../../AuthContext/AuthContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import localforage from 'localforage';

const AdminSettingsPage = () => {
  // const use_auth = useAuth();
  const { user, setUser } = useAuth();

  const adminDetails = user.user || {};

  // State to store form data, including OTP
  const [formData, setFormData] = useState({
    firstname: adminDetails.firstname || '',
    lastname: adminDetails.lastname || '',
    email: adminDetails.email || '',
    previousEmail: adminDetails.email || '',
    countryOfWarehouseLocation: adminDetails.countryOfWarehouseLocation || '',
    internationalShippingFeeInNaira: adminDetails.internationalShippingFeeInNaira || '',
    domesticShippingFeeInNaira: adminDetails.domesticShippingFeeInNaira || '',
    numberOfDaysForDomesticDelivery: adminDetails.numberOfDaysForDomesticDelivery || '',
    numberOfDaysForInternationalDelivery: adminDetails.numberOfDaysForInternationalDelivery || '',
    otp: '' // Add OTP to form data
  });
  // State to track if OTP has been sent
  const [OtpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false)

  // State to handle form validation errors
  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.countryOfWarehouseLocation.trim()) newErrors.countryOfWarehouseLocation = "Country is required";
    if (!formData.domesticShippingFeeInNaira) newErrors.domesticShippingFeeInNaira = "Domestic shipping fee is required";
    if (!formData.internationalShippingFeeInNaira) newErrors.internationalShippingFeeInNaira = "International shipping fee is required";
    if (!formData.numberOfDaysForDomesticDelivery) newErrors.numberOfDaysForDomesticDelivery = "Number of days for domestic delivery is required";
    if (!formData.numberOfDaysForInternationalDelivery) newErrors.numberOfDaysForInternationalDelivery = "Number of days for international delivery is required";
    if (!formData.otp) newErrors.otp = "OTP is required";
    if (!OtpSent) newErrors.otp = "OTP must be sent to verify email";
    return newErrors;
  };

  // Function to send OTP
  const sendOTP = async (e) => {
    e.preventDefault();
    setOtpLoading(true)
    const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/send-email-verification-code`, { email: formData.email })
    console.log(feedback)
    if (feedback.data.code == "success") {
      setOtpLoading(false)
      const verificationCode = feedback.data.verificationCode;
      Cookies.set("_emt", verificationCode, { expires: 5 / 1440 });
      toast.success("OTP sent successfully")
      setOtpSent(true);
    } else if (feedback.data.code == "error") {
      setOtpLoading(false)
      toast.error(`${feedback.data.message}`)
    } else {
      setOtpLoading(false)
      toast.error("An error occured while sending OTP")

    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors
    } else {
      setErrors({}); // Clear errors if validation passes

      // Proceed with form submission
      const codeFromCookies = Cookies.get("_emt")
      const authToken = Cookies.get("authToken")
      console.log('Form data:', formData, "code from cookies: ", codeFromCookies);
      const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin-settings`, { formData }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          codeFromCookies: codeFromCookies
        }
      })
      console.log(feedback)
      if (feedback.data.code == 'invalid-jwt') {
        toast.error(`${feedback.data.message}`)
      } else if (feedback.data.code == "success") {
        //update in database was successful, next, update data in localforage
        await localforage.setItem('current_user', JSON.stringify(feedback.data.data))
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          previousEmail: '',
          countryOfWarehouseLocation: '',
          internationalShippingFeeInNaira: '',
          domesticShippingFeeInNaira: '',
          numberOfDaysForDomesticDelivery: '',
          numberOfDaysForInternationalDelivery: '',
          otp: ''
        })
        // window.location.reload()
        setUser({
          is_user_logged: true,
          user: feedback.data.data
        })
        toast.success('Admin record updated successfully')
      } else {
        toast.error("An error occured while updating admin record")
      }

      // You can submit the formData (which now includes OTP) to your backend here using axios or other methods
    }
  };

  // State to store countries fetched from the API
  const [countries, setCountries] = useState([]);

// Fetch list of countries from API on component mount
  useEffect(()=> {
    console.log(adminDetails)
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        const countryData = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2
        }));
        setCountries(countryData);
      })
      .catch(error => {
        console.error("Error fetching countries:", error);
        toast.error("Failed to fetch countries. Please try again later.");
      });
  }, [])

  return (
    <div>
      <div className="bread-crumb">
        <div>Before proceeding, an OTP will be sent to the email you input below</div>
      </div>

      <div className="admin-settings-container">
        <h1 className='text-center mb-4'>Admin Settings</h1>

        <form className="settings-form row" onSubmit={handleSubmit}>
          <div className="mb-3 col-6">
            <label>First name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              className={`form-control form-control-lg ${errors.firstname ? 'is-invalid' : ''}`}
              placeholder="First name"
              onChange={handleInputChange}
              style={{fontSize: "17px"}}
              required
            />
            {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
          </div>

          <div className="mb-3 col-6">
            <label>Last name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              className={`form-control form-control-lg  ${errors.lastname ? 'is-invalid' : ''}`}
              placeholder="Last name"
              onChange={handleInputChange}
              style={{fontSize: "17px"}}
              required
            />
            {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
          </div>

          <div className="form-group mb-4 col-12 col-md-6">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              onChange={handleInputChange}
              style={{fontSize: "17px"}}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            <div style={{ display: "flex", justifyContent: "right" }}>
              {otpLoading ? "sending..." : (
                OtpSent ? (
                  <span className="badge bg-success">OTP sent</span>
                ) : (
                  <button className="btn btn-sm" style={{ background: "purple", color: "white" }} onClick={sendOTP}>
                    Click to send OTP
                  </button>
                )
              )}

            </div>
            {errors.otp && <div className="text-danger">{errors.otp}</div>}
          </div>

          {/* <div className="form-group form-floating mb-4">
            <input
              type="text"
              name="countryOfWarehouseLocation"
              value={formData.countryOfWarehouseLocation}
              placeholder="Country of Warehouse Location"
              className={`form-control ${errors.countryOfWarehouseLocation ? 'is-invalid' : ''}`}
              onChange={handleInputChange}
              required
            />
            <label>Country of Warehouse location</label>
            {errors.countryOfWarehouseLocation && <div className="invalid-feedback">{errors.countryOfWarehouseLocation}</div>}
          </div> */}
                    <div className="form-group mb-4 col-12 col-md-6">
            <label>Country of Warehouse location</label>
            <select
              name="countryOfWarehouseLocation"
              value={formData.countryOfWarehouseLocation}
              onChange={handleInputChange}
              className={`form-control ${errors.countryOfWarehouseLocation ? 'is-invalid' : ''}`}
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countryOfWarehouseLocation && <div className="invalid-feedback">{errors.countryOfWarehouseLocation}</div>}
          </div>

          <div className="form-group mb-4 col-12 col-md-6">
            <label>Flat rate shipping fee for domestic delivery (in naira):</label>
            <input
              type="number"
              name="domesticShippingFeeInNaira"
              value={formData.domesticShippingFeeInNaira}
              className={`form-control form-control-lg ${errors.domesticShippingFeeInNaira ? 'is-invalid' : ''}`}
              style={{fontSize: "17px"}}
              onChange={handleInputChange}
              required
            />
            {errors.domesticShippingFeeInNaira && <div className="invalid-feedback">{errors.domesticShippingFeeInNaira}</div>}
          </div>

          <div className="form-group mb-4 col-12 col-md-6">
            <label>Flat rate shipping fee for international delivery (in naira):</label>
            <input
              type="number"
              name="internationalShippingFeeInNaira"
              value={formData.internationalShippingFeeInNaira}
              className={`form-control form-control-lg ${errors.internationalShippingFeeInNaira ? 'is-invalid' : ''}`}
              style={{fontSize: "17px"}}
              onChange={handleInputChange}
              required
            />
            {errors.internationalShippingFeeInNaira && <div className="invalid-feedback">{errors.internationalShippingFeeInNaira}</div>}
          </div>

          <div className="form-group col-12 col-md-6">
            <label>Local delivery time (days)</label>
            <input
              type="number"
              name="numberOfDaysForDomesticDelivery"
              value={formData.numberOfDaysForDomesticDelivery}
              className="form-control form-control-lg"
              style={{fontSize: "17px"}}
              onChange={handleInputChange}
              min="1"
            />
            <small id="deliveryHelp" className="form-text text-muted">
              Number of days for domestic delivery.
            </small>
          </div>

          <div className="form-group col-12 col-md-6">
            <label>International delivery time (days)</label>
            <input
              type="number"
              name="numberOfDaysForInternationalDelivery"
              value={formData.numberOfDaysForInternationalDelivery}
              className="form-control form-control-lg"
              style={{fontSize: "17px"}}
              onChange={handleInputChange}
              min="1"
            />
            <small id="deliveryHelp" className="form-text text-muted">
              Number of days for international delivery.
            </small>
          </div>


          <div className="form-group mb-4">
            <label>Enter OTP received</label>
            <input
              type="number"
              name="otp"
              value={formData.otp}
              className={`form-control form-control-lg ${errors.otp ? 'is-invalid' : ''}`}
              placeholder="Enter OTP"
              style={{fontSize: "17px"}}
              onChange={handleInputChange}
              required
            />
            {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-lg" style={{ backgroundColor: "purple", color: "white" }}>Save Changes</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;



























// import React, { useState, useEffect } from 'react';
// import './adminSettingsPage.css'; // Import custom CSS
// import { useAuth } from "../../AuthContext/AuthContext"
// import axios from 'axios';

// const AdminSettingsPage = () => {
//   const use_auth = useAuth()
//   const adminDetails = use_auth?.user?.user
//   const [formData, setFormData] = useState({
//     firstname: adminDetails.firstname,
//     lastname: adminDetails.lastname,
//     email: adminDetails.email,
//     countryOfWarehouseLocation: adminDetails.countryOfWarehouseLocation,
//     internationalShippingFeeInNaira: adminDetails.internationalShippingFeeInNaira,
//     domesticShippingFeeInNaira: adminDetails.domesticShippingFeeInNaira 
//   })
//   const [OtpSent, setOtpSent] = useState(false)
//   const sendOTP = () => {
//     setOtpSent(true)
//   }
//   return (
//     <div>
//                   <div className="bread-crumb">
//                 {/* <div style={{fontSize: "20px", fontWeight: "semi bold"}}>Admin Dashboard </div> */}
//                 <div>Before proceeding, an otp will be sent to the email you input below</div>
//             </div>
//       <div className="admin-settings-container">
//         <h1 className='text-center mb-4'>Admin Settings</h1>
//         <form className="settings-form">
//         <div className="form-floating mb-3">
//           <input type="text" value={formData.firstname} className="form-control" placeholder="First name" required />
//           <label>First name</label>
//         </div>

//         <div className="form-floating mb-3">
//           <input type="text" value={formData.lastname} className="form-control" placeholder="Last name" required />
//           <label>Last name</label>
//         </div>

//           <div className="form-group form-floating mb-4">
//             <input type="email" value={formData.email} className='form-control' placeholder='email' required />
//             <label>Email</label>
//             <div style={{display: "flex", justifyContent: "right"}}>
//               {OtpSent ? <span className='badge bg-success'>OTP sent</span> : <button className='btn btn-sm' style={{background: "purple", color: "white"}} onClick={sendOTP}>click to send otp</button>}
//             </div>
//           </div>


//           <div className="form-group form-floating mb-4">
//             <input type="text" value={formData.countryOfWarehouseLocation} placeholder="country" className='form-control' />
//             <label>Country of Warehouse location</label>
//           </div>

//           <div className="form-group mb-4">
//             <label>Flat rate shipping fee for domestic delivery (in naira):</label>
//             <input type="number" value={formData.domesticShippingFeeInNaira} className='form-control form-control-lg' />
//           </div>

//           <div className="form-group mb-4">
//             <label>Flat rate shipping fee for international delivery (in naira)</label>
//             <input type="number" value={formData.internationalShippingFeeInNaira} className='form-control form-control-lg' />
//           </div>

//           <div className="form-group mb-4">
//             <label>Enter OTP sent</label>
//             <input type="number" className='form-control form-control-lg' />
//           </div>

//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary btn-lg">Save Changes</button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminSettingsPage;





















