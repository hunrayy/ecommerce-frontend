import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState({
    products: JSON.parse(localStorage.getItem('cart_items')) || [],
    recentlyAddedProducts: [],
    productAddedToCartAnimation: false,
    addToCartAnimationMessage: '',
    totalPrice: "0.00",  // Initialize as a string
    lengthUpdateMessage: ""
  });

  useEffect(() => {
    // Update the total price whenever the cart products change
    const totalPrice = calculateTotalPrice(cartProducts.products);
    setCartProducts((prev) => ({
      ...prev,
      totalPrice
    }));
  }, [cartProducts.products]);

    const addToCart = (product, lengthPicked) => {
        let getItems = JSON.parse(localStorage.getItem('cart_items')) || [];
        const productExists = getItems.some(item => item.id === product.id);

        if (productExists) {
            getItems = getItems.filter(item => item.id !== product.id);
            setCartProducts((prevState) => ({
                ...prevState,
                recentlyAddedProducts: prevState.recentlyAddedProducts.filter(id => id !== product.id),
                productAddedToCartAnimation: true,
                addToCartAnimationMessage: "Product successfully removed"
            }));
        } else {
            getItems.push({
                ...product,
                lengthPicked: lengthPicked,
                quantity: 1
            });
            setCartProducts((prevState) => ({
                ...prevState,
                recentlyAddedProducts: [product.id, ...prevState.recentlyAddedProducts],
                productAddedToCartAnimation: true,
                addToCartAnimationMessage: <span>Product added successfully <i className="fa-sharp fa-solid fa-circle-check px-2"></i></span>
            }));
        }

        setTimeout(() => {
        setCartProducts((prevState) => ({
            ...prevState,
            productAddedToCartAnimation: false,
        }));
        }, 3000);

        localStorage.setItem('cart_items', JSON.stringify(getItems));
        setCartProducts((prev) => ({
        ...prev,
        products: getItems,
        totalPrice: calculateTotalPrice(getItems) // Update totalPrice here
        }));
    };
    const updateCartItemLength = (productId, newLength) => {
        // Retrieve cart items from local storage
        const storedItems = JSON.parse(localStorage.getItem("cart_items")) || [];
        
        // Find the item in local storage
        const storedItem = storedItems.find(item => item.id === productId);
      
        if (!storedItem) {
          // If item doesn't exist in local storage, do nothing
          return;
        }
      
        // Update length in stored item
        storedItem.lengthPicked = newLength;
      
        // Update products state with updated items
        const updatedItems = cartProducts.products.map((item) =>
          item.id === productId ? { ...item, lengthPicked: newLength } : item
        );
      
        setCartProducts((prevProducts) => ({
          ...prevProducts,
          products: updatedItems,
          lengthUpdateMessage: "Length of product updated in cart", // Notification message
        }));
      
        // Clear notification message after 3 seconds
        setTimeout(() => {
          setCartProducts((prevProducts) => ({
            ...prevProducts,
            lengthUpdateMessage: "",
          }));
        }, 3000);
      
        // Save updated items to local storage
        localStorage.setItem("cart_items", JSON.stringify(updatedItems));
      };




      const updateCartItemQuantity = (productId, newQuantity) => {
        const storedItems = JSON.parse(localStorage.getItem("cart_items")) || [];
        
        const storedItem = storedItems.find(item => item.id === productId);
      
        if (!storedItem) {
          return;
        }
        
        storedItem.quantity = newQuantity;
        
        const updatedItems = cartProducts.products.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
      
        setCartProducts((prevProducts) => ({
          ...prevProducts,
          products: updatedItems,
          totalPrice: calculateTotalPrice(updatedItems) // Update totalPrice here
        }));
      
        localStorage.setItem("cart_items", JSON.stringify(updatedItems));
      };
      

  const calculateTotalPrice = (products) => {
    return products.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };
    const calculateTotalLength = (products) => {
    return cartProducts.products.length || 0;
};

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, calculateTotalPrice, calculateTotalLength, updateCartItemLength, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
































// import React, { createContext, useState, useEffect } from 'react';

// // Create context
// export const CartContext = createContext();

// // CartProvider component to provide cart state and functions
// export const CartProvider = ({ children }) => {
//     const [cartProducts, setCartProducts] = useState({
//         products: [],
//         products_loading: false,
//         recentlyAddedProducts: [], // Maintain a list of recently added product IDs
//         productAddedToCartAnimation: false,
//         addToCartAnimationMessage: ""
//     });

//     // add to cart function
//     const addToCart = (product) => {
//         let getItems = JSON.parse(localStorage.getItem("cart_items")) || [];
//         const productExists = getItems.some(item => item.id === product.id);
      
//         if (productExists) {
//           // Remove product from cart
//           getItems = getItems.filter(item => item.id !== product.id);
//           setCartProducts((prevState) => ({
//             ...prevState,
//             recentlyAddedProducts: prevState.recentlyAddedProducts.filter(id => id !== product.id),
//             productAddedToCartAnimation: true,
//             addToCartAnimationMessage: "Product successfully removed"
//           }));
//         } else {
//           // Add product to cart
//           getItems.push(product);
//           setCartProducts((prevState) => ({
//             ...prevState,
//             recentlyAddedProducts: [product.id, ...prevState.recentlyAddedProducts],
//             productAddedToCartAnimation: true,
//             addToCartAnimationMessage: <span>Product added successfully <i class="fa-sharp fa-solid fa-circle-check px-2"></i></span>
//           }));
//         }
      
//         setTimeout(() => {
//           setCartProducts((prevState) => ({
//             ...prevState,
//             productAddedToCartAnimation: false,
//           }));
//         }, 3000);
      
//         // Save updated cart to localStorage
//         localStorage.setItem("cart_items", JSON.stringify(getItems));
//         setCartProducts((prev) => ({
//           ...prev,
//           products: getItems
//         })); // Update state to trigger re-render
//       };

//     const calculateTotalPrice = (products) => {
//         return cartProducts.products.reduce((acc, item) => acc + parseFloat(item.price), 0);
//     };
//     const calculateTotalLength = (products) => {
//         return cartProducts.products.length || 0;
//     };

//     useEffect(() => {
//         //get cart items
//         const storedItems = JSON.parse(localStorage.getItem('cart_items'));
//         if (storedItems) {
//             setCartProducts((prevState) => ({
//                 ...prevState,
//                 products: storedItems
//             }));
//         } else {
//             // there is nothing in the cart
//         }
//     }, []);

//     return (
//         <CartContext.Provider value={{ cartProducts, addToCart, calculateTotalPrice, calculateTotalLength }}>
//             {children}
//         </CartContext.Provider>
//     );
// };
