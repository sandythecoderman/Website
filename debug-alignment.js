const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the local server
  await page.goto('http://localhost:8081');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Inspect the solution flow section
  const solutionFlow = await page.locator('.enhanced-solution-flow');
  
  if (await solutionFlow.count() > 0) {
    console.log('Found solution flow section');
    
    // Get the three main cards
    const leftCard = await page.locator('.flow-layer.input-layer');
    const centerCard = await page.locator('.processing-core');
    const rightCard = await page.locator('.flow-layer.output-layer');
    
    // Get their positions and dimensions
    const leftBox = await leftCard.boundingBox();
    const centerBox = await centerCard.boundingBox();
    const rightBox = await rightCard.boundingBox();
    
    console.log('Left card position:', leftBox);
    console.log('Center card position:', centerBox);
    console.log('Right card position:', rightBox);
    
    // Check if they're aligned
    const leftTop = leftBox.y;
    const centerTop = centerBox.y;
    const rightTop = rightBox.y;
    
    console.log('Top positions:', { left: leftTop, center: centerTop, right: rightTop });
    
    if (Math.abs(leftTop - centerTop) < 5 && Math.abs(centerTop - rightTop) < 5) {
      console.log('✅ Cards are properly aligned!');
    } else {
      console.log('❌ Cards are NOT aligned!');
      console.log('Left card is', leftTop - centerTop, 'pixels different from center');
      console.log('Right card is', rightTop - centerTop, 'pixels different from center');
    }
    
    // Check for any CSS rules that might be affecting positioning
    const centerStyles = await centerCard.evaluate(el => {
      const styles = window.getComputedStyle(el);
      const parentStyles = window.getComputedStyle(el.parentElement);
      return {
        display: styles.display,
        alignItems: styles.alignItems,
        height: styles.height,
        position: styles.position,
        top: styles.top,
        margin: styles.margin,
        padding: styles.padding,
        transform: styles.transform,
        parentDisplay: parentStyles.display,
        parentAlignItems: parentStyles.alignItems,
        parentHeight: parentStyles.height
      };
    });
    
    console.log('Center card detailed styles:', centerStyles);
    
    // Check if there are any absolutely positioned children affecting the layout
    const centerChildren = await centerCard.evaluate(el => {
      const children = Array.from(el.children);
      return children.map(child => {
        const styles = window.getComputedStyle(child);
        return {
          tagName: child.tagName,
          className: child.className,
          position: styles.position,
          top: styles.top,
          left: styles.left,
          height: styles.height
        };
      });
    });
    
    console.log('Center card children:', centerChildren);
    
  } else {
    console.log('Solution flow section not found');
  }
  
  // Keep browser open for manual inspection
  console.log('Browser will stay open for 30 seconds for manual inspection...');
  await new Promise(resolve => setTimeout(resolve, 30000));
  
  await browser.close();
})(); 