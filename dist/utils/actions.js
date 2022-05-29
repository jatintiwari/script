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
exports.iFrameActions = void 0;
var execute = function (doc, action, elementByXpath, id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = action.type;
                switch (_a) {
                    case 'screenshot': return [3, 1];
                    case 'click': return [3, 2];
                    case 'text': return [3, 7];
                }
                return [3, 13];
            case 1: return [3, 13];
            case 2:
                if (!action.xPath) return [3, 4];
                return [4, doc.evaluate(function (xPath) {
                        var result = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                        var el = result.singleNodeValue;
                        el.click();
                    }, id)];
            case 3:
                _b.sent();
                return [3, 6];
            case 4: return [4, doc.$eval(id, function (e) { return e.click(); })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3, 13];
            case 7:
                _b.trys.push([7, 9, , 11]);
                return [4, doc.focus(id)];
            case 8:
                _b.sent();
                return [3, 11];
            case 9:
                error_1 = _b.sent();
                return [4, elementByXpath.focus()];
            case 10:
                _b.sent();
                return [3, 11];
            case 11: return [4, doc.keyboard.type(action.value)];
            case 12:
                _b.sent();
                return [3, 13];
            case 13: return [2];
        }
    });
}); };
var getId = function (action) {
    var id;
    if (action.id) {
        id = "[data-omtr-id=".concat(action.id, "]");
    }
    else if (action.nativeId) {
        id = "#".concat(action.nativeId);
    }
    else if (action.testId) {
        id = "[data-test-id=".concat(action.testId, "]");
    }
    else if (action.xPath) {
        id = action.xPath;
    }
    else if (action.className) {
        id = ".".concat(action.className);
    }
    return id;
};
var actions = function (action, page) { return __awaiter(void 0, void 0, void 0, function () {
    var id, doc, _a, elementByXpath, _b, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                id = getId(action);
                doc = page;
                console.log("=> ".concat(action.type, " - ").concat(id));
                _a = !action.xPath && id;
                if (!_a) return [3, 2];
                return [4, doc.waitForSelector(id, { timeout: 15000 })];
            case 1:
                _a = (_c.sent());
                _c.label = 2;
            case 2:
                _a;
                _b = action.xPath && id;
                if (!_b) return [3, 4];
                return [4, doc.waitForXPath(id, { timeout: 15000 })];
            case 3:
                _b = (_c.sent());
                _c.label = 4;
            case 4:
                elementByXpath = _b;
                return [4, execute(doc, action, elementByXpath, id)];
            case 5:
                _c.sent();
                return [4, doc.waitForTimeout(action.wait || 1000)];
            case 6:
                _c.sent();
                return [3, 8];
            case 7:
                e_1 = _c.sent();
                console.error({ 'error in action': e_1.message });
                return [2, Promise.resolve()];
            case 8: return [2];
        }
    });
}); };
var executeInIFrame = function (frame, action, id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("".concat(frame.name(), " => ").concat(action.type, " - ").concat(id));
                _a = action.type;
                switch (_a) {
                    case 'click': return [3, 1];
                    case 'text': return [3, 3];
                }
                return [3, 5];
            case 1: return [4, frame.$eval(id, function (e) { return e.click(); })];
            case 2:
                _b.sent();
                return [3, 5];
            case 3: return [4, frame.type(id, action.value)];
            case 4:
                _b.sent();
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
var iFrameActions = function (action, page) { return __awaiter(void 0, void 0, void 0, function () {
    var id, elementHandle, frame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = getId(action);
                return [4, page.waitForTimeout(action.wait || 1000)];
            case 1:
                _a.sent();
                return [4, page.waitForSelector(action.frameId)];
            case 2:
                elementHandle = _a.sent();
                return [4, elementHandle.contentFrame()];
            case 3:
                frame = _a.sent();
                return [4, executeInIFrame(frame, action, id)];
            case 4:
                _a.sent();
                return [2, frame];
        }
    });
}); };
exports.iFrameActions = iFrameActions;
exports.default = actions;
