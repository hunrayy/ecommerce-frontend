// CartContext.js

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState({
    products: JSON.parse(localStorage.getItem('cart_items')) || [],
    recentlyAddedProducts: [],
    productAddedToCartAnimation: false,
    addToCartAnimationMessage: '',
    totalPrice: "0.00"
  });

  useEffect(() => {
    const totalPrice = calculateTotalPrice(cartProducts.products);
    setCartProducts(prev => ({
      ...prev,
      totalPrice
    }));
  }, [cartProducts.products]);

  const addToCart = (product, lengthPicked) => {
    let getItems = JSON.parse(localStorage.getItem('cart_items')) || [];
    const productIndex = getItems.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      // Update lengthPicked of existing product
      getItems[productIndex].lengthPicked = lengthPicked;

      setCartProducts(prevState => ({
        ...prevState,
        recentlyAddedProducts: [],
        productAddedToCartAnimation: true,
        addToCartAnimationMessage: "Length of product updated in cart"
      }));
    } else {
      // Add new product to cart
      product.lengthPicked = lengthPicked;
      getItems.push(product);

      setCartProducts(prevState => ({
        ...prevState,
        recentlyAddedProducts: [product.id, ...prevState.recentlyAddedProducts],
        productAddedToCartAnimation: true,
        addToCartAnimationMessage: "Product added successfully"
      }));
    }

    localStorage.setItem('cart_items', JSON.stringify(getItems));
    setCartProducts(prev => ({
      ...prev,
      products: getItems,
      totalPrice: calculateTotalPrice(getItems)
    }));

    setTimeout(() => {
      setCartProducts(prevState => ({
        ...prevState,
        productAddedToCartAnimation: false,
      }));
    }, 3000);
  };

    const calculateTotalLength = (products) => {
    return cartProducts.products.length || 0;
};

  const calculateTotalPrice = (products) => {
    return products.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, calculateTotalLength, calculateTotalPrice }}>
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
