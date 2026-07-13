# Neo Brutalism Portfolio

**A Neo-Brutalist Interactive Developer Portfolio**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Iconify](https://img.shields.io/badge/Iconify-1769AA?style=for-the-badge&logo=iconify&logoColor=white)](https://iconify.design/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## Overview

**Neo Brutalism Portfolio** is a highly interactive, performance-focused developer portfolio built entirely with vanilla web technologies. Instead of following conventional minimalist portfolio templates, it embraces a bold **Neo-Brutalist** design language featuring thick borders, hard offset shadows, vibrant color blocks, and expressive typography.

The experience is designed to feel like navigating a custom-built operating system, complete with a terminal boot sequence, command-based navigation, smooth animations, and physics-inspired interactions.

## Features

- Terminal-inspired boot sequence with skip support
- Neo-Brutalist design system with bold borders, offset shadows, and high-contrast layouts
- GSAP-powered animations with ScrollTrigger-based scroll effects
- Interactive skills section with animated proficiency bars
- Scroll-driven journey timeline with animated progress indicator
- Custom desktop cursor and subtle parallax effects
- Dark Mode with LocalStorage persistence
- Chaos Mode for intentionally offset, experimental layouts
- Fully responsive across desktop, tablet, and mobile devices

## Tech Stack

| Category | Technology |
|----------|------------|
| Structure | Semantic HTML5 |
| Styling | CSS3 (Custom Properties) |
| Logic | Vanilla JavaScript (ES6+) |
| Animation | GSAP 3, ScrollTrigger |
| Icons | Iconify |
| Typography | Space Grotesk |

## Getting Started

This is a completely static website. No package manager, build tools, or installation steps are required.

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- *(Optional)* VS Code Live Server extension

### Clone the Repository

```bash
git clone https://github.com/CoreCoderX/portfolio.git
```

### Navigate to the Project

```bash
cd portfolio
```

### Run the Project

Simply open `index.html` in your browser.

For the best development experience, launch the project using **VS Code Live Server**.

## Project Structure

```text
portfolio/
├── index.html      # Main HTML structure
├── style.css       # Styling, layouts, themes, and responsive design
├── script.js       # Animations, interactions, and application logic
└── README.md       # Documentation
```

## Customization

The project is designed to be easily customized while keeping the overall architecture intact.

### Update Skills

Skills are stored inside the `SKILLS_DATA` object in `script.js`.

```javascript
const SKILLS_DATA = {
    programming: [
        {
            name: "Java",
            icon: "simple-icons:java",
            level: 90
        }

        // Add more skills...
    ]
};
```

Icons are powered by **Iconify**.

Format:

```text
collection:icon-name
```

Examples:

```text
simple-icons:flutter
mdi:database
logos:react
```

### Update Hero Roles

Modify the `ROLES` array inside `script.js`.

```javascript
const ROLES = [
    "APPLICATION DEVELOPER",
    "FULL STACK DEVELOPER",
    "FLUTTER DEVELOPER",
    "AI ENGINEER"

    // Add your own roles...
];
```

### Customize the Theme

The design system is driven by CSS custom properties.

Edit the variables inside the `:root` selector in `style.css`.

```css
:root {
    --bg-cream: #FFFDF5;
    --fg-black: #000000;

    --accent-red: #FF6B6B;
    --accent-yellow: #FFD93D;
    --accent-violet: #C4B5FD;
    --accent-green: #4ADE80;
    --accent-blue: #60A5FA;

    --shadow-md: 8px 8px 0 var(--fg-black);

    --font-main: "Space Grotesk", sans-serif;
}
```

Updating these values automatically changes the appearance of the entire portfolio.

## Deployment

Since the project is completely static, it can be deployed on virtually any static hosting platform.

### GitHub Pages

1. Push the repository to GitHub.
2. Open your repository.
3. Go to:

```text
Settings → Pages
```

4. Select the `main` branch.
5. Save.

Your portfolio will be available within a few minutes.

### Vercel / Netlify

1. Import your GitHub repository.
2. Deploy.

No build commands or configuration are required.

## Browser Support

| Browser | Support |
|----------|---------|
| Chrome | Latest |
| Edge | Latest |
| Firefox | Latest |
| Safari | Latest |

## Recreate This Design

The complete Neo-Brutalist Design System is included in [`PROMPT.md`](./PROMPT.md).

Copy the prompt into your preferred AI coding assistant together with your project requirements or existing codebase. The AI will generate interfaces that closely follow the visual style, layout principles, interactions, animations, and overall design language of this portfolio.

Compatible with:

- Claude
- Gemini
- GLM
- Kimi
- MiniMax
- Cursor
- Windsurf
- GitHub Copilot
- Any modern AI coding assistant

## License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute it for personal or commercial projects.

## A Note

Thank you for checking out this project.

This portfolio was built to demonstrate what can be achieved using clean code, thoughtful interactions, and a distinctive design system without relying on frameworks.

If you found this project useful or inspiring, consider giving it a **GitHub Star**. Your support is greatly appreciated.

Feel free to fork it, customize it, learn from it, and make it your own.

Happy coding.

**— Sivaprakash**