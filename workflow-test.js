const { test, expect } = require('@playwright/test');

test('clean workflow section visual test', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:8081');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot of the workflow section
    const workflowSection = page.locator('.clean-workflow');
    await workflowSection.waitFor({ state: 'visible' });
    
    // Take screenshot of the entire workflow section
    await workflowSection.screenshot({ path: 'clean-workflow-section.png' });
    
    // Take screenshot of the full page to see context
    await page.screenshot({ path: 'full-page-clean-workflow.png', fullPage: true });
    
    // Check if the workflow exists
    await expect(workflowSection).toBeVisible();
    
    // Check if all three steps are present
    const steps = page.locator('.workflow-step');
    await expect(steps).toHaveCount(3);
    
    // Check if step numbers are visible
    const stepNumbers = page.locator('.step-number');
    await expect(stepNumbers).toHaveCount(3);
    
    // Check if the processing step is visible
    const processingStep = page.locator('.processing-step');
    await expect(processingStep).toBeVisible();
    
    // Check if both engines are visible
    const engines = page.locator('.engine-item');
    await expect(engines).toHaveCount(2);
    
    // Check if benefits grid is visible
    const benefitsGrid = page.locator('.benefits-grid');
    await expect(benefitsGrid).toBeVisible();
    
    // Check if all three benefit items are present
    const benefitItems = page.locator('.benefit-item');
    await expect(benefitItems).toHaveCount(3);
    
    // Check specific content
    await expect(page.locator('text=Data Input')).toBeVisible();
    await expect(page.locator('text=AI Processing')).toBeVisible();
    await expect(page.locator('text=Smart Output')).toBeVisible();
    await expect(page.locator('text=Super RAG')).toBeVisible();
    await expect(page.locator('text=Man O Man')).toBeVisible();
    
    console.log('Clean workflow section test completed. Check clean-workflow-section.png and full-page-clean-workflow.png for visual results.');
}); 