import React from "react";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <html>
      <body className="bg-gray-100">
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
};

export default Layout;
