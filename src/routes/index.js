import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import CreateAccount from "../Pages/CreateAccount/CreateAccount";
import ProductPage from "../Pages/ProductPage/ProductPage";

const RoutesWrapper = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-uma-conta" element={<CreateAccount />} />
        <Route path="/produto/:productId" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesWrapper;
