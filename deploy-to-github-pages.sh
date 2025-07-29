#!/bin/bash

echo "🌐 GitHub Pages Deployment Script"
echo "================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository!"
    echo "Please navigate to your website directory."
    exit 1
fi

echo "✅ Git repository found!"
echo ""

# Check if we have uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 You have uncommitted changes:"
    git status --short
    echo ""
    echo "💡 Run these commands to commit and push:"
    echo "   git add ."
    echo "   git commit -m 'Your commit message'"
    echo "   git push origin main"
    echo ""
else
    echo "✅ All changes are committed and pushed!"
    echo ""
fi

echo "🎯 Next Steps for GitHub Pages:"
echo "1. Go to your GitHub repository: https://github.com/sandythecoderman/Website"
echo "2. Click 'Settings' (top navigation)"
echo "3. Scroll down to 'Pages' (left sidebar)"
echo "4. Under 'Source', select:"
echo "   - Source: 'Deploy from a branch'"
echo "   - Branch: 'main'"
echo "   - Folder: '/ (root)'"
echo "5. Click 'Save'"
echo ""
echo "🌐 To connect skenzer.com:"
echo "1. In repository Settings → Pages"
echo "2. Under 'Custom domain', enter: skenzer.com"
echo "3. Check 'Enforce HTTPS'"
echo "4. Click 'Save'"
echo "5. Update DNS records as per GITHUB_PAGES_GUIDE.md"
echo ""
echo "📋 Full instructions in: deployment/GITHUB_PAGES_GUIDE.md"
echo ""
echo "🎉 Your site will be live at: https://sandythecoderman.github.io/Website"
echo "   (until you add the custom domain)" 