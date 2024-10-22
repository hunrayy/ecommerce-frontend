import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../../loader/Loader";
import "./editProduct.css";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const EditProductForm = ({ product, onClose}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productImage: null,
        subImage1: null,
        subImage2: null,
        subImage3: null,
        productName: "",
        productPrice: "",
    });
    const [imagePreviews, setImagePreviews] = useState({
        productImage: null,
        subImage1: null,
        subImage2: null,
        subImage3: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [serverSuccessState, setServerSuccessState] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState({
        status: false,
        message: "",
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                productId: product._id,
                productImage: product.productImage || null,
                subImage1: product.subImage1 || null,
                subImage2: product.subImage2 || null,
                subImage3: product.subImage3 || null,
                productName: product.productName,
                productPrice: product.productPriceInNaira,
            });
            // Set image previews
            setImagePreviews({
                productImage: product.productImage ? URL.createObjectURL(new Blob([product.productImage])) : null,
                subImage1: product.subImage1 ? URL.createObjectURL(new Blob([product.subImage1])) : null,
                subImage2: product.subImage2 ? URL.createObjectURL(new Blob([product.subImage2])) : null,
                subImage3: product.subImage3 ? URL.createObjectURL(new Blob([product.subImage3])) : null,
            });
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { id, files } = e.target;
        const file = files ? files[0] : null;

        // Update formData
        setFormData((prevState) => ({
            ...prevState,
            [id]: file,
        }));

        // Update image previews
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setImagePreviews((prevState) => ({
                ...prevState,
                [id]: objectURL,
            }));
        } else {
            setImagePreviews((prevState) => ({
                ...prevState,
                [id]: null,
            }));
        }
    };

    const formatNumberWithCommas = (value) => {
        if (!value) return "";
        return value.replace(/\D/g, "") // Remove non-numeric characters
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
    };

    const removeCommas = (value) => {
        return value.replace(/,/g, "");
    };

    const isFormValid = formData.productName && formData.productPrice;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            setShowModal(true);
        }
    };

    const handlePostProduct = async () => {
        setShowModal(false);
        setIsLoading(true);
        setServerErrorMessage({ status: false, message: "" });

        const uploadData = new FormData();
        if (formData.productImage) uploadData.append("productImage", formData.productImage);
        if (formData.subImage1) uploadData.append("subImage1", formData.subImage1);
        if (formData.subImage2) uploadData.append("subImage2", formData.subImage2);
        if (formData.subImage3) uploadData.append("subImage3", formData.subImage3);
        uploadData.append("productName", formData.productName);
        uploadData.append("productPrice", formData.productPrice);
        try {
            const token = Cookies.get("authToken");
            const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/update-product`,
                uploadData,
                {
                    params: {
                        productId: product.id
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            if (feedback) {
                console.log(feedback)
                setIsLoading(false);
                if (feedback.data.code === "success") {
                    setServerSuccessState(true);
                    setTimeout(() => {
                        setServerSuccessState(false);
                    }, 5000);
                     setFormData({
                        productId: null,
                        productImage: null,
                        subImage1: null,
                        subImage2: null,
                        subImage3: null,
                        productName: "",
                        productPrice: "",
                    });
                    setImagePreviews({
                        productImage: null,
                        subImage1: null,
                        subImage2: null,
                        subImage3: null,
                    });
                    
                   
                } else {
                    setServerErrorMessage({
                        status: true,
                        message: feedback.data.message,
                    });
                }
            }
        } catch (error) {
            console.error("Error updating product:", error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <Loader />}
            <div className="admin-editPage-container">
                <div className="bread-crumb">
                    <div style={{ fontSize: "20px", fontWeight: "semi bold" }}>Admin Dashboard</div>
                    <div>Home / Edit Product</div>
                </div>
                <div style={{ padding: "20px 0 0 20px", fontSize: "20px" }} className="d-lg-none">
                    <i className="fa-solid fa-arrow-left" onClick={onClose}></i>
                </div>
                <div className="admin-editPage-form" style={{ padding: "0px 20px 35px 20px" }}>
                    {serverErrorMessage.status && (
                        <div className="alert alert-danger">{serverErrorMessage.message}</div>
                    )}
                    {serverSuccessState && <div className="arrow-box">Product successfully updated!</div>}

                    <h2>Edit Product</h2>
                    <form onSubmit={handleSubmit} className="row">
                        <div className="mb-3">
                            <label htmlFor="productImage" className="form-label">Main Product Image</label>
                            <div style={{display: "flex"}}>
                                 <input type="file" className="form-control" id="productImage" onChange={handleInputChange} />
                                 {formData && (
                                    <div>
                                        <img src={product.productImage} alt="Product" style={{ width: '30px', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subImage1" className="form-label">Sub Image 1 (optional)</label>
                            <div style={{display: "flex"}}>
                                <input type="file" className="form-control" id="subImage1" onChange={handleInputChange} />
                                {(product.subImage1 && product.subImage1 !== "null") && (
                                    <div>
                                        <img src={product.subImage1} alt="Sub Image 1" style={{ width: '30px', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subImage2" className="form-label">Sub Image 2 (optional)</label>
                            <div style={{display: "flex"}}>
                                <input type="file" className="form-control" id="subImage2" onChange={handleInputChange} />
                                {(product.subImage2 && product.subImage2 !== "null") && (
                                    <div>
                                        <img src={product.subImage2} alt="Sub Image 2" style={{ width: '30px', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subImage3" className="form-label">Sub Image 3 (optional)</label>
                            <div style={{display: "flex"}}>
                                <input type="file" className="form-control" id="subImage3" onChange={handleInputChange} />
                                {(product.subImage3 && product.subImage3 !== "null") && (
                                    <div>
                                        <img src={product.subImage3} alt="Sub Image 3" style={{ width: '30px', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="productName" value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">Product Price</label>
                            <input type="text" className="form-control" id="productPrice" value={formatNumberWithCommas(formData.productPrice)} onChange={(e) => setFormData({ ...formData, productPrice: removeCommas(e.target.value) })} />
                        </div>
                        <button type="submit" className="btn" style={{background: "purple", color: "white"}}>Update</button>
                    </form>
                </div>
            </div>

            {/* Custom modal */}
            {showModal && (
                <div className="custom-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="custom-modal-card card p-5" onClick={(e) => e.stopPropagation()}>
                            {/* <button className="close-btn" onClick={() => setShowModal(false)}>
                                &times;
                            </button> */}
                        <div className="custom-modal-header">
                            <h5>Confirm Changes</h5>
                        </div>
                        <div className="custom-modal-body">
                            <p>Are you sure you want to save these changes?</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "right", gap: "10px"}}>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="btn" style={{backgroundColor: "purple", color: "white"}} onClick={handlePostProduct}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProductForm;



































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Loader from "../../loader/Loader";
// import { Modal, Button } from "react-bootstrap";
// import "./editProduct.css";
// import { useNavigate } from "react-router-dom";
// import { Card } from "react-bootstrap";

// const EditProductForm = ({ product, onClose, onSave }) => {
//     const navigate = useNavigate()
//     const [formData, setFormData] = useState({
//         productImage: null,
//         subImage1: null,
//         subImage2: null,
//         subImage3: null,
//         productName: "",
//         productDescription: "",
//         productPrice: "",
//     });
//     const [imagePreviews, setImagePreviews] = useState({
//         productImage: null,
//         subImage1: null,
//         subImage2: null,
//         subImage3: null,
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [serverSuccessState, setServerSuccessState] = useState(false);
//     const [serverErrorMessage, setServerErrorMessage] = useState({
//         status: false,
//         message: ""
//     });
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         if (product) {
//             setFormData({
//                 productId: product._id,
//                 productImage: product.images[0] || null,
//                 subImage1: product.images[1] || null,
//                 subImage2: product.images[2] || null,
//                 subImage3: product.images[3] || null,
//                 productName: product.productName,
//                 productDescription: product.productDescription,
//                 productPrice: product.productPriceInNaira,
//             });
//             // Set image previews
//             setImagePreviews({
//                 productImage: product.images[0] ? URL.createObjectURL(new Blob([product.images[0]])) : null,
//                 subImage1: product.images[1] ? URL.createObjectURL(new Blob([product.images[1]])) : null,
//                 subImage2: product.images[2] ? URL.createObjectURL(new Blob([product.images[2]])) : null,
//                 subImage3: product.images[3] ? URL.createObjectURL(new Blob([product.images[3]])) : null,
//             });
//         }
//     }, [product]);

//     const handleInputChange = (e) => {
//         const { id, files } = e.target;
//         const file = files ? files[0] : null;

//         // Update formData
//         setFormData(prevState => ({
//             ...prevState,
//             [id]: file,
//         }));

//         // Update image previews
//         if (file) {
//             const objectURL = URL.createObjectURL(file);
//             setImagePreviews(prevState => ({
//                 ...prevState,
//                 [id]: objectURL,
//             }));
//         } else {
//             setImagePreviews(prevState => ({
//                 ...prevState,
//                 [id]: null,
//             }));
//         }
//     };

//     const formatNumberWithCommas = (value) => {
//         if (!value) return "";
//         return value.replace(/\D/g, '') // Remove non-numeric characters
//                     .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
//     };

//     const removeCommas = (value) => {
//         return value.replace(/,/g, '');
//     };

//     const isFormValid = formData.productName && formData.productDescription && formData.productPrice;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isFormValid) {
//             setShowModal(true);
//         }
//     };

//     const handlePostProduct = async () => {
//         setShowModal(false);
//         setIsLoading(true);
//         setServerErrorMessage({ status: false, message: "" });

//         const uploadData = new FormData();
//         if (formData.productImage) uploadData.append('productImage', formData.productImage);
//         if (formData.subImage1) uploadData.append('subImage1', formData.subImage1);
//         if (formData.subImage2) uploadData.append('subImage2', formData.subImage2);
//         if (formData.subImage3) uploadData.append('subImage3', formData.subImage3);
//         uploadData.append('productName', formData.productName);
//         uploadData.append('productDescription', formData.productDescription);
//         uploadData.append('productPrice', formData.productPrice);

//         try {
//             const token = Cookies.get("authToken");
//             const feedback = await axios.put(
//                 `${import.meta.env.VITE_BACKEND_URL}/admin/update-product/${product.id}`,
//                 uploadData,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             );
//             if (feedback) {
//                 setFormData({
//                     productId: null,
//                     productImage: null,
//                     subImage1: null,
//                     subImage2: null,
//                     subImage3: null,
//                     productName: "",
//                     productDescription: "",
//                     productPrice: ""
//                 });
//                 setImagePreviews({
//                     productImage: null,
//                     subImage1: null,
//                     subImage2: null,
//                     subImage3: null,
//                 });
//                 setIsLoading(false);
//                 if (feedback.data.code === "success") {
//                     setServerSuccessState(true);
//                     setTimeout(() => {
//                         setServerSuccessState(false);
//                     }, 5000);
//                     onSave(feedback.data.data);
//                     onClose();
//                 } else {
//                     setServerErrorMessage({
//                         status: true,
//                         message: feedback.data.message
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error('Error updating product:', error);
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div>
//             {isLoading && <Loader />}
//             <div className="admin-editPage-container">
                
//                 <div className="bread-crumb">
//                     <div style={{ fontSize: "20px", fontWeight: "semi bold" }}>Admin Dashboard</div>
//                     <div>Home / Edit Product</div>
//                 </div>
//                 <div style={{ padding: "20px", fontSize: "20px"}} className="d-lg-none">
//                     <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
//                 </div>
//                 <div className="admin-editPage-form" style={{padding: "20px 20px 35px 20px"}}>
//                     {serverErrorMessage.status &&
//                         <div className="alert alert-danger">{serverErrorMessage.message}</div>
//                     }
//                     {serverSuccessState &&
//                         <div className="arrow-box">
//                             Product successfully updated!
//                         </div>
//                     }
                   
//                     <h2>Edit Product</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="productImage" className="form-label">Main Product Image</label>
//                             <div style={{display: "flex"}}>
//                                 <input type="file" className="form-control" id="productImage" onChange={handleInputChange} />
//                                 {formData && (
//                                     <div>
//                                         <img src={product.images[0]} alt="Product" style={{ width: '30px', height: 'auto' }} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage1" className="form-label">Sub Image 1 (optional)</label>
//                             <div style={{display: "flex"}}>
//                                 <input type="file" className="form-control" id="subImage1" onChange={handleInputChange} />
//                                 {product.images[1] && (
//                                     <div>
//                                         <img src={product.images[1]} alt="Sub Image 1" style={{ width: '30px', height: 'auto' }} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage2" className="form-label">Sub Image 2 (optional)</label>
//                             <div style={{display: "flex"}}>
//                                 <input type="file" className="form-control" id="subImage2" onChange={handleInputChange} />
//                                 {product.images[2] && (
//                                     <div>
//                                         <img src={product.images[2]} alt="Sub Image 2" style={{ width: '30px', height: 'auto' }} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage3" className="form-label">Sub Image 3 (optional)</label>
//                            <div style={{display: "flex"}}>
//                                 <input type="file" className="form-control" id="subImage3" onChange={handleInputChange} />
//                                 {product.images[3] && (
//                                     <div>
//                                         <img src={product.images[3]} alt="Sub Image 3" style={{ width: '30px', height: 'auto' }} />
//                                     </div>
//                                 )}
//                            </div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productName" className="form-label">Product Name</label>
//                             <input type="text" className="form-control" id="productName" value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productDescription" className="form-label">Product Description</label>
//                             <textarea className="form-control" id="productDescription" rows="3" value={formData.productDescription} onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}></textarea>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productPrice" className="form-label">Product Price</label>
//                             <input type="text" className="form-control" id="productPrice" value={formatNumberWithCommas(formData.productPrice)} onChange={(e) => setFormData({ ...formData, productPrice: removeCommas(e.target.value) })} />
//                         </div>
//                         <button type="submit" className="btn btn-primary">Show preview</button>
//                     </form>
//                 </div>
//             </div>

//             <div className="custom-modal-overlay" onClick={()=> setSelectedProduct(null)}>
//                     <div class="card custom-modal-card" style={{width: "400px", maxHeight: "600px", overflowY: "auto", paddingTop: "20px"}} onClick={(e)=> e.stopPropagation()}>
//   {/* <img src={selectedProduct.images[0]} class="card-img-top" alt="..." style={{aspectRatio: "1 / 1", objectFit: "contain"}} /> */}
//   <div className="image-scroll-container">
//                             {selectedProduct.images.map((image, index) => (
//                                 <img key={index} src={image} alt={`Product Image ${index + 1}`} className="modal-image" />
//                             ))}
//                             </div>
//   <div class="card-body">
//     <div className="card-title">
//         <h5>Price: {currencySymbols[selectedCurrency]}{convertCurrency(parseFloat(selectedProduct.productPriceInNaira), "NGN", selectedCurrency)}</h5>
//     </div>
//     <p class="card-text">{selectedProduct.productName}</p>
//     <p>Color: {selectedProduct.productDescription}</p>
//     <div style={{display: "flex", justifyContent: "right", gap: "10px"}}>
//         <button onClick={()=> {setPage("editProductForm")}} className="btn" style={{backgroundColor: "purple", color: "white", width: "100%", maxWidth: "100px"}}>Edit</button>
//         <button className="btn" style={{backgroundColor: "black", color: "white", width: "100%", maxWidth: "100px"}}>Delete</button>
//     </div>
//   </div>
// </div>
//                 </div>

//         </div>
//     );
// };

// export default EditProductForm;
