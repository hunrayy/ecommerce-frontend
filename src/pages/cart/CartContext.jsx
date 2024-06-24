import React, { createContext, useState, useEffect } from 'react';

// Create context
export const CartContext = createContext();

// CartProvider component to provide cart state and functions
export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] =  useState({
    products: [],
    products_loading: false,
    wasProductAddedToCart: false,
    productAddedToCartAnimation: false,
    addToCartAnimationMessage: ""
})

        // add to cart function
        const addToCart = (product) => {
            let getItems = JSON.parse(localStorage.getItem("cart_items")) || [];
            const productExists = getItems.some(item => item.id === product.id);
    
            if (productExists) {
                // filter through the getItems and remove the current product
                getItems = getItems.filter(item => item.id !== product.id);
                console.log("removed from cart");
                if(!cartProducts.productAddedToCartAnimation){
                    setCartProducts((prevState) => ({
                        ...prevState,
                        productAddedToCartAnimation: true,
                        addToCartAnimationMessage: "Product successfully removed"
                    }));
                    setTimeout(() => {
                        setCartProducts((prevState) => ({
                            ...prevState,
                            productAddedToCartAnimation: false,
                        }));
                    }, 3000);
                }else{
                    return null
                }
            } else {
                // product isn't in cart, add it
                getItems.push(product);
                console.log("added to cart");
                // if(!cartProducts.productAddedToCartAnimation){
                    setCartProducts((prevState) => ({
                        ...prevState,
                        productAddedToCartAnimation: true,
                        addToCartAnimationMessage: <span>Product added successfully <i class="fa-sharp fa-solid fa-circle-check px-2"></i></span>
                    }));
                    setTimeout(() => {
                        setCartProducts((prevState) => ({
                            ...prevState,
                            productAddedToCartAnimation: false
                        }));
                    }, 3000);
                // }else{
                //     return null
                // }
            }
    
            // save updated cart to localStorage
            localStorage.setItem("cart_items", JSON.stringify(getItems));
            setCartProducts((prev) => ({
                ...prev,
                products: getItems
            })); // update state to trigger re-render
        };

  const calculateTotalPrice = (products) => {
    return cartProducts.products.reduce((acc, item) => acc + parseFloat(item.price), 0);
  };
  const calculateTotalLength = (products) => {
    return cartProducts.products.length || 0;
  };

  useEffect(() => {
    //get cart items
    const storedItems = JSON.parse(localStorage.getItem('cart_items'));
    if (storedItems) {
        setCartProducts((prevState) => ({
            ...prevState,
            products: storedItems
        }));
    }else{
        // there is nothing in the cart
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, calculateTotalPrice, calculateTotalLength }}>
      {children}
    </CartContext.Provider>
  );
};
