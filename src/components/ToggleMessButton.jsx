"use client";
import React from "react";

const ToggleMessButton = ({ setShowMessage, showMessage }) => {
  return (
    <button
      onClick={() => setShowMessage((prev) => !prev)}
      className="bg-red-500 hover:bg-red-600 px-7 py-3 font-semibold text-sm rounded-md"
    >
      {!showMessage ? "Show Message" : "Hide Message"}
    </button>
  );
};

export default ToggleMessButton;
