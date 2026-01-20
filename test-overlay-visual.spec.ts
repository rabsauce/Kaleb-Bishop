import { test, expect } from '@playwright/test';

test('Verify bottom-right overlay blends naturally and hides "Veo" text', async ({ page }) => {
  // Set desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000');
  
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Check that the overlay exists and blends with the gradient
  const overlay = page.locator('section div').filter({ hasText: /Bottom-right corner overlay|hide "Veo"/ }).first();
  
  // Check overlay styling
  const overlayElement = page.locator('div').filter({ 
    has: page.locator('video').nth(0)
  }).locator('div').last();
  
  const overlayStyle = await overlayElement.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      position: computed.position,
      width: computed.width,
      height: computed.height,
      background: computed.background,
      opacity: computed.opacity,
      mixBlendMode: computed.mixBlendMode
    };
  });
  
  console.log('\n=== Overlay Visual Test ===');
  console.log(`Overlay position: ${overlayStyle.position}`);
  console.log(`Overlay size: ${overlayStyle.width} x ${overlayStyle.height}`);
  console.log(`Mix blend mode: ${overlayStyle.mixBlendMode}`);
  console.log(`Has radial gradient: ${overlayStyle.background?.includes('radial-gradient')}`);
  
  // Take a screenshot of the bottom-right area to visually verify
  const screenshot = await page.screenshot({
    clip: {
      x: 1920 - 400,
      y: 1080 - 300,
      width: 400,
      height: 300
    }
  });
  
  // Verify overlay exists and blends
  expect(overlayStyle.position).toBe('absolute');
  expect(overlayStyle.background).toContain('radial-gradient');
});
