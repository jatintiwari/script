import type { Page } from 'puppeteer';

export const goToURL = async (page: Page, url: string) => {
  await page.goto(url, {
    waitUntil: 'networkidle2', timeout: 3000000
  });
}