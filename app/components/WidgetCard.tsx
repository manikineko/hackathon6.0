import React from "react";

export default function WidgetCard({ title, children, actions }: { title?: string, children: React.ReactNode, actions?: React.ReactNode }) {
  return (
    <div className="widget-card glassy-card position-relative mb-4 p-0" style={{
      borderRadius: 24,
      background: "rgba(30,40,60,0.85)",
      boxShadow: "0 4px 32px 0 #00ffe055, 0 1.5px 8px 0 #0006",
      border: "1px solid rgba(0,255,255,0.13)",
      backdropFilter: "blur(16px) saturate(180%)",
      overflow: "hidden"
    }}>
      {title && <div className="px-4 pt-3 pb-2 text-uppercase fw-bold fs-6 text-info" style={{letterSpacing: 1}}>{title}</div>}
      <div className="px-4 pb-4 pt-2">{children}</div>
      {actions && <div className="px-4 pb-3 d-flex justify-content-end gap-2">{actions}</div>}
    </div>
  );
}
