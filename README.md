# Allen John's Modern Portfolio Website

A complete, responsive personal portfolio website built with **React + Vite** and styled with **Tailwind CSS**. Features smooth scrolling, modern UI, and clean component architecture.

## ✨ Features

- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Smooth Scrolling**: Elegant smooth scroll navigation between sections
- **Modern UI**: Beautiful gradient backgrounds, animations, and hover effects
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Clean Components**: Modular, reusable React components
- **Performance Optimized**: Fast load times with Vite bundling
- **Professional Sections**:
  - **Home/Hero**: Eye-catching introduction with call-to-action buttons
  - **About**: Personal information and background
  - **Skills**: Technical skills with proficiency levels
  - **Projects**: Portfolio of work with project details
  - **Contact**: Contact form and social media links
  - **Navbar**: Fixed sticky navigation with mobile menu
  - **Footer**: Comprehensive footer with links and social icons

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Fixed navigation bar with mobile menu
│   │   ├── Hero.jsx            # Home/Hero section with introduction
│   │   ├── About.jsx           # About me section
│   │   ├── Skills.jsx          # Skills and expertise section
│   │   ├── Projects.jsx        # Featured projects showcase
│   │   ├── Contact.jsx         # Contact form and information
│   │   └── Footer.jsx          # Footer with links and social icons
│   ├── App.jsx                 # Main App component
│   ├── App.css                 # Custom animations and styles
│   ├── index.css               # Tailwind CSS imports
│   └── main.jsx                # React entry point
├── public/
│   ├── logo1.png               # Logo image
│   ├── photo-removebg.png      # Profile photo
│   ├── photo1.jpg              # About section image
│   ├── calc.png                # Project image
│   ├── blind-man.jpeg          # Project image
│   └── resume.jpeg             # Resume image
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── vite.config.js              # Vite configuration
```

## 🎨 Customization

### Update Personal Information

Edit the component files to add your own information:

- **[Navbar.jsx](src/components/Navbar.jsx)**: Update logo and links
- **[Hero.jsx](src/components/Hero.jsx)**: Change name and tagline
- **[About.jsx](src/components/About.jsx)**: Add your biography
- **[Skills.jsx](src/components/Skills.jsx)**: List your technical skills
- **[Projects.jsx](src/components/Projects.jsx)**: Add your portfolio projects
- **[Contact.jsx](src/components/Contact.jsx)**: Update contact information
- **[Footer.jsx](src/components/Footer.jsx)**: Update links and social media

### Modify Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#0f172a',    // Change these values
      secondary: '#1e293b',
      accent: '#3b82f6',
    },
  },
}
```

### Add Images

Place your images in the `public/` folder and reference them:

```jsx
<img src="/your-image.png" alt="description" />
```

## 🛠️ Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

The optimized files will be in the `dist/` folder, ready for deployment.

## 📦 Dependencies

- **React**: ^19.2.0 - UI library
- **React DOM**: ^19.2.0 - DOM rendering
- **Vite**: ^7.2.4 - Build tool and dev server
- **Tailwind CSS**: ^3.4.1 - Utility-first CSS framework
- **PostCSS**: ^8.5.6 - CSS processing
- **Autoprefixer**: ^10.4.22 - CSS vendor prefixes

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Deploy to GitHub Pages

1. Add to `vite.config.js`:
   ```javascript
   export default {
     base: '/your-repo-name/',
     // ... rest of config
   }
   ```
2. Run: `npm run build`
3. Push the `dist` folder to `gh-pages` branch

## 🎯 Component Documentation

### Navbar Component
- Fixed sticky positioning
- Mobile-responsive hamburger menu
- Smooth scroll to sections
- Dark theme with hover effects

### Hero Component
- Gradient background
- Animated introduction text
- Call-to-action buttons
- Profile image with glow effect

### About Component
- Two-column layout
- About photo and biography
- Contact details display
- Responsive grid

### Skills Component
- Categorized skill sections
- Proficiency level indicators
- Animated progress bars
- Skill tag chips

### Projects Component
- Project cards with images
- Project description and tags
- Hover effects with view button
- Grid responsive layout

### Contact Component
- Contact form with validation
- Contact information cards
- Social media links
- Success message handling

### Footer Component
- Multiple footer columns
- Quick navigation links
- Social media icons
- Scroll-to-top button

## 💡 Tips

- Use smooth scrolling for better user experience
- Keep components small and focused
- Leverage Tailwind's utility classes
- Test on mobile devices frequently
- Optimize images before adding to public folder
- Use semantic HTML for better accessibility

## 🤝 Contributing

Feel free to customize and improve this portfolio template for your own use!

## 📝 License

This project is open source and available under the MIT License.

## 📧 Support

For questions or issues, feel free to reach out!

---

**Made with ❤️ using React, Vite & Tailwind CSS**
