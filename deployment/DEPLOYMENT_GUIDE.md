# 🚀 Skenzer Website Deployment Guide

## Overview
This guide will help you replace your current Framer-hosted website at skenzer.com with your custom Skenzer website.

## 📁 Files Ready for Deployment
Your website includes these essential files:
- `index.html` - Home page
- `about.html` - About page  
- `product.html` - Product page
- `contact.html` - Contact page
- `styles.css` - All styling
- `script.js` - All JavaScript functionality
- `NYXERIN.otf` - Custom font
- Team member images (Heramb.png, Purnodeep.png, Shandesh.png)

## 🎯 Recommended Hosting: Netlify

### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub, GitLab, or email
3. Click "New site from Git" or "Deploy manually"

### Step 2: Deploy Your Website
**Option A: Drag & Drop (Easiest)**
1. Zip the deployment folder contents
2. Drag the zip file to Netlify's deploy area
3. Your site will be live instantly!

**Option B: Git Repository**
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Enable automatic deployments

### Step 3: Connect Custom Domain
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter: `skenzer.com`
4. Follow DNS configuration instructions

## 🔄 DNS Configuration

### Current Framer DNS Settings
You'll need to update these DNS records:

**Remove/Update these records:**
- CNAME: `skenzer.com` → `framer.app` (remove this)
- CNAME: `www.skenzer.com` → `framer.app` (remove this)

**Add these new records:**
- CNAME: `skenzer.com` → `your-netlify-site.netlify.app`
- CNAME: `www.skenzer.com` → `your-netlify-site.netlify.app`

### Where to Update DNS
- Go to your domain registrar (where you bought skenzer.com)
- Find DNS management section
- Update the CNAME records as shown above

## ⚡ Alternative Hosting Options

### Option B: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up and create new project
3. Upload your files or connect Git repository
4. Add custom domain in project settings

### Option C: GitHub Pages
1. Create GitHub repository
2. Upload your files
3. Enable GitHub Pages in repository settings
4. Add custom domain in repository settings

## 🔧 Pre-Deployment Checklist

- [ ] All pages load correctly locally
- [ ] Contact form works (EmailJS configured)
- [ ] Theme switching works
- [ ] All images load properly
- [ ] Custom font loads correctly
- [ ] No console errors

## 🚨 Important Notes

1. **Backup Current Site**: Download your current Framer site before replacing
2. **DNS Propagation**: DNS changes can take 24-48 hours to propagate globally
3. **SSL Certificate**: Netlify/Vercel will automatically provide SSL certificates
4. **Testing**: Test thoroughly on the new hosting before updating DNS

## 📞 Support

If you encounter issues:
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- DNS Issues: Contact your domain registrar

## 🎉 Post-Deployment

After successful deployment:
1. Test all pages and functionality
2. Update any hardcoded URLs if needed
3. Monitor site performance
4. Set up analytics if desired

Your custom Skenzer website will be live at skenzer.com! 🚀 