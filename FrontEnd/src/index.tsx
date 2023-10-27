import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import { Home } from "./routes/Home";
import { WoodWind } from "./routes/WoodWind";
import { String } from "./routes/String";
import { Percussion } from "./routes/Percussion";
import { Brass } from "./routes/Brass";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/madeiras" element={<WoodWind />} />
        <Route path="/cordas" element={<String />} />
        <Route path="/percussao" element={<Percussion />} />
        <Route path="/metais" element={<Brass />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
