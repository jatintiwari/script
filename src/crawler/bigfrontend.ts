import * as puppeteer from 'puppeteer';

import type { Browser, Page } from 'puppeteer';
import { throttleFunctionExecution } from '../utils/throttler';
import { searchDOMBreadthFirst } from '../utils/search';

// create instance -  headless
// go to base url
// get all links for JS
// go to each link
  // take screenshots of the test section

const createInstance = async (headless: boolean = true): Promise<Browser> => {
  const browser = await puppeteer.launch({ headless, devtools: true });
  return browser;
} 

const goToURL = async (page: Page, url: string) => {
  await page.goto(url, {
    waitUntil: 'networkidle2', timeout: 3000000
  });
}

const task = async (browser, url) => {
  const page: Page = await browser.newPage();
  try{
    await goToURL(page, url);
    console.log(`Opening url - ${url}`)
    const question = await page.$('[class^=ProblemDetailJS]');
    await page.evaluate(() => {
      const actions = document.querySelector('[class^=Actions]');
      actions.remove();
      const title = document.querySelector('[class^=UI__BelowTitle]');
      title.remove();
      const ads = document.querySelector('#carbonads');
      ads.remove();
    });
    const title = await page.evaluate(() => document.title);
    await question?.screenshot({ path: `./dist/crawler/screenshots/${title}.png`});
  }
  finally{
    await page.close();
  }
}

const init = async (route: string) => {
  const URL:string = "https://bigfrontend.dev";

  const browser : Browser = await createInstance(false);
  
  try {
    const page: Page = await browser.newPage();
    await goToURL(page, `${URL}/${route}`);
    const urls = await page.evaluate((fn) => {
      return Function(fn)();
    }, searchDOMBreadthFirst.toString()+`;return ${searchDOMBreadthFirst.name}()`);
    
    // console.log({ urls });

    // all urls list on problems page
    const problemUrls = urls[0];

    await page.close();
    await throttleFunctionExecution(async (url) => await task(browser, url), problemUrls, 3);
    console.log('* closing * ');
  } finally {
    // await browser.close();
  }
}

const route: string = "problem";
init(route);
