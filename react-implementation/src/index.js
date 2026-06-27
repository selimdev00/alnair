import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./styles/index.scss";

import AOS from "aos";
import "aos/dist/aos.css";

import router from "./router";
import { RouterProvider } from "react-router-dom";

import { ConsultProvider } from "./context/ConsultContext";

AOS.init({
  once: true,
  duration: 450,
  easing: "ease-out-cubic",
  offset: 40,
  disable: () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConsultProvider>
      <RouterProvider router={router} />
    </ConsultProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
