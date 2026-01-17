import { test, expect } from '@playwright/test';

test('Verify IMDb button size matches Instagram icon', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  // Get IMDb button dimensions
  const imdbButton = page.locator('nav a[aria-label="IMDb"] img');
  await expect(imdbButton).toBeVisible();
  const imdbBox = await imdbButton.boundingBox();
  
  // Get Instagram icon dimensions
  const instagramIcon = page.locator('nav a[aria-label="Instagram"] svg');
  await expect(instagramIcon).toBeVisible();
  const instagramBox = await instagramIcon.boundingBox();
  
  console.log('\n=== Size Comparison ===');
  console.log(`IMDb button: ${imdbBox?.width.toFixed(2)}px × ${imdbBox?.height.toFixed(2)}px`);
  console.log(`Instagram icon: ${instagramBox?.width.toFixed(2)}px × ${instagramBox?.height.toFixed(2)}px`);
  console.log(`Height difference: ${Math.abs((imdbBox?.height || 0) - (instagramBox?.height || 0)).toFixed(2)}px`);
  console.log(`Width difference: ${Math.abs((imdbBox?.width || 0) - (instagramBox?.width || 0)).toFixed(2)}px`);
  
  // Check if heights match (within 1px tolerance)
  if (imdbBox && instagramBox) {
    const heightDiff = Math.abs(imdbBox.height - instagramBox.height);
    console.log(`\nHeight match: ${heightDiff < 1 ? '✓' : '✗'} (difference: ${heightDiff.toFixed(2)}px)`);
    
    // Take screenshot for visual comparison
    await page.screenshot({ path: 'test-results/icon-comparison.png', clip: {
      x: Math.min(imdbBox.x, instagramBox.x) - 10,
      y: Math.min(imdbBox.y, instagramBox.y) - 10,
      width: Math.abs(imdbBox.x - instagramBox.x) + Math.max(imdbBox.width, instagramBox.width) + 20,
      height: Math.max(imdbBox.height, instagramBox.height) + 20
    }});
    console.log('Screenshot saved to test-results/icon-comparison.png');
    
    // The button should be at least as tall as Instagram
    expect(imdbBox.height).toBeGreaterThanOrEqual(instagramBox.height - 1);
  }
});
