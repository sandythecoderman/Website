#!/bin/bash

echo "🚀 Skenzer Website Deployment Script"
echo "====================================="

# Check if deployment folder exists
if [ ! -d "deployment" ]; then
    echo "❌ Deployment folder not found!"
    echo "Please run the deployment preparation first."
    exit 1
fi

echo "✅ Deployment files ready!"
echo ""
echo "📁 Files to deploy:"
ls -la deployment/
echo ""
echo "🎯 Next Steps:"
echo "1. Go to https://netlify.com"
echo "2. Sign up/Login"
echo "3. Drag the 'deployment' folder to Netlify's deploy area"
echo "4. Your site will be live instantly!"
echo ""
echo "🌐 To connect skenzer.com:"
echo "1. In Netlify dashboard → Domain settings"
echo "2. Add custom domain: skenzer.com"
echo "3. Update DNS records as per DEPLOYMENT_GUIDE.md"
echo ""
echo "📋 Full instructions in: deployment/DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Ready to deploy!" 