# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Deployment Instructions

### GitHub Pages Deployment
1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Select "main" branch and "/ (root)" folder
5. Click Save
6. Your site will be published at `https://[username].github.io/[repository-name]`

### Render Deployment
1. Sign up/Login to Render (render.com)
2. Click "New +" and select "Static Site"
3. Connect your GitHub repository
4. Set the following:
   - Build Command: (leave empty)
   - Publish Directory: .
5. Click "Create Static Site"

## File Structure
```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── navigation.js       # Navigation logic
├── animations.js       # Animation logic
├── 404.html           # GitHub Pages routing handler
├── images/            # Image assets
└── public/            # Public assets
```

## Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. For live reload, use a local server:
   ```bash
   npx serve
   ``` 