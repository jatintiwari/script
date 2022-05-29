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
var node_fetch_1 = require("node-fetch");
require("dotenv/config");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path = require("path");
var LIMIT = 5;
var OFFSET = 0;
var getTracks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, jsonResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, node_fetch_1.default)("https://api-v2.soundcloud.com/users/".concat(process.env.USER_ID, "/track_likes?client_id=").concat(process.env.CLIENT_ID, "&limit=").concat(LIMIT, "&offset=").concat(OFFSET, "&linked_partitioning=1&app_version=1653377235&app_locale=en"), {
                    headers: {
                        accept: 'application/json, text/javascript, */*; q=0.01',
                        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                        authorization: process.env.TOKEN,
                        'cache-control': 'no-cache',
                        pragma: 'no-cache',
                        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"macOS"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-site',
                        Referer: 'https://soundcloud.com/',
                        'Referrer-Policy': 'origin',
                    },
                    body: null,
                    method: 'GET',
                })];
            case 1:
                response = _a.sent();
                return [4, response.json()];
            case 2:
                jsonResponse = _a.sent();
                return [2, jsonResponse];
        }
    });
}); };
var downloadedSongs = new Set();
var downloadSongs = function (links) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, links.forEach(function (link) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (downloadedSongs.has(link)) {
                                    return [2];
                                }
                                console.log("[Downloading] ".concat(link));
                                downloadedSongs.add(link);
                                return [4, (0, child_process_1.execSync)("cd /media/victor/Mosaic/SoundCloud && ~/Work/soundcloud-cli-master/sc-rpi dl \"".concat(link, "\""))];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
var safeGaurdNames = function (name) {
    if (name === void 0) { name = ""; }
    return name.replace(/[^\w\s]/gi, '');
};
var checkIfSongsExists = function (list) {
    var trackName = list === null || list === void 0 ? void 0 : list[0].track.title;
    var lastLikeTrackName = (0, fs_1.readFileSync)(path.resolve("/home/victor/Work/crawlerscripts/lastTrack.txt")).toString();
    var fileExists = safeGaurdNames(lastLikeTrackName) === safeGaurdNames(trackName);
    console.log("[log] Exists: ".concat(fileExists, " Last track name: ").concat(lastLikeTrackName, ", Current: ").concat(trackName));
    return fileExists;
};
var addtLastLikeToFile = function (list) { return __awaiter(void 0, void 0, void 0, function () {
    var trackName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trackName = list === null || list === void 0 ? void 0 : list[0].track.title;
                return [4, (0, fs_1.writeFileSync)(path.resolve("/home/victor/Work/crawlerscripts/lastTrack.txt"), safeGaurdNames(trackName))];
            case 1:
                _a.sent();
                console.log("[log] Writing to file last like song name. Name ".concat(trackName));
                return [2];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var collection, links, songsAlreadyDownloaded;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getTracks()];
            case 1:
                collection = (_a.sent()).collection;
                links = collection.map(function (track) {
                    return track.track.permalink_url;
                });
                songsAlreadyDownloaded = checkIfSongsExists(collection);
                if (songsAlreadyDownloaded) {
                    console.log('[Skipping] Latest tracks already downloaded.');
                    return [2];
                }
                return [4, downloadSongs(links)];
            case 2:
                _a.sent();
                return [4, addtLastLikeToFile(collection)];
            case 3:
                _a.sent();
                return [2];
        }
    });
}); })();
