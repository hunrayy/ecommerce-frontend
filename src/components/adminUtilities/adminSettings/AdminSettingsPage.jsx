import React, { useState, useEffect } from 'react';
import './adminSettingsPage.css'; // Import custom CSS
import { useAuth } from "../../AuthContext/AuthContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const AdminSettingsPage = () => {
  const use_auth = useAuth();
  const adminDetails = use_auth?.user?.user || {};

  // State to store form data, including OTP
  const [formData, setFormData] = useState({
    firstname: adminDetails.firstname || '',
    lastname: adminDetails.lastname || '',
    email: adminDetails.email || '',
    countryOfWarehouseLocation: adminDetails.countryOfWarehouseLocation || '',
    internationalShippingFeeInNaira: adminDetails.internationalShippingFeeInNaira || '',
    domesticShippingFeeInNaira: adminDetails.domesticShippingFeeInNaira || '',
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
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.countryOfWarehouseLocation.trim()) newErrors.countryOfWarehouseLocation = "Country is required";
    if (!formData.domesticShippingFeeInNaira) newErrors.domesticShippingFeeInNaira = "Domestic shipping fee is required";
    if (!formData.internationalShippingFeeInNaira) newErrors.internationalShippingFeeInNaira = "International shipping fee is required";

    if (!OtpSent) newErrors.otp = "OTP must be sent to verify email";
    if (!formData.otp) newErrors.otp = "OTP is required";
    return newErrors;
  };

  // Function to send OTP
  const sendOTP = async (e) => {
    e.preventDefault();
    setOtpLoading(true)
    const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/send-email-verification-code`, {email: formData.email})
    console.log(feedback)
    if(feedback.data.code == "success"){
      setOtpLoading(false)
      const verificationCode = feedback.data.verificationCode;
      Cookies.set("_emt", verificationCode, { expires: 5 / 1440 });
      toast.success("OTP sent successfully")
      setOtpSent(true);
    }else if(feedback.data.code == "error"){
      setOtpLoading(false)
      toast.error(`${feedback.data.message}`)
    }else{
      setOtpLoading(false)
      toast.error("An error occured while sending OTP")
      
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors
    } else {
      setErrors({}); // Clear errors if validation passes

      // Proceed with form submission
      const codeFromCookies = Cookies.get("_emt")
      console.log('Form data:', formData, "code from cookies: ", codeFromCookies);
      
      // You can submit the formData (which now includes OTP) to your backend here using axios or other methods
    }
  };

  return (
    <div>
      <div className="bread-crumb">
        <div>Before proceeding, an OTP will be sent to the email you input below</div>
      </div>

      <div className="admin-settings-container">
        <h1 className='text-center mb-4'>Admin Settings</h1>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input 
              type="text" 
              name="firstname" 
              value={formData.firstname} 
              className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} 
              placeholder="First name" 
              onChange={handleInputChange}
              required 
            />
            <label>First name</label>
            {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
          </div>

          <div className="form-floating mb-3">
            <input 
              type="text" 
              name="lastname" 
              value={formData.lastname} 
              className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} 
              placeholder="Last name" 
              onChange={handleInputChange}
              required 
            />
            <label>Last name</label>
            {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
          </div>

          <div className="form-group form-floating mb-4">
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              placeholder="Email" 
              onChange={handleInputChange}
              required 
            />
            <label>Email</label>
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

          <div className="form-group form-floating mb-4">
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
          </div>

          <div className="form-group mb-4">
            <label>Flat rate shipping fee for domestic delivery (in naira):</label>
            <input 
              type="number" 
              name="domesticShippingFeeInNaira" 
              value={formData.domesticShippingFeeInNaira} 
              className={`form-control form-control-lg ${errors.domesticShippingFeeInNaira ? 'is-invalid' : ''}`} 
              onChange={handleInputChange} 
              required 
            />
            {errors.domesticShippingFeeInNaira && <div className="invalid-feedback">{errors.domesticShippingFeeInNaira}</div>}
          </div>

          <div className="form-group mb-4">
            <label>Flat rate shipping fee for international delivery (in naira):</label>
            <input 
              type="number" 
              name="internationalShippingFeeInNaira" 
              value={formData.internationalShippingFeeInNaira} 
              className={`form-control form-control-lg ${errors.internationalShippingFeeInNaira ? 'is-invalid' : ''}`} 
              onChange={handleInputChange} 
              required 
            />
            {errors.internationalShippingFeeInNaira && <div className="invalid-feedback">{errors.internationalShippingFeeInNaira}</div>}
          </div>

          <div className="form-group mb-4">
            <label>Enter OTP received</label>
            <input 
              type="number" 
              name="otp" 
              value={formData.otp} 
              className={`form-control form-control-lg ${errors.otp ? 'is-invalid' : ''}`} 
              placeholder="Enter OTP" 
              onChange={handleInputChange}
              required 
            />
            {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">Save Changes</button>
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





















