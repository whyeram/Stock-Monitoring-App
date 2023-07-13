import React from "react";

const Stock = ({ name, symbol, priceOpen, dayHigh, dayLow, price, priceChange, tradeVolume }) => {
    return (<div className="stock-container">
        <div className="stock-row">
            <div className="stock">
                <h1>{name}</h1>
                <p className="stock-symbol">{symbol}</p>
            </div>
            <div className="stock-data">
                <p className="stock-opening-price">₹{priceOpen}</p>
                <p className="stock-dayhigh">₹{dayHigh}</p>
                <p className="stock-daylow">₹{dayLow}</p>
                <p className="stock-price">₹{price}</p>
                {
                    priceChange > 0 ?
                        (<p className="stock-percent green">%{priceChange.toFixed(2)}</p>)
                        :
                        (<p className="stock-percent red">%{priceChange.toFixed(2)}</p>)
                }
                <p className="stock-volume">{tradeVolume}</p>

            </div>
        </div>
    </div>
    )
}

export default Stock;