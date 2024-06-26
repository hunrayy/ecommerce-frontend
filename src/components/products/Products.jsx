



import { useState, useEffect, useContext } from "react"
import productsStore from "./products.json"
import "./products.css"
import { CartContext } from "../../pages/cart/CartContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"



const Products = () => {
    const navigate = useNavigate()
    const { cartProducts, addToCart} = useContext(CartContext);
    const [allProducts, setAllProducts] =  useState({
        products: [],
        products_loading: false
    })
    const [cartItems, setCartItems] = useState([]);



    useEffect(()=> {
        setAllProducts({
            products: productsStore,
            products_loading: false
        })
        // get cart items
        const getCartItems = JSON.parse(localStorage.getItem("cart_items"))
        setCartItems(getCartItems);


    }, [])

    const handleAddToCart = (product) => {
        addToCart(product);
    };
    const navigateToProduct = (product_id) => {
        navigate(`/product/${product_id}`, {
            replace: true
        })
    }


    return <div>
        {cartProducts.productAddedToCartAnimation ? 
            <div style={{width: "100%", height: "50px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", color: "white", position: "fixed", top: "0", zIndex: "1"}}>{cartProducts.addToCartAnimationMessage}</div>
            : null
        }

        <section>
            <div className="container my-5 product-page-container">
                <header className="mb-4">
                <h3>New products</h3>
                </header>

                <div className="row">
                    {allProducts.products?.map((product) =>{
                        // console.log(product)
                        const inCart = cartItems?.some(item => item.id === product.id)
                        const isRecentlyAdded = cartProducts.recentlyAddedProducts.includes(product.id);
                        return (<div className="col-lg-3 col-md-6 col-sm-6 col-6 single-item-container" style={{textDecoration: "none", color: "black"}} onClick={()=>navigateToProduct(product.id)}>
                        <div className="my-2">
                   
                            <img src={product.img} className="card-img-top rounded-2" style={{aspectRatio: "3 / 4", width: "100%", height: "auto"}} />
            
                        <div className="pl-2 pt-2">
                            <a href="#!" className="btn btn-light border px-2 pt-2 float-end icon-hover"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                            <h5 className="">${product.price}</h5>
                            <p className=" mb-0">{product.name}</p>
                            <p className="text-muted">{product.description}</p>
                        </div>
                        {/* <button className={`btn btn-block ${inCart || isRecentlyAdded ? "btn-dark" : ""}`} style={{border: "1px solid #343a40"}} onClick={()=> handleAddToCart(product)}>
                        
                            {inCart ? "Added to cart" : isRecentlyAdded ? "Added to cart" : <span>Add to cart <i className="fas fa-shopping-cart m-1 me-md-2"></i></span>}
                        </button> */}
                        </div>
                    </div>)
                    })}
                </div>
            </div>
        </section> 


    </div>
}
export default Products












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