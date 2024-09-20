import "./cart.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useMemo } from "react";
import { CartContext } from "./CartContext";
import { CurrencyContext } from "../../components/all_context/CurrencyContext";
import CartTotal from "./CartTotal";
import EmptyCart from '../../components/emptyCart/EmptyCart';
import { useAuth } from "../../components/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const use_auth = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);
  const { cartProducts, addToCart, updateCartItemQuantity } = useContext(CartContext);
  const [allCartItems, setAllCartItems] = useState({ products: [] });
  

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart_items")) || [];
    setAllCartItems({ products: storedItems });
  }, [cartProducts.products]);
  useEffect(() => {
    if (use_auth.user.is_user_logged && use_auth.user.user.is_an_admin && use_auth.user.user.user === "admin") {
        navigate(`/admin/dashboard/${use_auth.user.user.token}`);
        setIsLoading(false)
    } else {
        setIsLoading(false); // Allow page to render for non-admin users
    }
  }, [use_auth.user, navigate]);
  const handleRemoveFromCart = (product) => {
    addToCart(product);
  };

  const updateItemQuantity = (each_item, quantity) => {
    const updatedProducts = allCartItems.products.map((item) => item.id === each_item.id ? { ...item, quantity: item.quantity + quantity } : item);
    setAllCartItems({ products: updatedProducts });
    localStorage.setItem("cart_items", JSON.stringify(updatedProducts));
  };

  const increaseButton = (each_item) => updateCartItemQuantity(each_item.id, each_item.quantity + 1);
  const decreaseButton = (each_item) => {
    if (each_item.quantity > 1) {
      updateCartItemQuantity(each_item.id, each_item.quantity - 1);
    }
  };

  const currencySymbol = currencySymbols[selectedCurrency];
  if (isLoading) {
    return null; // Optionally, you can return a loader here
  }else{ return <div className="cart-page-container">
      <Navbar />
      <div className="breadcrumb-container">
        <div className="container py-4">
          <nav className="d-flex">
            <h6 className="mb-0">
              <Link to="/" className="text-white-50">Home</Link>
              <span className="text-white-50 mx-2"> | </span>
              <Link className="text-white"><u>Shopping cart</u></Link>
            </h6>
          </nav>
        </div>
      </div>
        {cartProducts.products.length == 0 && <EmptyCart />}

      <section className="my-5" style={cartProducts.products.length == 0 ? {display: "none"} : null}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your shopping cart</h4>
                  {allCartItems.products.slice().reverse().map((each_item) => {
                    console.log(each_item)
                    let convertedPrice = convertCurrency(each_item.price, 'NGN', selectedCurrency);
                    convertedPrice = Number(convertedPrice);
                    return (
                      <div key={each_item.id}>
                      <div className="cart-products-wrapper mb-3">
                        <div className="col-lg-5">
                          <div className="d-flex">
                            <img src={each_item.img} className="border rounded me-3" style={{ width: "100px", height: "130px" }} />
                            <div>
                              <a href="#" className="nav-link">{each_item.name}</a>
                              <p className="text-muted ">{each_item.description}</p>
                              {/* <p> */}
                                <small><b>Length:</b> &nbsp;
                                {each_item.lengthPicked}
                                </small>

                              {/* </p> */}
                            </div>
                          </div>
                        </div>
                        {/* col-lg-4 d-flex flex-row flex-lg-column text-nowrap */}
                        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        <div style={{display: "flex"}}>
                          <div className="cart-text-wrapper" >
                            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                              <button className="cart-increase-decrease-btn" onClick={() => decreaseButton(each_item)}><i className="fa-solid fa-minus"></i></button>
                              <span>{each_item.quantity}</span>
                              <button className="cart-increase-decrease-btn" onClick={() => increaseButton(each_item)}><i className="fa-solid fa-plus"></i></button>
                            </div>
                            <div className="">
                              <span className="h6 pl-4 pr-2">{currencySymbol}</span>
                              <span className="h6">{convertedPrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{}}>
                          <button className="btn btn-light border text-danger" onClick={() => handleRemoveFromCart(each_item)}> Remove <i className="fa-solid fa-trash"></i></button>
                        </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
                <div className="border-top pt-4 mx-4 mb-4">
                  <p><i className="fas fa-truck text-muted fa-lg"></i> Delivery charges apply based on your location</p>
                  <p className="text-muted">
                    Delivery charges will apply based on your location and the weight of your order. Please refer to our <Link to="/policies/delivery-policy">delivery policy</Link> for detailed information on shipping rates and estimated delivery times. We appreciate your understanding and thank you for shopping with us!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              {/* <div className="card mb-3 border shadow-0">
                <div className="card-body">
                  <form>
                    <label>Have coupon?</label>
                    <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
                      <input type="text" placeholder="Coupon code" style={{ width: "160px" }} className="form-control" />
                      <button className="btn" style={{ backgroundColor: "#f8f9fa", width: "70px" }} type="button">Apply</button>
                    </div>
                  </form>
                </div>
              </div> */}
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2">{<CartTotal />}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount:</p>
                    <p className="mb-2 text-success">$00.00</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">TAX:</p>
                    <p className="mb-2">$00.00</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2 fw-bold">{<CartTotal />}</p>
                  </div>
                  <div className="mt-3">
                    <button onClick={()=> {use_auth.user.is_user_logged == false ? navigate("/login", {replace: true}) : navigate("/products/checkout", {replace: true})}} className="btn w-100 shadow-0 mb-2" style={{ backgroundColor: "purple", color: "white" }}>{use_auth.user.is_user_logged == false ? "Login to check out" : "Proceed to checkout"}</button>
                    <Link to="/" className="btn btn-light w-100 border mt-2">Back to home</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  }
}

export default Cart;































// import "./cart.css"
// import Navbar from "../../components/navbar/Navbar"
// import Footer from "../../components/footer/Footer"
// import { Link } from "react-router-dom"
// import { useState, useEffect, useContext } from "react"
// import { CartContext } from "./CartContext"
// import { CurrencyContext } from "../../components/all_context/CurrencyContext";
// import CartTotal from "./CartTotal"
// import EmptyCart from '../../components/emptyCart/EmptyCart'


// const Cart = () => {
//   const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);
//     const { cartProducts, addToCart, updateCartItemQuantity } = useContext(CartContext);
//     const [isCartEmpty, setIsCartEmpty] = useState(null)
//     const [allCartItems, setAllCartItems] = useState({
//         products: [],
//     });

//     useEffect(() => {
//         const storedItems = JSON.parse(localStorage.getItem("cart_items"));
//         if (storedItems) {
//             setAllCartItems((prevState) => ({
//                 ...prevState,
//                 products: storedItems
//             }));
//         }

//         storedItems.length == 0 ? setIsCartEmpty(true) : setIsCartEmpty(false)
    
//     }, [cartProducts.products]); // Add cartProducts.products as a dependency to re-render when it changes
//     const handleRemoveFromCart = (product) => {
//         addToCart(product); // Use addToCart to remove the product
//         window.scrollTo(0, 0);
//     };
    
    

//     const updateItemQuantity = (each_item, quantity) => {
//         const updatedProducts = allCartItems.products.map((item) => {
//             if (item.id === each_item.id) {
//                 return { ...item, quantity: item.quantity + quantity };
//             }
//             return item;
//         });
//         const updatedCartItems = { ...allCartItems, products: updatedProducts };
//         setAllCartItems(updatedCartItems);
//         localStorage.setItem("cart_items", JSON.stringify(updatedCartItems.products));
//     };
//     const increaseButton = (each_item) => {
//         updateCartItemQuantity(each_item.id, each_item.quantity + 1);
//     };
//     const decreaseButton = (each_item) => {
//         if (each_item.quantity > 1) {
//             updateCartItemQuantity(each_item.id, each_item.quantity - 1);
//         }
//     };



//     const currencySymbol = currencySymbols[selectedCurrency];
//     if(isCartEmpty){
//         return (
//             <div className="cart-page-container">
//                 <Navbar />
//                 {/* bread crumbs */}
//                 <div className="" style={{marginTop: "var(--marginAboveTop)", backgroundColor: "black"}}>
//                     <div className="container py-4">
//                         <nav className="d-flex">
//                             <h6 className="mb-0">
//                                 <Link to="/" className="text-white-50">Home</Link>
//                                 <span className="text-white-50 mx-2"> | </span>
//                                 <Link className="text-white"><u>Shopping cart</u></Link>
//                             </h6>
//                         </nav>
//                     </div>
//                 </div>
//                 {/* bread crumbs */}
//                 <div>
//                     <EmptyCart />
//                 </div>
//                 <Footer />
//             </div>
//         )
//     }


//     return (
//         <div className="cart-page-container">
//             <Navbar />
//             {/* bread crumbs */}
//             <div className="" style={{marginTop: "var(--marginAboveTop)", backgroundColor: "black"}}>
//                 <div className="container py-4">
//                     <nav className="d-flex">
//                         <h6 className="mb-0">
//                             <Link to="/" className="text-white-50">Home</Link>
//                             <span className="text-white-50 mx-2"> | </span>
//                             <Link className="text-white"><u>Shopping cart</u></Link>
//                         </h6>
//                     </nav>
//                 </div>
//             </div>
//             {/* bread crumbs */}

//             <section className="my-5">
//                 <div className="container">
//                     <div className="row">
//                         {/* <!-- cart --> */}
//                         <div className="col-lg-9">
//                             <div className="card border shadow-0">
//                                 <div className="m-4">
//                                     <h4 className="card-title mb-4">Your shopping cart</h4>
//                                     {allCartItems.products.slice().reverse()?.map((each_item) => {
//                                         let convertedPrice = convertCurrency(each_item.price, 'NGN', selectedCurrency);
//                                         convertedPrice = Number(convertedPrice)
//                                         return <div key={each_item.id}>
//                                             <div className="row gy-3 mb-4" style={{display: "flex", justifyContent: "space-between"}}>
//                                                 <div className="col-lg-5">
//                                                     <div className="me-lg-5">
//                                                         <div className="d-flex">
//                                                             <img src={each_item.img} className="border rounded me-3" style={{width: "100px", height: "130px"}} />
//                                                             <div className="">
//                                                                 <a href="#" className="nav-link">{each_item.name}</a>
//                                                                 <p className="text-muted px-3">{each_item.description}</p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-lg-4 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
//                                                     <div className="d-flex align-items-center" style={{ gap: "10px" }}>
//                                                         <button className="cart-increase-decrease-btn" onClick={()=> decreaseButton(each_item)}><i className="fa-solid fa-minus"></i></button>
//                                                         <span>{each_item.quantity}</span>
//                                                         <button className="cart-increase-decrease-btn" onClick={()=> increaseButton(each_item)}><i className="fa-solid fa-plus"></i></button>
//                                                     </div>
//                                                     <div className="d-flex align-items-center col-lg-6">
//                                                         <span className="h6 pl-4 pr-2">{currencySymbol}</span>
//                                                         <span className="h6">{convertedPrice.toLocaleString()}</span>
//                                                     </div>
//                                                 </div>


//                                                 <div className="pr-2 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2 align-items-center">
//                                                     <div className="float-md-end">
//                                                         {/* <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></a> */}
//                                                         <button className="btn btn-light border text-danger icon-hover-danger" onClick={() => handleRemoveFromCart(each_item)}> Remove <i class="fa-solid fa-trash"></i></button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     })}
//                                 </div>

//                                 <div className="border-top pt-4 mx-4 mb-4">
//                                     <p><i className="fas fa-truck text-muted fa-lg"></i> Delivery charges apply based on your location</p>
//                                     <p className="text-muted">
//                                     Delivery charges will apply based on your location and the weight of your order. Please refer to our <Link to="/policies/delivery-policy">delivery policy</Link> for detailed information on shipping rates and estimated delivery times. We appreciate your understanding and thank you for shopping with us!
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <!-- cart --> */}
//                         {/* <!-- summary --> */}
//                         <div className="col-lg-3">
//                             <div className="card mb-3 border shadow-0">
//                                 <div className="card-body">
//                                     <form>
//                                         <div className="form-group" >
//                                             {/* <label className="form-label">Have coupon?</label>
//                                             <div className="input-group">
//                                                 <input type="text" className="form-control border" name="" placeholder="Coupon code" />
//                                                 <button className="btn btn-light border">Apply</button>
//                                             </div> */}
//                                             <label>Have coupon?</label>
//                                             <form style={{display: "flex", gap: "5px", marginTop: "10px"}}>
//                                                 <input type="text" placeholder="Coupon code" style={{width: "160px"}} className="form-control" />
//                                                 <button className="btn" style={{backgroundColor: "#f8f9fa", width:"70px"}} type="button">Apply</button>
//                                             </form>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                             <div className="card shadow-0 border">
//                                 <div className="card-body">
//                                     <div className="d-flex justify-content-between">
//                                         <p className="mb-2">Total price:</p>
//                                         <p className="mb-2">{<CartTotal />}</p>
//                                         {/* <p className="mb-2">{currencySymbol}{cartProducts.totalPrice}</p> */}
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <p className="mb-2">Discount:</p>
//                                         <p className="mb-2 text-success">$00.00</p>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <p className="mb-2">TAX:</p>
//                                         <p className="mb-2">$00.00</p>
//                                     </div>
//                                     <hr />
//                                     <div className="d-flex justify-content-between">
//                                         <p className="mb-2">Total price:</p>
//                                         <p className="mb-2 fw-bold">{<CartTotal />}</p>
//                                     </div>

//                                     <div className="mt-3">
//                                         <div className="btn w-100 shadow-0 mb-2" style={{backgroundColor: "purple", color: "white"}}> Proced to checkout </div>
//                                         <Link to="/" className="btn btn-light w-100 border mt-2"> Back to home </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <!-- summary --> */}
//                     </div>
//                 </div>
//             </section>

//             <Footer />
//         </div>
//     );
// }

// export default Cart;
























// import "./cart.css"
// import Navbar from "../../components/navbar/Navbar"
// import Footer from "../../components/footer/Footer"
// import { useState, useEffect, useContext } from "react"
// import { CartContext } from "./CartContext"
// const Cart = () => {
//     const { addToCart } = useContext(CartContext)
//     const [allCartItems, setAllCartItems] = useState({
//         products: [],
//         totalPrice: 0
//     })


    
//     // const calculateTotalPrice = (products) => {
//     //     return products.reduce((acc, item) => acc + parseFloat(item.price), 0);
//     // };

//     // const removeFromCart = (product) => {
//     //     const updatedProducts = allCartItems.products.filter(item => item.id !== product.id);
//     //     const newTotalPrice = calculateTotalPrice(updatedProducts);
    
//     //     // Store updated list to localStorage
//     //     localStorage.setItem("cart_items", JSON.stringify(updatedProducts));
        
//     //     // Update state with the new list of products and total price
//     //     setAllCartItems((prevState) => ({
//     //         ...prevState,
//     //         products: updatedProducts,
//     //         totalPrice: newTotalPrice
//     //     }));
//     // };
    
//     useEffect(()=> {
//         //retrieve items from localStorage on page load
//         const storedItems = JSON.parse(localStorage.getItem("cart_items"))
//         if(storedItems){
//             //there are items in the storage
//             // const initialTotalPrice = calculateTotalPrice(storedItems);
//             setAllCartItems((prevState) => ({
//                 ...prevState,
//                 products: storedItems,
//                 totalPrice: 0
//             }))

            

            
            
//         }else{
//             //there is no item in the storage
//         }
//     }, [])
//     const totalItems = allCartItems.products?.length || 0;

//     return <div className="cart-page-container">
//         <Navbar />
//         {/* bread crumbs */}
//         <div className="" style={{marginTop: "var(--marginAboveTop)", backgroundColor: "black"}}>
//             <div className="container py-4">
            
//                 <nav className="d-flex">
//                     <h6 className="mb-0">
//                     <a href="" className="text-white-50">Home</a>
//                     <span className="text-white-50 mx-2"> | </span>
//                     <a href="" className="text-white"><u>Shopping cart</u></a>
//                     </h6>
//                 </nav>

//             </div>
//         </div>
//         {/* bread crumbs */}

//         <section className="my-5">
//             <div className="container">
//                 <div className="row">
//                 {/* <!-- cart --> */}
//                 <div className="col-lg-9">
//                     <div className="card border shadow-0">
//                     <div className="m-4">
//                         <h4 className="card-title mb-4">Your shopping cart</h4>
//                         {allCartItems.products?.map((each_item) => {
                            
//                             return <div>
//                             <div className="row gy-3 mb-4">
//                                 <div className="col-lg-5">
//                                     <div className="me-lg-5">
//                                     <div className="d-flex">
//                                         <img src={each_item.img} className="border rounded me-3" style={{width: "100px", height: "130px"}} />
//                                         <div className="">
//                                         <a href="#" className="nav-link">{each_item.name}</a>
//                                         <p className="text-muted px-3">{each_item.description}</p>
//                                         </div>
//                                     </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
//                                     <div className="">
//                                     <select style={{width: "100px"}} className="form-select me-4">
//                                         <option>1</option>
//                                         <option>2</option>
//                                         <option>3</option>
//                                         <option>4</option>
//                                     </select>
//                                     </div>
//                                     <div className="">
//                                     <span className="h6 px-3">{each_item.price}</span> <br />
//                                     {/* <small className="text-muted text-nowrap"> $460.00 / per item </small> */}
//                                     </div>
//                                 </div>
//                                 <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
//                                     <div className="float-md-end">
//                                     <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></a>
//                                     <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={()=>addToCart(each_item)}> Remove</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         })}
//                     </div>

//                     <div className="border-top pt-4 mx-4 mb-4">
//                         <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
//                         <p className="text-muted">
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//                         aliquip
//                         </p>
//                     </div>
//                     </div>
//                 </div>
//                 {/* <!-- cart --> */}
//                 {/* <!-- summary --> */}
//                 <div className="col-lg-3">
//                     <div className="card mb-3 border shadow-0">
//                     <div className="card-body">
//                         <form>
//                         <div className="form-group">
//                             <label className="form-label">Have coupon?</label>
//                             <div className="input-group">
//                             <input type="text" className="form-control border" name="" placeholder="Coupon code" />
//                             <button className="btn btn-light border">Apply</button>
//                             </div>
//                         </div>
//                         </form>
//                     </div>
//                     </div>
//                     <div className="card shadow-0 border">
//                     <div className="card-body">
//                         <div className="d-flex justify-content-between">
//                         <p className="mb-2">Total price:</p>
//                         <p className="mb-2">${allCartItems.totalPrice}</p>
//                         </div>
//                         <div className="d-flex justify-content-between">
//                         <p className="mb-2">Discount:</p>
//                         <p className="mb-2 text-success">$00.00</p>
//                         {/* <p className="mb-2 text-success">-$60.00</p> */}
//                         </div>
//                         <div className="d-flex justify-content-between">
//                         <p className="mb-2">TAX:</p>
//                         <p className="mb-2">$00.00</p>
//                         {/* <p className="mb-2">$14.00</p> */}
//                         </div>
//                         <hr />
//                         <div className="d-flex justify-content-between">
//                         <p className="mb-2">Total price:</p>
//                         <p className="mb-2 fw-bold">${allCartItems.totalPrice}</p>
//                         </div>

//                         <div className="mt-3">
//                         <a href="#" className="btn w-100 shadow-0 mb-2" style={{backgroundColor: "purple", color: "white"}}> Clear Cart </a>
//                         <a href="#" className="btn btn-light w-100 border mt-2"> Back to shop </a>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//                 {/* <!-- summary --> */}
//                 </div>
//             </div>
//         </section>

//         <Footer />



//     </div>
// }
// export default Cart