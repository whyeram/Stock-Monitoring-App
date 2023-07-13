import axios from 'axios';
import React, { useState, useEffect } from "react";
import './App.css';
import Stock from "./Stock";

function App() {

  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState('');
  const filteredStocks = stocks.length>0 ? stocks.filter(stock => stock.identifier.toLowerCase().includes(search.toLowerCase())): [];

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://latest-stock-price.p.rapidapi.com/price',
        params: {
          Indices: 'NIFTY 100'
        },
        headers: {
          'X-RapidAPI-Key': '2ad94c301dmshfda411a382f365bp1d9e26jsn5967d7aa0889',
          'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        const newStock = response.data;
        setStocks(()=>newStock.slice(1,));
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [])


  useEffect(() => {
    console.log(stocks); // Logs the updated stocks state
  }, [stocks]);

  function handleChange(event) {
    setSearch(event.target.value);
  }


  return (
    <div className="stock-app">
      <div className='stock-search'>
        <form>
          <input type="text" placeholder='Search' className='stock-input' onChange={handleChange} />
        </form>
      </div>
      {
        filteredStocks.length > 0 ? (
          filteredStocks.map(stock => (
            <Stock
              key={stock.symbol} // Adding a unique key prop is recommended when rendering a list of components
              name={stock.identifier}
              symbol={stock.symbol}
              priceOpen={stock.open}
              dayHigh={stock.dayHigh}
              dayLow={stock.dayLow}
              price={stock.lastPrice}
              priceChange={stock.pChange}
              tradeVolume={stock.totalTradedVolume}
            />
          ))
        ) : (
          <p>No stocks found</p>
        )
      }
    </div>
  );
}

export default App;
