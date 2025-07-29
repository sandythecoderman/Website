const { test, expect } = require('@playwright/test');

test.describe('Product Page Heading Spacing', () => {
    test('should have proper heading spacing on mobile', async ({ page }) => {
        // Navigate to product page
        await page.goto('http://localhost:8081/product.html');
        
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        
        // Check the product hero section
        const productHero = await page.locator('.product-hero');
        await expect(productHero).toBeVisible();
        
        // Check the product hero title
        const productTitle = await page.locator('.hero-title');
        await expect(productTitle).toBeVisible();
        
        // Take screenshot for comparison
        await page.screenshot({ path: 'product-page-mobile-current.png' });
        
        // Get computed styles for comparison
        const heroStyles = await productHero.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
                paddingTop: styles.paddingTop,
                paddingBottom: styles.paddingBottom,
                marginTop: styles.marginTop,
                marginBottom: styles.marginBottom
            };
        });
        
        console.log('Product page hero styles:', heroStyles);
    });
    
    test('should compare with about page heading spacing', async ({ page }) => {
        // Navigate to about page
        await page.goto('http://localhost:8081/about.html');
        
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        
        // Check the about hero section
        const aboutHero = await page.locator('.about-hero');
        await expect(aboutHero).toBeVisible();
        
        // Take screenshot for comparison
        await page.screenshot({ path: 'about-page-mobile-current.png' });
        
        // Get computed styles for comparison
        const heroStyles = await aboutHero.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
                paddingTop: styles.paddingTop,
                paddingBottom: styles.paddingBottom,
                marginTop: styles.marginTop,
                marginBottom: styles.marginBottom
            };
        });
        
        console.log('About page hero styles:', heroStyles);
    });
}); 