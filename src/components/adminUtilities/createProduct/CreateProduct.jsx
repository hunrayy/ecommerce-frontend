import { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import "./createProduct.css";
import axios from "axios";
import Loader from "../../loader/Loader";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productImage: null,
        subImage1: null,
        subImage2: null,
        subImage3: null,
        productName: "",
        productPrice: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [serverSuccessState, setServerSuccessState] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState({
        status: false,
        message: ""
    });
    const [showModal, setShowModal] = useState(false);

    // Format number with commas for display
    const formatNumberWithCommas = (value) => {
        if (!value) return "";
        return value.replace(/\D/g, '') // Remove non-numeric characters
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
    };

    // Remove commas to get raw number
    const removeCommas = (value) => {
        return value.replace(/,/g, '');
    };

    // Handler to update form data
    const handleInputChange = (e) => {
        const { id, files, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: files ? files[0] : id === 'productPrice' ? removeCommas(value) : value,
        }));
    };

    // Check if all required fields are filled
    const isFormValid = formData.productImage && formData.productName && formData.productPrice;

    // Show modal for preview on form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            setShowModal(true);
        }
    };

    // Render image preview for the modal
    const renderImagePreview = (imageFile) => {
        return imageFile ? URL.createObjectURL(imageFile) : null;
    };

    // Create an array of all images (main + sub images)
    const allImages = [
        formData.productImage,
        formData.subImage1,
        formData.subImage2,
        formData.subImage3,
    ].filter(Boolean); // Filter out null values

    const token = Cookies.get("authToken");
    const handlePostProduct = async () => {
        setShowModal(false);
        setIsLoading(true);
        setServerErrorMessage({ status: false, message: "" });
    
        // Create a FormData object
        const uploadData = new FormData();
        // Append main product image
        uploadData.append('productImage', formData.productImage || null);
        // Append sub images, even if they're null
        uploadData.append('subImage1', formData.subImage1 || null);
        uploadData.append('subImage2', formData.subImage2 || null);
        uploadData.append('subImage3', formData.subImage3 || null);
        // Append other form fields
        uploadData.append('productName', formData.productName);
        uploadData.append('productPrice', formData.productPrice); // Raw price without commas
    
        // Perform the upload
        try {
            const feedback = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/create-product`, 
                uploadData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(feedback);
            if (feedback) {
                // Reset form data
                setFormData({
                    productImage: null,
                    subImage1: null,
                    subImage2: null,
                    subImage3: null,
                    productName: "",
                    productPrice: ""
                });
                setIsLoading(false);
                if (feedback.data.code === "success") {
                    setServerSuccessState(true);
                    setTimeout(() => setServerSuccessState(false), 5000);
                } else {
                    setServerErrorMessage({
                        status: true,
                        message: feedback.data.message
                    });
                }
            }
        } catch (error) {
            console.log('Error uploading product:', error.message);
            setIsLoading(false);
            setServerErrorMessage({ status: true, message: 'An error occurred. Please try again.' });
        }
    };
    

    return (
        <div>
            {isLoading && <Loader />}
            <div className="admin-createPage-container">
                <div className="bread-crumb">
                    <div style={{ fontSize: "20px", fontWeight: "semi bold" }}>Admin Dashboard</div>
                    <div>Home / Create Product</div>
                </div>
                <div className="admin-createPage-form">
                    {serverErrorMessage.status &&
                        <div className="alert alert-danger">{serverErrorMessage.message}</div>
                    }
                    {serverSuccessState &&
                        <div className="arrow-box">
                            Product successfully uploaded!
                        </div>
                    }
                    <h2>Create Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="productImage" className="form-label">Main Product Image</label>
                            <input type="file" className="form-control" id="productImage" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subImage1" className="form-label">Sub Image 1 (optional)</label>
                            <input type="file" className="form-control" id="subImage1" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subImage2" className="form-label">Sub Image 2 (optional)</label>
                            <input type="file" className="form-control" id="subImage2" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subImage3" className="form-label">Sub Image 3 (optional)</label>
                            <input type="file" className="form-control" id="subImage3" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="productName" placeholder="Enter product name" value={formData.productName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">Product Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productPrice"
                                placeholder="Enter product price"
                                value={formatNumberWithCommas(formData.productPrice)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn" style={{ background: "purple", borderColor: "purple", color: "white" }} disabled={!isFormValid}>
                            Show preview
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal for Product Preview */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Preview Product</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-left">
                    <Card style={{ width: '100%', margin: '0 auto' }}>
                        {/* Horizontally scrollable image container */}
                        <div className="image-scroll-container">
                            {allImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={renderImagePreview(image)}
                                    alt={`Product Image ${index + 1}`}
                                    className="scrollable-image"
                                />
                            ))}
                        </div>
                        <Card.Body>
                            <Card.Title>{formData.productName}</Card.Title>
                            <Card.Text>
                                <strong>Price:</strong> {formatNumberWithCommas(formData.productPrice)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button style={{background: "purple"}} onClick={handlePostProduct}>
                        Upload Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateProduct;



























































// import { useState } from "react";
// import { Modal, Button, Card } from "react-bootstrap";
// import "./createProduct.css";
// import axios from "axios";
// import Loader from "../../loader/Loader";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// const CreateProduct = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         productImage: null,
//         subImage1: null,
//         subImage2: null,
//         subImage3: null,
//         productName: "",
//         productDescription: "",
//         productPrice: "",
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [serverSuccessState, setServerSuccessState] = useState(false);
//     const [serverErrorMessage, setServerErrorMessage] = useState({
//         status: false,
//         message: ""
//     });
//     const [showModal, setShowModal] = useState(false);

//     // Format number with commas for display
//     const formatNumberWithCommas = (value) => {
//         if (!value) return "";
//         return value.replace(/\D/g, '') // Remove non-numeric characters
//                     .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
//     };

//     // Remove commas to get raw number
//     const removeCommas = (value) => {
//         return value.replace(/,/g, '');
//     };

//     // Handler to update form data
//     const handleInputChange = (e) => {
//         const { id, files, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [id]: files ? files[0] : id === 'productPrice' ? removeCommas(value) : value,
//         }));
//     };

//     // Check if all required fields are filled
//     const isFormValid = formData.productImage && formData.productName && formData.productDescription && formData.productPrice;

//     // Show modal for preview on form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isFormValid) {
//             setShowModal(true);
//         }
//     };

//     // Render image preview for the modal
//     const renderImagePreview = (imageFile) => {
//         return imageFile ? URL.createObjectURL(imageFile) : null;
//     };

//     // Create an array of all images (main + sub images)
//     const allImages = [
//         formData.productImage,
//         formData.subImage1,
//         formData.subImage2,
//         formData.subImage3,
//     ].filter(Boolean); // Filter out null values

//     const token = Cookies.get("authToken");
//     const handlePostProduct = async () => {
//         setShowModal(false);
//         setIsLoading(true);
//         setServerErrorMessage({ status: false, message: "" });

//         // Create a FormData object
//         const uploadData = new FormData();
//         uploadData.append('productImage', formData.productImage);
//         if (formData.subImage1) uploadData.append('subImage1', formData.subImage1);
//         if (formData.subImage2) uploadData.append('subImage2', formData.subImage2);
//         if (formData.subImage3) uploadData.append('subImage3', formData.subImage3);
//         uploadData.append('productName', formData.productName);
//         uploadData.append('productDescription', formData.productDescription);
//         uploadData.append('productPrice', formData.productPrice); // Raw price

//         // Perform the upload
//         try {
//             const feedback = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/admin/create-product`, uploadData,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             );
//             console.log(feedback);
//             if (feedback) {
//                 setFormData({
//                     productImage: null,
//                     subImage1: null,
//                     subImage2: null,
//                     subImage3: null,
//                     productName: "",
//                     productDescription: "",
//                     productPrice: ""
//                 });
//                 setIsLoading(false);
//                 if (feedback.data.code === "success") {
//                     setServerSuccessState(true);
//                     // Set a timeout to revert the state to false after 5 seconds
//                     setTimeout(() => {
//                         setServerSuccessState(false);
//                     }, 5000); // 5000 milliseconds = 5 seconds
//                 } else {
//                     setServerErrorMessage({
//                         status: true,
//                         message: feedback.data.message
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error('Error uploading product:', error);
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div>
//             {isLoading && <Loader />}
//             <div className="admin-createPage-container">
//                 <div className="bread-crumb">
//                     <div style={{ fontSize: "20px", fontWeight: "semi bold" }}>Admin Dashboard</div>
//                     <div>Home / Create Product</div>
//                 </div>
//                 <div className="admin-createPage-form">
//                     {serverErrorMessage.status &&
//                         <div className="alert alert-danger">{serverErrorMessage.message}</div>
//                     }
//                     {serverSuccessState &&
//                         <div className="arrow-box">
//                             Product successfully uploaded!
//                         </div>
//                     }
//                     <h2>Create Product</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="productImage" className="form-label">Main Product Image</label>
//                             <input type="file" className="form-control" id="productImage" onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage1" className="form-label">Sub Image 1 (optional)</label>
//                             <input type="file" className="form-control" id="subImage1" onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage2" className="form-label">Sub Image 2 (optional)</label>
//                             <input type="file" className="form-control" id="subImage2" onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage3" className="form-label">Sub Image 3 (optional)</label>
//                             <input type="file" className="form-control" id="subImage3" onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productName" className="form-label">Product Name</label>
//                             <input type="text" className="form-control" id="productName" placeholder="Enter product name" value={formData.productName} onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productDescription" className="form-label">Product Description</label>
//                             <textarea className="form-control" id="productDescription" rows="3" placeholder="Little description about product...anything at all" value={formData.productDescription} onChange={handleInputChange}></textarea>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productPrice" className="form-label">Product Price</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="productPrice"
//                                 placeholder="Enter product price"
//                                 value={formatNumberWithCommas(formData.productPrice)}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <button type="submit" className="btn" style={{ background: "purple", borderColor: "purple", color: "white" }} disabled={!isFormValid}>
//                             Show preview
//                         </button>
//                     </form>
//                 </div>
//             </div>

//             {/* Modal for Product Preview */}
//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Preview Product</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="text-left">
//                     <Card style={{ width: '100%', margin: '0 auto' }}>
//                         {/* Horizontally scrollable image container */}
//                         <div className="image-scroll-container">
//                             {allImages.map((image, index) => (
//                                 <img
//                                     key={index}
//                                     src={renderImagePreview(image)}
//                                     alt={`Product Image ${index + 1}`}
//                                     className="scrollable-image"
//                                 />
//                             ))}
//                         </div>
//                         <Card.Body>
//                             <Card.Title>{formData.productName}</Card.Title>
//                             <Card.Text>
//                                 {formData.productDescription}
//                             </Card.Text>
//                             <Card.Text>
//                                 <strong>Price:</strong> {formatNumberWithCommas(formData.productPrice)}
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Close
//                     </Button>
//                     <Button style={{background: "purple"}} onClick={handlePostProduct}>
//                         Upload Product
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default CreateProduct;















// import { useState } from "react";
// import { Modal, Button, Card } from "react-bootstrap";
// import "./createProduct.css";
// import axios from "axios";
// import Loader from "../../loader/Loader"
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// const CreateProduct = () => {
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
//     const [isLoading, setIsLoading] = useState(false)
//     const [serverSuccessState, setServerSuccessState] = useState(false)
//     const [serverErrorMessage, setServerErrorMessage] = useState({
//         status: false,
//         message: ""
//     })

//     const [showModal, setShowModal] = useState(false);

//     // Format number with commas
//     const formatNumberWithCommas = (value) => {
//         if (!value) return "";
//         return value.replace(/\D/g, '') // Remove non-numeric characters
//                     .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
//     };

//     // Handler to update form data
//     const handleInputChange = (e) => {
//         const { id, files, value } = e.target;
//         setFormData({
//             ...formData,
//             [id]: files ? files[0] : id === 'productPrice' ? formatNumberWithCommas(value) : value,
//         });
//     };

//     // Check if all required fields are filled
//     const isFormValid = formData.productImage && formData.productName && formData.productDescription && formData.productPrice;

//     // Show modal for preview on form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isFormValid) {
//             setShowModal(true);
//         }
//     };


//     // Render image preview for the modal
//     const renderImagePreview = (imageFile) => {
//         return imageFile ? URL.createObjectURL(imageFile) : null;
//     };

//     // Create an array of all images (main + sub images)
//     const allImages = [
//         formData.productImage,
//         formData.subImage1,
//         formData.subImage2,
//         formData.subImage3,
//     ].filter(Boolean); // Filter out null values

//     const token = Cookies.get("authToken")
//     const handlePostProduct = async () => {
//         setShowModal(false);
//         setIsLoading(true);
//         setServerErrorMessage({status: false, message: ""})
        
//         // Create a FormData object
//         const uploadData = new FormData();
//         uploadData.append('productImage', formData.productImage);
//         if (formData.subImage1) uploadData.append('subImage1', formData.subImage1);
//         if (formData.subImage2) uploadData.append('subImage2', formData.subImage2);
//         if (formData.subImage3) uploadData.append('subImage3', formData.subImage3);
//         uploadData.append('productName', formData.productName);
//         uploadData.append('productDescription', formData.productDescription);
//         uploadData.append('productPrice', formData.productPrice);
    
//         // Perform the upload
//         try {
//             const feedback = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/admin/create-product`, uploadData, 
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             );
//             console.log(feedback);
//             if (feedback) {
//                 setFormData({
//                     productImage: null,
//                     subImage1: null,
//                     subImage2: null,
//                     subImage3: null,
//                     productName: "",
//                     productDescription: "",
//                     productPrice: ""
//                 })
//                 setIsLoading(false);
//                 if (feedback.data.code === "success"){
//                     setServerSuccessState(true)
//                     // Set a timeout to revert the state to false after 5 seconds
//                     setTimeout(() => {
//                         setServerSuccessState(false);
//                     }, 5000); // 5000 milliseconds = 5 seconds
//                 }else{
//                     setServerErrorMessage({
//                         status: true,
//                         message: feedback.data.message
//                     })
//                 }
//             }
//         } catch (error) {
//             console.error('Error uploading product:', error);
//             setIsLoading(false);
//         }
//     };
    
    

//     return (
//         <div>
//             {isLoading && <Loader />}
//             <div className="admin-createPage-container">
//                 <div className="bread-crumb">
//                     <div style={{ fontSize: "20px", fontWeight: "semi bold" }}>Admin Dashboard</div>
//                     <div>Home / Create Product</div>
//                 </div>
//                 <div className="admin-createPage-form">
//                     {serverErrorMessage.status && 
//                         <div className="alert alert-danger">{serverErrorMessage.message}</div>
//                     }
//                     {serverSuccessState && 
//                         <div class="arrow-box">
//                             Product successfully uploaded!
//                         </div>
//                     }
//                     <h2>Create Product</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="productImage" className="form-label">Main Product Image</label>
//                             <input type="file" className="form-control" id="productImage" onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage1" className="form-label">Sub Image 1 (optional)</label>
//                             <input type="file" className="form-control" id="subImage1" onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage2" className="form-label">Sub Image 2 (optional)</label>
//                             <input type="file" className="form-control" id="subImage2" onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="subImage3" className="form-label">Sub Image 3 (optional)</label>
//                             <input type="file" className="form-control" id="subImage3" onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productName" className="form-label">Product Name</label>
//                             <input type="text" className="form-control" id="productName" placeholder="Enter product name" value={formData.productName} onChange={handleInputChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productDescription" className="form-label">Product Description</label>
//                             <textarea className="form-control" id="productDescription" rows="3" placeholder="Little description about product...anything at all" value={formData.productDescription} onChange={handleInputChange}></textarea>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productPrice" className="form-label">Product Price</label>
//                             <input type="text" className="form-control" id="productPrice" placeholder="Enter product price" value={formData.productPrice} onChange={handleInputChange} />
//                         </div>
//                         <button type="submit" className="btn" style={{background: "purple", borderColor: "purple", color: "white"}} disabled={!isFormValid}>
//                             Show preview
//                         </button>
//                     </form>
//                 </div>
//             </div>

//             {/* Modal for Product Preview */}
//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Preview Product</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="text-left">
//                     <Card style={{ width: '100%', margin: '0 auto' }}>
//                         {/* Horizontally scrollable image container */}
//                         <div className="image-scroll-container">
//                             {allImages.map((image, index) => (
//                                 <img
//                                     key={index}
//                                     src={renderImagePreview(image)}
//                                     alt={`Product Image ${index + 1}`}
//                                     className="scrollable-image"
//                                 />
//                             ))}
//                         </div>
//                         <Card.Body>
//                             <Card.Title>{formData.productName}</Card.Title>
//                             <Card.Text>
//                                 {formData.productDescription}
//                                 <br />
//                                 <strong>Price: </strong> <i className="fa-solid fa-naira-sign"></i>{formData.productPrice}
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button style={{backgroundColor: "purple", borderBlockColor: "purple"}} onClick={handlePostProduct}>
//                         Upload Product
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default CreateProduct;
