import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { CurrencyContext } from "../../all_context/CurrencyContext";
import "./allProducts.css";
import BasicLoader from "../../loader/BasicLoader";
import EditProductForm from "../editProductForm/EditProductForm";
import Loader from "../../loader/Loader";

const AllProducts = () => {
    const [page, setPage] = useState("allProducts");
    const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);

    const token = Cookies.get("authToken");
    const [allProducts, setAllProducts] = useState({
        products: [],
        products_loading: false,
    });
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for modal
    const [productToDelete, setProductToDelete] = useState(null); // Track product to delete
    const [productDeleting, setProductDeleting] = useState(false)
    const [productDeleted, setProductDeleted] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Show or hide delete confirmation modal
    const [searchState, setSearchState] = useState({isSearching: false, searchLoading: false, searchData: null, wordNotFound: null})
    const [searchQuery, setSearchQuery] = useState("");
    const [debounceTimeout, setDebounceTimeout] = useState(null);


    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(null); // Close the product modal
        setProductToDelete(product); // Set the product to be deleted
        setShowDeleteModal(true); // Show the delete confirmation modal
    };

    const handleDeleteConfirm = () => {
        console.log(productToDelete)
        setProductDeleting(true)
        setShowDeleteModal(false); // Close the confirmation modal after deleting
        
        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/admin/delete-product`, {productToDelete: productToDelete},{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                console.log(response)
                if (response.data.code === "success") {
                    setAllProducts((prevState) => ({
                        ...prevState,
                        products: prevState.products.filter(
                            (product) => product.id !== productToDelete.id  // Filters out the deleted product
                        ),
                    }));
                    setProductDeleted(true)
                    setTimeout(()=> {
                        setProductDeleted(false)
                    }, 5000)
                    // window.location.reload()
                }
            })
            .finally(() => {
                setProductDeleting(false)
             

            });
    };

    useEffect(() => {
        let loaderTimeout;
        loaderTimeout = setTimeout(() => {
            setAllProducts((prevState) => ({
                ...prevState,
                products_loading: true,
            }));
        }, 200);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/get-all-products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((feedback) => {
                console.log(feedback)
                if (feedback.data.code === "success") {
                    setAllProducts({
                        products: feedback.data.data,
                        products_loading: false,
                    });
                }
            })
            .finally(() => {
                clearTimeout(loaderTimeout);
                setAllProducts((prev) => ({
                    ...prev,
                    products_loading: false,
                }));
            });
        return () => clearTimeout(loaderTimeout);
    }, []);

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
            try {
                const feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search-products`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
                setSearchState((prev) => ({
                    ...prev,
                    searchLoading: false,
                    searchData: [],
                    wordNotFound: query
                }));
            }
        };
        


    if (page === "editProductForm" && selectedProduct) {
        return (
            <EditProductForm
                product={selectedProduct}
                onClose={handleCloseModal}
            />
        );
    }

    return (
        <div>
            <section>
                {/* <div className="bread-crumb">
                    <div style={{ fontSize: "20px", fontWeight: "semi bold" }}>Admin Dashboard</div>
                    <div>Home / all products</div>
                    </div> */}
                    {productDeleting && <Loader />}
                     <div class="search-container search-container-fixed" style={{padding: "10px", display: "flex", alignItems: "center", gap: "20px", cursor: "pointer"}} onClick={() => setSearchState((prev) => ({...prev, isSearching: true}))}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span className="text-muted">Search...</span>
                    </div>
                    {productDeleted &&
                        <div className="arrow-box">
                            Product successfully deleted!
                        </div>
                    }

                <div className="container my-5 product-page-container">
                    <header className="mb-4">
                        <h3>All products</h3>
                    </header>
                    <div className="row">
                        {allProducts.products_loading && <BasicLoader />}
                        {allProducts.products?.slice().reverse().map((product) => {
                            console.log(product)
                            const productPrice = parseFloat(product.productPriceInNaira);
                            const convertedPrice = convertCurrency(productPrice, "NGN", selectedCurrency);
                            const currencySymbol = currencySymbols[selectedCurrency];
                            const firstImage = product.productImage;
     
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
                                                <span>{convertedPrice.toLocaleString()}</span>
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
            {/* search modal */}
            {searchState.isSearching && (
             <div className="custom-modal-overlay-form" onClick={() => setSearchState((prev) => ({...prev, isSearching: false}))}>
                <div
                    className="card custom-modal-card"
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
                                return <div key={index} className="admin-search-result-container" onClick={()=> {setSearchState((prev) => ({...prev, isSearching: false, searchLoading: false, wordNotFound: null})), setSelectedProduct(product)}}>
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

            {/* Custom Modal */}
            {selectedProduct && (
            <div className="custom-modal-overlay" onClick={() => setSelectedProduct(null)}>
                <div onClick={(e) => e.stopPropagation()} className="card custom-modal-card" style={{ width: "400px", maxHeight: "600px", overflowY: "auto", paddingTop: "20px" }}>
                    <div className="image-scroll-container">
                        {[
                            selectedProduct.productImage,
                            selectedProduct.subImage1,
                            selectedProduct.subImage2,
                            selectedProduct.subImage3
                        ].filter(image => image && image !== "null").map((image, index) => (
                            <img key={index} src={image} alt={`Product Image ${index + 1}`} className="modal-image" />
                        ))}
                    </div>
                    <div className="card-body">
                        <div className="card-title">
                            <h5>
                                Price: {currencySymbols[selectedCurrency]}
                                {convertCurrency(parseFloat(selectedProduct.productPriceInNaira), "NGN", selectedCurrency)}
                            </h5>
                        </div>
                        <p className="card-text">{selectedProduct.productName}</p>
                        <div style={{ display: "flex", justifyContent: "right", gap: "10px" }}>
                            <button onClick={() => { setPage("editProductForm") }} className="btn" style={{ backgroundColor: "purple", color: "white", width: "100%", maxWidth: "100px" }}>
                                Edit
                            </button>
                            <button
                                className="btn"
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "100%",
                                    maxWidth: "100px",
                                }}
                                onClick={() => handleDeleteClick(selectedProduct)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}



            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                
                <div className="custom-modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div
                        className="card custom-modal-card"
                        style={{
                            width: "400px",
                            padding: "20px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                            <img src={productToDelete.productImage} alt="" width="50px" />
                            <p>{productToDelete.productName}</p>
                        </div>
                        <h5 className="mt-2">Delete this item?</h5>
                        <p>This action is irreversible as it can not be undone</p>
                        <div style={{ display: "flex", justifyContent: "right", gap: "10px", marginTop: "20px" }}>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="btn"
                                style={{
                                    backgroundColor: "gray",
                                    color: "white",
                                    width: "100px",
                                }}
                            >
                                No
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="btn"
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    width: "100px",
                                }}
                            >
                                Yes
                            </button>
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
