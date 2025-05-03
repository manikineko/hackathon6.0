import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder for flight recommendation logic.
// In production, fetch flights from a real API and filter by balance.

export async function POST(req: NextRequest) {
  const { balance } = await req.json();
  // TODO: Integrate with real flight API
  // For demo, return mock flights filtered by balance
  const allFlights = [
    { id: 'f1', from: 'AMS', to: 'LON', price: 200 },
    { id: 'f2', from: 'AMS', to: 'NYC', price: 700 },
    { id: 'f3', from: 'AMS', to: 'PAR', price: 120 }
  ];
  const flights = allFlights.filter(f => f.price <= balance);
  return NextResponse.json({ flights });
}
