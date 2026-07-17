/**
 * Telegram Bot API integration - Full Metadata Formatting
 */

const TELEGRAM_API_BASE = 'https://api.telegram.org';

export class TelegramBot {
  constructor(token, chatId) {
    this.token = token;
    this.chatId = chatId;
    this.apiUrl = `${TELEGRAM_API_BASE}/bot${token}`;
  }

  // Send message to Telegram
  async sendMessage(text, parseMode = 'HTML') {
    try {
      const payload = {
        chat_id: this.chatId,
        text: text.substring(0, 4096), // Telegram message limit
        parse_mode: parseMode,
      };

      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.ok) {
        console.error('Telegram API error:', data);
        return null;
      }

      return data.result.message_id;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return null;
    }
  }

  // Format visitor message for Telegram with full metadata
  formatVisitorMessage(name, email, message, sessionId, metadata = null) {
    const getIstTimeString = (utcTimestamp) => {
      try {
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(utcTimestamp + istOffset);
        return istDate.toISOString().replace('T', ' ').substring(0, 19) + ' IST';
      } catch (e) {
        return 'NaN';
      }
    };

    const getCountryName = (code) => {
      const countries = {
        'IN': 'India', 'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada',
        'AU': 'Australia', 'DE': 'Germany', 'FR': 'France', 'JP': 'Japan',
        'SG': 'Singapore', 'AE': 'United Arab Emirates'
      };
      return countries[code] || code || 'NaN';
    };

    const safeVal = (val, fallback = 'NaN') => {
      return val !== undefined && val !== null && val !== '' ? val : fallback;
    };

    const meta = metadata || {};
    const geo = meta.geo || {};
    const client = meta.client || {};
    const network = meta.network || {};
    
    // Parsed info from frontend
    const ua = meta.parsedUA || {};
    const battery = meta.battery || {};
    const connection = meta.connection || {};

    let text = `🔔 <b>New Message from Portfolio</b>\n\n`;
    text += `💬 <i>"${this.escapeHtml(message)}"</i>\n\n`;

    text += `📋 <b>General Info:</b>\n`;
    text += `• Session ID: <code>${safeVal(sessionId)}</code>\n`;
    text += `• Visitor Name: <b>${this.escapeHtml(safeVal(name))}</b>\n`;
    text += `• Visitor Email: <code>${this.escapeHtml(safeVal(email))}</code>\n\n`;

    text += `📍 <b>Visitor Location (Geo):</b>\n`;
    const cc = safeVal(geo.country);
    text += `• Country: ${getCountryName(cc)} (${cc})\n`;
    text += `• Region / State: ${safeVal(geo.region)}\n`;
    text += `• City: ${safeVal(geo.city)}\n`;
    text += `• Continent: ${safeVal(geo.continent)}\n`;
    text += `• Postal Code: ${safeVal(geo.postalCode)}\n`;
    text += `• Coordinates: ${safeVal(geo.latitude)}, ${safeVal(geo.longitude)}\n`;
    text += `• Timezone: ${safeVal(geo.timezone)}\n`;
    text += `• Metro Code: ${safeVal(geo.metroCode)}\n\n`;

    text += `🔌 <b>Network & Cloudflare Info:</b>\n`;
    text += `• IP Address: <code>${safeVal(network.ip)}</code>\n`;
    text += `• ISP / ASN: ${safeVal(network.asnOrganization)}\n`;
    text += `• ASN Number: ${safeVal(network.asn)}\n`;
    text += `• HTTP Protocol: ${safeVal(network.httpProtocol)}\n`;
    text += `• TLS Version: ${safeVal(network.tlsVersion)}\n`;
    text += `• Cipher Suite: ${safeVal(network.tlsCipher)}\n`;
    text += `• Cloudflare Datacenter: ${safeVal(network.colo)}\n`;
    text += `• Bot Score: ${safeVal(network.botScore)}\n\n`;

    text += `💻 <b>System & Browser Details:</b>\n`;
    text += `• Browser: ${safeVal(ua.browser)} (Engine: ${safeVal(ua.engine)})\n`;
    text += `• Browser Version: ${safeVal(ua.version)}\n`;
    text += `• Operating System: ${safeVal(ua.os)}\n`;
    text += `• Device Type: ${safeVal(ua.device)}\n`;
    text += `• Brand / Model: ${safeVal(ua.brand)}\n\n`;

    text += `📺 <b>Environment & Settings:</b>\n`;
    text += `• Screen Size: ${safeVal(meta.screen)}\n`;
    text += `• Viewport Size: ${safeVal(meta.viewport)}\n`;
    text += `• Theme Mode: ${safeVal(meta.theme)} (Prefers: ${safeVal(meta.preferredScheme)})\n`;
    text += `• Language: ${safeVal(meta.language)}\n`;
    text += `• Touch Support: ${safeVal(meta.touchSupport)}\n`;
    text += `• Referrer Source: ${safeVal(meta.referrer)}\n`;
    text += `• Battery Status: ${safeVal(battery.level)} (${safeVal(battery.charging)})\n`;
    text += `• Connection Speed: ${safeVal(connection.type)} (RTT: ${safeVal(connection.rtt)}, Downlink: ${safeVal(connection.downlink)})\n`;
    text += `• Save Data Mode: ${safeVal(connection.saveData)}\n\n`;

    text += `⏰ <b>Submission Metadata:</b>\n`;
    text += `• Visitor Local Time: ${safeVal(meta.localTime)}\n`;
    text += `• Visited URL: ${safeVal(meta.url)}\n`;
    text += `• Current Page Path: ${safeVal(meta.currentPage)}\n`;
    text += `• Worker Server Time: ${getIstTimeString(Date.now())}\n`;

    return text;
  }

  // Escape HTML for Telegram compatibility
  escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}