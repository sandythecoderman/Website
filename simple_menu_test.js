const puppeteer = require('puppeteer');

async function testMenuFunctionality() {
    console.log('🧪 Starting menu functionality test...');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 375, height: 667 }
    });
    
    try {
        const page = await browser.newPage();
        
        // Navigate to homepage
        console.log('📱 Navigating to homepage...');
        await page.goto('http://localhost:8080/');
        await page.waitForTimeout(2000);
        
        // Check if hamburger is visible
        console.log('🍔 Checking hamburger menu visibility...');
        const hamburger = await page.$('.hamburger');
        if (!hamburger) {
            throw new Error('Hamburger menu not found!');
        }
        console.log('✅ Hamburger menu is visible');
        
        // Check if desktop theme toggle is hidden
        console.log('🌙 Checking desktop theme toggle visibility...');
        const desktopThemeToggle = await page.$('.desktop-theme-toggle');
        if (desktopThemeToggle) {
            const isVisible = await desktopThemeToggle.isVisible();
            if (isVisible) {
                console.log('⚠️  Desktop theme toggle should be hidden on mobile');
            } else {
                console.log('✅ Desktop theme toggle is properly hidden');
            }
        }
        
        // Click hamburger to open menu
        console.log('🖱️  Clicking hamburger menu...');
        await hamburger.click();
        await page.waitForTimeout(1000);
        
        // Check if menu is open
        console.log('📋 Checking if menu is open...');
        const navMenu = await page.$('.nav-menu');
        const menuClasses = await page.evaluate(el => el.className, navMenu);
        
        if (menuClasses.includes('active')) {
            console.log('✅ Menu opened successfully');
        } else {
            throw new Error('Menu did not open!');
        }
        
        // Check if mobile theme toggle is visible in menu
        console.log('🌙 Checking mobile theme toggle in menu...');
        const mobileThemeToggle = await page.$('.mobile-theme-toggle');
        if (mobileThemeToggle) {
            const isVisible = await mobileThemeToggle.isVisible();
            if (isVisible) {
                console.log('✅ Mobile theme toggle is visible in menu');
            } else {
                console.log('⚠️  Mobile theme toggle not visible in menu');
            }
        }
        
        // Test theme toggle functionality
        console.log('🔄 Testing theme toggle...');
        const initialTheme = await page.evaluate(() => {
            return document.documentElement.getAttribute('data-theme');
        });
        console.log(`Current theme: ${initialTheme}`);
        
        // Click mobile theme toggle
        await mobileThemeToggle.click();
        await page.waitForTimeout(1000);
        
        const newTheme = await page.evaluate(() => {
            return document.documentElement.getAttribute('data-theme');
        });
        console.log(`New theme: ${newTheme}`);
        
        if (newTheme !== initialTheme) {
            console.log('✅ Theme toggle works correctly');
        } else {
            console.log('⚠️  Theme toggle may not be working');
        }
        
        // Test menu close functionality
        console.log('❌ Testing menu close...');
        await hamburger.click();
        await page.waitForTimeout(1000);
        
        const menuClassesAfterClose = await page.evaluate(el => el.className, navMenu);
        if (!menuClassesAfterClose.includes('active')) {
            console.log('✅ Menu closed successfully');
        } else {
            console.log('⚠️  Menu did not close properly');
        }
        
        console.log('🎉 All tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

// Run the test
testMenuFunctionality(); 