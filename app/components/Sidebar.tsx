"use client";
import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      className="modern-sidebar glassy animated-fade-in"
      style={{
        width: 80,
        minWidth: 80,
        maxWidth: 80,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1042,
        background: 'var(--glass-bg)',
        borderRight: '2.5px solid var(--accent2)',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 32,
        borderBottomRightRadius: 32,
        boxShadow: '0 4px 32px #00ffe022, 0 2px 12px #0003',
        backdropFilter: 'blur(16px) saturate(1.25)',
        transition: 'background 0.5s, border 0.3s',
      }}
    >
      <div style={{ marginTop: '1rem', marginBottom: '4rem' }}>
        <Link className="navbar-brand modern-navbar-brand d-flex align-items-center justify-content-center" href="/flights" style={{ fontSize: 28 }}>
          <i className="bi bi-globe"></i>
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, width: '100%', justifyContent: 'center', gap: '1.1rem' }}>
        <Link href="/flights" className="modern-sidebar-link glassy-icon" title="Flights">
          <i className="bi bi-airplane fs-3"></i>
        </Link>
        <Link href="/bookings" className="modern-sidebar-link glassy-icon" title="Bookings">
          <i className="bi bi-journal-bookmark fs-3"></i>
        </Link>
        <Link href="/" className="modern-sidebar-link glassy-icon" title="Chat">
          <i className="bi bi-chat-dots fs-3"></i>
        </Link>
        <Link href="/settings" className="modern-sidebar-link glassy-icon" title="Settings">
          <i className="bi bi-gear fs-3"></i>
        </Link>
      </div>
      <div style={{ marginBottom: '1rem' }} />
    </aside>
  );
}

