const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const pages = [
        { name: 'Product', url: 'http://localhost:8081/product.html' },
        { name: 'Contact', url: 'http://localhost:8081/contact.html' }
    ];
    
    for (const pageInfo of pages) {
        console.log(`\n=== Checking ${pageInfo.name} page ===`);
        
        try {
            await page.goto(pageInfo.url);
            await page.waitForLoadState('networkidle');
            
            // Check if mobile menu is visible (it shouldn't be on desktop)
            const mobileMenuVisible = await page.evaluate(() => {
                const navMenu = document.querySelector('.nav-menu');
                const computedStyle = window.getComputedStyle(navMenu);
                return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
            });
            
            console.log(`Mobile menu visible on desktop: ${mobileMenuVisible}`);
            
            if (mobileMenuVisible) {
                console.log('❌ PROBLEM: Mobile menu is visible on desktop!');
                
                // Check if theme toggle is visible
                const toggleVisible = await page.evaluate(() => {
                    const toggle = document.querySelector('.theme-toggle');
                    if (!toggle) return false;
                    
                    const rect = toggle.getBoundingClientRect();
                    const computedStyle = window.getComputedStyle(toggle);
                    
                    return rect.width > 0 && 
                           rect.height > 0 && 
                           computedStyle.display !== 'none' && 
                           computedStyle.visibility !== 'hidden';
                });
                
                console.log(`Theme toggle visible: ${toggleVisible}`);
                
                if (toggleVisible) {
                    console.log('❌ PROBLEM: Theme toggle is visible on desktop!');
                }
            } else {
                console.log('✅ Mobile menu correctly hidden on desktop');
            }
            
        } catch (error) {
            console.log(`Error loading ${pageInfo.name}: ${error.message}`);
        }
    }
    
    await browser.close();
})(); 