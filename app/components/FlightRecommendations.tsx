"use client";
import React, { useState } from "react";
import CountryFlightSearch from "./CountryFlightSearch";

interface Account {
  id: string;
  name: string;
  balance: number;
}

interface Flight {
  id: string;
  from: string;
  to: string;
  price: number;
}

interface Props {
  account: Account | null;
}

export default function FlightRecommendations({ account }: Props) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [purchased, setPurchased] = useState<string | null>(null);
  const [country, setCountry] = useState<string>("");
  const [flightClass, setFlightClass] = useState<string>("Economy");

  async function fetchFlights(params?: { country?: string; flightClass?: string }) {
    if (!account) return;
    setLoading(true);
    setError("");
    setFlights([]);
    try {
      const res = await fetch("/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance: account.balance, country: params?.country || country, flightClass: params?.flightClass || flightClass }),
      });
      const data = await res.json();
      setFlights(data.flights || []);
    } catch (e) {
      setError("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy(flight: Flight) {
    setPurchased(flight.id);
    alert(`Purchased flight ${flight.from} → ${flight.to} for €${flight.price}`);
  }

  return (
    <div>
      <CountryFlightSearch
        onSearch={({ country, flightClass }) => {
          setCountry(country);
          setFlightClass(flightClass);
          fetchFlights({ country, flightClass });
        }}
      />
      <button
        className="btn btn-primary mb-3"
        onClick={() => fetchFlights()}
        disabled={!account || loading}
      >
        {loading ? "Loading..." : "Show Recommended Flights"}
      </button>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {flights.map((flight) => (
          <li
            key={flight.id}
            className="border p-4 mb-2 rounded flex items-center justify-between"
          >
            <span>
              {flight.from} → {flight.to} <b>€{flight.price}</b>
            </span>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
              onClick={() => handleBuy(flight)}
              disabled={!!purchased}
            >
              {purchased === flight.id ? "Purchased" : "Buy Ticket"}
            </button>
          </li>
        ))}
      </ul>
      {flights.length === 0 && !loading && (
        <div className="text-gray-500">No flights to show.</div>
      )}
    </div>
  );
}
