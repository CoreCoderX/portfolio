/**
 * Cloudflare Worker - Message Forwarding Gateway
 * Stateless worker that receives message payload and forwards it directly to Telegram
 */

import { TelegramBot } from './telegram.js';
import {
  jsonResponse,
  errorResponse,
  getCorsHeaders,
  extractMetadata,
  isValidEmail,
  isValidSessionId,
  sanitizeText,
  checkRateLimit,
} from './utils.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: getCorsHeaders(origin)
      });
    }

    // Route handling
    try {
      const pathname = url.pathname.replace(/\/+/g, '/');
      switch (pathname) {
        case '/api/message':
          return await handleSendMessage(request, env, origin);

        case '/health':
          return jsonResponse({ status: 'ok', timestamp: Date.now() }, 200, origin);

        default:
          return errorResponse('Not found', 404, origin);
      }
    } catch (error) {
      console.error('Worker error:', error);
      return errorResponse('Internal server error', 500, origin);
    }
  }
};

// Handle sending a message (forwarding to Telegram)
async function handleSendMessage(request, env, origin) {
  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405, origin);
  }

  try {
    const body = await request.json();
    const { sessionId, message, email, name, metadata } = body;

    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return errorResponse('Message is required', 400, origin);
    }

    if (message.length > 2000) {
      return errorResponse('Message too long (max 2000 characters)', 400, origin);
    }

    // Rate limiting key (use session ID or IP)
    const rateLimitId = sessionId && isValidSessionId(sessionId) ? sessionId : 'anonymous';
    const rateLimitKey = `msg:${rateLimitId}`;
    if (!checkRateLimit(rateLimitKey, 10, 60000)) { // 10 messages per minute
      return errorResponse('Rate limit exceeded. Please slow down.', 429, origin);
    }

    // Extract metadata from request headers / client info
    const requestMetadata = extractMetadata(request, metadata);

    // Sanitize input
    const cleanName = name ? sanitizeText(name) : null;
    const cleanEmail = email && isValidEmail(email) ? email.trim().toLowerCase() : null;
    const cleanMessage = sanitizeText(message);

    // Initialize Telegram bot
    const telegram = new TelegramBot(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID);

    // Format the message
    const formattedText = telegram.formatVisitorMessage(
      cleanName,
      cleanEmail,
      cleanMessage,
      sessionId,
      requestMetadata
    );

    // Send to Telegram
    const telegramMessageId = await telegram.sendMessage(formattedText);

    if (!telegramMessageId) {
      return errorResponse('Failed to deliver message', 500, origin);
    }

    return jsonResponse({
      success: true,
      timestamp: Date.now()
    }, 200, origin);

  } catch (error) {
    console.error('Send message error:', error);
    return errorResponse('Failed to process message', 500, origin);
  }
}