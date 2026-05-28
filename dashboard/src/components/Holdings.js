import React, {
  useEffect,
  useContext,
} from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

const Holdings = () => {

  const {
    holdings,
    setHoldings,
  } = useContext(GeneralContext);

  useEffect(() => {

    async function fetchHoldings() {

      try {

        const res = await axios.get(
          "https://zclone-1xz2.onrender.com/allHoldings"
        );

        setHoldings(res.data);

        console.log(res.data);

      } catch (err) {

        console.log(err);

      }
    }

    fetchHoldings();

  }, []);

  return (

    <>

      <h3 className="title">
        Holdings ({holdings?.length || 0})
      </h3>

      <div className="order-table">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>Price</th>
              <th>Cur. Val</th>
              <th>P&amp;L</th>
              <th>Net</th>
              <th>Day</th>
            </tr>

          </thead>

          <tbody>

            {holdings?.map((stock, index) => {

              const curValue =
                stock.price * stock.qty;

              const profitLoss =
                curValue -
                stock.avg * stock.qty;

              const isProfit =
                profitLoss >= 0;

              const profClass =
                isProfit ? "profit" : "loss";

              const dayClass =
                stock.isLoss
                  ? "loss"
                  : "profit";

              return (

                <tr key={index}>

                  <td>{stock.name}</td>

                  <td>{stock.qty}</td>

                  <td>
                    {stock.avg.toFixed(2)}
                  </td>

                  <td>
                    {stock.price.toFixed(2)}
                  </td>

                  <td>
                    {curValue.toFixed(2)}
                  </td>

                  <td className={profClass}>
                    {profitLoss.toFixed(2)}
                  </td>

                  <td className={profClass}>
                    {stock.net}
                  </td>

                  <td className={dayClass}>
                    {stock.day}
                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </>
  );
};

export default Holdings;