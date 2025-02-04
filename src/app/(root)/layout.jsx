import React from "react";
import "../globals.css";
import Navbar from "@/components/Navbar";

const layout = ({ children }) => {
  return (
    <html>
      <body className="bg-gray-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default layout;
