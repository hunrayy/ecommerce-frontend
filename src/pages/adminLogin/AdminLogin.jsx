import React, { useState } from "react";
import Logo from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const validateForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (!passwordPattern.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter, one uppercase letter, and one special character.";
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errors: { ...formData.errors, [e.target.name]: "" }, // Clear error on change
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Submit the form
      console.log("Form submitted:", formData);
      alert(`Form submitted:`)
    } else {
      setFormData({ ...formData, errors });
    }
  };

  return (
    <div>
        <Loader />
      <div style={{ padding: "20px", fontSize: "20px" }} className="d-md-none">
        <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
      </div>
      <div className="login-page-container">
        <div className="login-page-wrapper">
          <Logo />
          <h3>Welcome Back!</h3>
          <form className="mb-1" onSubmit={handleSubmit}>
            <div style={{ padding: "30px" }}>
              <div className="form-floating">
                <input
                  type="text    "
                  name="email"
                  placeholder="Email"
                  style={{fontSize: "16px"}}
                  className={`form-control form-control-lg ${
                    formData.errors.email ? "is-invalid" : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Email</label>
                {formData.errors.email && (
                  <div className="invalid-feedback" style={{textAlign: "left"}}>
                    {formData.errors.email}
                  </div>
                )}
              </div>

              <div className="form-floating mt-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`form-control form-control-lg ${
                    formData.errors.password ? "is-invalid" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <label>Password</label>
                {formData.errors.password && (
                  <div className="invalid-feedback" style={{textAlign: "left"}}>
                    {formData.errors.password}
                  </div>
                )}
              </div>
              <div style={{textAlign: "left", marginTop: "20px"}} >
                <small><Link>Forgot Password?</Link></small>
                
              </div>

              <div className="d-grid">
                <button className="btn btn-lg btn-primary mt-4" type="submit">
                  <b>Login</b>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
