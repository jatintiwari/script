import * as puppeteer from 'puppeteer';

import type { Browser, Page } from 'puppeteer';
import { throttleFunctionExecution } from '../utils/throttler';
import { urls } from './jsInfoUrls';
import { goToURL } from '../utils/page';

// create instance -  headless
// go to base url
// get all links for JS
// go to each link
// take screenshots of the test section

const createInstance = async (headless: boolean = true): Promise<Browser> => {
    const browser = await puppeteer.launch({ headless, devtools: true });
    return browser;
};

const task = async (browser, url, index) => {
    const page: Page = await browser.newPage();
    try {
        await goToURL(page, url);
        console.log(`Opening url - ${url}`);
        await page.emulateMediaType('screen');
        await page.evaluate(() => {
            const comments = document.querySelector('.comments.formatted');
            comments.remove();

            const sideBar = document.querySelector('.sidebar__inner');
            sideBar.remove();
        });
        const title = await page.evaluate(() => document.title);
        const safeTitle  = title.replace(/[^a-zA-Z ]/g, "");
        const path = `./dist/crawler/screenshots/${index}.${safeTitle}.pdf`;
        console.log({ path });
        await page?.pdf({ path });
    } catch (e) {
        console.log(e);
    } finally {
        await page.close();
    }
};

const init = async (route: string) => {
    const browser: Browser = await createInstance();

    try {
        const page: Page = await browser.newPage();
        await goToURL(page, route);

        await page.close();
        await urls.reduce(async (acc, chapter, chapterNumber) => {
            await acc;
            console.log({ chapterNumber });
            return await throttleFunctionExecution(
                async (url) => await task(browser, url, chapterNumber + 1),
                chapter,
                3
            );
        }, Promise.resolve());
        console.log('* closing * ');
    } finally {
        await browser.close();
    }
};
init('https://javascript.info');
