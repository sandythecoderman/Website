# Website Deployment for Netlify

This folder contains all the necessary files to deploy your website on Netlify.

## Files Included:
- `index.html` - Main homepage
- `about.html` - About page
- `contact.html` - Contact page
- `product.html` - Product page
- `styles.css` - Main stylesheet
- `script.js` - Main JavaScript file
- `*.jpeg` - Image assets
- `NYXERIN.otf` - Custom font
- `netlify.toml` - Netlify configuration
- `_redirects` - URL redirects for SPA routing

## Deployment Instructions:

1. **Drag and Drop Method:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login to your account
   - Drag this entire `netlify-deploy` folder to the Netlify dashboard
   - Your site will be deployed automatically

2. **Git Method:**
   - Push this folder to a Git repository
   - Connect your repository to Netlify
   - Set the publish directory to `.` (current directory)

## Custom Domain (Optional):
- After deployment, you can add a custom domain in your Netlify dashboard
- Go to Site Settings > Domain Management

## Notes:
- The site uses client-side routing, so all routes redirect to index.html
- All assets are optimized for web deployment
- Security headers are configured in netlify.toml 