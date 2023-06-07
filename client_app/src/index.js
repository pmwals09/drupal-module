/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { Provider } from "react-redux";
import App from "./container/App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import { getConfiguredStore } from "./redux/store.js";
import "./services/exporting.js";
import "./services/export-data.js";
import "./services/accessibility.js";
import Contexts from "./container/Contexts.jsx";

function prepare() {
  return new Promise((resolve) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line global-require
      const { worker } = require("./mocks/browser.js");
      worker.start();
    }
    ReactGA.initialize("G-RZH89377SH", {
      testMode: process.env.NODE_ENV === "development",
    });
    resolve();

    window.addEventListener("message", (e) => {
      if (e.data?.type === "settings") {
        window.reactAppSettings = e.data.payload;
      }
    });
  });
}

const root = ReactDOM.createRoot(document.getElementById("react-app"));
prepare().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={getConfiguredStore()}>
          <Contexts>
            <App />
          </Contexts>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
function handleVitals({ id, name, delta, value }) {
  const reportObj = {
    hitType: "event",
    eventCategory: "Web Vitals",
    eventAction: name,
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
    value: Math.round(name === "CLS" ? delta * 1000 : delta), // values must be integers, use `delta` so the value can be summed.
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.
  };
  console.log(reportObj);
  ReactGA.send(reportObj);
}
reportWebVitals(handleVitals);
