/**
 * Utility functions for validation, parsing, and data handling
 */

// Safe get with fallback defaulting to NaN
export const safeGet = (fn, fallback = 'NaN') => {
  try {
    const result = fn();
    return result !== null && result !== undefined && result !== '' ? result : fallback;
  } catch {
    return fallback;
  }
};

// Validate email format
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

// Validate session ID format
export const isValidSessionId = (sessionId) => {
  if (!sessionId || typeof sessionId !== 'string') return false;
  return /^[a-f0-9]{32}$/.test(sessionId);
};

// Sanitize text input (prevent XSS)
export const sanitizeText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .trim()
    .substring(0, 2000) // Max length
    .replace(/[<>]/g, ''); // Remove potential HTML tags
};

// Extract metadata from request, merging with client-side gathered data
export const extractMetadata = (request, clientData = {}) => {
  const cf = request.cf || {};
  
  return {
    // Geo data from Cloudflare
    geo: {
      country: safeGet(() => cf.country, 'NaN'),
      city: safeGet(() => cf.city, 'NaN'),
      region: safeGet(() => cf.region, 'NaN'),
      continent: safeGet(() => cf.continent, 'NaN'),
      timezone: safeGet(() => cf.timezone, 'NaN'),
      postalCode: safeGet(() => cf.postalCode, 'NaN'),
      latitude: safeGet(() => cf.latitude, 'NaN'),
      longitude: safeGet(() => cf.longitude, 'NaN'),
      metroCode: safeGet(() => cf.metroCode, 'NaN'),
    },
    
    // Network data
    network: {
      ip: safeGet(() => request.headers.get('cf-connecting-ip'), 'NaN'),
      asn: safeGet(() => cf.asn, 'NaN'),
      asnOrganization: safeGet(() => cf.asOrganization, 'NaN'),
      colo: safeGet(() => cf.colo, 'NaN'), // Cloudflare datacenter
      httpProtocol: safeGet(() => request.headers.get('cf-http-protocol') || cf.httpProtocol, 'NaN'),
      tlsVersion: safeGet(() => cf.tlsVersion, 'NaN'),
      tlsCipher: safeGet(() => cf.tlsCipher, 'NaN'),
      botScore: safeGet(() => cf.botScore, 'NaN'),
    },
    
    // Merge client-provided data (browser info, battery, screen size, local time, etc.)
    ...clientData
  };
};

// CORS headers helper
export const getCorsHeaders = (origin) => {
  const isAllowed =
    !origin || // file:// access
    origin === 'null' || // file:// access
    origin === 'https://corecoderx.github.io' ||
    origin.startsWith('https://corecoderx.github.io') ||
    /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin) ||
    /^https?:\/\/0\.0\.0\.0(:\d+)?$/.test(origin);

  const corsOrigin = isAllowed ? (origin || '*') : 'https://corecoderx.github.io';

  return {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
    'Access-Control-Allow-Credentials': origin && origin !== 'null' ? 'true' : 'false',
    'Access-Control-Max-Age': '86400',
  };
};

// JSON response helper
export const jsonResponse = (data, status = 200, origin = null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(origin ? getCorsHeaders(origin) : {}),
  };
  
  return new Response(JSON.stringify(data), { status, headers });
};

// Error response helper
export const errorResponse = (message, status = 400, origin = null) => {
  return jsonResponse({ error: message }, status, origin);
};

// Rate limiting check (simple in-memory)
const rateLimitMap = new Map();

export const checkRateLimit = (key, maxRequests, windowMs) => {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };
  
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }
  
  record.count++;
  rateLimitMap.set(key, record);
  
  if (rateLimitMap.size > 10000) {
    const keysToDelete = [];
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetTime) keysToDelete.push(k);
    }
    keysToDelete.forEach(k => rateLimitMap.delete(k));
  }
  
  return record.count <= maxRequests;
};

// Generate unique session ID
export const generateSessionId = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};