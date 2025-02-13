"use strict";
exports.__esModule = true;
exports.iconWithClassName = void 0;
var nativewind_1 = require("nativewind");
function iconWithClassName(icon) {
    (0, nativewind_1.cssInterop)(icon, {
        className: {
            target: 'style',
            nativeStyleToProp: {
                color: true,
                opacity: true
            }
        }
    });
}
exports.iconWithClassName = iconWithClassName;
