"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer");
var throttler_1 = require("../utils/throttler");
var jsInfoUrls_1 = require("./jsInfoUrls");
var page_1 = require("../utils/page");
var createInstance = function (headless) {
    if (headless === void 0) { headless = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var browser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, puppeteer.launch({ headless: headless, devtools: true })];
                case 1:
                    browser = _a.sent();
                    return [2, browser];
            }
        });
    });
};
var task = function (browser, url, index) { return __awaiter(void 0, void 0, void 0, function () {
    var page, title, safeTitle, path, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, browser.newPage()];
            case 1:
                page = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 8, 9, 11]);
                return [4, (0, page_1.goToURL)(page, url)];
            case 3:
                _a.sent();
                console.log("Opening url - ".concat(url));
                return [4, page.emulateMediaType('screen')];
            case 4:
                _a.sent();
                return [4, page.evaluate(function () {
                        var comments = document.querySelector('.comments.formatted');
                        comments.remove();
                        var sideBar = document.querySelector('.sidebar__inner');
                        sideBar.remove();
                    })];
            case 5:
                _a.sent();
                return [4, page.evaluate(function () { return document.title; })];
            case 6:
                title = _a.sent();
                safeTitle = title.replace(/[^a-zA-Z ]/g, "");
                path = "./dist/crawler/screenshots/".concat(index, ".").concat(safeTitle, ".pdf");
                console.log({ path: path });
                return [4, (page === null || page === void 0 ? void 0 : page.pdf({ path: path }))];
            case 7:
                _a.sent();
                return [3, 11];
            case 8:
                e_1 = _a.sent();
                console.log(e_1);
                return [3, 11];
            case 9: return [4, page.close()];
            case 10:
                _a.sent();
                return [7];
            case 11: return [2];
        }
    });
}); };
var init = function (route) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, createInstance()];
            case 1:
                browser = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 7, 9]);
                return [4, browser.newPage()];
            case 3:
                page = _a.sent();
                return [4, (0, page_1.goToURL)(page, route)];
            case 4:
                _a.sent();
                return [4, page.close()];
            case 5:
                _a.sent();
                return [4, jsInfoUrls_1.urls.reduce(function (acc, chapter, chapterNumber) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, acc];
                                case 1:
                                    _a.sent();
                                    console.log({ chapterNumber: chapterNumber });
                                    return [4, (0, throttler_1.throttleFunctionExecution)(function (url) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4, task(browser, url, chapterNumber + 1)];
                                                case 1: return [2, _a.sent()];
                                            }
                                        }); }); }, chapter, 3)];
                                case 2: return [2, _a.sent()];
                            }
                        });
                    }); }, Promise.resolve())];
            case 6:
                _a.sent();
                console.log('* closing * ');
                return [3, 9];
            case 7: return [4, browser.close()];
            case 8:
                _a.sent();
                return [7];
            case 9: return [2];
        }
    });
}); };
init('https://javascript.info');
