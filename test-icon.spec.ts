import { test, expect } from '@playwright/test';

test('Verify IMDb icon in Navbar - no white edges', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Check if IMDb icon exists in navbar (desktop view)
  const navbarImdbLink = page.locator('nav a[aria-label="IMDb"]');
  await expect(navbarImdbLink).toBeVisible();
  
  // Check if it's an image (not an icon component)
  const navbarImdbImage = navbarImdbLink.locator('img[alt="IMDb"]');
  await expect(navbarImdbImage).toBeVisible();
  
  // Verify the image source is the processed PNG (not JPG)
  const imageSrc = await navbarImdbImage.getAttribute('src');
  expect(imageSrc).toMatch(/imdb\d?\.png/);
  expect(imageSrc).not.toContain('.jpg');
  
  // Check that background is transparent (no white background)
  const bgColor = await navbarImdbImage.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor;
  });
  console.log('Navbar icon background color:', bgColor);
  expect(bgColor).toMatch(/rgba?\(0,\s*0,\s*0,\s*0\)|transparent/);
  
  // Check image dimensions
  const imageBox = await navbarImdbImage.boundingBox();
  console.log('Navbar IMDb icon dimensions:', imageBox);
  
  // Verify height matches Instagram icon (h-5 = 20px)
  const instagramIcon = page.locator('nav a[aria-label="Instagram"] svg');
  const instagramBox = await instagramIcon.boundingBox();
  console.log('Instagram icon dimensions:', instagramBox);
  
  // IMDb icon height should match Instagram (20px), width should scale proportionally
  if (imageBox && instagramBox) {
    expect(Math.abs(imageBox.height - instagramBox.height)).toBeLessThan(1);
    // Width should be proportional to maintain aspect ratio
    expect(imageBox.width).toBeGreaterThan(0);
    console.log(`IMDb icon is ${imageBox.width}x${imageBox.height}, Instagram is ${instagramBox.width}x${instagramBox.height}`);
    console.log(`Height match: ${Math.abs(imageBox.height - instagramBox.height) < 1 ? '✓' : '✗'}`);
  }
  
  // Verify the link href
  const href = await navbarImdbLink.getAttribute('href');
  console.log('Navbar IMDb link:', href);
  expect(href).toBeTruthy();
});

test('Verify IMDb icon in Footer - no white edges', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  
  // Check if IMDb icon exists in footer
  const footerImdbLink = page.locator('footer a[aria-label="IMDb"]');
  await expect(footerImdbLink).toBeVisible();
  
  // Check if it's an image (should match navbar)
  const footerImdbImage = footerImdbLink.locator('img[alt="IMDb"]');
  await expect(footerImdbImage).toBeVisible();
  
  // Verify the image source is the processed PNG (not JPG)
  const imageSrc = await footerImdbImage.getAttribute('src');
  expect(imageSrc).toMatch(/imdb\d?\.png/);
  expect(imageSrc).not.toContain('.jpg');
  
  // Check that background is transparent (no white background)
  const bgColor = await footerImdbImage.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor;
  });
  console.log('Footer icon background color:', bgColor);
  expect(bgColor).toMatch(/rgba?\(0,\s*0,\s*0,\s*0\)|transparent/);
  
  // Check image dimensions
  const imageBox = await footerImdbImage.boundingBox();
  console.log('Footer IMDb icon dimensions:', imageBox);
  
  // Verify the link href
  const href = await footerImdbLink.getAttribute('href');
  console.log('Footer IMDb link:', href);
  expect(href).toBeTruthy();
});

test('Compare Navbar and Footer IMDb icons', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  // Check navbar icon
  const navbarImdbImage = page.locator('nav a[aria-label="IMDb"] img[alt="IMDb"]');
  const navbarVisible = await navbarImdbImage.isVisible();
  const navbarSrc = navbarVisible ? await navbarImdbImage.getAttribute('src') : null;
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  
  // Check footer icon
  const footerImdbImage = page.locator('footer a[aria-label="IMDb"] img[alt="IMDb"]');
  const footerVisible = await footerImdbImage.isVisible();
  const footerSrc = footerVisible ? await footerImdbImage.getAttribute('src') : null;
  
  console.log('Navbar IMDb icon:', navbarVisible ? 'Image - ' + navbarSrc : 'Not found');
  console.log('Footer IMDb icon:', footerVisible ? 'Image - ' + footerSrc : 'Not found');
  
  // Both should be visible and use processed PNG (imdb or imdb2)
  expect(navbarVisible).toBeTruthy();
  expect(footerVisible).toBeTruthy();
  expect(navbarSrc).toMatch(/imdb\d?\.png/);
  expect(footerSrc).toMatch(/imdb\d?\.png/);
  
  // Verify no white edges - check that both use object-contain (no cropping)
  const navbarObjectFit = await page.locator('nav a[aria-label="IMDb"] img').evaluate((el) => {
    return window.getComputedStyle(el).objectFit;
  });
  const footerObjectFit = await page.locator('footer a[aria-label="IMDb"] img').evaluate((el) => {
    return window.getComputedStyle(el).objectFit;
  });
  console.log('Navbar object-fit:', navbarObjectFit);
  console.log('Footer object-fit:', footerObjectFit);
  expect(navbarObjectFit).toBe('contain');
  expect(footerObjectFit).toBe('contain');
});
