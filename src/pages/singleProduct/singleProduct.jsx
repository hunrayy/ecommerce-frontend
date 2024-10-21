// SingleProduct.js

import productStore from "../../components/products/products.json";
import { json, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PageNotFound from "../pageNotFound/PageNotFound";
import "./singleProduct.css";
import { CurrencyContext } from "../../components/all_context/CurrencyContext";
import { CartContext } from "../cart/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const SingleProduct = () => {
  const navigate = useNavigate()
  const { cartProducts, addToCart, updateCartItemLength } = useContext(CartContext);
  const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);
  let { productId } = useParams();
  // console.log(productId);

  const [product, setProduct] = useState({
    id: "",
    img: "",
    subImage1: "",
    subImage2: "",
    subImage3: "",
    name: "",
    description: "",
    price: 0,
    pageNotFound: false
  });
  const [loading, setLoading] = useState(true)

  const [selectedImage, setSelectedImage] = useState(""); // State for the enlarged image

  const [lengthState, setLengthState] = useState({
    length: null,
    lengthPicked: ""
  });

  const lengthsOfHair = [
    `12", 12", 12"`,
    `14", 14", 14"`,
    `16", 16", 16"`,
    `18", 18", 18"`,
    `20", 20", 20"`,
    `22", 22", 22"`,
    `24", 24", 24"`,
    `26", 26", 26"`,
    `28", 28", 28"`,
  ];
  useEffect(() => {
    setLoading(true)
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-single-product?productId=${productId}`).then((feedback) => {
      console.log(feedback)
      if(feedback.data.code == "success"){
        setLoading(false)
        // Check if the data is a string and parse it if needed
        const productData = typeof feedback.data.data === "string" ? JSON.parse(feedback.data.data) : feedback.data.data;
        setProduct({
          id: feedback.data.data.id,
          img: feedback.data.data.productImage,
          subImage1: feedback.data.data.subImage1 !== "null" && feedback.data.data.subImage1,
          subImage2: feedback.data.data.subImage2 !== "null" && feedback.data.data.subImage2,
          subImage3: feedback.data.data.subImage3 !== "null" && feedback.data.data.subImage3,
          name: feedback.data.data.productName,
          price: feedback.data.data.productPriceInNaira,
        });
  
  
  
      
        // setProduct((prevState) => ({
        //   ...prevState,
        //   pageNotFound: true
        // }));

      }else{
        navigate("/page-not-found", {replace: "true"})
      }

    })
  // }, [cartProducts.products]);
}, []);


  const handleAddToCart = () => {
    addToCart(product, lengthState.lengthPicked);
  };

  const handleLengthChange = (length) => {
    setLengthState(prevState => ({ ...prevState, lengthPicked: length }));
    updateCartItemLength(product.id, length); // Update length in cart
  };

  const handleImageClick = (img) => {
    setSelectedImage(img); // Update the enlarged image on click
  };

  const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
  // const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
  const inCart = cartItems.some(item => item.id == product.id);


    // Convert price based on selected currency
    // const convertedPrice = convertCurrency(product.price, selectedCurrency);
    const currencySymbol = currencySymbols[selectedCurrency] || '';
    const productImages = [
      product.img,
      ...(product.subImage1 ? [product.subImage1] : []),
      ...(product.subImage2 ? [product.subImage2] : []),
      ...(product.subImage3 ? [product.subImage3] : [])
    ];

    const convertedPrice = convertCurrency(product.price, 'NGN', selectedCurrency);
    
    // const cartItem = JSON.parse(localStorage.getItem('cart_items')).find((item) => item.id == product.id);
    // console.log(cartItem)
    
    useEffect(() => {
      const cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];
      const cartItem = cartItems.find((item) => item.id == product.id);
    
      // Log to see the cartItem from localStorage
      console.log('Cart item from localStorage:', cartItem);
    
      if (cartItem && cartItem.lengthPicked) {
        console.log('Length picked from cart:', cartItem.lengthPicked);
        
        // Ensure that the picked length exists in the available lengths of hair
        if (!lengthsOfHair.includes(cartItem.lengthPicked)) {
          setLengthState({
            length: lengthsOfHair,
            lengthPicked: lengthsOfHair[0], // Fallback to the first item
          });
        } else {
          // Set the state with the length picked from the cart
          setLengthState({
            length: lengthsOfHair,
            lengthPicked: cartItem.lengthPicked,
          });
        }
      } else {
        // If no cart item or length picked, fallback to the default first item
        setLengthState({
          length: lengthsOfHair,
          lengthPicked: lengthsOfHair[0],
        });
      }
    }, [product.id]);  // Ensure this runs on product change
    

  if(loading){
    return null
  }

  return (
    <div>
      {product.pageNotFound ? (
        <PageNotFound />
      ) : (
        <div>
          <Navbar />
          <section className="py-5" style={{ backgroundColor: "var(--bodyColor)", marginTop: "var(--marginAboveTop)" }}>
            {/* {cartProducts.productAddedToCartAnimation && (
              <div style={{ width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "2" }}>
                {cartProducts.addToCartAnimationMessage} 
              </div>
            )}
            {cartProducts.lengthUpdateMessage && (
              <div style={{ width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "2" }}>
                {cartProducts.lengthUpdateMessage}
              </div>
            )} */}
            <div className="container placeholder-glow">
              <div className="row gx-">
                <aside className="col-lg-6">
                  
                    <div className="single-product-image-scroll-container">
                      {productImages.map((image, index) => (
                          <img
                              key={index}
                              src={image}
                              alt={`Product Image ${index + 1}`}
                              className="single-product-scrollable-image"
                          />
                      ))}
                    </div>
                  
                 
                </aside>
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title" style={{ fontSize: "30px", color: "black" }}>{product.name}</h4>
                    

                    
                      <div className="d-flex flex-row my-3">
                        <div className="text-warning mb-1 me-2">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <span className="text-success ms-2 ml-3">In stock</span>
                      </div>
                    



                    <div className="mb-3 d-flex">
                      <div className="h5" style={{display: "flex", gap: "5px"}}>
                        <span>{currencySymbol}</span>
                        {/* <span>{convertCurrency(product.price, 'NGN', selectedCurrency)}</span> */}
                        <span><b>{convertedPrice.toLocaleString()}</b></span>

                      </div>
                      <span className="text-muted">/per item</span>
                    </div>
                    {!loading && <div className="text-muted">LENGTH {lengthState.lengthPicked}</div> }
                    <div className="row mt-2">
                     
                        <div className="lengths-container">
                          {lengthState.length?.map((length, index) => (
                            <div key={index} className="">
                              <button
                                className="length-button "
                                style={lengthState.lengthPicked === length ? { backgroundColor: "black", color: "white" } : null}
                                onClick={() => handleLengthChange(length)}
                              >
                                {length}
                              </button>
                            </div>
                          ))}
                        </div>
                      
                    </div>
                    <hr />
                   
                      {product.img && <div className="d-grid">
                        <button
                          className="btn hover-button"
                          // style={inCart || isRecentlyAdded ? { backgroundColor: "black"} : { border: "1px solid black", color: "black" }}
                          // style={inCart || isRecentlyAdded ? { backgroundColor: "black"} : { border: "1px solid black", color: "black" }}
                          style={inCart ? {background: "black", color: "white"} : null}
                          onClick={handleAddToCart}
                        >
                          {inCart ? "Added to cart" : <span>Add to cart <i className="fas fa-shopping-cart m-1 me-md-2"></i></span>}
                        </button>
                      </div>}
                    
                  </div>
                </main>
              </div>
            </div>
          </section>

               <section className="border-top py-4" style={{backgroundColor: "var(--bodyColor)"}}>
       <div className="container">
         <div className="row gx-3 contain">
           <div className="col-lg-12 mb-4 ">
             <div className="border rounded-2 px-4 py-5 p-md-5 bg-white" style={{color: "black"}}>
               <p>FREQUENTLY ASKED QUESTIONS</p>
               <h1>FAQ</h1>
               <p>  
                 <b><i className="fa-solid fa-truck-fast mr-2">&nbsp;&nbsp;</i>Shipping & processing information</b>
               </p>
               <div className="text-muted">
                 <p>It takes us an average of 3-5 working days to process orders allow a few more for custom orders.</p>
                 {/* <p>Please allow another 1-2 working days for shipping on all orders within the uk.</p> */}
                 <p>Shipping times varies from 5-10 working days for international orders.</p>
               </div>
               <p>
                 <b>Returns, cancellations and refunds</b>
               </p>
               <div className="text-muted">
                 <p>Due to the nature of our products we do not offer casual refunds though you would be entitled to a refund/return in cases where you receive the wrong item or a defective product etc </p>
                 <p>You can cancel your order if you change your mind without any reasons necessary until it starts getting processed (on hold) this is usually under 24 hours.</p>
                 <Link to="/policies/refund-policy" style={{color: "purple"}}>View our full refund policy</Link>
               </div>
             </div>
           </div>
           
        </div>
      </div>
    </section>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default SingleProduct;





































































// // SingleProduct.js

// import productStore from "../../components/products/products.json";
// import { json, useParams } from "react-router-dom";
// import { useState, useEffect, useContext } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";
// import PageNotFound from "../pageNotFound/PageNotFound";
// import "./singleProduct.css";
// import { CurrencyContext } from "../../components/all_context/CurrencyContext";
// import { CartContext } from "../cart/CartContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


// const SingleProduct = () => {
//   const navigate = useNavigate()
//   const { cartProducts, addToCart, updateCartItemLength } = useContext(CartContext);
//   const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);
//   let { productId } = useParams();
//   // console.log(productId);

//   const [product, setProduct] = useState({
//     id: "",
//     img: "",
//     subImage1: "",
//     subImage2: "",
//     subImage3: "",
//     name: "",
//     description: "",
//     price: 0,
//     pageNotFound: false
//   });
//   const [loading, setLoading] = useState(false)

//   const [selectedImage, setSelectedImage] = useState(""); // State for the enlarged image

//   const [lengthState, setLengthState] = useState({
//     length: null,
//     lengthPicked: ""
//   });

//   const lengthsOfHair = [
//     `12", 12", 12"`,
//     `14", 14", 14"`,
//     `16", 16", 16"`,
//     `18", 18", 18"`,
//     `20", 20", 20"`,
//     `22", 22", 22"`,
//     `24", 24", 24"`,
//     `26", 26", 26"`,
//     `28", 28", 28"`,
//   ];
//   useEffect(() => {
//     setLoading(true)
//     axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-single-product?productId=${productId}`).then((feedback) => {
//       console.log(feedback)
//       if(feedback.data.code == "success"){
//         setLoading(false)
//         setProduct({
//           id: feedback.data.data.id,
//           img: feedback.data.data.productImage,
//           subImage1: feedback.data.data.subImage1 !== "null" && feedback.data.data.subImage1,
//           subImage2: feedback.data.data.subImage2 !== "null" && feedback.data.data.subImage2,
//           subImage3: feedback.data.data.subImage3 !== "null" && feedback.data.data.subImage3,
//           name: feedback.data.data.productName,
//           price: feedback.data.data.productPriceInNaira,
//         });
  
//         setSelectedImage(feedback.data.data.productImage); // Set the initially selected image
  
  
//         // Check if product is already in cart
//         // const cartItem = cartProducts.products.find((item) => item.id == product.id);
//         const cartItem = cartProducts?.products?.find((item) => item.id == product.id);
//         // console.log(cartItem?.lengthPicked)
//         if (cartItem && cartItem?.lengthPicked) {
//           // console.log(cartItem.lengthPicked)
//           setLengthState({
//             length: lengthsOfHair,
//             lengthPicked: cartItem?.lengthPicked
//           });
//         } else {
//           setLengthState({
//             length: lengthsOfHair,
//             lengthPicked: lengthsOfHair[0]
//           });
//         }
//         // setProduct((prevState) => ({
//         //   ...prevState,
//         //   pageNotFound: true
//         // }));

//       }else{
//         navigate("/page-not-found", {replace: "true"})
//       }

//     })
//   }, [cartProducts.products]);

//   const handleAddToCart = () => {
//     addToCart(product, lengthState.lengthPicked);
//   };

//   const handleLengthChange = (length) => {
//     setLengthState(prevState => ({ ...prevState, lengthPicked: length }));
//     updateCartItemLength(product.id, length); // Update length in cart
//   };

//   const handleImageClick = (img) => {
//     setSelectedImage(img); // Update the enlarged image on click
//   };

//   const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
//   const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
//   const inCart = cartItems.some(item => item.id === product.id);


//     // Convert price based on selected currency
//     // const convertedPrice = convertCurrency(product.price, selectedCurrency);
//     const currencySymbol = currencySymbols[selectedCurrency] || '';
//     const productImages = [
//       product.img,
//       ...(product.subImage1 ? [product.subImage1] : []),
//       ...(product.subImage2 ? [product.subImage2] : []),
//       ...(product.subImage3 ? [product.subImage3] : [])
//     ];

//     const convertedPrice = convertCurrency(product.price, 'NGN', selectedCurrency);

    
  

//   return (
//     <div>
//       {product.pageNotFound ? (
//         <PageNotFound />
//       ) : (
//         <div>
//           <Navbar />
//           <section className="py-5" style={{ backgroundColor: "var(--bodyColor)", marginTop: "var(--marginAboveTop)" }}>
//             {/* {cartProducts.productAddedToCartAnimation && (
//               <div style={{ width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "2" }}>
//                 {cartProducts.addToCartAnimationMessage} 
//               </div>
//             )}
//             {cartProducts.lengthUpdateMessage && (
//               <div style={{ width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "2" }}>
//                 {cartProducts.lengthUpdateMessage}
//               </div>
//             )} */}
//             <div className="container placeholder-glow">
//               <div className="row gx-">
//                 <aside className="col-lg-6">
                  
//                     <div className="single-product-image-scroll-container">
//                       {productImages.map((image, index) => (
//                           <img
//                               key={index}
//                               src={image}
//                               alt={`Product Image ${index + 1}`}
//                               className="single-product-scrollable-image"
//                           />
//                       ))}
//                     </div>
                  
                 
//                 </aside>
//                 <main className="col-lg-6">
//                   <div className="ps-lg-3">
//                     <h4 className="title" style={{ fontSize: "30px", color: "black" }}>{product.name}</h4>
                    

                    
//                       <div className="d-flex flex-row my-3">
//                         <div className="text-warning mb-1 me-2">
//                           <i className="fa fa-star"></i>
//                           <i className="fa fa-star"></i>
//                           <i className="fa fa-star"></i>
//                           <i className="fa fa-star"></i>
//                           <i className="fa fa-star"></i>
//                         </div>
//                         <span className="text-success ms-2 ml-3">In stock</span>
//                       </div>
                    



//                     <div className="mb-3 d-flex">
//                       <div className="h5" style={{display: "flex", gap: "5px"}}>
//                         <span>{currencySymbol}</span>
//                         {/* <span>{convertCurrency(product.price, 'NGN', selectedCurrency)}</span> */}
//                         <span><b>{convertedPrice.toLocaleString()}</b></span>

//                       </div>
//                       <span className="text-muted">/per item</span>
//                     </div>
//                     {!loading && <div className="text-muted">LENGTH {lengthState.lengthPicked}</div> }
//                     <div className="row mt-2">
                     
//                         <div className="lengths-container">
//                           {lengthState.length?.map((length, index) => (
//                             <div key={index} className="">
//                               <button
//                                 className="length-button "
//                                 style={lengthState.lengthPicked === length ? { backgroundColor: "black", color: "white" } : null}
//                                 onClick={() => handleLengthChange(length)}
//                               >
//                                 {length}
//                               </button>
//                             </div>
//                           ))}
//                         </div>
                      
//                     </div>
//                     <hr />
                   
//                       <div className="d-grid">
//                         <button
//                           className="btn"
//                           style={inCart || isRecentlyAdded ? { backgroundColor: "black", color: "white" } : { border: "1px solid black", color: "black" }}
//                           onClick={handleAddToCart}
//                         >
//                           {inCart || isRecentlyAdded ? "Added to cart" : <span>Add to cart <i className="fas fa-shopping-cart m-1 me-md-2"></i></span>}
//                         </button>
//                       </div>
                    
//                   </div>
//                 </main>
//               </div>
//             </div>
//           </section>

//                <section class="border-top py-4" style={{backgroundColor: "var(--bodyColor)"}}>
//        <div class="container">
//          <div class="row gx-3 contain">
//            <div class="col-lg-12 mb-4 ">
//              <div class="border rounded-2 px-4 py-5 p-md-5 bg-white" style={{color: "black"}}>
//                <p>FREQUENTLY ASKED QUESTIONS</p>
//                <h1>FAQ</h1>
//                <p>
//                  <b><i class="fa-solid fa-truck-fast mr-2">&nbsp;&nbsp;</i>Shipping & processing information</b>
//                </p>
//                <div className="text-muted">
//                  <p>It takes us an average of 3-5 working days to process orders allow a few more for custom orders.</p>
//                  {/* <p>Please allow another 1-2 working days for shipping on all orders within the uk.</p> */}
//                  <p>Shipping times varies from 5-10 working days for international orders.</p>
//                </div>
//                <p>
//                  <b>Returns, cancellations and refunds</b>
//                </p>
//                <div className="text-muted">
//                  <p>Due to the nature of our products we do not offer casual refunds though you would be entitled to a refund/return in cases where you receive the wrong item or a defective product etc </p>
//                  <p>You can cancel your order if you change your mind without any reasons necessary until it starts getting processed (on hold) this is usually under 24 hours.</p>
//                  <Link to="/policies/refund-policy" style={{color: "purple"}}>View our full refund policy</Link>
//                </div>
//              </div>
//            </div>
           
//         </div>
//       </div>
//     </section>
//           <Footer />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleProduct;
















































// // SingleProduct.js

// import productStore from "../../components/products/products.json";
// import { useParams } from "react-router-dom";
// import { useState, useEffect, useContext } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";
// import PageNotFound from "../pageNotFound/PageNotFound";
// import "./singleProduct.css";
// import { CurrencyContext } from "../../components/all_context/CurrencyContext";
// import { CartContext } from "../cart/CartContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


// const SingleProduct = () => {
//   const navigate = useNavigate()
//   const { cartProducts, addToCart, updateCartItemLength } = useContext(CartContext);
//   const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);
//   let { productId } = useParams();
//   // console.log(productId);

//   const [product, setProduct] = useState({
//     id: "",
//     img: "",
//     subImage1: "",
//     subImage2: "",
//     subImage3: "",
//     name: "",
//     description: "",
//     price: 0,
//     pageNotFound: false
//   });
//   const [loading, setLoading] = useState(false)

//   const [selectedImage, setSelectedImage] = useState(""); // State for the enlarged image

//   const [lengthState, setLengthState] = useState({
//     length: null,
//     lengthPicked: ""
//   });

//   useEffect(() => {
//     setLoading(true)
//     axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-single-product?productId=${productId}`).then((feedback) => {
//       console.log(feedback)
//       if(feedback.data.code == "success"){
//         setLoading(false)
//         const lengthsOfHair = [
//           `12", 12", 12"`,
//           `14", 14", 14"`,
//           `16", 16", 16"`,
//           `18", 18", 18"`,
//           `20", 20", 20"`,
//           `22", 22", 22"`,
//           `24", 24", 24"`,
//           `26", 26", 26"`,
//           `28", 28", 28"`,
//         ];
//         setProduct({
//           id: feedback.data.data.id,
//           img: feedback.data.data.productImage,
//           subImage1: feedback.data.data.subImage1 !== "null" && feedback.data.data.subImage1,
//           subImage2: feedback.data.data.subImage2 !== "null" && feedback.data.data.subImage2,
//           subImage3: feedback.data.data.subImage3 !== "null" && feedback.data.data.subImage3,
//           name: feedback.data.data.productName,
//           price: feedback.data.data.productPriceInNaira,
//         });
  
//         setSelectedImage(feedback.data.data.productImage); // Set the initially selected image
  
  
//         // Check if product is already in cart
//         const cartItem = cartProducts.products.find((item) => item.id == product.id);
//         console.log(cartItem.lengthPicked)
//         if (cartItem && cartItem.lengthPicked) {
//           setLengthState({
//             length: lengthsOfHair,
//             lengthPicked: cartItem.lengthPicked || `12", 12", 12"`
//           });
//         } else {
//           setLengthState({
//             length: lengthsOfHair,
//             lengthPicked: lengthsOfHair[0]
//           });
//         }
//         // setProduct((prevState) => ({
//         //   ...prevState,
//         //   pageNotFound: true
//         // }));

//       }else{
//         navigate("/page-not-found", {replace: "true"})
//       }

//     })
//   }, [cartProducts.products]);

//   const handleAddToCart = () => {
//     addToCart(product, lengthState.lengthPicked);
//   };

//   const handleLengthChange = (length) => {
//     setLengthState(prevState => ({ ...prevState, lengthPicked: length }));
//     updateCartItemLength(product.id, length); // Update length in cart
//   };

//   const handleImageClick = (img) => {
//     setSelectedImage(img); // Update the enlarged image on click
//   };

//   const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
//   const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
//   const inCart = cartItems.some(item => item.id === product.id);


//     // Convert price based on selected currency
//     // const convertedPrice = convertCurrency(product.price, selectedCurrency);
//     const currencySymbol = currencySymbols[selectedCurrency] || '';
//     const productImages = [
//       product.img,
//       ...(product.subImage1 ? [product.subImage1] : []),
//       ...(product.subImage2 ? [product.subImage2] : []),
//       ...(product.subImage3 ? [product.subImage3] : [])
//     ];

//     const convertedPrice = convertCurrency(product.price, 'NGN', selectedCurrency);

    
  

//   return (
//     <div>
//       {product.pageNotFound ? (
//         <PageNotFound />
//       ) : (
//         <div>
//           <Navbar />
//           <section className="py-5" style={{ backgroundColor: "var(--bodyColor)", marginTop: "var(--marginAboveTop)" }}>
//             {/* {cartProducts.productAddedToCartAnimation && (
//               <div style={{ width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "2" }}>
//                 {cartProducts.addToCartAnimationMessage} 
//               </div>
//             )}
//             {cartProducts.lengthUpdateMessage && (
//               <div style={{ width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "2" }}>
//                 {cartProducts.lengthUpdateMessage}
//               </div>
//             )} */}
//             <div className="container placeholder-glow">
//               <div className="row gx-">
//                 <aside className="col-lg-6">
//                   {loading ? <div className="placeholder" style={{height: "400px", width: "100%"}}></div>
//                   :
//                     <div className="single-product-image-scroll-container">
//                       {productImages.map((image, index) => (
//                           <img
//                               key={index}
//                               src={image}
//                               alt={`Product Image ${index + 1}`}
//                               className="single-product-scrollable-image"
//                           />
//                       ))}
//                     </div>
//                   }
                 
//                 </aside>
//                 <main className="col-lg-6">
//                   <div className="ps-lg-3">
//                     {
//                       loading ? <h4 className="title placeholder" style={{ width: "100%", height: "30px"}}></h4>
//                       : <h4 className="title" style={{ fontSize: "30px", color: "black" }}>{product.name}</h4>
//                     }

//                     {
//                       loading ? <div className="my-3 placeholder" style={{width: "50%", height: "30px"}}></div> 
//                       :
//                       <div className="d-flex flex-row my-3">
//                         <div className="text-warning mb-1 me-2">
//                           <i className="fa fa-star"></i>
//                           <i className="fa fa-star"></i>
//                           <i className="fa fa-star"></i>
//                           <i className="fa fa-star"></i>
//                           <i className="fa fa-star"></i>
//                         </div>
//                         <span className="text-success ms-2 ml-3">In stock</span>
//                       </div>
//                     }



//                     <div className="mb-3 d-flex">
//                       <div className="h5" style={{display: "flex", gap: "5px"}}>
//                         <span>{currencySymbol}</span>
//                         {/* <span>{convertCurrency(product.price, 'NGN', selectedCurrency)}</span> */}
//                         <span><b>{convertedPrice.toLocaleString()}</b></span>

//                       </div>
//                       <span className="text-muted">/per item</span>
//                     </div>
//                     {!loading && <div className="text-muted">LENGTH {lengthState.lengthPicked}</div> }
//                     <div className="row mt-2">
//                       {
//                         loading ? <div className="lengths-container placeholder" style={{height: "100px"}}></div>
//                         :
//                         <div className="lengths-container">
//                           {lengthState.length?.map((length, index) => (
//                             <div key={index} className="">
//                               <button
//                                 className="length-button "
//                                 style={lengthState.lengthPicked === length ? { backgroundColor: "black", color: "white" } : null}
//                                 onClick={() => handleLengthChange(length)}
//                               >
//                                 {length}
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       }
//                     </div>
//                     <hr />
//                     {
//                       loading ? <div className="placeholder" style={{height: "50px", width: "100%"}}></div>
//                       :
//                       <div className="d-grid">
//                         <button
//                           className="btn"
//                           style={inCart || isRecentlyAdded ? { backgroundColor: "black", color: "white" } : { border: "1px solid black", color: "black" }}
//                           onClick={handleAddToCart}
//                         >
//                           {inCart || isRecentlyAdded ? "Added to cart" : <span>Add to cart <i className="fas fa-shopping-cart m-1 me-md-2"></i></span>}
//                         </button>
//                       </div>
//                     }
//                   </div>
//                 </main>
//               </div>
//             </div>
//           </section>

//                <section class="border-top py-4" style={{backgroundColor: "var(--bodyColor)"}}>
//        <div class="container">
//          <div class="row gx-3 contain">
//            <div class="col-lg-12 mb-4 ">
//              <div class="border rounded-2 px-4 py-5 p-md-5 bg-white" style={{color: "black"}}>
//                <p>FREQUENTLY ASKED QUESTIONS</p>
//                <h1>FAQ</h1>
//                <p>
//                  <b><i class="fa-solid fa-truck-fast mr-2">&nbsp;&nbsp;</i>Shipping & processing information</b>
//                </p>
//                <div className="text-muted">
//                  <p>It takes us an average of 3-5 working days to process orders allow a few more for custom orders.</p>
//                  {/* <p>Please allow another 1-2 working days for shipping on all orders within the uk.</p> */}
//                  <p>Shipping times varies from 5-10 working days for international orders.</p>
//                </div>
//                <p>
//                  <b>Returns, cancellations and refunds</b>
//                </p>
//                <div className="text-muted">
//                  <p>Due to the nature of our products we do not offer casual refunds though you would be entitled to a refund/return in cases where you receive the wrong item or a defective product etc </p>
//                  <p>You can cancel your order if you change your mind without any reasons necessary until it starts getting processed (on hold) this is usually under 24 hours.</p>
//                  <Link to="/policies/refund-policy" style={{color: "purple"}}>View our full refund policy</Link>
//                </div>
//              </div>
//            </div>
           
//         </div>
//       </div>
//     </section>
//           <Footer />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleProduct;