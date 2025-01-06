"use strict";
exports.__esModule = true;
exports.useColor = void 0;
var Theme_1 = require("../contexts/Theme");
var useColor = function (color) {
    var tw = (0, Theme_1.useTw)();
    var style = tw.style(color);
    if (color.includes('bg-'))
        return String(style.backgroundColor);
    else if (color.includes('text-'))
        return String(style.color);
    else if (color.includes('border-'))
        return String(style.borderColor);
    return tw.color(color);
};
exports.useColor = useColor;
