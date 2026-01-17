import { test, expect } from '@playwright/test';

test('Verify mobile video fits device height', async ({ page, isMobile }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
  await page.goto('http://localhost:3000');
  
  await page.waitForLoadState('networkidle');
  
  // Get the video element
  const video = page.locator('section video');
  await expect(video).toBeVisible();
  
  // Get video bounding box
  const videoBox = await video.boundingBox();
  const viewport = page.viewportSize();
  
  console.log('\n=== Mobile Video Test ===');
  console.log(`Viewport size: ${viewport?.width}x${viewport?.height}`);
  console.log(`Video size: ${videoBox?.width.toFixed(2)}x${videoBox?.height.toFixed(2)}`);
  
  if (videoBox && viewport) {
    // Video height should match viewport height (within 1px tolerance)
    const heightMatch = Math.abs(videoBox.height - viewport.height);
    console.log(`Height difference: ${heightMatch.toFixed(2)}px`);
    
    // Check object-fit
    const objectFit = await video.evaluate((el) => {
      return window.getComputedStyle(el).objectFit;
    });
    console.log(`Object-fit: ${objectFit}`);
    
    // Video should fill the height
    expect(heightMatch).toBeLessThan(2); // Within 2px
    expect(objectFit).toBe('cover'); // Should use cover to fill height
    
    // Video should be at top and bottom of viewport
    expect(videoBox.y).toBeLessThan(2); // Top should be at or near 0
    expect(videoBox.height + videoBox.y).toBeGreaterThanOrEqual(viewport.height - 2); // Bottom should reach viewport bottom
  }
});

test('Verify desktop video maintains full coverage', async ({ page }) => {
  // Set desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000');
  
  await page.waitForLoadState('networkidle');
  
  const video = page.locator('section video');
  await expect(video).toBeVisible();
  
  const videoBox = await video.boundingBox();
  const viewport = page.viewportSize();
  
  console.log('\n=== Desktop Video Test ===');
  console.log(`Viewport size: ${viewport?.width}x${viewport?.height}`);
  console.log(`Video size: ${videoBox?.width.toFixed(2)}x${videoBox?.height.toFixed(2)}`);
  
  if (videoBox && viewport) {
    const objectFit = await video.evaluate((el) => {
      return window.getComputedStyle(el).objectFit;
    });
    console.log(`Object-fit: ${objectFit}`);
    
    // Desktop should also use cover
    expect(objectFit).toBe('cover');
  }
});
