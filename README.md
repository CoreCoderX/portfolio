# Neo Brutalism Portfolio

**A Neo-Brutalist Interactive Developer Portfolio with a Serverless Contact Gateway**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## Preview the page

Visit the Link: **https://corecoderx.github.io/portfolio/**

## Overview

**Neo Brutalism Portfolio** is a highly interactive, performance-focused developer portfolio built with vanilla web technologies. Instead of following conventional minimalist templates, it embraces a bold **Neo-Brutalist** design language featuring thick borders, hard offset shadows, vibrant color blocks, and expressive typography.

The layout includes a serverless messaging system powered by a stateless **Cloudflare Worker** that forwards messages directly to your **Telegram Bot** with full telemetry diagnostics (geo-location, browser, screen/viewport parameters, OS, connection quality, battery level, referrers, and timestamps), defaulting to `NaN` if any client attributes fail to load.

---

## Features

- **Pulsing & Interactive Elements:** Neo-brutalist theme matching throughout the layout, custom mouse cursors, and physics-inspired parallax stars.
- **GSAP-powered Animations:** Smooth ScrollTrigger animations for timelines, profile cards, and progress gauges.
- **Clean Education Gauges:** Beautiful University CGPA and School Score meters with dynamic filling algorithms and centered text scores.
- **Stateless Messaging Gateway:** Simplified contact form modal powered by a Cloudflare Worker backend that forwards messages directly to your Telegram bot.
- **Rich Telemetry Profiling:** Automatically captures extensive diagnostic details (IP, country, region/city, ISP, browser, engine, OS version, device brand, screen specs, light/dark theme preference, battery charge, connection speed, referrer source, local time, and page paths) defaulting safely to `NaN` on error.
- **Fully Responsive & Offline Friendly:** Perfect viewports across desktop, tablet, and mobile with fallback configurations.

---

## Project Structure

```text
portfolio/
├── assets/          # Project assets (docs, photos, profiles, and SVG GitArt)
├── index.html       # Primary portfolio layout structure
├── style.css        # Core stylesheet containing the Neo-Brutalist design tokens
├── script.js        # GSAP animations, timelines, and layout routines
├── chat.js          # Asynchronous client profiling and message delivery logic
├── .gitignore       # Prevents local cache, node_modules, and env files from committing
├── README.md        # Comprehensive system documentation
└── worker/          # Stateless Serverless Gateway Codebase
    ├── src/
    │   ├── index.js      # Worker router and endpoint validators
    │   ├── telegram.js   # Telegram Bot messaging & HTML formatting utilities
    │   └── utils.js      # CORS, rate limiting, and request metadata extractors
    └── wrangler.toml     # Cloudflare wrangler deployment configurations
```

---

## Complete A-to-Z Setup & Deployment Guide

This guide walks you through setting up the serverless backend on Cloudflare Workers and deploying the static portfolio frontend on GitHub Pages from scratch.

### Step 1: Install Node.js & Wrangler CLI

Wrangler is the official command-line tool for Cloudflare Workers.

1. Download and install **[Node.js](https://nodejs.org/)** (LTS version recommended) if you don't have it.
2. Open your terminal/command prompt and install the Cloudflare Wrangler CLI globally:
   ```bash
   npm install -g wrangler
   ```
3. Verify the installation:
   ```bash
   wrangler --version
   ```

### Step 2: Log in to Cloudflare

Authenticate the CLI with your Cloudflare account.

1. Run the login command:
   ```bash
   wrangler login
   ```
2. Your browser will open automatically. Click **Allow** to authorize Wrangler to access your Cloudflare account.
3. Once successful, return to your terminal.

### Step 3: Retrieve your Account ID & Configure `wrangler.toml`

1. Log in to your **[Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2. Select your account from the dashboard home page.
3. Look at the right-hand side panel under **Account ID** and copy the string value.
4. Open the file `./worker/wrangler.toml` in your text editor.
5. Replace the `account_id` field with your copied Account ID:
   ```toml
   account_id = "your_actual_cloudflare_account_id_here"
   ```

### Step 4: Create a Telegram Bot & Find your Chat ID

1. In Telegram, search for the official account **[@BotFather](https://t.me/botfather)** and start a conversation.
2. Send `/newbot` and follow the instructions to choose a name and username.
3. Copy the generated **HTTP API Token** (e.g., `8231837214:AAHbABWlTC5m...`). This is your `TELEGRAM_BOT_TOKEN`.
4. Now, search for **[@userinfobot](https://t.me/userinfobot)** and start a conversation.
5. Copy your **Id** value (a string of numbers like `6236188778`). This is your `TELEGRAM_CHAT_ID`.

### Step 5: Upload Secrets to Cloudflare

Secrets must be encrypted on Cloudflare's server rather than written in plain text in your repository configuration.

1. In your terminal, navigate to the `worker/` subdirectory:
   ```bash
   cd worker
   ```
2. Add your Telegram Bot Token:
   ```bash
   wrangler secret put TELEGRAM_BOT_TOKEN
   ```
   _When prompted, paste your `TELEGRAM_BOT_TOKEN` and press Enter._
3. Add your Chat ID:
   ```bash
   wrangler secret put TELEGRAM_CHAT_ID
   ```
   _When prompted, paste your `TELEGRAM_CHAT_ID` and press Enter._

### Step 6: Deploy the Stateless Worker

1. Deploy the backend script from the `worker/` folder:
   ```bash
   wrangler deploy
   ```
2. Once the deployment finishes, the terminal will print a live production URL:
   ```text
   https://portfolio-chat-worker.<your-username>.workers.dev
   ```
3. Copy this URL.

### Step 7: Update Frontend Configuration

1. Open the `./index.html` file in your text editor.
2. Scroll to the bottom of the file (around line 1120) and locate the chat initializer code.
3. Update the `workerUrl` property with your newly deployed Cloudflare Worker URL:
   ```javascript
   PortfolioChat.init({
     workerUrl: "https://portfolio-chat-worker.<your-username>.workers.dev",
   });
   ```
4. Save the file.

### Step 8: Deploy to GitHub Pages (Static Hosting)

1. Commit all your changes and push the repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure production wrangler gateway and tech badges"
   git push origin main
   ```
2. Open your repository on **[GitHub](https://github.com/)**.
3. Navigate to **Settings** → **Pages** (under the Code and automation section in the sidebar).
4. Under **Build and deployment**, set the source to **Deploy from a branch**.
5. Set the branch to `main` (and folder `/ (root)`), then click **Save**.
6. GitHub will deploy your static portfolio page. In a couple of minutes, your portfolio will be fully live and the contact form will forward all visitor profiles straight to your Telegram account!

---

## Customization

- **Tech Stack Badges:** Modify the `.chaos-badge` tags in [index.html](./index.html) or adjust their styles inside [style.css](./style.css).
- **Education Gauges:** Modify values directly in `index.html` (`data-value="8.12"` / `data-value="76%"`). The script automatically computes relative filling widths and overlays centered status labels correctly.
- **Hero Image Layout:** Replaced initials circle with customized vector art (`assets/photos/GitArt.svg`). Adjust the sizing inside `.chaos-img` in CSS for full scale control.
- **Short-Cut**: Use Ctrl + Shift + F in VS Code to search across your entire project and update content faster.

---

## License

This project is licensed under the **MIT License**. You are free to fork, modify, and use it for commercial or personal projects.

If you found this project useful or inspiring, consider giving it a **GitHub Star**. Your support is greatly appreciated.

Happy coding.

**— Sivaprakash**
