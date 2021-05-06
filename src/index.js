import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import ScrollMemory from "react-router-scroll-memory";

import { ObmenMarketApp } from "./ObmenMarket/Obmen";

import "./index.scss";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <>
            <ScrollMemory />
            <ObmenMarketApp />
          </>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
