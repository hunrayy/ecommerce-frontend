// SingleProduct.js

import productStore from "../../components/products/products.json";
import { useParams } from "react-router-dom";
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


const SingleProduct = () => {
  const navigate = useNavigate()
  const { cartProducts, addToCart, updateCartItemLength } = useContext(CartContext);
  const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);
  let { product_name } = useParams();
  console.log(product_name);

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

  const [selectedImage, setSelectedImage] = useState(""); // State for the enlarged image

  const [lengthState, setLengthState] = useState({
    length: null,
    lengthPicked: ""
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-single-product?productName=${product_name}`).then((feedback) => {
      console.log(feedback)
      if(feedback.data.code == "success"){
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
        setProduct({
          id: feedback.data.data._id,
          img: feedback.data.data.productImage,
          subImage1: feedback.data.data.subImage1 !== "null" && feedback.data.data.subImage1,
          subImage2: feedback.data.data.subImage2 !== "null" && feedback.data.data.subImage2,
          subImage3: feedback.data.data.subImage3 !== "null" && feedback.data.data.subImage3,
          name: feedback.data.data.productName,
          price: feedback.data.data.productPriceInNaira,
        });
  
        setSelectedImage(feedback.data.data.productImage); // Set the initially selected image
  
  
        // Check if product is already in cart
        const cartItem = cartProducts.products.find(item => item.id === product.id);
        if (cartItem && cartItem.lengthPicked) {
          setLengthState({
            length: lengthsOfHair,
            lengthPicked: cartItem.lengthPicked
          });
        } else {
          setLengthState({
            length: lengthsOfHair,
            lengthPicked: lengthsOfHair[0]
          });
        }
        // setProduct((prevState) => ({
        //   ...prevState,
        //   pageNotFound: true
        // }));

      }else{
        navigate("/page-not-found", {replace: "true"})
      }

    })
  }, [product_name, cartProducts.products]);

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
  const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
  const inCart = cartItems.some(item => item.id === product.id);


    // Convert price based on selected currency
    const convertedPrice = convertCurrency(product.price, selectedCurrency);
    const currencySymbol = currencySymbols[selectedCurrency] || '';
    const productImages = [
      product.img,
      ...(product.subImage1 ? [product.subImage1] : []),
      ...(product.subImage2 ? [product.subImage2] : []),
      ...(product.subImage3 ? [product.subImage3] : [])
    ];
    
  

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
            <div className="container">
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
                  {/* <div className="rounded-4 mb-3 d-flex justify-content-center">
                    <img style={{width: "100%", height: "auto", maxHeight: "500px", objectFit: "contain", borderRadius: "10px"}}  className="rounded-4 fit" src={selectedImage} alt={product.name} />
                  </div> */}
                  {/* <div className="small-images-container">
                    
                    {productImages.map((img, index) => (
                     <img
                       key={index}
                       src={img}
                       alt={`Thumbnail ${index}`}
                       style={{
                         width: "100%",
                         height: "auto",
                         maxWidth: "50px",
                         objectFit: "contain",
                         cursor: "pointer",
                         marginBottom: "10px",
                         borderRadius: "5px",
                         border: selectedImage === img ? "2px solid black" : "none"
                       }}
                       onClick={() => handleImageClick(img)} // Set the selected image on click
                     />
                   ))}
                 </div> */}
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
                        <span>{(convertedPrice).toLocaleString()}</span>
                      </div>
                      <span className="text-muted">/per item</span>
                    </div>
                    <p>{product.description}</p>
                    <div className="text-muted">LENGTH {lengthState.lengthPicked}</div>
                    <div className="row mt-2">
                      <div className="lengths-container">
                        {lengthState.length?.map((length, index) => (
                          <div key={index}>
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
                    <div className="d-grid">
                      <button
                        className="btn"
                        style={inCart || isRecentlyAdded ? { backgroundColor: "black", color: "white" } : { border: "1px solid black", color: "black" }}
                        onClick={handleAddToCart}
                      >
                        {inCart || isRecentlyAdded ? "Added to cart" : <span>Add to cart <i className="fas fa-shopping-cart m-1 me-md-2"></i></span>}
                      </button>
                    </div>
                  </div>
                </main>
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
























































// import productStore from "../../components/products/products.json"
// import { useParams } from "react-router-dom"
// import { useState, useEffect } from "react"
// import Navbar from "../../components/navbar/Navbar"
// import Footer from "../../components/footer/Footer"
// import PageNotFound from "../pageNotFound/PageNotFound"
// import "./singleProduct.css"
// import { Link } from "react-router-dom"
// import { CartContext } from "../cart/CartContext"
// import { useContext } from "react"
// const singleProduct = () => {
//   const { cartProducts, addToCart} = useContext(CartContext);
//   let { product_id } = useParams()
//   product_id = Number(product_id)

//   const [product, setProduct] = useState({
//     img: "",
//     name: "",
//     description: "",
//     price: 0,
//     pageNotFound: false,
//     productLengths: []
//   })
//   const productLengths = [
//     `12", 12", 12"`, `14", 14", 14"`, `16", 16", 16"`, `18", 18", 18"`, `20", 20", 20"`,
//     `22", 22", 22"`, `24", 24", 24"`, `26", 26", 26"`, `28", 28", 28"`
//   ]
//   const [lengthState, setLengthState] = useState({
//     length: null
//   })

//   const handleAddToCart = (product) => {
//     addToCart(product);
//   };


//   useEffect(()=>{
//     const feedback = productStore.find(item => item.id === product_id);

//     if(feedback){
//       // product exists
//       setProduct((prevState) => ({
//         ...prevState,
//         img: feedback.img,
//         name: feedback.name,
//         description: feedback.description,
//         price: feedback.price,
//         productLengths: productLengths
//       }))
//       setLengthState((prevState) => ({
//         ...prevState,
//         length: productLengths[0]
//       }))
//     }else{
//       // product does not exist, show "error 404 page"
//       setProduct((prevState) => ({
//         ...prevState,
//         pageNotFound: true
//       }))
//     }
//     console.log(product)
//     console.log(cartItems)

//   }, [])
//   const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
//   const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
//   const inCart = cartItems.some(item => item.id === product.id);
//     return <div>
//       {product.pageNotFound ? <PageNotFound /> : <div>
//           <Navbar />
//           <section class="py-5" style={{backgroundColor: "var(--bodyColor)", marginTop: "var(--marginAboveTop)"}}>
//         {cartProducts.productAddedToCartAnimation ? 
//           <div style={{width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "1"}}>{cartProducts.addToCartAnimationMessage}</div>
//           : null}
//       <div class="container">
//         <div class="row gx-5">
//           <aside class="col-lg-6">
//             <div class="rounded-4 mb-3 d-flex justify-content-center">

//                 <img style={{maxWidth: "100%", maxHeight: "100vh", margin: "auto"}} class="rounded-4 fit" src={product.img} />

//             </div>
//             {/* <!-- thumbs-wrap.// --> */}
//             {/* <!-- gallery-wrap .end// --> */}
//           </aside>
//           <main class="col-lg-6 ">
//             <div class="ps-lg-3">
//               <h4 class="title" style={{fontSize: "30px",color: "black"}}>{product.name}</h4>
//               <div class="d-flex flex-row my-3">
//                 <div class="text-warning mb-1 me-2">
//                   <i class="fa fa-star"></i>
//                   <i class="fa fa-star"></i>
//                   <i class="fa fa-star"></i>
//                   <i class="fa fa-star"></i>
//                   <i class="fa fa-star"></i>
//                 </div>
//                 <span class="text-success ms-2 ml-3">In stock</span>
//               </div>

//               <div class="mb-3">
//                 <span class="h5">${product.price}</span>
//                 <span class="text-muted">/per item</span>
//               </div>

//               <p>{product.description}</p>

//                 <div className="text-muted">LENGTH {lengthState.length}</div>
//               <div class="ro mt-2">
//                 {/* put the lengths of hair here */}
//                 <div className="lengths-container">
//                   {product.productLengths?.map((length) => {
//                     return<div>
//                         <button className="length-button" style={lengthState.length === length ? {backgroundColor: "black", color: "white"} : null}  onClick={()=> setLengthState({length: length})}>
//                         {length}
//                         </button>
//                       </div>
//                   })}
//                 </div>




//               </div>

//               <hr />

//               <button className="btn btn-block"
//                       style={inCart || isRecentlyAdded ? { backgroundColor: "black", color: "white" } : { border: "1px solid black", color: "black" }}
//                       onClick={() => handleAddToCart(product)}
//               >
//                 {inCart ? "Added to cart" : isRecentlyAdded ? "Added to cart" : <span>Add to cart <i className="fas fa-shopping-cart m-1 me-md-2"></i></span>}
//               </button>
             
//               {/* <btn class="btn btn-block" style={{backgroundColor: "black", color: "white", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}> Add to cart 
//               <i className="fas fa-shopping-cart m-1 me-md-2"></i>
//               </btn> */}
//               {/* <a href="#" class="btn btn-light border border-secondary py-2 icon-hover px-3"> <i class="me-1 fa fa-heart fa-lg"></i> Save </a> */}
//             </div>
//           </main>
//         </div>
//       </div>
//     </section>
//     {/* <!-- content --> */}

//     <section class="border-top py-4" style={{backgroundColor: "var(--bodyColor)"}}>
//       <div class="container">
//         <div class="row gx-3 contain">
//           <div class="col-lg-12 mb-4">
//             <div class="border rounded-2 px-3 py-2 bg-white p-4" style={{color: "black"}}>
//               <p>FREQUENTLY ASKED QUESTIONS</p>
//               <h1>FAQ</h1>
//               <p>
//                 <b><i class="fa-solid fa-truck-fast mr-2"></i>Shipping & processing information</b>
//               </p>
//               <div className="text-muted">
//                 <p>It takes us an average of 2-3 working days to process orders allow a few more for custom orders.</p>
//                 <p>Please allow another 1-2 working days for shipping on all orders within the uk.</p>
//                 <p>Shipping times varies from 3-5 working days for international orders.</p>
//               </div>
//               <p>
//                 <b>Returns, cancellations and refunds</b>
//               </p>
//               <div className="text-muted">
//                 <p>Due to the nature of our products we do not offer casual refunds though you would be entitled to a refund/return in cases where you receive the wrong item or a defective product etc </p>
//                 <p>You can cancel your order if you change your mind without any reasons necessary until it starts getting processed (on hold) this is usually under 24 hours.</p>
//                 <Link to="/policies/refund-policy">View our full refund policy</Link>
//               </div>
//             </div>
//           </div>
//           {/* <div class="col-lg-4">
//             <div class="px-0 border rounded-2 shadow-0">
//               <div class="card">
//                 <div class="card-body">
//                   <h5 class="card-title">Similar items</h5>
//                   <div class="d-flex mb-3">
//                     <a href="#" class="me-3">
//                       <img src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/8.webp" style={{minWidth: "96px", height: "96px"}} class="img-md img-thumbnail" />
//                     </a>
//                     <div class="info">
//                       <a href="#" class="nav-link mb-1">
//                         Rucksack Backpack Large <br />
//                         Line Mounts
//                       </a>
//                       <strong class="text-dark"> $38.90</strong>
//                     </div>
//                   </div>

//                   <div class="d-flex mb-3">
//                     <a href="#" class="me-3">
//                       <img src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/9.webp" style={{minWidth: "96px", height: "96px"}} class="img-md img-thumbnail" />
//                     </a>
//                     <div class="info">
//                       <a href="#" class="nav-link mb-1">
//                         Summer New Men's Denim <br />
//                         Jeans Shorts
//                       </a>
//                       <strong class="text-dark"> $29.50</strong>
//                     </div>
//                   </div>

//                   <div class="d-flex mb-3">
//                     <a href="#" class="me-3">
//                       <img src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/10.webp" style={{minWidth: "96px", height: "96px"}} class="img-md img-thumbnail" />
//                     </a>
//                     <div class="info">
//                       <a href="#" class="nav-link mb-1"> T-shirts with multiple colors, for men and lady </a>
//                       <strong class="text-dark"> $120.00</strong>
//                     </div>
//                   </div>

//                   <div class="d-flex">
//                     <a href="#" class="me-3">
//                       <img src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/11.webp" style={{minWidth: "96px", height: "96px"}} class="img-md img-thumbnail" />
//                     </a>
//                     <div class="info">
//                       <a href="#" class="nav-link mb-1"> Blazer Suit Dress Jacket for Men, Blue color </a>
//                       <strong class="text-dark"> $339.90</strong>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </section>
//     <Footer />
//     </div>
// }


//     </div>
// }
// export default singleProduct