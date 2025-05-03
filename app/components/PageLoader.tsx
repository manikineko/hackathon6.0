import React from "react";

export default function PageLoader({ theme = "default" }: { theme?: string }) {
  // You can expand this with more themes/colors
  const colors: Record<string, string> = {
    default: "linear-gradient(90deg,#2b5cff 40%,#1fc8db 100%)",
    purple: "linear-gradient(90deg,#9b59b6 40%,#8e44ad 100%)",
    light: "linear-gradient(90deg,#f7f7fa 40%,#e0e7ff 100%)",
  };
  return (
    <div className="page-loader" style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 2000,
      background: colors[theme] || colors.default,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div className="loader-animation">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
    </div>
  );
}
