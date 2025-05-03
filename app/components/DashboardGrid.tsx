import React from "react";

export default function DashboardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-grid row g-4 mb-4">
      {children}
    </div>
  );
}
