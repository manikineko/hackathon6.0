import React from "react";

export default function StatTile({ label, value, icon }: { label: string, value: string | number, icon?: React.ReactNode }) {
  return (
    <div className="stat-tile d-flex align-items-center gap-3 p-3 mb-3" style={{
      background: "rgba(0,255,255,0.07)",
      borderRadius: 18,
      boxShadow: "0 0 12px #00ffe055",
      border: "1px solid rgba(0,255,255,0.13)",
      color: "#fff"
    }}>
      {icon && <span className="fs-3 text-info">{icon}</span>}
      <div>
        <div className="fw-bold fs-5" style={{letterSpacing: 1}}>{value}</div>
        <div className="small text-info text-uppercase" style={{opacity:0.8}}>{label}</div>
      </div>
    </div>
  );
}
