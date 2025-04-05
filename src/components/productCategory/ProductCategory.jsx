import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import "./productCategory.css";
import { toast } from "react-toastify"; 

const fetchCategories = async () => {
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds before making the request

  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fetch-product-categories`);
  if (response.data.code === "error") {
    toast.error(`Error fetching categories: ${response.data.message}`);
    throw new Error(response.data.message);
  } else if (response.data.code === "success") {
    return response.data.data.map(category => ({
      value: category.id,
      label: category.name,
      image: category.image,
    }));
  }
  throw new Error("Unknown error occurred");
};

const ProductCategory = () => {
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["productCategories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep cache for 10 minutes
    refetchOnWindowFocus: false,
    placeholderData: [], // Display empty placeholder data initially (before fetching)
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;

  return (
    <div className="product-category-container">
      {categories.map((category, index) => {
        // Convert the image URL to WebP format for Cloudinary
        const webpImageUrl = category.image.replace("/upload/", "/upload/f_auto,q_auto/");


        return <div key={index} className="card product-category-wrapper">
          <img src={webpImageUrl} className="product-category-wrapper-image" alt={category.label} />
          <div className="product-category-wrapper-text">{category.label}</div>
          {/* <p><b>{category.label}</b></p> */}
        </div>
        })}
    </div>
  );
};

export default ProductCategory;




















// import { useState, useEffect } from "react"
// import './productCategory.css'
// import axios from "axios";
// import { toast } from "react-toastify"
// const ProductCategory = () => {

//     const [categories, setCategories] = useState({
//         loading: true,
//         options: []
//     });
  
//     useEffect(()=> {
//     axios.get(`${import.meta.env.VITE_BACKEND_URL}/fetch-product-categories`).then((feedback) => {
//         console.log(feedback)
//         if(feedback.data.code == 'error'){
//             setCategories({
//                 loading: false,
//                 options: []
//             })
//             toast.error(`An error occured while fetching product categories: ${feedback.data.message}`)
//         }else if(feedback.data.code == 'success'){
//             // console.log(feedback)
//             const categoryOptions = feedback.data.data.map(category => ({
//                 value: category.id,  
//                 label: category.name,
//                 image: category.image
//             }));
//             setCategories({
//                 loading: false,
//                 options: categoryOptions
//             })
//         }else{
//             setCategories({
//                 loading: false,
//                 options: []
//             })
//             toast.error('An error occured while retrieving product categories')
//         }
//     })
//     }, [])
//     return <div className="product-category-container">
//     {categories.options &&
//       categories.options.map((category, index) => {
//         return (
//           <div key={index} className="card product-category-wrapper">
//             <img src={category.image} className="product-category-wrapper-image" alt=""/>
//             <div className="product-category-wrapper-text">
//               {category.label}
//             </div>
//           </div>
//         );
//       })}
//     </div>

// }


// export default ProductCategory




// {/* <header className="home-page-header-tag">
//    <p className="each-category-item" style={{color: "#f672a7"}}>New products</p>
   
//                    {categories.options && categories.options.map((category, index) => {
//                      console.log(categories)
//                                      // return <p key={index} className="each-category-item" onClick={() => {navigate(`/collections/all/?category=${category.label}`), setShownav(false)}}>{category.label}</p>
//                                      return <div key={index}>
//                                        <p>{category.label}</p>
//                                        <img width="200px" src={category.image} alt="" style={{aspectRatio: "3 / 4", objectFit: "cover"}} />
//                                      </div>
//                                  })}
//                                  <p className="each-category-item"  onClick={() => {navigate(`/collections/all/?category=All Products`)}}>All products</p>
// </header> */}