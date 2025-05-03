"use client";
import React from "react";

import Sidebar from "../components/Sidebar";
import SearchNavbar from "../components/SearchNavbar";

import WidgetCard from "../components/WidgetCard";
import { sendMessage } from "../api/llmApi";
import StatTile from "../components/StatTile";
import DashboardGrid from "../components/DashboardGrid";
import ActionButton from "../components/ActionButton";
import { BiUser, BiBell, BiMoon, BiLock } from "react-icons/bi";

export default function SettingsPage() {
  return (
    <div className="centered-content-viewport">
      <div className="container-fluid py-5" style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 30% 30%, #1b2030 60%, #0a0c17 100%)' }}>
        <div style={{ width: '100%', maxWidth: 950, marginLeft: 0 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0 text-info">Settings</h2>
        </div>
        <DashboardGrid>
          <div className="col-12 col-md-4">
            <StatTile label="Profile" value="User" icon={<BiUser />} />
          </div>
          <div className="col-12 col-md-4">
            <StatTile label="Notifications" value="On" icon={<BiBell />} />
          </div>
          <div className="col-12 col-md-4">
            <StatTile label="Theme" value="Dark" icon={<BiMoon />} />
          </div>
        </DashboardGrid>
        <DashboardGrid>
          <div className="col-12 col-md-6">
            <WidgetCard title="Profile">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac lacus eget enim pretium varius.</p>
              <ActionButton className="action-btn" onClick={async () => { const res = await sendMessage('Edit Profile'); alert(res[0]?.content); }} disabled={false}>Edit Profile</ActionButton>
            </WidgetCard>
          </div>
          <div className="col-12 col-md-6">
            <WidgetCard title="Notifications">
              <p>Curabitur facilisis, eros a posuere dictum, nulla nisl dictum enim, in dictum ipsum urna eu velit.</p>
              <div className="form-check form-switch mt-2">
                <input className="form-check-input" type="checkbox" id="notifSwitch" disabled />
                <label className="form-check-label" htmlFor="notifSwitch">Enable notifications (mockup)</label>
              </div>
            </WidgetCard>
          </div>
        </DashboardGrid>
        <DashboardGrid>
          <div className="col-12 col-md-6">
            <WidgetCard title="Theme">
              <div className="form-check form-switch mt-2">
                <input className="form-check-input" type="checkbox" id="themeSwitch" disabled />
                <label className="form-check-label" htmlFor="themeSwitch">Dark mode (mockup)</label>
              </div>
            </WidgetCard>
          </div>
          <div className="col-12 col-md-6">
            <WidgetCard title="Security">
              <p>Etiam id massa ac nulla cursus dictum. Suspendisse potenti. Praesent euismod, nisl vel tincidunt luctus.</p>
              <ActionButton disabled style={{ background: '#e74c3c', color: '#fff' }}>Reset Password (mockup)</ActionButton>
            </WidgetCard>
          </div>
        </DashboardGrid>
      </div>
      </div>
    </div>
  );
}
