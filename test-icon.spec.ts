import { test, expect } from '@playwright/test';

test('Verify IMDb text in Navbar uses font-display, bold, and white', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Check if IMDb link exists in navbar (desktop view)
  const navbarImdbLink = page.locator('nav a[aria-label="IMDb"]');
  await expect(navbarImdbLink).toBeVisible();
  
  // Verify it's text, not an image
  const imdbText = navbarImdbLink.locator('text=IMDb');
  await expect(imdbText).toBeVisible();
  
  // Check text content
  const textContent = await navbarImdbLink.textContent();
  expect(textContent).toBe('IMDb');
  
  // Get IMDb styles
  const imdbStyles = await navbarImdbLink.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      color: styles.color,
      fontFamily: styles.fontFamily,
    };
  });
  
  // Get Kaleb Bishop logo styles for comparison
  const logoLink = page.locator('nav a:has-text("Kaleb Bishop")');
  const logoStyles = await logoLink.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      fontFamily: styles.fontFamily,
      fontWeight: styles.fontWeight,
    };
  });
  
  console.log('IMDb link styles:', imdbStyles);
  console.log('Logo styles (Kaleb Bishop):', logoStyles);
  
  // Verify it uses font-display (same as Kaleb Bishop)
  expect(imdbStyles.fontFamily).toContain('Bebas Neue');
  
  // Verify it's bold (700)
  expect(imdbStyles.fontWeight).toBe('700');
  
  // Verify it's white
  expect(imdbStyles.color).toBe('rgb(255, 255, 255)');
  
  // Verify the link href
  const href = await navbarImdbLink.getAttribute('href');
  console.log('Navbar IMDb link:', href);
  expect(href).toBeTruthy();
});

test('Verify IMDb text in Footer matches navbar styling', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  
  // Check if IMDb link exists in footer
  const footerImdbLink = page.locator('footer a[aria-label="IMDb"]');
  await expect(footerImdbLink).toBeVisible();
  
  // Verify it's text, not an image
  const imdbText = footerImdbLink.locator('text=IMDb');
  await expect(imdbText).toBeVisible();
  
  // Check text content
  const textContent = await footerImdbLink.textContent();
  expect(textContent).toBe('IMDb');
  
  // Get Footer IMDb styles
  const footerStyles = await footerImdbLink.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      color: styles.color,
      fontFamily: styles.fontFamily,
    };
  });
  
  // Get Navbar IMDb styles for comparison
  const navbarImdbLink = page.locator('nav a[aria-label="IMDb"]');
  const navbarStyles = await navbarImdbLink.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      color: styles.color,
      fontFamily: styles.fontFamily,
    };
  });
  
  console.log('Footer IMDb styles:', footerStyles);
  console.log('Navbar IMDb styles:', navbarStyles);
  
  // Verify it matches navbar styling
  expect(footerStyles.fontFamily).toBe(navbarStyles.fontFamily);
  expect(footerStyles.fontWeight).toBe(navbarStyles.fontWeight);
  expect(footerStyles.color).toBe(navbarStyles.color);
  expect(footerStyles.fontSize).toBe(navbarStyles.fontSize);
  
  // Verify the link href
  const href = await footerImdbLink.getAttribute('href');
  console.log('Footer IMDb link:', href);
  expect(href).toBeTruthy();
});

test('Compare Navbar and Footer IMDb links', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  // Check navbar link (should be text)
  const navbarImdbLink = page.locator('nav a[aria-label="IMDb"]');
  const navbarVisible = await navbarImdbLink.isVisible();
  const navbarText = navbarVisible ? await navbarImdbLink.textContent() : null;
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  
  // Check footer link (may still be image)
  const footerImdbLink = page.locator('footer a[aria-label="IMDb"]');
  const footerVisible = await footerImdbLink.isVisible();
  
  console.log('Navbar IMDb:', navbarVisible ? 'Text - ' + navbarText : 'Not found');
  console.log('Footer IMDb:', footerVisible ? 'Visible' : 'Not found');
  
  // Navbar should be text
  expect(navbarVisible).toBeTruthy();
  expect(navbarText).toBe('IMDb');
  
  // Footer should be visible (may be image or text)
  expect(footerVisible).toBeTruthy();
});
