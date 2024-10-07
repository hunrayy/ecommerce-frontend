// CartTotal.jsx
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { CurrencyContext } from '../../components/all_context/CurrencyContext';

export const calculateTotal = (cartProducts, convertCurrency, selectedCurrency) => {
  if (!cartProducts || !Array.isArray(cartProducts.products)) {
    return 0; // Return 0 if no products
  }

  const total = cartProducts.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return convertCurrency(total, 'NGN', selectedCurrency);
};

const CartTotal = () => {
  const { cartProducts } = useContext(CartContext);
  const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);

  const total = calculateTotal(cartProducts, convertCurrency, selectedCurrency); // Pass context values

  const currencySymbol = currencySymbols[selectedCurrency];
  const formattedTotal = Number(total).toLocaleString();

  return (
    <span className="mb-2">{currencySymbol}{formattedTotal}</span>
  );
};

export default CartTotal;


























// // CartTotal.jsx
// import React, { useContext } from 'react';
// import { CartContext } from './CartContext';
// import { CurrencyContext } from '../../components/all_context/CurrencyContext';

// const CartTotal = () => {
//   const { cartProducts } = useContext(CartContext);
//   const { selectedCurrency, convertCurrency, currencySymbols } = useContext(CurrencyContext);

//   if (!cartProducts || !Array.isArray(cartProducts.products)) {
//     return null; // Or display a loading state or a message
//   }

//   const total = cartProducts.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const convertedTotal = convertCurrency(total, 'NGN', selectedCurrency);
//   const currencySymbol = currencySymbols[selectedCurrency];
//   const formattedTotal = Number(convertedTotal).toLocaleString();
//   // console.log(typeof(formattedTotal))


//   return (
//       <span className="mb-2 fw-bold">{currencySymbol}{formattedTotal}</span>
//   );
// };

// export default CartTotal;

