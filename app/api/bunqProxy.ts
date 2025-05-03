import { NextRequest, NextResponse } from 'next/server';

/**
 * Transparent proxy for ALL HTTP methods/paths to the Bunq Python backend.
 * Forwards method, path, query, headers, and body.
 * Usage: /api/bunqProxy/<path>?<query> → http://localhost:8000/<path>?<query>
 */

const BUNQ_PYTHON_BASE = process.env.BUNQ_PYTHON_API_URL_BASE || 'http://localhost:8000';

async function proxy(req: NextRequest) {
  try {
    // Extract the full path after /api/bunqProxy
    const url = new URL(req.url);
    const proxyPath = url.pathname.replace(/^\/api\/bunqProxy/, '') || '/';
    const proxyUrl = BUNQ_PYTHON_BASE + proxyPath + (url.search || '');
    // Forward headers except host/cookie
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      if (!['host', 'cookie', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });
    // Forward body if method allows
    let body: any = undefined;
    if (!["GET", "HEAD"].includes(req.method)) {
      body = await req.text();
    }
    // Proxy request
    const res = await fetch(proxyUrl, {
      method: req.method,
      headers,
      body,
      redirect: 'manual',
    });
    // Relay status, headers, and body
    const contentType = res.headers.get('content-type') || '';
    let responseBody;
    if (contentType.includes('application/json')) {
      responseBody = await res.json();
      return NextResponse.json(responseBody, { status: res.status });
    } else {
      responseBody = await res.text();
      return new NextResponse(responseBody, { status: res.status, headers: { 'content-type': contentType } });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to proxy to Bunq Python backend' }, { status: 500 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
