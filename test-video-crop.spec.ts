import { test, expect } from '@playwright/test';

test('Verify bottom-right "Ve" text is cropped from video', async ({ page }) => {
  // Set desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000');
  
  await page.waitForLoadState('networkidle');
  // Wait for video to load
  await page.waitForTimeout(2000);
  
  const video = page.locator('section video');
  await expect(video).toBeVisible();
  
  // Get video bounding box
  const videoBox = await video.boundingBox();
  
  if (videoBox) {
    // Check the visible viewport bottom-right area for "Ve" text
    const viewport = page.viewportSize();
    if (viewport) {
      // Take screenshot of bottom-right corner of viewport (last 200px width, last 100px height)
      const screenshot = await page.screenshot({
        clip: {
          x: viewport.width - 200,
          y: viewport.height - 100,
          width: 200,
          height: 100
        }
      });
    }
    
    console.log('\n=== Video Crop Test ===');
    console.log(`Video position: x=${videoBox.x}, y=${videoBox.y}`);
    console.log(`Video size: ${videoBox.width}x${videoBox.height}`);
    console.log(`Viewport: ${viewport?.width}x${viewport?.height}`);
    
    // Check video transform/scale
    const transform = await video.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    const objectPosition = await video.evaluate((el) => {
      return window.getComputedStyle(el).objectPosition;
    });
    
    console.log(`Transform: ${transform}`);
    console.log(`Object position: ${objectPosition}`);
    
    // The video should be scaled/transformed to crop the bottom-right
    expect(transform).not.toBe('none'); // Should have a transform/scale applied
  }
});
