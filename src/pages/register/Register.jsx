














import Loader from '../../components/loader/Loader';
import { useState , useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { token } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [serverSuccessFeedback, setServerSuccessFeedback] = useState(false)
  const [serverErrorFeedback, setServerErrorFeedback] = useState({
    status: false,
    message: ""
  })
  const location = useLocation();
  const defaultEmail = location.state?.defaultEmail;
  const [formData, setFormData] = useState({
    firstname: '',
    email: defaultEmail,
    password: '',
    confirmPassword: '',
    formErrors: {}
  });


  const validateForm = () => {
    const errors = {};

    // Validate firstname
    if (!formData.firstname) {
      errors.firstname = 'Firstname is required';
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    if (formData.password.length < 6) {
        errors.password = 'Password must be more than 6 characters';
      }
    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Password confirmation is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormData(prevState => ({
      ...prevState,
      formErrors: errors
    }));

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission or API call
      setIsLoading(true)
      
      const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, { firstname: formData.firstname, lastname: formData.lastname, email: formData.email, password: formData.password},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      );
      console.log(feedback)
     if(feedback){
        setFormData((prev) => ({
            ...prev,
            firstname: "",
            email: "",
            password: "",
            confirmPassword: ""
        }))
        setIsLoading(false)
        if(feedback.data.code === "invalid-jwt"){
            //invalid token...navigate to page not found
            navigate("/page-not-found", {replace: true})
        }else if(feedback.data.code === "success"){
            setServerSuccessFeedback(true)
        }else{
            setServerErrorFeedback({
                status: true,
                message: feedback.data.message
            })
        }
     }
    }
  };

  useEffect(()=> {
    //on page load, make an api call to check if token is still valid
    console.log(defaultEmail)
    console.log(token)

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/is-token-active`, {data: null}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((feedback) => {
        console.log(feedback)
        if(feedback.data.code === "invalid-jwt"){
            //token is invalid or expire...navigate to page not found
            // navigate("/page-not-found", {replace: true})
        }
    }).catch((error) => {
        console.log(error)
    })
  }, [])

  return (
    <div>
        {isLoading && <Loader />}
      <div style={{ padding: "20px", fontSize: "20px" }} className="d-md-none">
        <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
      </div>
      <div className="login-page-container">
        <div className="login-page-wrapper" style={{marginTop: "10px"}}>
          <Logo />
          <h5>Welcome to beautybykiara</h5>
          <span>Create a new account to get started</span>
            { serverSuccessFeedback && <div className='mt-2 px-4'>
                <b>Account successfully created, you can now <Link to = "/login" style={{color: "purple", textDecoration: "none"}}>login</Link></b>
            </div>}
            {serverErrorFeedback.status && 
                <div className='text-danger mt-2 px-4'><b>Account could not be created, {serverErrorFeedback.message}</b></div>
            }

          
          <form className="mb-1" onSubmit={handleSubmit}>
            <div style={{ padding: "30px" }}>
             
              <div className="form-floating">
                <input
                  type="text"
                  placeholder="Firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  style={{fontSize: "16px"}}
                  className={`form-control form-control-lg ${formData.formErrors.firstname ? 'is-invalid' : ''}`}
                />
                <label>Firstname</label>
                {formData.formErrors.firstname && (
                  <div style={{display: "flex", justifyContent: "left", padding: "5px 10px 0 0"}} className="invalid-feedback">
                    {formData.formErrors.firstname}
                  </div>
                )}
              </div>

              <div className="form-floating mt-3">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{fontSize: "16px"}}
                  className={`form-control form-control-lg`}
                  disabled={true}

                />
                <label>Email</label>
              </div>

              <div className="form-floating mt-3">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{fontSize: "16px"}}
                  className={`form-control form-control-lg ${formData.formErrors.password ? 'is-invalid' : ''}`}
                />
                <label>Password</label>
                {formData.formErrors.password && (
                  <div style={{display: "flex", justifyContent: "left"}} className="invalid-feedback">
                    {formData.formErrors.password}
                  </div>
                )}
              </div>

              <div className="form-floating mt-3">
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{fontSize: "16px"}}
                  className={`form-control form-control-lg ${formData.formErrors.confirmPassword ? 'is-invalid' : ''}`}
                />
                <label>Confirm password</label>
                {formData.formErrors.confirmPassword && (
                  <div style={{display: "flex", justifyContent: "left"}} className="invalid-feedback">
                    {formData.formErrors.confirmPassword}
                  </div>
                )}
              </div>

              <div className="d-grid">
                <button className="btn btn-lg mt-4" style={{backgroundColor: "purple", color: "white"}} type="submit">
                  <b>Register</b>
                </button>
              </div>
            </div>
          </form>
          <small style={{padding: "0 10px 0 10px"}}>By continuing you agree to beautybykiara’s Terms and Conditions</small>
        </div>
      </div>
    </div>
  );
}

export default Register;

