import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./order.css";
import GeneralContext from "./GeneralContext";
import { generatePath } from "react-router-dom";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const {setHoldings} = useContext(GeneralContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3002/allOrder");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();

  },[orders]);

  return (

    <div className="orders">
      <h3 className="orders-title">
        Orders ({orders.length})
      </h3>
      {orders.length === 0 ? (
        <p className="empty-msg">
          No orders placed today
        </p>
      ) : (

        <div className="orders-table">

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>

              {orders.map((stock, index) => (

                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.price}</td>
                  <td
                    className={
                      stock.mode === "BUY"
                        ? "buy"
                        : "sell"
                    }
                  >
                    {stock.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;