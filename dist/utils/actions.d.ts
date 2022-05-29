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
declare const actions: (action: IAction, page: Page) => Promise<void>;
export declare const iFrameActions: (action: IAction, page: Page) => Promise<import("puppeteer").Frame>;
export default actions;
