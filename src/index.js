import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/";
import getStore from "./store.js";
import { createGlobalStyle } from "styled-components";
import { media } from "./modules/params.js";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-size:16px;
    color: rgba(0,0,0, 0.5);
    font-family: "open_sans" , helvetica, sans-serif;

    @font-face {
      font-family: "open_sans";
      src: url(${require("./fonts/opensans-bold-webfont.woff2")}) format("woff2"),
           url(${require("./fonts/opensans-bold-webfont.woff")}) format("woff");
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: "open_sans";
    src: url(${require("./fonts/opensans-regular-webfont.woff2")}) format("woff2"),
         url(${require("./fonts/opensans-regular-webfont.woff")}) format("woff");
      font-weight: 400;
      font-style: normal;
    }

    @media (max-width: ${`${media.tablets}`}) {
      font-size:15px;
    }

    @media (max-width: ${`${media.phones}`}) {
      font-size:14px;
    }


  }

  div {
    box-sizing: border-box;
  }
`;

const store = getStore();

ReactDOM.render(
  <BrowserRouter basename="/api/">
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
