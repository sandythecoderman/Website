const { test, expect } = require('@playwright/test');

test('mobile menu functionality', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:8080/');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if hamburger is visible
    const hamburger = await page.locator('.hamburger');
    await expect(hamburger).toBeVisible();
    
    // Check if hamburger has the correct structure
    const bars = hamburger.locator('.bar');
    await expect(bars).toHaveCount(3);
    
    // Check if menu is initially closed
    const navMenu = await page.locator('.nav-menu');
    await expect(navMenu).not.toHaveClass(/active/);
    
    // Click hamburger
    await hamburger.click();
    
    // Wait for animation
    await page.waitForTimeout(500);
    
    // Check if menu opens
    await expect(navMenu).toHaveClass(/active/);
    await expect(hamburger).toHaveClass(/active/);
    
    // Check if menu items are visible
    const menuItems = navMenu.locator('.nav-link');
    await expect(menuItems).toHaveCount(4); // Home, About, Product, Contact
    
    // Check if mobile theme toggle is visible
    const mobileThemeToggle = await page.locator('.mobile-theme-toggle');
    await expect(mobileThemeToggle).toBeVisible();
    
    // Click hamburger again to close
    await hamburger.click();
    await page.waitForTimeout(500);
    
    // Check if menu closes
    await expect(navMenu).not.toHaveClass(/active/);
    await expect(hamburger).not.toHaveClass(/active/);
});

test('mobile menu styling and animations', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:8080/');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const hamburger = await page.locator('.hamburger');
    const navMenu = await page.locator('.nav-menu');
    
    // Check hamburger styling
    await expect(hamburger).toHaveCSS('display', 'block');
    await expect(hamburger).toHaveCSS('cursor', 'pointer');
    
    // Open menu
    await hamburger.click();
    await page.waitForTimeout(500);
    
            // Check menu positioning and styling
        await expect(navMenu).toHaveCSS('position', 'fixed');
        await expect(navMenu).toHaveCSS('left', '0px');
        await expect(navMenu).toHaveCSS('width', '375px'); // Mobile viewport width
    
            // Check menu items styling
        const menuItems = navMenu.locator('.nav-link');
        for (let i = 0; i < await menuItems.count(); i++) {
            const item = menuItems.nth(i);
            await expect(item).toBeVisible();
            // Check that font-size is reasonable (browser converts rem to px)
            const fontSize = await item.evaluate(el => getComputedStyle(el).fontSize);
            expect(parseFloat(fontSize)).toBeGreaterThan(15); // Should be around 20.8px
        }
});

test('mobile menu theme toggle', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:8080/');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const hamburger = await page.locator('.hamburger');
    const navMenu = await page.locator('.nav-menu');
    
    // Open menu
    await hamburger.click();
    await page.waitForTimeout(500);
    
    // Check if mobile theme toggle is present
    const mobileThemeToggle = await page.locator('.mobile-theme-toggle .theme-toggle');
    await expect(mobileThemeToggle).toBeVisible();
    
    // Get initial theme
    const initialTheme = await page.evaluate(() => 
        document.documentElement.getAttribute('data-theme')
    );
    
    // Click theme toggle
    await mobileThemeToggle.click();
    await page.waitForTimeout(300);
    
    // Check if theme changed
    const newTheme = await page.evaluate(() => 
        document.documentElement.getAttribute('data-theme')
    );
    expect(newTheme).not.toBe(initialTheme);
}); 