#!/bin/bash

echo "🚀 Netlify Deployment - Easiest Option!"
echo "======================================="

# Check if deployment folder exists
if [ ! -d "deployment" ]; then
    echo "❌ Deployment folder not found!"
    exit 1
fi

echo "✅ Your website files are ready!"
echo ""
echo "📁 Files to deploy:"
ls -la deployment/
echo ""
echo "🎯 Why Netlify is Better Than GitHub Pages:"
echo "   ✅ No domain verification required"
echo "   ✅ Drag & drop deployment"
echo "   ✅ Instant custom domain setup"
echo "   ✅ Automatic SSL certificates"
echo "   ✅ Better performance"
echo ""
echo "🚀 Quick Deployment Steps:"
echo "1. Go to https://netlify.com"
echo "2. Sign up/Login"
echo "3. Click 'Add new site'"
echo "4. Select 'Deploy manually'"
echo "5. Drag the 'deployment' folder to the deploy area"
echo "6. Your site goes live in 30 seconds!"
echo ""
echo "🌐 To connect skenzer.com:"
echo "1. In your site dashboard → Domain settings"
echo "2. Click 'Add custom domain'"
echo "3. Enter: skenzer.com"
echo "4. Update DNS records (Netlify will show you exactly what to do)"
echo "5. No domain verification needed!"
echo ""
echo "📋 Full instructions in: deployment/NETLIFY_GUIDE.md"
echo ""
echo "🎉 Ready to deploy - No domain verification headaches!" 