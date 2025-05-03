"use client";
import React from "react";

import WidgetCard from "../components/WidgetCard";
import StatTile from "../components/StatTile";
import DashboardGrid from "../components/DashboardGrid";
import ActionButton from "../components/ActionButton";
import { BiPlanet, BiTime, BiCheckCircle, BiPlusCircle } from "react-icons/bi";

export default function FlightsPage() {
  return (
    <div className="centered-content-viewport">
      <div className="container-fluid py-5" style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 30% 30%, #1b2030 60%, #0a0c17 100%)' }}>
        <div style={{ width: '100%', maxWidth: 950, marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0 text-info">Flights Dashboard</h2>
            <ActionButton><BiPlusCircle className="me-2" /> New Flight</ActionButton>
          </div>
          <DashboardGrid>
            <div className="col-12 col-md-4">
              <StatTile label="Flight Balance" value="€2,300.00" icon={<BiPlanet />} />
            </div>
            <div className="col-12 col-md-4">
              <StatTile label="Next Trip" value="AMS → PAR" icon={<BiTime />} />
            </div>
            <div className="col-12 col-md-4">
              <StatTile label="Miles Flown" value="6,420 km" icon={<BiCheckCircle />} />
            </div>
          </DashboardGrid>
          <WidgetCard title="Recent Flight Activity">
            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid #222' }}>
                    <th scope="col">#</th>
                    <th scope="col">Flight</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>AMS → CDG</td>
                    <td><span className="badge bg-success">Booked</span></td>
                    <td>2025-05-02</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>CDG → BCN</td>
                    <td><span className="badge bg-secondary">Completed</span></td>
                    <td>2025-04-27</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>BCN → LIS</td>
                    <td><span className="badge bg-warning text-dark">Pending</span></td>
                    <td>2025-04-22</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}