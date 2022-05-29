import { Page } from 'puppeteer';

export interface IAction {
    id?: string;
    nativeId?: string;
    testId?: string;
    xPath?: string;
    interval?: number;
    className?: string;
    type: 'screenshot' | 'enter' | 'poll' | 'reload' | 'file' | 'click' | 'text';
    value?: string;
    wait?: number;
    frameId?: string;
}

const execute = async (doc, action, elementByXpath, id) => {
    switch (action.type) {
        case 'screenshot':
            break;
        case 'click':
            if (action.xPath) {
                await doc.evaluate((xPath) => {
                    const result: XPathResult = document.evaluate(
                        xPath,
                        document,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                    );
                    const el = result.singleNodeValue as HTMLElement;
                    el.click();
                }, id);
            } else {
                await doc.$eval(id, (e: HTMLElement) => e.click());
            }
            break;
        case 'text':
            try {
                await doc.focus(id);
            } catch (error) {
                await elementByXpath.focus();
            }
            await doc.keyboard.type(action.value);
            break;
    }
};

const getId = (action) => {
    let id;
    if (action.id) {
        id = `[data-omtr-id=${action.id}]`;
    } else if (action.nativeId) {
        id = `#${action.nativeId}`;
    } else if (action.testId) {
        id = `[data-test-id=${action.testId}]`;
    } else if (action.xPath) {
        id = action.xPath;
    } else if (action.className) {
        id = `.${action.className}`;
    }
    return id;
};
const actions = async (action: IAction, page: Page) => {
    try {
        const id = getId(action);
        let doc = page;
        console.log(`=> ${action.type} - ${id}`);
        !action.xPath && id && (await doc.waitForSelector(id, { timeout: 15000 }));
        let elementByXpath = action.xPath && id && (await doc.waitForXPath(id, { timeout: 15000 }));
        await execute(doc, action, elementByXpath, id);
        await doc.waitForTimeout(action.wait || 1000);
    } catch (e) {
        console.error({ 'error in action': e.message });
        return Promise.resolve();
    }
};

const executeInIFrame = async (frame, action, id) => {
    // const elementHandle = await frame.$(id);
    // console.log({ elementHandle });
    console.log(`${frame.name()} => ${action.type} - ${id}`);
    switch (action.type) {
        case 'click':
            await frame.$eval(id, (e: HTMLElement) => e.click());
            break;
        case 'text':
            await frame.type(id, action.value);
            break;
    }
};

export const iFrameActions = async (action: IAction, page: Page) => {
    const id = getId(action);
    await page.waitForTimeout(action.wait || 1000);
    const elementHandle = await page.waitForSelector(action.frameId);
    const frame = await elementHandle.contentFrame();
    await executeInIFrame(frame, action, id);
    return frame;
};

export default actions;
