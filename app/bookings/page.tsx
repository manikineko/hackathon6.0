"use client";
import React from "react";

import Sidebar from "../components/Sidebar";
import SearchNavbar from "../components/SearchNavbar";

import WidgetCard from "../components/WidgetCard";
import { sendMessage } from "../api/llmApi";
import StatTile from "../components/StatTile";
import DashboardGrid from "../components/DashboardGrid";
import ActionButton from "../components/ActionButton";
import ChatWidget from "../components/ChatWidget";
import { BiPlanet, BiTime, BiCheckCircle, BiPlusCircle } from "react-icons/bi";

export default function BookingsPage() {
  return (
    <div className="centered-content-viewport">
      <div className="container-fluid dashboard-root py-5" style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 30% 30%, #1b2030 60%, #0a0c17 100%)' }}>
        <div className="row" style={{ width: '100%', maxWidth: 1400, marginLeft: 0 }}>
          <div className="col-12">
            <ChatWidget />
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0 text-info">Bookings Dashboard</h2>
              <ActionButton><BiPlusCircle className="me-2" /> New Booking</ActionButton>
            </div>
            <DashboardGrid>
              <div className="col-12 col-md-4">
                <StatTile label="Upcoming" value={2} icon={<BiPlanet />} />
              </div>
              <div className="col-12 col-md-4">
                <StatTile label="Pending" value={1} icon={<BiTime />} />
              </div>
              <div className="col-12 col-md-4">
                <StatTile label="Completed" value={2} icon={<BiCheckCircle />} />
              </div>
            </DashboardGrid>
            <DashboardGrid>
              <div className="col-md-8">
                <WidgetCard title="Upcoming Bookings" actions={<ActionButton className="action-btn" onClick={async () => { const res = await sendMessage('Cancel Booking'); alert(res[0]?.content); }}>Cancel</ActionButton>}>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">Flight to Paris <span className="badge bg-success">Confirmed</span></li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">Hotel in Berlin <span className="badge bg-warning text-dark">Pending</span></li>
                  </ul>
                </WidgetCard>
                <WidgetCard title="Booking History">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">Flight to Rome <span className="badge bg-secondary">Completed</span></li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">Hotel in Madrid <span className="badge bg-secondary">Completed</span></li>
                  </ul>
                </WidgetCard>
              </div>
              <div className="col-md-4">
                <WidgetCard title="Quick Actions">
                  <div className="d-flex flex-column gap-2">
                    <ActionButton className="w-100">New Flight</ActionButton>
                    <ActionButton className="w-100" style={{ background: 'linear-gradient(90deg,#007cf0,#00ffe0)' }}>New Hotel</ActionButton>
                    <ActionButton className="w-100 btn-outline-secondary" style={{ background: 'rgba(0,0,0,0.12)', color: '#00ffe0' }}>Settings</ActionButton>
                  </div>
                </WidgetCard>
              </div>
            </DashboardGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
