import { NextRequest, NextResponse } from 'next/server';

const BUNQ_API_MODE = process.env.BUNQ_API_MODE || 'sandbox';
const BUNQ_API_KEY = BUNQ_API_MODE === 'production'
  ? process.env.BUNQ_API_KEY
  : process.env.BUNQ_SANDBOX_API_KEY;
const BUNQ_API_URL = BUNQ_API_MODE === 'production'
  ? 'https://api.bunq.com/v1'
  : 'https://public-api.sandbox.bunq.com/v1';

// Helper to fetch user info (to get userId)
async function getUserId(headers: Record<string, string>): Promise<string | null> {
  const res = await fetch(`${BUNQ_API_URL}/user`, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  const user = data.Response?.[0]?.UserPerson || data.Response?.[0]?.UserCompany;
  return user?.id?.toString() || null;
}

export async function GET(req: NextRequest) {
  if (!BUNQ_API_KEY) {
    // Fallback to mock accounts if no API key
    return NextResponse.json({
      accounts: [
        { id: '1', name: 'Main Account', balance: 1200.50 },
        { id: '2', name: 'Savings', balance: 3500.00 }
      ],
      mode: 'mock'
    });
  }

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'X-Bunq-Client-Request-Id': Date.now().toString(),
    'X-Bunq-Geolocation': '0 0 0 0 NL',
    'X-Bunq-Language': 'en_US',
    'X-Bunq-Region': 'nl_NL',
    'X-Bunq-Client-Authentication': BUNQ_API_KEY,
  };

  try {
    // Get userId
    const userId = await getUserId(headers);
    if (!userId) throw new Error('Could not fetch userId');
    // Get monetary accounts
    const res = await fetch(`${BUNQ_API_URL}/user/${userId}/monetary-account`, { headers });
    if (!res.ok) throw new Error('Could not fetch accounts');
    const data = await res.json();
    const accounts = (data.Response || []).map((r: any) => {
      const acc = r.MonetaryAccountBank || r.MonetaryAccountSavings || r.MonetaryAccountJoint;
      return acc ? {
        id: acc.id?.toString(),
        name: acc.description,
        balance: parseFloat(acc.balance?.value || '0'),
      } : null;
    }).filter(Boolean);
    return NextResponse.json({ accounts, mode: BUNQ_API_MODE });
  } catch (e) {
    // Fallback to mock if error
    return NextResponse.json({
      accounts: [
        { id: '1', name: 'Main Account', balance: 1200.50 },
        { id: '2', name: 'Savings', balance: 3500.00 }
      ],
      mode: 'mock',
      error: (e as Error).message,
    });
  }
}
