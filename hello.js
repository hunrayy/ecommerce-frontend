






















import "./cart.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useMemo } from "react";
import { CartContext } from "./CartContext";
import { CurrencyContext } from "../../components/all_context/CurrencyContext";
import CartTotal, { calculateTotal } from "./CartTotal";
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
  const [removeItemFromCartModal, setRemoveItemFromCartModal] = useState({
    show: false,
    eachItem: null
  })
  
  // const initializeCartProducts = async() => {
  //   // console.log(await cartProducts)
  //   // setAllCartItems({products: cartProducts.products})
  //   console.log(cartProducts)
  // }

  useEffect(() => {
    console.log(cartProducts)
    // const storedItems = JSON.parse(localStorage.getItem("cart_items")) || [];
    // const storedItems = cartProducts.then((feedback)=> {
    // setAllCartItems({ products: feedback.products });

    // });
    // console.log(cartProducts)

    setAllCartItems({ products: cartProducts.products });
    // initializeCartProducts()
  }, [cartProducts.products]);
  useEffect(() => {
    if (use_auth.user.is_user_logged && use_auth.user.user.is_an_admin && use_auth.user.user.user === "admin") {
        navigate(`/beautybykiara/admin/dashboard/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqb2huc21pdGhAZ21haWwuY29tIjoiam9obnNtaXRoQGdtYWlsLmNvbSIsImpvaG4iOiJqb2hu`);
        setIsLoading(false)
    } else {
        setIsLoading(false); // Allow page to render for non-admin users
    }
  }, [use_auth.user, navigate]);
  // const handleRemoveFromCart = (product) => {
  //   addToCart(product);
  // };

  const updateItemQuantity = (each_item, quantity) => {
    const updatedProducts = allCartItems.products.map((item) => item.id === each_item.id ? { ...item, quantity: item.quantity + quantity } : item);
    setAllCartItems({ products: updatedProducts });
    localStorage.setItem("cart_items", JSON.stringify(updatedProducts));
  };

  // const showRemoveFromCartModal = (each_item) => {
  //   setRemoveItemFromCartModal({show: true, eachItem: each_item})
  // }

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
      {/* remove item from cart waring modal start */}
      {removeItemFromCartModal.show && removeItemFromCartModal.eachItem &&
        <div className="remove-item-from-cart-overlay" onClick={()=> setRemoveItemFromCartModal({show: false, eachItem: null})}>
          <div className="remove-item-from-cart-wrapper" onClick={(e) => e.stopPropagation()}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h5>Remove From Cart</h5> <span onClick={()=> setRemoveItemFromCartModal(false)} style={{cursor: "pointer"}}><i className="fa-solid fa-xmark"></i></span>
            </div>
            <p>Do you really want to remove this item from cart?</p>
            <div style={{display: "flex", gap: "20px"}}>
              <button onClick={()=> setRemoveItemFromCartModal({show: false, eachItem: null})} className="btn" style={{border: "1px solid purple", width: "100%", padding: "10px"}}>Cancel</button>
              <button onClick={()=> {addToCart(removeItemFromCartModal.eachItem), setRemoveItemFromCartModal({show: false, eachItem: null})}} className="btn" style={{background: "purple", color: "white", width: "100%", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center"}}>
                <i className="fa-solid fa-trash"></i>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      }
      {/* remove item from cart waring modal end */}

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
        {/* {cartProducts?.products?.length == 0 && <EmptyCart />} */}
        {/* {cartProducts.products?.length < 1 && <EmptyCart />} */}
        {cartProducts.cartEmpty || cartProducts.products.length < 1 && <EmptyCart />}


      <section className="my-5" style={cartProducts?.products?.length == 0 ? {display: "none"} : null}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your shopping cart</h4>
                  {cartProducts.products?.slice().reverse().map((each_item) => {
                    console.log(each_item)
                    let convertedPrice = convertCurrency(each_item.productPriceInNaira, 'NGN', selectedCurrency);
                    convertedPrice = Number(convertedPrice);
                    const generateCacheBustString = () => `?cb=${new Date().getTime()}`; // Generates a unique cache-busting string
                    return (
                      <div key={each_item.id}>
                      <div className="cart-products-wrapper mb-3">
                        <div className="col-lg-5">
                          <div className="d-flex">
                            <img src={each_item.productImage} className="border rounded me-3" style={{ width: "100px", height: "130px", cursor: "pointer" }} onClick={()=> navigate(`/product/${each_item.id}`, {replace: true})} />
                            <div>
                              <a href="#" className="nav-link">{each_item.productName}</a>
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
                        {/* <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}> */}
                        {/* <div style={{display: "flex"}}> */}
                          <div className="cart-text-wrapper">
                            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                              <button className="cart-increase-decrease-btn" onClick={() => decreaseButton(each_item)}><i className="fa-solid fa-minus"></i></button>
                              <span>{each_item.quantity}</span>
                              <button className="cart-increase-decrease-btn" onClick={() => increaseButton(each_item)}><i className="fa-solid fa-plus"></i></button>
                            </div>
                            <div className="">
                              <span className="h6 pl-4 pr-2">{currencySymbol}</span>
                              <span className="h6">{convertedPrice.toLocaleString()}</span>
                            </div>
                            <button className="btn btn-light border text-danger" onClick={() => setRemoveItemFromCartModal({show: true, eachItem: each_item})}> Remove <i className="fa-solid fa-trash"></i></button>
                        {/* <div style={{}}>
                        </div> */}
                          {/* </div> */}
                        {/* </div> */}
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
