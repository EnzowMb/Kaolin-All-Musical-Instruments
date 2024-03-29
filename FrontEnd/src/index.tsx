import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./pages/Home";
import { WoodWind } from "./pages/WoodWind";
import { String } from "./pages/String";
import { Percussion } from "./pages/Percussion";
import { Brass } from "./pages/Brass";
import { Login } from "./pages/Login";
import { RegisterUser } from "./pages/Register-User";
import { BasePage } from "./pages/BasePage";
import { BasicFormPage } from "./pages/BasicFormPage";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { AuthProvider } from "./contexts/authContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasePage />}>
            <Route index element={<Home />} />
            <Route path="/madeiras" element={<WoodWind />} />
            <Route path="/cordas" element={<String />} />
            <Route path="/percussao" element={<Percussion />} />
            <Route path="/metais" element={<Brass />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/" element={<BasicFormPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register-user" element={<RegisterUser />} />
          </Route>
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
