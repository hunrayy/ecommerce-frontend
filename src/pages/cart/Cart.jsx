

import "./cart.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { CartContext } from "./CartContext"

const Cart = () => {
    const { cartProducts, addToCart } = useContext(CartContext);
    const [allCartItems, setAllCartItems] = useState({
        products: [],
        totalPrice: 0
    });

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("cart_items"));
        if (storedItems) {
            setAllCartItems((prevState) => ({
                ...prevState,
                products: storedItems,
                totalPrice: 0
            }));
        }
    }, [cartProducts.products]); // Add cartProducts.products as a dependency to re-render when it changes

    const handleRemoveFromCart = (product) => {
        addToCart(product); // Use addToCart to remove the product
        window.scrollTo(0, 0);
    };

    return (
        <div className="cart-page-container">
            <Navbar />
            {/* bread crumbs */}
            <div className="" style={{marginTop: "var(--marginAboveTop)", backgroundColor: "black"}}>
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
            {/* bread crumbs */}

            <section className="my-5">
                <div className="container">
                    <div className="row">
                        {/* <!-- cart --> */}
                        <div className="col-lg-9">
                            <div className="card border shadow-0">
                                <div className="m-4">
                                    <h4 className="card-title mb-4">Your shopping cart</h4>
                                    {allCartItems.products?.map((each_item) => (
                                        <div key={each_item.id}>
                                            <div className="row gy-3 mb-4">
                                                <div className="col-lg-5">
                                                    <div className="me-lg-5">
                                                        <div className="d-flex">
                                                            <img src={each_item.img} className="border rounded me-3" style={{width: "100px", height: "130px"}} />
                                                            <div className="">
                                                                <a href="#" className="nav-link">{each_item.name}</a>
                                                                <p className="text-muted px-3">{each_item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                    <div className="">
                                                        <select style={{width: "100px"}} className="form-select me-4">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                    <div className="">
                                                        <span className="h6 px-3">{each_item.price}</span> <br />
                                                    </div>
                                                </div>
                                                <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                    <div className="float-md-end">
                                                        <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                                                        <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => handleRemoveFromCart(each_item)}> Remove</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-top pt-4 mx-4 mb-4">
                                    <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
                                    <p className="text-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- cart --> */}
                        {/* <!-- summary --> */}
                        <div className="col-lg-3">
                            <div className="card mb-3 border shadow-0">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-label">Have coupon?</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control border" name="" placeholder="Coupon code" />
                                                <button className="btn btn-light border">Apply</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card shadow-0 border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Total price:</p>
                                        <p className="mb-2">${allCartItems.totalPrice}</p>
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
                                        <p className="mb-2 fw-bold">${allCartItems.totalPrice}</p>
                                    </div>

                                    <div className="mt-3">
                                        <div className="btn w-100 shadow-0 mb-2" style={{backgroundColor: "purple", color: "white"}}> Proced to checkout </div>
                                        <Link to="/" className="btn btn-light w-100 border mt-2"> Back to shop </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- summary --> */}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Cart;
























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