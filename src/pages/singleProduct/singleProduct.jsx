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
//   const [loading, setLoading] = useState(true)

//   const [selectedImage, setSelectedImage] = useState(""); // State for the enlarged image

//   const [lengthState, setLengthState] = useState({
//     length: [],
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
//     // setLoading(true)
//     axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-single-product?productId=${productId}`).then((feedback) => {
//       console.log(feedback)
//       if(feedback.data.code == "success"){
//         setLoading(false)
//         // Check if the data is a string and parse it if needed
//         const productData = typeof feedback.data.data === "string" ? JSON.parse(feedback.data.data) : feedback.data.data;
//         setProduct({
//           id: feedback.data.data.id,
//           img: feedback.data.data.productImage,
//           subImage1: feedback.data.data.subImage1 !== "null" && feedback.data.data.subImage1,
//           subImage2: feedback.data.data.subImage2 !== "null" && feedback.data.data.subImage2,
//           subImage3: feedback.data.data.subImage3 !== "null" && feedback.data.data.subImage3,
//           name: feedback.data.data.productName,
//           price: feedback.data.data.productPriceInNaira,
          
//         });
  
  
  
      
//         // setProduct((prevState) => ({
//         //   ...prevState,
//         //   pageNotFound: true
//         // }));

//       }else{
//         setLoading(false)
//         navigate("/page-not-found")
//       }

//     })
//   // }, [cartProducts.products]);
// }, []);


//   const handleAddToCart = () => {
//     addToCart(product, lengthState.lengthPicked);
//   };

//   const handleLengthChange = (length, lengthPrice) => {
//     setLengthState(prevState => ({ ...prevState, lengthPicked: length }));
//     updateCartItemLength(product.id, length, lengthPrice); // Update length in cart
//   };

//   const handleImageClick = (img) => {
//     setSelectedImage(img); // Update the enlarged image on click
//   };

//   const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
//   // const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
//   const inCart = cartItems.some(item => item.id == product.id);


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
    
//     useEffect(() => {
//       const cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];
//       const cartItem = cartItems.find((item) => item.id == product.id);
    
//       // Log to see the cartItem from localStorage
//       console.log('Cart item from localStorage:', cartItem);
    
//       if (cartItem && cartItem.lengthPicked) {
//         console.log('Length picked from cart:', cartItem.lengthPicked);
        
//         // Ensure that the picked length exists in the available lengths of hair
//         if (!lengthsOfHair.includes(cartItem.lengthPicked)) {
//           setLengthState({
//             length: lengthsOfHair,
//             lengthPicked: lengthsOfHair[0], // Fallback to the first item
//           });
//         } else {
//           // Set the state with the length picked from the cart
//           setLengthState({
//             length: lengthsOfHair,
//             lengthPicked: cartItem.lengthPicked,
//           });
//         }
//       } else {
//         // If no cart item or length picked, fallback to the default first item
//         setLengthState({
//           length: lengthsOfHair,
//           lengthPicked: lengthsOfHair[0],
//         });
//       }
//     }, [product.id]);  // Ensure this runs on product change
    

//   // if(loading){
//   //   return null
//   // }

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
//                   {
//                     loading ? <div className="placeholder col-9" style={{width: "100%", height: "400px"}}>
//                       </div>
//                      : <div className="single-product-image-scroll-container">
                    
//                      {productImages.map((image, index) => (
//                          <img
//                              key={index}
//                              src={image}
//                              alt={`Product Image ${index + 1}`}
//                              className="single-product-scrollable-image"
//                          />
//                      ))}
//                    </div>
//                   }
                  
                    
                  
                 
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
//                         {/* <span><b>{convertedPrice.toLocaleString()}</b></span> */}
//                         {console.log(lengthState)}
//                         <span>{lengthState.lengthPicked = lengthState.length[0] && (convertCurrency(product.price, 'NGN', selectedCurrency)).toLocaleString()}</span>
//                         <span>{lengthState.lengthPicked = lengthState.length[1] && (convertCurrency(10000, 'NGN', selectedCurrency)).toLocaleString()}</span>
//                         <span>{lengthState.lengthPicked = lengthState.length[2] && (convertCurrency(20000, 'NGN', selectedCurrency)).toLocaleString()}</span>
//                         <span>{lengthState.lengthPicked = lengthState.length[3] && (convertCurrency(30000, 'NGN', selectedCurrency)).toLocaleString()}</span>



//                       </div>
//                       <span className="text-muted">/per item</span>
//                     </div>
//                     {!loading && <div className="text-muted">LENGTH {lengthState.lengthPicked}</div> }
//                     <div className="row mt-2">
                     
//                         <div className="lengths-container">
//                           {!loading && lengthState.length?.map((length, index) => (
//                             <div key={index} className="">
//                               <button
//                                 className="length-button "
//                                 style={lengthState.lengthPicked === length ? { backgroundColor: "black", color: "white" } : null}
//                               >
//                                 {length}
//                               </button>
//                             </div>
//                           ))}
//                         </div>
                      
//                     </div>
//                     <hr />
                   
//                       {product.img && <div className="d-grid">
//                         <button
//                           className="btn hover-button"
//                           // style={inCart || isRecentlyAdded ? { backgroundColor: "black"} : { border: "1px solid black", color: "black" }}
//                           // style={inCart || isRecentlyAdded ? { backgroundColor: "black"} : { border: "1px solid black", color: "black" }}
//                           style={inCart ? {background: "black", color: "white"} : null}
//                           onClick={handleAddToCart}
//                         >
//                           {inCart ? "Added to cart" : <span>Add to cart <i className="fas fa-shopping-cart m-1 me-md-2"></i></span>}
//                         </button>
//                       </div>}
                    
//                   </div>
//                 </main>
//               </div>
//             </div>
//           </section>

//                <section className="border-top py-4" style={{backgroundColor: "var(--bodyColor)"}}>
//        <div className="container">
//          <div className="row gx-3 contain">
//            <div className="col-lg-12 mb-4 ">
//              <div className="border rounded-2 px-4 py-5 p-md-5 bg-white" style={{color: "black"}}>
//                <p>FREQUENTLY ASKED QUESTIONS</p>
//                <h1>FAQ</h1>
//                <p>  
//                  <b><i className="fa-solid fa-truck-fast mr-2">&nbsp;&nbsp;</i>Shipping & processing information</b>
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
    // price: 0,
    pageNotFound: false
  });
  const [productPrices, setProductPrices] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedImage, setSelectedImage] = useState(""); // State for the enlarged image

  const [lengthState, setLengthState] = useState({
    length: [],
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
    // setLoading(true)
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
          // price: feedback.data.data.productPriceInNaira,
        });
        setProductPrices([feedback.data.data.productPriceInNaira12Inches, feedback.data.data.productPriceInNaira14Inches, 
          feedback.data.data.productPriceInNaira16Inches, feedback.data.data.productPriceInNaira18Inches, 
          feedback.data.data.productPriceInNaira20Inches, feedback.data.data.productPriceInNaira22Inches, 
          feedback.data.data.productPriceInNaira24Inches, feedback.data.data.productPriceInNaira26Inches, 
          feedback.data.data.productPriceInNaira28Inches])
  
  
  
      
        // setProduct((prevState) => ({
        //   ...prevState,
        //   pageNotFound: true
        // }));

      }else{
        setLoading(false)
        navigate("/page-not-found")
      }

    })
  // }, [cartProducts.products]);
}, []);


  const handleAddToCart = () => {
    addToCart(product, lengthState.lengthPicked);
  };

  const handleLengthChange = (length, lengthPrice) => {
    setLengthState(prevState => ({ ...prevState, lengthPicked: length }));
    updateCartItemLength(product.id, length, lengthPrice); // Update length in cart
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
    

  // if(loading){
  //   return null
  // }

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
                  {
                    loading ? <div className="placeholder col-9" style={{width: "100%", height: "500px"}}>
                      </div>
                     : <div className="single-product-image-scroll-container">
                    
                     {productImages.map((image, index) => (
                         <img
                             key={index}
                             src={image}
                             alt={`Product Image ${index + 1}`}
                             className="single-product-scrollable-image"
                         />
                     ))}
                   </div>
                  }
                  
                    
                  
                 
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
                    


                        {/* <span><b>{convertedPrice.toLocaleString()}</b></span> */}

                    <div className="mb-3 d-flex">
                      <div className="h5" style={{display: "flex"}}>
                        <span>{currencySymbol}</span>
                        {lengthState.length.map((length, index) =>
                          lengthState.lengthPicked === length &&
                          convertCurrency(productPrices[index], 'NGN', selectedCurrency).toLocaleString()
                        )}
                      </div>
                      <span className="text-muted">&nbsp;/&nbsp;per item</span>
                    </div>
                    {!loading && <div className="text-muted">LENGTH: {lengthState.lengthPicked}</div> }
                    <div className="row mt-2">
                     
                        <div className="lengths-container">
                          {!loading && lengthState.length?.map((length, index) => (
                            <div key={index} className="">
                              <button
                                className="length-button "
                                style={lengthState.lengthPicked === length ? { backgroundColor: "black", color: "white" } : null }
                                onClick={() => {
                                  const index = lengthState.length.findIndex(item => item == length); // Find the index of the selected length
                                  const price = productPrices[index]; // Get the price for the selected length
                                  handleLengthChange(length, price); // Pass the specific price instead of an array
                                }}
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

