"use client";
import React from "react";

export default function SearchNavbar() {
  return (
    <>
      <nav
        className="modern-horizontal-sidebar d-flex align-items-center glassy"
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 520,
          height: 80,
          minHeight: 80,
          maxHeight: 80,
          zIndex: 1042,
          background: 'var(--glass-bg)',
          borderBottom: '2px solid var(--accent2)',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          boxShadow: '0 2px 32px #00ffe022, 0 1.5px 8px #0003',
          backdropFilter: 'blur(12px) saturate(1.2)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 32,
          paddingRight: 32,
          transition: 'background 0.5s, border 0.3s',
        }}
      >
        <a className="navbar-brand fw-bold fs-4 text-info" href="#" style={{marginRight: 32}}>
          Bunq Travel
        </a>
        <div className="d-flex align-items-center gap-3">
          {/* Add any other navbar buttons or links here if needed */}
        </div>
      </nav>

    </>
  );
}

