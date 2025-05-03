import { NextRequest, NextResponse } from 'next/server';

/**
 * Transparent proxy for ALL HTTP methods/paths to the Bunq Python backend.
 * Forwards method, path, query, headers, and body.
 * Usage: /api/bunqProxy/<path>?<query> → http://localhost:8000/<path>?<query>
 */

const BUNQ_PYTHON_BASE = process.env.BUNQ_PYTHON_API_URL_BASE || 'http://localhost:8000';

export async function GET(req: NextRequest, context: { params: { proxyPath?: string[] } }) {
  return proxy(req, context);
}
export async function POST(req: NextRequest, context: { params: { proxyPath?: string[] } }) {
  return proxy(req, context);
}
export async function PUT(req: NextRequest, context: { params: { proxyPath?: string[] } }) {
  return proxy(req, context);
}
export async function PATCH(req: NextRequest, context: { params: { proxyPath?: string[] } }) {
  return proxy(req, context);
}
export async function DELETE(req: NextRequest, context: { params: { proxyPath?: string[] } }) {
  return proxy(req, context);
}

async function proxy(req: NextRequest, context: { params: { proxyPath?: string[] } }) {
  try {
    // Build the path from catch-all param (must await context.params)
    const params = await context.params;
    const proxyPath = params && params.proxyPath;
    const path = proxyPath ? '/' + proxyPath.join('/') : '/';
    const url = new URL(req.url);
    const proxyUrl = BUNQ_PYTHON_BASE + path + (url.search || '');
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
    // Debug log
    console.log('[bunqProxy] Proxying request:', {
      proxyUrl,
      method: req.method,
      headers,
      body,
    });
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
    console.error('[bunqProxy] Proxy error:', err && err.stack ? err.stack : err);
    return NextResponse.json({ error: err.message || 'Failed to proxy to Bunq Python backend', stack: err && err.stack ? err.stack : undefined }, { status: 500 });
  }
}

