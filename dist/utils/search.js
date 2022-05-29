"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDOMBreadthFirst = void 0;
function searchDOMBreadthFirst(root) {
    if (root === void 0) { root = document.body; }
    var tagType = "UL";
    var q = [root];
    var ul = [];
    while (q.length) {
        var el = q.pop();
        el.tagName === tagType ? ul.push(el) : Array.from(el.children).map(function (c) { return q.push(c); });
    }
    var liUrls = ul.map(function (ulInstance) {
        return Array.from(ulInstance.children).map(function (li) {
            return li.querySelectorAll("a")[0].href;
        });
    });
    console.log({ liUrls: liUrls });
    return liUrls;
}
exports.searchDOMBreadthFirst = searchDOMBreadthFirst;
