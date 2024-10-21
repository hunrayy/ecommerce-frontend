

import { useState, useEffect, useContext } from "react"
import productsStore from "./products.json"
import "./products.css"
import { CartContext } from "../../pages/cart/CartContext"
import { CurrencyContext } from "../all_context/CurrencyContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import HomePageLoader from "../homePageLoader/HomePageLoader"
import jsonProducts from "./products.json"




const Products = ({ showPaginationButtons }) => {
    const navigate = useNavigate()
    const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);
    const { cartProducts, addToCart} = useContext(CartContext);
    const [allProducts, setAllProducts] =  useState({
        products: [],
        products_loading: false
    })
    const [totalProducts, setTotalProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(2);
    // const [cartItems, setCartItems] = useState([]);

    const fetchProducts = async (page) => {
        console.log(currentPage, perPage)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-all-products`, {
                params: {
                    perPage: perPage,
                    page: currentPage
                }
            });
            console.log(response)
            if (response.data.code == "success"){
                setCurrentPage(response.data.data.current_page)
                setAllProducts((prev) => ({
                    ...prev,
                    products_loading: false,
                    products: response.data.data.data
                }))
                setTotalProducts(response.data.data); // Set products from paginated result
                console.log(totalProducts)
            }
            // const { data } = response.data;
            // setTotalProducts(data.total); // Total number of products
        } catch (error) {
            console.error('Error fetching products:', error);
        }finally{
            // Clear the loader timeout and stop the loader when the request completes
            setAllProducts(prev => ({
                ...prev,
                products_loading: false // Ensure loader is hidden after request is done
            }));
        }
    };

    // Handler for next page
    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalProducts.total / perPage)) {
            console.log()
            setCurrentPage((prevPage) => {
                const newPage = prevPage + 1;
                // console.log(newPage); // This will now log the correct new page
                return newPage;
            });
        }
    };

    // Handler for previous page
    const handlePreviousPage = () => {

        if (currentPage > 1) {
            setCurrentPage((prevPage) => {
                const newPage = prevPage - 1;
                return newPage;
            });
        }
    };

    const handlePaginate = (index) => {
        setCurrentPage((prevPage) => {
            return index;
        });
    }

    useEffect(()=> {
        fetchProducts()
        // setAllProducts({
        //     products: [],
        //     products_loading: true
        // })

        // let loaderTimeout;
    
        // Set a timeout to show the loader after 500ms
        // loaderTimeout = setTimeout(() => {
        //     setAllProducts(prevState => ({
        //         ...prevState,
        //         products_loading: true // Only show loader if data is taking long
        //     }));
        // }, 300); // You can adjust this time (500ms) to control the delay for showing the loader


        // get cart items
        // const getCartItems = JSON.parse(localStorage.getItem("cart_items"))
        // setCartItems(getCartItems);


    }, [currentPage, perPage])

    const navigateToProduct = (id) => {
        navigate(`/product/${id}`, {
            replace: true
        })
    }


    return <div>
        {cartProducts.productAddedToCartAnimation ? 
            <div style={{width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "1"}}>{cartProducts.addToCartAnimationMessage}</div>
            : null
        }
{/* <div>
  <video loop  autoplay muted playsInline name="media" style={{width: "100%", height: "auto"}}>
    <source src="https://images.hergivenhair.com/hghemail/2023/images/adv.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div> */}
 



        <section>
            <div className="container my-5 product-page-container">
               
                {allProducts.products_loading && <HomePageLoader />}
                <div className="row">
                    {console.log(allProducts)}
                    {allProducts.products?.map((product, index) =>{
                        // console.log(product)
                        // const inCart = cartItems?.some(item => item.id === product.id)
                        // const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
                        const convertedPrice = Number(convertCurrency(product.productPriceInNaira, 'NGN', selectedCurrency)).toLocaleString();
                        const currencySymbol = currencySymbols[selectedCurrency];
                        return (<div key={index} className="col-lg-3 col-md-6 col-sm-6 col-6 single-item-container"  onClick={()=>navigateToProduct(product.id)}>
                        <div className="my-2">
                   
                            <img src={product.productImage} className="card-img-top rounded-2" style={{aspectRatio: "3 / 4", width: "100%", height: "auto"}} />
            
                        <div className="pl-2 pt-2">
                            <h5 style={{display: "flex", gap: "5px"}}>
                                <span><b>{currencySymbol}</b></span>
                                <span><b>{convertedPrice.toLocaleString()}</b></span>
                            </h5>
                            <p className=" mb-0">{product.productName}</p>
                            {/* <p className="text-muted">{product.description}</p> */}
                        </div>
                        </div>
                    </div>)
                    })}
                    
                    {/* <div style={{display: "flex", justifyContent: "center", margin: "50px 0"}}>
                        
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <button className='btn btn-dark' onClick={handlePreviousPage} disabled={currentPage < 2}>&laquo;</button>
                            &nbsp;&nbsp;<span>Page {currentPage} of {Math.ceil(totalProducts.total / perPage)}</span>&nbsp;&nbsp;
                            <button className='btn btn-dark'  onClick={handleNextPage} disabled={currentPage == Math.ceil(totalProducts.total / perPage)}>&raquo;</button>
                        </div>
                    </div> */}
                    {
                        showPaginationButtons && allProducts.products.length > 0 && <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <p><span>Page {currentPage} of {Math.ceil(totalProducts.total / perPage)}</span></p>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <button className='btn btn-dark' onClick={handlePreviousPage} disabled={currentPage < 2}>&laquo;</button>
                                {
                                    (()=>{
                                        
                                        return Array.from({ length: Math.ceil(totalProducts.total / perPage) }, (_, index) => (
                                            <button className={`btn btn-light ${currentPage == index + 1 && 'btn-dark'}`}  key={index} onClick={()=> handlePaginate(index + 1)}>{index + 1}</button>
                                        ));
                                    })()
                                }
                                <button className='btn btn-dark'  onClick={handleNextPage} disabled={currentPage == Math.ceil(totalProducts.total / perPage)}>&raquo;</button>


                            </div>
                        </div>
                    }

                </div>
            </div>
        </section> 
        



    </div>
}
export default Products




















































// import { useState, useEffect, useContext } from "react"
// import productsStore from "./products.json"
// import "./products.css"
// import { CartContext } from "../../pages/cart/CartContext"
// import { CurrencyContext } from "../all_context/CurrencyContext"
// import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"
// import axios from "axios"
// import HomePageLoader from "../homePageLoader/HomePageLoader"
// import jsonProducts from "./products.json"




// const Products = () => {
//     const navigate = useNavigate()
//     const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);
//     const { cartProducts, addToCart} = useContext(CartContext);
//     const [allProducts, setAllProducts] =  useState({
//         products: [],
//         products_loading: false
//     })
//     const [cartItems, setCartItems] = useState([]);

//     const fetchProducts = async (page) => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-all-products`);
//             console.log(response)
//             if (response.data.code == "success"){
//                 setProducts(response.data.data.data)
//                 setTotalProducts(response.data.data); // Set products from paginated result
//                 console.log(totalProducts)
//             }
//             // const { data } = response.data;
//             // setTotalProducts(data.total); // Total number of products
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };

//     useEffect(()=> {
//         // setAllProducts({
//         //     products: [],
//         //     products_loading: true
//         // })

//         let loaderTimeout;

//         // Initially set products to an empty array and loading to false
//         setAllProducts({
//             products: [],
//             products_loading: false
//         });
    
//         // Set a timeout to show the loader after 500ms
//         loaderTimeout = setTimeout(() => {
//             setAllProducts(prevState => ({
//                 ...prevState,
//                 products_loading: true // Only show loader if data is taking long
//             }));
//         }, 300); // You can adjust this time (500ms) to control the delay for showing the loader
    

    
//         axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-all-products`).then((feedback) => {
//             console.log(feedback)
//             console.log(Array.isArray(feedback.data.data))
//             setAllProducts({
//                 products:  Array.isArray(feedback.data.data) ? feedback.data.data : JSON.parse(feedback.data.data),
//                 products_loading: false
//             })
//         }).finally(() => {
//             // Clear the loader timeout and stop the loader when the request completes
//             clearTimeout(loaderTimeout);
//             setAllProducts(prev => ({
//                 ...prev,
//                 products_loading: false // Ensure loader is hidden after request is done
//             }));
//         });

//         // console.log(jsonProducts)
//         // setAllProducts({
//         //     products: jsonProducts,
//         //     products_loading: false
//         // })
//         // get cart items
//         const getCartItems = JSON.parse(localStorage.getItem("cart_items"))
//         setCartItems(getCartItems);


//     }, [])

//     const handleAddToCart = (product) => {
//         addToCart(product);
//     };
//     const navigateToProduct = (id) => {
//         navigate(`/product/${id}`, {
//             replace: true
//         })
//     }


//     return <div>
//         {cartProducts.productAddedToCartAnimation ? 
//             <div style={{width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "1"}}>{cartProducts.addToCartAnimationMessage}</div>
//             : null
//         }
// {/* <div>
//   <video loop  autoplay muted playsInline name="media" style={{width: "100%", height: "auto"}}>
//     <source src="https://images.hergivenhair.com/hghemail/2023/images/adv.mp4" type="video/mp4" />
//     Your browser does not support the video tag.
//   </video>
// </div> */}
 



//         <section>
//             <div className="container my-5 product-page-container">
//                 <header className="mb-4">
//                 <h3>New products</h3>
//                 </header>
//                 {allProducts.products_loading && <HomePageLoader />}
//                 <div className="row">
//                     {allProducts.products?.slice().reverse().map((product, index) =>{
//                         // console.log(product)
//                         const inCart = cartItems?.some(item => item.id === product.id)
//                         const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
//                         const convertedPrice = Number(convertCurrency(product.productPriceInNaira, 'NGN', selectedCurrency)).toLocaleString();
//                         const currencySymbol = currencySymbols[selectedCurrency];
//                         return (<div key={index} className="col-lg-3 col-md-6 col-sm-6 col-6 single-item-container" style={{textDecoration: "none", color: "black"}} onClick={()=>navigateToProduct(product.id)}>
//                         <div className="my-2">
                   
//                             <img src={product.productImage} className="card-img-top rounded-2" style={{aspectRatio: "3 / 4", width: "100%", height: "auto"}} />
            
//                         <div className="pl-2 pt-2">
//                             <h5 style={{display: "flex", gap: "5px"}}>
//                                 <span><b>{currencySymbol}</b></span>
//                                 <span><b>{convertedPrice.toLocaleString()}</b></span>
//                             </h5>
//                             <p className=" mb-0">{product.productName}</p>
//                             {/* <p className="text-muted">{product.description}</p> */}
//                         </div>
//                         </div>
//                     </div>)
//                     })}
//                 </div>
//             </div>
//         </section> 
        



//     </div>
// }
// export default Products








































    // // add to cart function
    // const addToCart = (product) => {
    //     const getItems = JSON.parse(localStorage.getItem("cart_items")) || []
    //     if(!getItems){
    //         const cartArray = []
    //         cartArray.push(product)
    //         // save to localStorage
    //         const setItem = localStorage.setItem("cart_items", JSON.stringify(cartArray))
    //     }else{
    //         setCartItems(getItems)
    //         // check if product being added to cart has already being added
    //         const productExists = getItems.some(item => item.id === product.id)
    
    //         if(productExists){
    //             // product is already in cart
    //             // filter through the getItems and remove the current product
                
    //             const removeProductFromCart = getItems.filter(item => item.id !== product.id);
    //             console.log(removeProductFromCart)

    //         }else{
    //             // product isn't in cart
    //             getItems.push(product)
    //             // save to localStorage
    //             localStorage.setItem("cart_items", JSON.stringify(getItems))
    //             setAllProducts((prevState) => ({
    //                 ...prevState,
    //                 wasProductAddedToCart: true,
    //                 productAddedToCartAnimation: true
    //             }))
    //             setTimeout(() => {
    //                 setAllProducts((prevState) => ({
    //                     ...prevState,
    //                     productAddedToCartAnimation: false
    //                 }))
    //             }, 3000)

    //         }
    //     }
    // }


        // add to cart function
        // const addToCart = (product) => {
        //     let getItems = JSON.parse(localStorage.getItem("cart_items")) || [];
        //     const productExists = getItems.some(item => item.id === product.id);
    
        //     if (productExists) {
        //         // filter through the getItems and remove the current product
        //         getItems = getItems.filter(item => item.id !== product.id);
        //         console.log("removed from cart");
        //         if(!allProducts.productAddedToCartAnimation){
        //             setAllProducts((prevState) => ({
        //                 ...prevState,
        //                 productAddedToCartAnimation: true,
        //                 addToCartAnimationMessage: "Product successfully removed"
        //             }));
        //             setTimeout(() => {
        //                 setAllProducts((prevState) => ({
        //                     ...prevState,
        //                     productAddedToCartAnimation: false,
        //                 }));
        //             }, 3000);
        //         }else{
        //             return null
        //         }
        //     } else {
        //         // product isn't in cart, add it
        //         getItems.push(product);
        //         console.log("added to cart");
        //         if(!allProducts.productAddedToCartAnimation){
        //             setAllProducts((prevState) => ({
        //                 ...prevState,
        //                 productAddedToCartAnimation: true,
        //                 addToCartAnimationMessage: <span>Product added successfully <i class="fa-sharp fa-solid fa-circle-check px-2"></i></span>
        //             }));
        //             setTimeout(() => {
        //                 setAllProducts((prevState) => ({
        //                     ...prevState,
        //                     productAddedToCartAnimation: false
        //                 }));
        //             }, 3000);
        //         }else{
        //             return null
        //         }
        //     }
    
        //     // save updated cart to localStorage
        //     localStorage.setItem("cart_items", JSON.stringify(getItems));
        //     setCartItems(getItems); // update state to trigger re-render
        // };