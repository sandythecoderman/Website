# Skenzer Website

A modern, responsive website for Skenzer AI startup featuring advanced animations and professional design.

## 🚀 Features

- **Modern Design**: Clean, professional interface with dark/light theme support
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Animations**: 5 different animation styles with style selector
- **Multi-page Structure**: Separate pages for Home, About, Product, and Contact
- **Theme Switching**: Dynamic color schemes (green for dark mode, purple for light mode)
- **Professional Content**: Tailored for tech investors and venture capitalists

## 🎨 Animation Styles

1. **Floating Icons**: Tech icons that gently float with hover effects
2. **Typing Animation**: Terminal-style typewriter effect
3. **Geometric Animation**: Rotating shapes with connecting lines
4. **Wave Flow**: Data flow visualization with animated waves
5. **Pulse Animation**: AI heartbeat effect with expanding rings

## 📁 Project Structure

```
skenzer-website/
├── index.html          # Home page
├── about.html          # About Us page
├── product.html        # Product/Skenzer Synapse page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet with animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript**: Interactive functionality and theme switching
- **Font Awesome**: Icons for UI elements
- **Google Fonts**: Montserrat font family

## 🎯 Key Sections

### Home Page
- Hero section with animated visual components
- Problem statement with three key challenges
- Solution introduction with Skenzer Synapse
- Impact metrics with ROI statistics

### About Page
- Company story and mission
- Team member profiles
- Founding narrative

### Product Page
- Skenzer Synapse platform details
- Two-engine architecture explanation
- Use cases with interactive tabs
- Call-to-action for demos

### Contact Page
- Contact information for different inquiries
- Contact form with validation
- Professional contact details

## 🌟 Design Highlights

- **Color Scheme**: 
  - Dark mode: Green accents (#00ff88)
  - Light mode: Purple accents (#8b5cf6)
- **Typography**: Montserrat font family for modern, clean look
- **Animations**: Smooth CSS transitions and keyframe animations
- **Responsive**: Mobile-first approach with adaptive layouts

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skenzer-website.git
   cd skenzer-website
   ```

2. Open in your browser:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

3. Or simply open `index.html` in your browser

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --accent-color: #00ff88; /* Dark mode color */
}

[data-theme="light"] {
    --accent-color: #8b5cf6; /* Light mode color */
}
```

### Adding New Animations
1. Add new animation component to HTML
2. Create corresponding CSS styles
3. Add button to style selector
4. Update JavaScript for switching

## 📄 License

This project is created for Skenzer AI startup. All rights reserved.

## 🤝 Contributing

This is a private project for Skenzer AI. For questions or suggestions, please contact the development team.

---

**Built with ❤️ for Skenzer AI** 