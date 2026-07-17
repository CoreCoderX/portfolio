/**
 * Portfolio Chat Widget - Simplified HTTP Version with Full Metadata Gathering
 * Vanilla JavaScript - No dependencies
 */

(function() {
  'use strict';

  const PortfolioChat = {
    config: {
      workerUrl: null,
      sessionId: null,
    },

    // Initialize the chat configuration
    init(options = {}) {
      this.config = { ...this.config, ...options };

      if (!this.config.workerUrl) {
        console.error('PortfolioChat: workerUrl is required');
        return;
      }

      // Normalize workerUrl: remove trailing slashes
      this.config.workerUrl = this.config.workerUrl.replace(/\/+$/, '');

      // Get or create session ID
      this.config.sessionId = this.getOrCreateSessionId();

      // Dispatch ready event
      document.dispatchEvent(new CustomEvent('chat:ready', { detail: { sessionId: this.config.sessionId } }));
    },

    // Get or create session ID from localStorage
    getOrCreateSessionId() {
      let sessionId = localStorage.getItem('portfolio_chat_session');
      
      if (!sessionId || !/^[a-f0-9]{32}$/.test(sessionId)) {
        sessionId = this.generateSessionId();
        localStorage.setItem('portfolio_chat_session', sessionId);
      }
      
      return sessionId;
    },

    // Generate a random 32-character hex session ID
    generateSessionId() {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    // Parse User-Agent into clean Browser, OS, and Device info
    parseUserAgent(ua) {
      if (!ua) return { browser: 'NaN', version: 'NaN', engine: 'NaN', os: 'NaN', device: 'NaN', brand: 'NaN' };
      
      let browser = 'NaN', version = 'NaN', engine = 'NaN', os = 'NaN', device = 'NaN', brand = 'NaN';

      // OS Detection
      if (/Windows/i.test(ua)) {
        os = 'Windows';
        if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
        else if (/Windows NT 6.3/i.test(ua)) os = 'Windows 8.1';
        else if (/Windows NT 6.2/i.test(ua)) os = 'Windows 8';
        else if (/Windows NT 6.1/i.test(ua)) os = 'Windows 7';
      } else if (/Macintosh|Mac OS X/i.test(ua)) {
        os = 'macOS';
      } else if (/iPhone|iPad|iPod/i.test(ua)) {
        os = 'iOS';
        device = 'Phone';
        if (/iPad/i.test(ua)) device = 'Tablet';
      } else if (/Android/i.test(ua)) {
        os = 'Android';
        device = 'Phone';
      } else if (/Linux/i.test(ua)) {
        os = 'Linux / Ubuntu';
      }

      // Device Type Detection
      if (device === 'NaN') {
        if (/Mobile|Phone/i.test(ua)) device = 'Phone';
        else if (/Tablet|iPad|PlayBook/i.test(ua)) device = 'Tablet';
        else device = 'Desktop';
      }

      // Brand Detection
      if (/iPhone|iPad|iPod/i.test(ua)) {
        brand = 'Apple';
      } else if (/Samsung|SM-/i.test(ua)) {
        brand = 'Samsung';
      } else if (/OnePlus|OPPO/i.test(ua)) {
        brand = 'OnePlus';
      } else if (/Pixel|Google/i.test(ua)) {
        brand = 'Google Pixel';
      } else if (/Xiaomi|Redmi|MI/i.test(ua)) {
        brand = 'Xiaomi';
      } else if (device === 'Desktop') {
        brand = 'Desktop / Laptop';
      }

      // Engine Detection
      if (/AppleWebKit/i.test(ua)) {
        engine = 'WebKit';
        if (/Chrome|CriOS/i.test(ua)) {
          engine = 'Blink';
        }
      } else if (/Gecko/i.test(ua) && !/like Gecko/i.test(ua)) {
        engine = 'Gecko';
      } else if (/Trident/i.test(ua)) {
        engine = 'Trident';
      }

      // Browser & Version Detection
      if (/Chrome|CriOS/i.test(ua)) {
        browser = 'Chrome';
        const match = ua.match(/(?:Chrome|CriOS)\/([0-9.]+)/);
        if (match) version = match[1];
      } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
        browser = 'Safari';
        const match = ua.match(/Version\/([0-9.]+)/);
        if (match) version = match[1];
      } else if (/Firefox|FxiOS/i.test(ua)) {
        browser = 'Firefox';
        const match = ua.match(/(?:Firefox|FxiOS)\/([0-9.]+)/);
        if (match) version = match[1];
      } else if (/Edg/i.test(ua)) {
        browser = 'Edge';
        const match = ua.match(/Edg\/([0-9.]+)/);
        if (match) version = match[1];
      }

      return { browser, version, engine, os, device, brand };
    },

    // Get visitor battery levels
    async getBatteryInfo() {
      const fallback = { charging: 'NaN', level: 'NaN' };
      try {
        if (navigator.getBattery) {
          const battery = await navigator.getBattery();
          return {
            charging: battery.charging ? 'Charging' : 'Discharging',
            level: Math.round(battery.level * 100) + '%'
          };
        }
      } catch (e) {}
      return fallback;
    },

    // Get visitor network details
    getConnectionInfo() {
      const fallback = { type: 'NaN', downlink: 'NaN', rtt: 'NaN', saveData: 'NaN' };
      try {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
          return {
            type: conn.effectiveType || 'NaN',
            downlink: conn.downlink ? conn.downlink + ' Mbps' : 'NaN',
            rtt: conn.rtt ? conn.rtt + ' ms' : 'NaN',
            saveData: conn.saveData ? 'Enabled' : 'Disabled'
          };
        }
      } catch (e) {}
      return fallback;
    },

    // Parse referrer source
    parseReferrer(ref) {
      if (!ref) return 'Direct';
      try {
        const url = new URL(ref);
        if (url.hostname.includes('google.com')) return 'Google Search';
        if (url.hostname.includes('linkedin.com')) return 'LinkedIn';
        if (url.hostname.includes('github.com')) return 'GitHub';
        if (url.hostname.includes('twitter.com') || url.hostname.includes('t.co')) return 'Twitter';
        if (url.hostname.includes('instagram.com')) return 'Instagram';
        return url.hostname;
      } catch (e) {
        return ref;
      }
    },

    // Gathers full metadata synchronously and asynchronously
    async gatherMetadata() {
      const safe = (fn, fallback = 'NaN') => {
        try {
          const result = fn();
          return result !== null && result !== undefined && result !== '' ? result : fallback;
        } catch {
          return fallback;
        }
      };

      const battery = await this.getBatteryInfo();
      const connection = this.getConnectionInfo();
      const parsedUA = this.parseUserAgent(navigator.userAgent);

      return {
        screen: safe(() => `${window.screen.width} × ${window.screen.height}`),
        viewport: safe(() => `${window.innerWidth} × ${window.innerHeight}`),
        theme: safe(() => document.body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode'),
        preferredScheme: safe(() => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'),
        language: safe(() => navigator.language),
        localTime: safe(() => new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })),
        currentPage: safe(() => window.location.pathname),
        referrer: safe(() => this.parseReferrer(document.referrer)),
        touchSupport: safe(() => ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? 'Touch Device' : 'Mouse + Keyboard'),
        url: safe(() => window.location.href),
        battery,
        connection,
        parsedUA
      };
    },

    // Send a message via HTTP POST
    async sendMessage(message, email = null, name = null) {
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        throw new Error('Message is required');
      }

      // Gather full fresh metadata
      const gatheredMeta = await this.gatherMetadata();

      const payload = {
        sessionId: this.config.sessionId,
        message: message.trim(),
        metadata: gatheredMeta,
      };

      if (email) payload.email = email.trim();
      if (name) payload.name = name.trim();

      const response = await fetch(`${this.config.workerUrl}/api/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to send message');
      }

      const data = await response.json();
      
      // Dispatch success event
      document.dispatchEvent(new CustomEvent('chat:message_sent', { detail: data }));
      return data;
    }
  };

  // Export to global scope
  window.PortfolioChat = PortfolioChat;
})();