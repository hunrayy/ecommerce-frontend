
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const defaultCurrency = 'NGN';
const exchangeRates = { NGN: 1 }; // Default exchange rate with NGN as base

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(Cookies.get('selectedCurrency') || defaultCurrency);
  const [rates, setRates] = useState(exchangeRates);
  const [currencySymbols, setCurrencySymbols] = useState({});
  const [currencyNames, setCurrencyNames] = useState({});
  const [currencyCodes, setCurrencyCodes] = useState({});
  const [currentCurrencyCode, setCurrentCurrencyCode] = useState(
    Cookies.get('selectedCurrency') || defaultCurrency
  );; // Initialize with the code for the default currency
  const [isRatesFetched, setIsRatesFetched] = useState(false); // New state to track rates fetching

  useEffect(() => {
    fetchExchangeRates();
    fetchCurrencyData();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/NGN');

      setRates(response.data.rates);
      setIsRatesFetched(true); // Set rates as fetched
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const fetchCurrencyData = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const currencyData = {};
      // const codes = {}; // New object to hold currency codes

      response.data.forEach(country => {
        const currencies = country.currencies;
        const countryCode = country.cca2;
        for (let code in currencies) {
          if (!currencyData[code]) {
            currencyData[code] = {
              symbol: currencies[code].symbol,
              name: currencies[code].name,
            };
            // codes[code] = countryCode; // Map currency code to country code
          }
        }
      });
    
      setCurrencyCodes(currencyData);

      const symbols = {};
      const names = {};
      for (let code in currencyData) {
        symbols[code] = currencyData[code].symbol;
        names[code] = currencyData[code].name;
      }

      setCurrencySymbols(symbols);
      setCurrencyNames(names);
      // setCurrencyCodes(codes); // Set the currency codes in state
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  const convertCurrency = (amount, fromCurrency = 'NGN', toCurrency = selectedCurrency) => {
    if (!isRatesFetched || !rates[fromCurrency] || !rates[toCurrency]) {
      console.error('Currency not supported or rates not fetched:', fromCurrency, toCurrency);
      return NaN;
    }
    const convertedAmount = (amount / rates[fromCurrency]) * rates[toCurrency];
    console.log(typeof(convertedAmount))
    return isNaN(convertedAmount) ? NaN : convertedAmount.toFixed(2).toLocaleString();
  };

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
    Cookies.set('selectedCurrency', newCurrency, { expires: 7 });
    // Get the currency code from currencyCodes object
    // const currentCurrencyCode = Object.keys(currencyCodes).find(code => currencyCodes[code].name === newCurrency) || newCurrency;
    setCurrentCurrencyCode(newCurrency); // Store the currency code directlyCurrent Currency Code:', currentCurrencyCode);
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, convertCurrency, handleCurrencyChange, currencySymbols, currencyCodes, currentCurrencyCode, currencyNames }}>
      {children}
    </CurrencyContext.Provider>
  );
};

