import React, { useContext, useEffect, useState } from "react";
//import { positions } from "../data/data";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Positions = () => {

  const[positions, setPositions] = useState([]);
  //const {positions, setPositions} = useContext(GeneralContext);
  

  useEffect(() => {
    async function fetchPositions(){
      const res = await axios.get("https://zclone-1xz2.onrender.com/allPositions");
      setPositions(res.data);
    }
    fetchPositions();
  },[])

  return (
    <>
      <h3 className="title">Positions {positions.length}</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positions.map((stock, index) => {
                        const curValue = stock.price * stock.qty;
                        const profitLoss =curValue - stock.avg * stock.qty;
                        const isProfit = profitLoss >= 0;
                        const profClass = isProfit ? "profit" : "loss";
                        const dayClass = stock.isLoss ? "loss"  : "profit";
          
                        return (
                          <tr key={index} >
                            <td>{stock.product}</td>
                            <td>{stock.name}</td>
                            <td>{stock.qty}</td>
                            <td>{stock.avg.toFixed(2)}</td>
                            <td>{stock.price.toFixed(2)}</td>
                    
                            <td className={profClass}>
                              {profitLoss.toFixed(2)}
                            </td>
            
                            <td className={dayClass}>
                              {stock.day}
                            </td>
                          </tr>
                        );
                      })}


        </table>
      </div>
    </>
  );
};

export default Positions;
