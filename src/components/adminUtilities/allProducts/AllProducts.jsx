import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { CurrencyContext } from "../../all_context/CurrencyContext";
import "./allProducts.css";
import BasicLoader from "../../loader/BasicLoader";
import EditProductForm from "../editProductForm/EditProductForm";

const AllProducts = () => {
    const [page, setPage] = useState("allProducts")
    const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);

    const token = Cookies.get("authToken");
    const [allProducts, setAllProducts] = useState({
        products: [],
        products_loading: false,
    });
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for modal

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    useEffect(() => {
        let loaderTimeout;
        loaderTimeout = setTimeout(() => {
            setAllProducts((prevState) => ({
                ...prevState,
                products_loading: true,
            }));
        }, 200);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/get-all-products`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((feedback) => {
            if (feedback.data.code === "success") {
                setAllProducts({
                    products: feedback.data.data,
                    products_loading: false,
                });
            }
        }).finally(() => {
            clearTimeout(loaderTimeout);
            setAllProducts((prev) => ({
                ...prev,
                products_loading: false,
            }));
        });
        return () => clearTimeout(loaderTimeout);
    }, []);
    if(page  == "editProductForm" && selectedProduct){
        return  <EditProductForm
            product={selectedProduct}
            onClose={handleCloseModal}
        />
    }

    return (
        <div>
            <section>
                <div className="bread-crumb">
                    <div style={{ fontSize: "20px", fontWeight: "semi bold" }}>Admin Dashboard</div>
                    <div>Home / all products</div>
                </div>
                <div className="container my-5 product-page-container">
                    <header className="mb-4">
                        <h3>All products</h3>
                    </header>
                    <div className="row">
                        {allProducts.products_loading && <BasicLoader />}
                        {allProducts.products?.map((product) => {
                            const productPrice = parseFloat(product.productPriceInNaira);
                            const convertedPrice = convertCurrency(productPrice, "NGN", selectedCurrency);
                            const currencySymbol = currencySymbols[selectedCurrency];
                            const firstImage = product.images[0];

                            return (
                                <div
                                    className="col-lg-3 col-md-6 col-sm-6 col-6 single-item-container"
                                    style={{ textDecoration: "none", color: "black" }}
                                    key={product.id}
                                    onClick={() => setSelectedProduct(product)} // Set product for the modal
                                >
                                    <div className="my-2">
                                        <img
                                            src={firstImage}
                                            className="card-img-top rounded-2"
                                            style={{ aspectRatio: "3 / 4", width: "100%", height: "auto" }}
                                        />
                                        <div className="pl-2 pt-2">
                                            <h5 style={{ display: "flex", gap: "5px" }}>
                                                <span>{currencySymbol}</span>
                                                <span>{convertedPrice}</span>
                                            </h5>
                                            <p className="mb-0">{product.productName}</p>
                                            <p className="text-muted">{product.productDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Custom Modal */}
            {selectedProduct && (
                <div className="custom-modal-overlay" onClick={()=> setSelectedProduct(null)}>
                    <div class="card custom-modal-card" style={{width: "400px", maxHeight: "600px", overflowY: "auto", paddingTop: "20px"}} onClick={(e)=> e.stopPropagation()}>
  {/* <img src={selectedProduct.images[0]} class="card-img-top" alt="..." style={{aspectRatio: "1 / 1", objectFit: "contain"}} /> */}
  <div className="image-scroll-container">
                            {selectedProduct.images.map((image, index) => (
                                <img key={index} src={image} alt={`Product Image ${index + 1}`} className="modal-image" />
                            ))}
                            </div>
  <div class="card-body">
    <div className="card-title">
        <h5>Price: {currencySymbols[selectedCurrency]}{convertCurrency(parseFloat(selectedProduct.productPriceInNaira), "NGN", selectedCurrency)}</h5>
    </div>
    <p class="card-text">{selectedProduct.productName}</p>
    <p>Color: {selectedProduct.productDescription}</p>
    <div style={{display: "flex", justifyContent: "right", gap: "10px"}}>
        <button onClick={()=> {setPage("editProductForm")}} className="btn" style={{backgroundColor: "purple", color: "white", width: "100%", maxWidth: "100px"}}>Edit</button>
        <button className="btn" style={{backgroundColor: "black", color: "white", width: "100%", maxWidth: "100px"}}>Delete</button>
    </div>
  </div>
</div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;





























// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useContext } from "react";
// import { CurrencyContext } from "../../all_context/CurrencyContext";
// import "./allProducts.css";
// import BasicLoader from "../../loader/BasicLoader";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button"; // Assuming you're using Bootstrap for modal styling

// const AllProducts = () => {
//     const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);

//     const token = Cookies.get("authToken");
//     const [allProducts, setAllProducts] = useState({
//         products: [],
//         products_loading: false,
//     });
//     const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for modal
//     const [showModal, setShowModal] = useState(false); // Track modal state

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedProduct(null);
//     };

//     useEffect(() => {
//         let loaderTimeout;
//         // Set the loader to be shown if data takes more than 200ms
//         loaderTimeout = setTimeout(() => {
//             setAllProducts((prevState) => ({
//                 ...prevState,
//                 products_loading: true,
//             }));
//         }, 200);
//         axios
//             .get(`${import.meta.env.VITE_BACKEND_URL}/admin/get-all-products`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//             .then((feedback) => {
//                 if (feedback.data.code === "success") {
//                     setAllProducts({
//                         products: feedback.data.data,
//                         products_loading: false,
//                     });
//                 }
//             })
//             .finally(() => {
//                 clearTimeout(loaderTimeout);
//                 setAllProducts((prev) => ({
//                     ...prev,
//                     products_loading: false,
//                 }));
//             });
//     }, []);

//     return (
//         <div>
//             <section>
//                 <div className="bread-crumb">
//                     <div style={{ fontSize: "20px", fontWeight: "semi bold" }}>Admin Dashboard</div>
//                     <div>Home / all products</div>
//                 </div>
//                 <div className="container my-5 product-page-container">
//                     <header className="mb-4">
//                         <h3>All products</h3>
//                     </header>
//                     <div className="row">
//                         {allProducts.products_loading && <BasicLoader />}
//                         {allProducts.products?.map((product) => {
//                             const productPrice = parseFloat(product.productPriceInNaira);
//                             const convertedPrice = convertCurrency(productPrice, "NGN", selectedCurrency);
//                             const currencySymbol = currencySymbols[selectedCurrency];
//                             const firstImage = product.images[0]; // Display only the first image in the array of images

//                             return (
//                                 <div
//                                     className="col-lg-3 col-md-6 col-sm-6 col-6 single-item-container"
//                                     style={{ textDecoration: "none", color: "black" }}
//                                     key={product.id}
//                                     onClick={() => {
//                                         setSelectedProduct(product);
//                                         setShowModal(true);
//                                     }} // Open modal on product click
//                                 >
//                                     <div className="my-2">
//                                         <img
//                                             src={firstImage}
//                                             className="card-img-top rounded-2"
//                                             style={{ aspectRatio: "3 / 4", width: "100%", height: "auto" }}
//                                         />
//                                         <div className="pl-2 pt-2">
//                                             <h5 style={{ display: "flex", gap: "5px" }}>
//                                                 <span>{currencySymbol}</span>
//                                                 <span>{convertedPrice}</span>
//                                             </h5>
//                                             <p className=" mb-0">{product.productName}</p>
//                                             <p className="text-muted">{product.productDescription}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </section>

//             {/* Bootstrap Modal */}
//             {selectedProduct && (
//                 <Modal show={showModal} onHide={handleCloseModal} centered  dialogClassName="custom-modal">
//                     {/* <Modal.Header closeButton>
//                         <Modal.Title>{selectedProduct.productName}</Modal.Title>
//                     </Modal.Header> */}
//                     <Modal.Body>
//                         {/* <img
//                             src={selectedProduct.images[0]}
//                             alt={selectedProduct.productName}
//                             style={{ width: '100%', height: 'auto', maxHeight: "300px", objectFit: "cover" }}
//                         />
//                         <p>{selectedProduct.productDescription}</p>
//                         <h5>
//                             <span>{currencySymbols[selectedCurrency]}</span>
//                             <span>{convertCurrency(parseFloat(selectedProduct.productPriceInNaira), "NGN", selectedCurrency)}</span>
//                         </h5> */}
//                         <div class="card">
//   <img src={selectedProduct.images[0]} class="card-img-top" alt="..." style={{width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain"}} />
//   <div class="card-body">
//   <h5 className="card-title">
//                             <span>{currencySymbols[selectedCurrency]}</span>
//                             <span>{convertCurrency(parseFloat(selectedProduct.productPriceInNaira), "NGN", selectedCurrency)}</span>
//                         </h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseModal}>
//                             Close
//                         </Button>
//                         <Button variant="primary">Save changes</Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default AllProducts;
