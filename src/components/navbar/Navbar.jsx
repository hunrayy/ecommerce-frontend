

import "./navbar.css";
import Logo from "../Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../pages/cart/CartContext";
import { useState, useContext, useRef, useEffect } from "react";
import { CurrencyContext } from "../all_context/CurrencyContext";
import Select from "react-select";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate()
  const [shownav, setShownav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [searchState, setSearchState] = useState({isSearching: false, searchLoading: false, searchData: null, wordNotFound: null})
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);


  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const use_auth = useAuth()

  const { calculateTotalLength } = useContext(CartContext);
  const totalItems = calculateTotalLength();

  const { selectedCurrency, handleCurrencyChange, currencySymbols, currencyNames } = useContext(CurrencyContext);
  const handleCurrencySelect = (selectedOption) => {
    if (selectedOption) {
      handleCurrencyChange(selectedOption.value); // Update the currency based on user selection
    }
  };

  const sortedCurrencyOptions = Object.keys(currencySymbols).sort().map(currency => ({
    value: currency,
    label: `${currencySymbols[currency]} ${currencyNames[currency]} (${currency})`
  }));

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Show the loader immediately when the user starts typing
    setSearchState((prev) => ({
        ...prev,
        searchLoading: value.length > 0,
        wordNotFound: null
    }));

    // Clear the previous timeout
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Set a new timeout to perform search after a delay
    const newTimeout = setTimeout(() => {
      if (value.trim()) {
          performSearch(value);
      } else {
          // Clear the search results if query is empty
          setSearchState((prev) => ({
              ...prev,
              searchData: [],
              wordNotFound: null
          }));
      }
    }, 2000); // 2 seconds debounce delay

    setDebounceTimeout(newTimeout);
};

  // Debounced API call function
  const performSearch = async (query) => {
    setSearchState((prev) => ({ ...prev, wordNotFound: null }));
    console.log("hello")
    try {
        const feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search-products`, {
            params: { query }, // Pass search query as a parameter
        });
        console.log(feedback)

        setSearchState((prev) => ({
            ...prev,
            searchLoading: false,
            searchData: feedback.data.code === "success" ? feedback.data.data : [],
            wordNotFound: feedback.data.code === "success" && feedback.data.data.length === 0 ? query : null
        }));
    } catch (error) {
      console.log(error)
        setSearchState((prev) => ({
            ...prev,
            searchLoading: false,
            searchData: [],
            wordNotFound: query
        }));
    }
};

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <header className="navbar-component-container">
        <div className="">
          <div className="">
            <div className="wrapper">
              <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                <div style={{ fontSize: "30px" }} className="hamburgermenubar">
                  <i style={{ cursor: "pointer" }} className="fa-solid fa-bars" onClick={() => setShownav(true)}></i>
                </div>
                <div className="">
                  <Link to="/" className="" style={{ textDecoration: "none" }}>
                    <Logo />
                  </Link>
                </div>
                <div className={shownav ? "links-container-show" : "links-container"} onClick={() => setShownav(false)}>
                  <div className={shownav ? "links-wrapper-show" : "links-wrapper"} onClick={(e) => e.stopPropagation()}>
                    <div style={{ fontSize: "30px" }} className="cancelmenubar">
                      <i style={{ cursor: "pointer" }} className="fa-solid fa-xmark" onClick={() => setShownav(false)}></i>
                    </div>
                    <div>
                      <Link to="/" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Home</Link>
                    </div>
                    <div>
                      <Link to='/collections/all' style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Shop all</Link>
                    </div>
                    <div>
                      <label htmlFor="currency" style={{ fontWeight: "bold", color: "white"}}>Currency: </label>
                      <Select
                        options={sortedCurrencyOptions}
                        onChange={handleCurrencySelect}
                        value={sortedCurrencyOptions.find(option => option.value === selectedCurrency)}
                      />
                    </div>
                    <div>
                      <Link to='/pages/contact' style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>contact</Link>
                    </div>
                    <div>
                      <Link to="/policies/refund-policy" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Refund policy</Link>
                    </div>
                    <div>
                      <Link to="/policies/shipping-policy" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Shipping policy</Link>
                    </div>
                    <div>
                      <Link to="/policies/delivery-policy" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Delivery policy</Link>
                    </div>
                    <div>
                      <Link to="/order/tracking" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Tracking</Link>
                    </div>
                    <div style={{display: "flex", gap: "15px"}}>
                      <a style={{ color: "white" }} href="https://www.instagram.com/beauty_bykiaraa/" target="_blank">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a style={{ color: "white" }} href="https://www.tiktok.com/@beauty_bykiara" target="_blank">
                        <i className="fa-brands fa-tiktok"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
              {/* d-flex float-end  */}
                <div className="text-light" style={{display: "flex", gap: "15px"}}>
                {/* <Link to="/cart" style={{ fontWeight: "bold" }} className="border rounded py-1 px-3 nav-link d-flex align-items-center mx-1">
                  <i className="fa-solid fa-magnifying-glass m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Search</p>
                </Link> */}
                
                  <div className="dropdown" ref={dropdownRef}>
                    <button onClick={() => setDropdown(prev => !prev)} style={{ fontWeight: "bold" }} className="account-details-dropdown dropdown-toggle me-1 nav-link d-flex align-items-center">
                      <i className="fas fa-user-alt m-1 me-md-2"></i>
                      <p className="d-none d-md-block mb-0">{use_auth.user?.is_user_logged ? `Hi, ${use_auth.user?.user?.firstname}` : "Account"}</p>
                    </button>
                    {dropdown && (
                      <div className="account-details-dropdown-list-black">
                        <ul className="account-details-dropdown-list" type="none">
                        {
                            use_auth.user?.is_user_logged && use_auth.user?.user?.firstname &&  <div style={{backgroundColor: "purple", color: "white", margin: "10px", borderRadius: "5px", padding: "10px"}} className="d-block d-md-none">Hi, {use_auth.user.user.firstname}</div>
                              
                            
                          }
                          
                          {
                            !use_auth.user.is_user_logged && <span>
                              <li>
                            <Link to="/identification" className="me-1 nav-link d-flex align-items-center">Create account</Link>
                          </li>
                          <li>
                            <Link to="/login" className="me-1 nav-link d-flex align-items-center">Login</Link>
                          </li>
                            </span>
                            
                          }
                          <li>
                            <Link to={use_auth.user.is_user_logged ? "/user-account" : "/login"} className="me-1 nav-link d-flex align-items-center" style={{gap: "12px"}}> <i className="fa-regular fa-user " style={{fontSize: "20px"}}></i>My Account</Link>
                          </li>
                          {/* <li>
                            <Link className="me-1 nav-link d-flex align-items-center" style={{gap: "12px"}}> <i className="fa-regular fa-heart" style={{fontSize: "20px"}}></i>Wishlist</Link>
                          </li> */}
                          {/* <li>
                            <Link className="me-1 nav-link d-flex align-items-center" style={{gap: "12px"}}> <i className="fa-regular fa-message"style={{fontSize: "20px"}}></i> Live chat</Link>
                          </li> */}
                          {use_auth.user.is_user_logged && <span>
                            <hr />
                            <li style={{paddingTop: "0", display: "flex", justifyContent: "center"}}>
                              <button className="me-1 nav-link text-danger" onClick={()=> use_auth.logoutUser()}>Logout</button>
                            </li>
                              
                            </span>
                            
                          }
                          
                        </ul>
                      </div>
                    )}
                  </div>
                  <div style={{ fontWeight: "bold", cursor: "pointer" }} className="nav-link d-flex align-items-center mx-1" onClick={() => setSearchState((prev) => ({...prev, isSearching: true}))}>
                    <i className="fa-solid fa-magnifying-glass m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">Search</p>
                  </div >
                  {/* <Link to="/cart" style={{ fontWeight: "bold" }} className="border rounded py-1 px-3 nav-link d-flex align-items-center">
                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems}
                  </Link> */}
                  <Link to="/cart" style={{ fontWeight: "bold" }} className="nav-link d-flex align-items-center">
                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search modal */}
      {searchState.isSearching && (
        <div className="custom-modal-overlay-form" onClick={() => setSearchState((prev) => ({...prev, isSearching: false}))}>
          <div
            className="card  custom-modal-card"
            style={{
                width: "600px",
                padding: "20px",
                minHeight: "250px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
              <div class="search-container" onClick={() => setSearchState((prev) => ({...prev, isSearching: true}))}>
                  <input type="text" placeholder="Search..." autoFocus value={searchQuery} onChange={handleSearchChange}/>
                  <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
                  <small className="text-muted">Products</small>
                  {searchState.searchLoading && <div className="admin-form-loader-wrapper"></div>}
              </div>
              <hr />
                  <div style={{maxHeight: "400px", overflow: "auto"}}>
                  {searchState.searchData && (
                      searchState.searchData.map((product, index) => {
                          // console.log(product)
                          // return <div key={index} className="admin-search-result-container" onClick={()=> {setSearchState((prev) => ({...prev, isSearching: false, searchLoading: false, wordNotFound: null})), setSelectedProduct(product)}}>
                          return <div key={index} className="admin-search-result-container" onClick={()=> {navigate(`/product/${product.id}`)}}>
                              <img src={product.productImage} alt="" width="50px"  />
                              <p><b>{product.productName}</b></p>
                          </div>
                      })
                  )}
                  {searchState.wordNotFound != null && <div>Could not look up "{searchState.wordNotFound}"</div>}
              </div>
              
          </div>
      </div>
      )}
    </div>
  );
}

export default Navbar;


































// import "./navbar.css"
// import Logo from "../Logo/Logo"
// import { Link } from "react-router-dom"
// import { CartContext } from "../../pages/cart/CartContext"
// import { useState, useContext } from "react"
// import { CurrencyContext } from "../all_context/CurrencyContext"
// import Select from "react-select"
// const Navbar = () => {
//   const [shownav, setShownav] = useState(false)
//   const [dropdown, setDropdown] = useState(false)

//   const { calculateTotalLength } = useContext(CartContext);
//   const totalItems = calculateTotalLength();


//     const { selectedCurrency, convertCurrency, handleCurrencyChange, currencySymbols, currencyNames } = useContext(CurrencyContext);
//     const handleCurrencySelect = (selectedOption) => {
//       if (selectedOption) {
//         handleCurrencyChange(selectedOption.value); // Update the currency based on user selection
//       }
//     };
//     const sortedCurrencyOptions = Object.keys(currencySymbols).sort().map(currency => ({
//       value: currency,
//       label: `${currencySymbols[currency]} ${currencyNames[currency]} (${currency})`
//     }));

//     return <div>
//         <header className="navbar-component-container">
 
//   <div className="">
//     <div className="">
//       <div className="wrapper">
      
//        <div style={{display: "flex", alignItems: "center", gap: "30px"}}>
//           <div style={{fontSize: "30px"}} className="hamburgermenubar"><i style={{cursor: "pointer"}} class="fa-solid fa-bars" onClick={()=> setShownav(true)}></i></div>
//         <div className="">
//             <Link to="/"className="" style={{textDecoration: "none"}}>
//               <Logo />
//             </Link>
//           </div>
//           <div className={shownav ? "links-container-show" : "links-container"} onClick={()=> setShownav(false)}>
//             <div className={shownav ? "links-wrapper-show" : "links-wrapper"} onClick={(e)=>e.stopPropagation()}>
//             <div style={{fontSize: "30px"}} className="cancelmenubar"><i style={{cursor: "pointer"}} class="fa-solid fa-xmark" onClick={()=> setShownav(false)}></i></div>
//               <div>
//                 <Link to="/" style={{fontWeight: "bold"}}>Home</Link>
//               </div>
//               <div>
//                 <a href="#" style={{fontWeight: "bold"}}>Shop all</a>
//               </div>
//               <div>
//                 <label htmlFor="currency" className="text-muted" style={{fontWeight: "bold"}}>Currency: </label>
//                 <Select
//                   options={sortedCurrencyOptions}
//                   onChange={handleCurrencySelect}
//                   value={sortedCurrencyOptions.find(option => option.value === selectedCurrency)}
//                 />
//               </div>
//               <div>
//                 <a href="#" style={{fontWeight: "bold"}}>contact</a>
//               </div>
//               <div>
//                 <Link to="/policies/refund-policy" style={{fontWeight: "bold"}}>Refund policy</Link>
//               </div>
//               <div>
//                 <Link to="/policies/shipping-policy"style={{fontWeight: "bold"}}>Shipping policy</Link>
//               </div>
//               <div>
//                 <Link to="/policies/delivery-policy"style={{fontWeight: "bold"}}>Delivery policy</Link>
//               </div>
//               <div>
//                 <Link style={{fontWeight: "bold"}}>Tracking</Link>
//               </div>
//               <div>
//                 <a style={{color: "white"}} href="https://www.instagram.com/beauty_bykiaraa/" target="_blank" >
//                   <i class="fa-brands fa-instagram"></i>
//                 </a>
//                 <a style={{color: "white"}} href="https://www.tiktok.com/@beauty_bykiara" target="_blank" >
//                   <i class="fa-brands fa-x-twitter"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//        </div>
        

        
//         <div className="">
//           <div className="d-flex float-end text-light">

//             {/* <Link to="/login"style={{fontWeight: "bold"}} className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link> */}
// <div class="dropdown">
//   {/* <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//     Dropdown button
//   </button> */}
//   <button onClick={()=> setDropdown(true)} style={{fontWeight: "bold"}} className="account-details-dropdown dropdown-toggle me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Account</p> </button>
// {
//   dropdown &&
//     <div className="account-details-dropdown-list-black">
//       <ul class="account-details-dropdown-list" type="none">
//       <div style={{width: "100%", display: "flex", justifyContent: "right", paddingRight: "20px"}}> <span style={{cursor: "pointer", fontWeight: "500"}} onClick={()=> setDropdown(false)}>X</span> </div>
//         <li>
//           <Link to="/identification" className="me-1 nav-link d-flex align-items-center">Create account</Link>
//         </li>
//         <li>
//           <Link to="/login" className="me-1 nav-link d-flex align-items-center">Login</Link>
//         </li>
//         {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
//       </ul>
//     </div>
// }
// </div>
//             {/* <Link to="/login"style={{fontWeight: "bold"}} className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link> */}
//             <Link to="/cart"style={{fontWeight: "bold"}} className="border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems} </Link>
//           </div>
//         </div>
    
       
//       </div>
//     </div>
//   </div>

//         </header>





//     </div>
// }
// export default Navbar












{/* <header className="navbar-component-container">
 
<div className="py-3 text-center border-bottom">
  <div className="container">
    <div className="d-flex align-items-center row gy-3">
    
      <div className="col-lg-2 col-sm-4 col-4">
        <Link to="/"className="float-start" style={{textDecoration: "none"}}>
          <Logo />
        </Link>
      </div>
      

      
      <div className="order-lg-last col-lg-5 col-sm-8 col-8">
        <div className="d-flex float-end">
          <Link to="/login" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link>
          <a href="#" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-heart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Wishlist</p> </a>
          <Link to="/cart" className="border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems} </Link>
        </div>
      </div>
  
     
    </div>
  </div>
</div>

      </header> */}