"use client";
import React, { useState } from "react";

const COUNTRIES = [
  "Netherlands", "Germany", "France", "Spain", "Italy", "United Kingdom", "Belgium", "Sweden", "Norway", "Denmark", "Finland", "Switzerland", "Austria", "Portugal", "Poland", "Czech Republic", "Greece", "Turkey", "United States", "Canada", "Brazil", "Japan", "China", "Australia", "New Zealand"
  // ...add more or use a full country list
];

const FLIGHT_CLASSES = ["Economy", "Premium Economy", "Business", "First"];

export interface CountryFlightSearchProps {
  onSearch: (params: { country: string; flightClass: string }) => void;
}

export default function CountryFlightSearch({ onSearch }: CountryFlightSearchProps) {
  const [country, setCountry] = useState("");
  const [flightClass, setFlightClass] = useState(FLIGHT_CLASSES[0]);

  return (
    <form className="row g-2 align-items-end mb-3" onSubmit={e => { e.preventDefault(); onSearch({ country, flightClass }); }}>
      <div className="col-md-7">
        <label htmlFor="country" className="form-label fw-semibold">Destination Country</label>
        <select
          id="country"
          className="form-select"
          value={country}
          onChange={e => setCountry(e.target.value)}
          required
        >
          <option value="">Select country...</option>
          {COUNTRIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="flightClass" className="form-label fw-semibold">Class</label>
        <select
          id="flightClass"
          className="form-select"
          value={flightClass}
          onChange={e => setFlightClass(e.target.value)}
        >
          {FLIGHT_CLASSES.map(fc => (
            <option key={fc} value={fc}>{fc}</option>
          ))}
        </select>
      </div>
      <div className="col-md-1 d-grid">
        <button type="submit" className="btn btn-primary">Search</button>
      </div>
    </form>
  );
}
