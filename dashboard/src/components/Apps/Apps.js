import React from "react";

function Apps() {
  return (
    <div className="apps_wrapper">

      <div className="apps_card">

        <h1 className="apps_heading">
          Technology
        </h1>

        <h3 className="apps_subheading">
          Sleek, modern and intuitive trading platforms
        </h3>

        <p className="apps_text">

          Check out our{" "}

          <a href="/" className="apps_link">

            investment offerings{" "}

            <i
              className="fa fa-long-arrow-right"
              aria-hidden="true"
            ></i>

          </a>

        </p>

      </div>

    </div>
  );
}

export default Apps;