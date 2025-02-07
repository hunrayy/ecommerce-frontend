import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import './productCategories.css';

const ProductCategories = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [modalType, setModalType] = useState(null); // 'create', 'edit', or 'delete'
  const [currentCategory, setCurrentCategory] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [categoryNameInput, setCategoryNameInput] = useState(""); // For delete confirmation
  const [deletePhraseInput, setDeletePhraseInput] = useState(""); // For delete confirmation

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const fetchProductCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fetch-product-categories`);
      if (data.code === 'success') setProductCategories(data.data);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    }
  };
  const token = Cookies.get('authToken');

  const handleSave = async () => {
    if (modalType === "create") {
      if (!inputValue.trim()) return alert("Category name cannot be empty!");
      try {
        const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/create-product-category`, { newCategory: inputValue }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (feedback.data.code === 'success') setProductCategories([...productCategories, feedback.data.data]);
      } catch (error) {
        console.error("Error creating product category:", error);
      }
    } 
    else if (modalType === "edit") {
      try {
        const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/edit-product-category`,  {
          oldCategory: currentCategory.name, // Send old category name
          newCategory: inputValue // Send new category name
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (feedback.data.code === 'success') {
          setProductCategories(productCategories.map(cat => cat.id === currentCategory.id ? { ...cat, name: inputValue } : cat));
        }
      } catch (error) {
        console.error("Error updating product category:", error);
      }
    } 
    else if (modalType === "delete") {
      if (categoryNameInput !== currentCategory.name || deletePhraseInput !== "delete this category") {
        return alert("Please enter the correct category name and phrase to confirm deletion.");
      }
      try {
        const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/delete-product-category`, {
          category: currentCategory.name 
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        if (feedback.data.code === 'success') {
          setProductCategories(productCategories.filter(cat => cat.name !== currentCategory.name));
        }
      } catch (error) {
        console.error("Error deleting product category:", error);
      }
      
    }
    closeModal();
  };

  const openModal = (type, category = null) => {
    setModalType(type);
    setCurrentCategory(category);
    setInputValue(type === "edit" ? category.name : "");
    setCategoryNameInput(""); // Reset delete confirmation inputs
    setDeletePhraseInput("");
  };

  const closeModal = () => {
    setModalType(null);
    setInputValue("");
    setCategoryNameInput("");
    setDeletePhraseInput("");
    setCurrentCategory(null);
  };

  return (
    <div className="product-category-main">
      <div className="my-3" style={{ display: "flex", justifyContent: "right" }}>
        <button className="btn btn-primary" onClick={() => openModal("create")}>
          <i className="fa-solid fa-plus"></i> <span className="px-1">New Category</span>
        </button>
      </div>

      {productCategories.map((category) => (
        <div key={category.id} className="each-product-category">
          <p>{category.name}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-dark" onClick={() => openModal("edit", category)}>Edit</button>
            <button className="btn btn-danger" onClick={() => openModal("delete", category)}>Delete</button>
          </div>
        </div>
      ))}

      {/* Single Modal */}
      {modalType && (
        <div className="single-order-container-overlay" onClick={closeModal}>
          <div className="out-for-delivery-modal-wrapper px-4" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ textAlign: "center" }}>
              {modalType === "create" && "Create New Product Category"}
              {modalType === "edit" && "Edit Product Category"}
              {modalType === "delete" && "Warning: Deleting this Category is Permanent"}
            </h3>

            {modalType === "delete" ? (
              <>
                <p style={{ textAlign: "center" }}>
                  Deleting this category is permanent and cannot be undone. Additionally, all products with this category will now have their category set to <strong>null</strong>.
                  To confirm, type the category name <strong>{currentCategory?.name}</strong> and the phrase <strong>"delete this category"</strong>.
                </p>
                <form style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }} onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "80%" }}
                    value={categoryNameInput}
                    onChange={(e) => setCategoryNameInput(e.target.value)}
                    placeholder="Category Name"
                    autoFocus
                  />
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "80%" }}
                    value={deletePhraseInput}
                    onChange={(e) => setDeletePhraseInput(e.target.value)}
                    placeholder="delete this category"
                  />
                </form>
              </>
            ) : (
              <form 
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }} 
                onSubmit={(e) => { e.preventDefault(); handleSave(); }}
              >
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "80%" }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Category Name"
                  autoFocus
                />
              </form>
            )}

            <div className="mt-2" style={{ display: "flex", justifyContent: "right", gap: "10px" }}>
              <button className="btn btn-danger" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>
                {modalType === "delete" ? "Confirm Delete" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategories;





































// import { useState, useEffect } from "react";
// import axios from "axios";
// import './productCategories.css';

// const ProductCategories = () => {
//   const [productCategories, setProductCategories] = useState([]);
//   const [showEditProductCategoryModal, setShowEditProductCategoryModal] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);
//   const [categoryNameInput, setCategoryNameInput] = useState("");
//   const [deletePhraseInput, setDeletePhraseInput] = useState("");

//   // New Category Modal State
//   const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
//   const [newCategoryInput, setNewCategoryInput] = useState("");

//   // Fetch product categories
//   const fetchProductCategories = async () => {
//     try {
//       const feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fetch-product-categories`);
//       if (feedback.data.code === 'success') {
//         setProductCategories(feedback.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching product categories:", error);
//     }
//   };

//   // Create a new product category
//   const createProductCategory = async () => {
//     if (newCategoryInput.trim() === "") {
//       alert("Category name cannot be empty!");
//       return;
//     }
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-product-category`, { name: newCategoryInput });
//       if (response.data.code === 'success') {
//         setProductCategories([...productCategories, response.data.data]);
//         setShowNewCategoryModal(false);
//         setNewCategoryInput("");
//       }
//     } catch (error) {
//       console.error("Error creating product category:", error);
//     }
//   };

//   // Edit product category logic
//   const editProductCategory = async () => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/edit-product-category/${editingCategory.id}`,
//         { name: newCategoryName }
//       );
//       if (response.data.code === 'success') {
//         setProductCategories(prevCategories =>
//           prevCategories.map(cat =>
//             cat.id === editingCategory.id ? { ...cat, name: newCategoryName } : cat
//           )
//         );
//         setShowEditProductCategoryModal(false);
//       }
//     } catch (error) {
//       console.error("Error updating product category:", error);
//     }
//   };

//   // Delete product category logic
//   const deleteProductCategory = async () => {
//     if (categoryNameInput === categoryToDelete.name && deletePhraseInput === "delete this category") {
//       try {
//         const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-product-category/${categoryToDelete.id}`);
//         if (response.data.code === 'success') {
//           setProductCategories(prevCategories =>
//             prevCategories.filter(cat => cat.id !== categoryToDelete.id)
//           );
//           setShowDeleteWarningModal(false);
//         }
//       } catch (error) {
//         console.error("Error deleting product category:", error);
//       }
//     } else {
//       alert("Please ensure you've typed the correct category name and confirmation phrase.");
//     }
//   };

//   // Open modals
//   const openEditModal = (category) => {
//     setEditingCategory(category);
//     setNewCategoryName(category.name);
//     setShowEditProductCategoryModal(true);
//   };

//   const openDeleteWarningModal = (category) => {
//     setCategoryToDelete(category);
//     setShowDeleteWarningModal(true);
//   };

//   const closeDeleteWarningModal = () => {
//     setShowDeleteWarningModal(false);
//     setCategoryNameInput("");
//     setDeletePhraseInput("");
//   };

//   useEffect(() => {
//     fetchProductCategories();
//   }, []);

//   return (
//     <div className="product-category-main">
//       <div style={{ width: "100%", display: "flex", justifyContent: "right" }} className="my-3">
//         <button className="btn btn-primary" style={{ width: "fit-content" }} onClick={() => setShowNewCategoryModal(true)}>
//           <i className="fa-solid fa-plus"></i><span className="px-1">New Category</span>
//         </button>
//       </div>

//       {productCategories.length > 0 && productCategories.map((eachCategory, index) => (
//         <div key={index} className="each-product-category">
//           <p>{eachCategory.name}</p>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <button className="btn btn-dark" onClick={() => openEditModal(eachCategory)}>Edit</button>
//             <button className="btn btn-danger" onClick={() => openDeleteWarningModal(eachCategory)}>Delete</button>
//           </div>
//         </div>
//       ))}

//       {/* New Category Modal */}
//       {showNewCategoryModal && (
//         <div className="single-order-container-overlay" onClick={() => setShowNewCategoryModal(false)}>
//           <div className="out-for-delivery-modal-wrapper px-4" onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ textAlign: "center" }}>Create New Product Category</h3>
//             <form style={{ display: "flex", justifyContent: "center" }} onSubmit={(e) => {
//               e.preventDefault();
//               createProductCategory();
//             }}>
//               <input
//                 type="text"
//                 className="form-control"
//                 style={{ width: "80%" }}
//                 value={newCategoryInput}
//                 onChange={(e) => setNewCategoryInput(e.target.value)}
//                 autoFocus
//               />
//             </form>
//             <div style={{ display: "flex", justifyContent: "right", gap: "10px" }} className="mt-2">
//               <button className="btn btn-danger" onClick={() => setShowNewCategoryModal(false)}>Cancel</button>
//               <button className="btn btn-primary" onClick={createProductCategory}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Category Modal */}
//       {showEditProductCategoryModal && (
//         <div className="single-order-container-overlay" onClick={() => setShowEditProductCategoryModal(false)}>
//           <div className="out-for-delivery-modal-wrapper px-4" onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ textAlign: "center" }}>Edit Product Category</h3>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               editProductCategory();
//             }}>
//               <input
//                 type="text"
//                 className="form-control"
//                 style={{ width: "80%" }}
//                 value={newCategoryName}
//                 onChange={(e) => setNewCategoryName(e.target.value)}
//                 autoFocus
//               />
//             </form>
//             <div className="mt-2">
//               <button className="btn btn-danger" onClick={() => setShowEditProductCategoryModal(false)}>Cancel</button>
//               <button className="btn btn-primary" onClick={editProductCategory}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete category modal */}
      // {showDeleteWarningModal && (
      //   <div className="single-order-container-overlay" onClick={closeDeleteWarningModal}>
      //     <div className="out-for-delivery-modal-wrapper px-4" onClick={(e) => e.stopPropagation()}>
      //       <h3 style={{ textAlign: "center" }}>Warning: Deleting this Category is Permanent</h3>
      //       <p style={{ textAlign: "center" }}>
      //         Deleting this category is permanent and cannot be undone. Additionally, all products with this category will now have their category set to <strong>null</strong>.
      //         To confirm, please type the category name and the phrase "delete this category".
      //       </p>
      //       <form style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }} onSubmit={(e) => {
      //         e.preventDefault();
      //         deleteProductCategory();
      //       }}>
      //         <input
      //           type="text"
      //           className="form-control"
      //           style={{ width: "80%" }}
      //           value={categoryNameInput}
      //           onChange={(e) => setCategoryNameInput(e.target.value)}
      //           placeholder="Category Name"
      //           autoFocus
      //         />
      //         <input
      //           type="text"
      //           className="form-control"
      //           style={{ width: "80%" }}
      //           value={deletePhraseInput}
      //           onChange={(e) => setDeletePhraseInput(e.target.value)}
      //           placeholder="delete this category"
      //         />
      //       </form>
      //       <div style={{ display: "flex", justifyContent: "right", gap: "10px" }} className="mt-2">
      //         <button className="btn btn-danger" onClick={closeDeleteWarningModal}>Cancel</button>
      //         <button className="btn btn-primary" onClick={deleteProductCategory}>Confirm Delete</button>
      //       </div>
      //     </div>
      //   </div>
      // )}
//     </div>
//   );
// };

// export default ProductCategories;
















