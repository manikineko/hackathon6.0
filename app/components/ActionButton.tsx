import React from "react";

export default function ActionButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "action-btn btn fw-bold px-4 py-2 " + (props.className || "")
      }
      style={{
        background: "linear-gradient(90deg, #00ffe0 0%, #007cf0 100%)",
        color: "#101a2b",
        border: "none",
        borderRadius: 16,
        boxShadow: "0 0 16px #00ffe055, 0 1.5px 8px #0006",
        letterSpacing: 1,
        ...props.style
      }}
    >
      {children}
    </button>
  );
}
