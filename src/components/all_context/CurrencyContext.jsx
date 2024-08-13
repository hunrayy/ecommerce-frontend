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

      response.data.forEach(country => {
        const currencies = country.currencies;
        for (let code in currencies) {
          if (!currencyData[code]) {
            currencyData[code] = {
              symbol: currencies[code].symbol,
              name: currencies[code].name,
            };
          }
        }
      });
    

      const symbols = {};
      const names = {};
      for (let code in currencyData) {
        symbols[code] = currencyData[code].symbol;
        names[code] = currencyData[code].name;
      }

      setCurrencySymbols(symbols);
      setCurrencyNames(names);
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
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, convertCurrency, handleCurrencyChange, currencySymbols, currencyNames }}>
      {children}
    </CurrencyContext.Provider>
  );
};


















// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const defaultCurrency = 'NGN';
// const exchangeRates = { NGN: 1 }; // Default exchange rate with NGN as base

// export const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   const [selectedCurrency, setSelectedCurrency] = useState(Cookies.get('selectedCurrency') || defaultCurrency);
//   const [rates, setRates] = useState(exchangeRates);
//   const [currencySymbols, setCurrencySymbols] = useState({});
//   const [currencyNames, setCurrencyNames] = useState({});

//   useEffect(() => {
//     fetchExchangeRates();
//     fetchCurrencyData();
//   }, []);

//   const fetchExchangeRates = async () => {
//     try {
//       const response = await axios.get('https://api.exchangerate-api.com/v4/latest/NGN');
//       setRates(response.data.rates);
//     } catch (error) {
//       console.error('Error fetching exchange rates:', error);
//     }
//   };

//   const fetchCurrencyData = async () => {
//     try {
//       const response = await axios.get('https://restcountries.com/v3.1/all');
//       const currencyData = {};

//       response.data.forEach(country => {
//         const currencies = country.currencies;
//         for (let code in currencies) {
//           if (!currencyData[code]) {
//             currencyData[code] = {
//               symbol: currencies[code].symbol,
//               name: currencies[code].name,
//             };
//           }
//         }
//       });

//       const symbols = {};
//       const names = {};
//       for (let code in currencyData) {
//         symbols[code] = currencyData[code].symbol;
//         names[code] = currencyData[code].name;
//       }

//       setCurrencySymbols(symbols);
//       setCurrencyNames(names);
//     } catch (error) {
//       console.error('Error fetching currency data:', error);
//     }
//   };

//   const convertCurrency = (amount, fromCurrency = 'NGN', toCurrency = selectedCurrency) => {
//     if (!rates[fromCurrency] || !rates[toCurrency]) {
//       console.error('Currency not supported');
//       return NaN;
//     }
//     const convertedAmount = (amount / rates[fromCurrency] * rates[toCurrency]);
//     console.log(convertedAmount)
//     return isNaN(convertedAmount) ? NaN : convertedAmount.toFixed(2);
//   };

//   const handleCurrencyChange = (newCurrency) => {
//     setSelectedCurrency(newCurrency);
//     Cookies.set('selectedCurrency', newCurrency, { expires: 7 });
//   };

//   return (
//     <CurrencyContext.Provider value={{ selectedCurrency, convertCurrency, handleCurrencyChange, currencySymbols, currencyNames }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };




























// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const defaultCurrency = 'NGN';
// const exchangeRates = { NGN: 1 }; // Default exchange rate with NGN as base

// export const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   const [selectedCurrency, setSelectedCurrency] = useState(Cookies.get('selectedCurrency') || defaultCurrency);
//   const [rates, setRates] = useState(exchangeRates);
//   const [currencySymbols, setCurrencySymbols] = useState({});
//   const [currencyNames, setCurrencyNames] = useState({});

//   useEffect(() => {
//     fetchExchangeRates();
//     fetchCurrencyData();
//   }, []);

//   const fetchExchangeRates = async () => {
//     try {
//       const response = await axios.get('https://api.exchangerate-api.com/v4/latest/NGN');
//       setRates(response.data.rates);
//     } catch (error) {
//       console.error('Error fetching exchange rates:', error);
//     }
//   };

//   const fetchCurrencyData = async () => {
//     try {
//       const response = await axios.get('https://restcountries.com/v3.1/all');
//       const currencyData = {};

//       response.data.forEach(country => {
//         const currencies = country.currencies;
//         for (let code in currencies) {
//           if (!currencyData[code]) {
//             currencyData[code] = {
//               symbol: currencies[code].symbol,
//               name: currencies[code].name,
//             };
//           }
//         }
//       });

//       const symbols = {};
//       const names = {};
//       for (let code in currencyData) {
//         symbols[code] = currencyData[code].symbol;
//         names[code] = currencyData[code].name;
//       }

//       setCurrencySymbols(symbols);
//       setCurrencyNames(names);
//     } catch (error) {
//       console.error('Error fetching currency data:', error);
//     }
//   };

//   const convertCurrency = (amount, fromCurrency = 'NGN', toCurrency = selectedCurrency) => {
//     if (!rates[fromCurrency] || !rates[toCurrency]) {
//       console.error('Currency not supported');
//       return NaN;
//     }
//     return (amount / rates[fromCurrency] * rates[toCurrency]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   };

//   const handleCurrencyChange = (newCurrency) => {
//     setSelectedCurrency(newCurrency);
//     Cookies.set('selectedCurrency', newCurrency, { expires: 7 });
//   };

//   return (
//     <CurrencyContext.Provider value={{ selectedCurrency, convertCurrency, handleCurrencyChange, currencySymbols, currencyNames }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };
