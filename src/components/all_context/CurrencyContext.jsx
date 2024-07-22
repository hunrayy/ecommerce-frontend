import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const defaultCurrency = 'NGN';
const exchangeRates = {
  USD: 1
};

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(Cookies.get('selectedCurrency') || defaultCurrency);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      Object.assign(exchangeRates, response.data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const convertCurrency = (amount, fromCurrency = 'USD', toCurrency = selectedCurrency) => {
    return (amount / exchangeRates[fromCurrency] * exchangeRates[toCurrency]);
  };

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
    Cookies.set('selectedCurrency', newCurrency );
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, convertCurrency, handleCurrencyChange }}>
      {children}
    </CurrencyContext.Provider>
  );
};
