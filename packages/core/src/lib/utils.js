"use strict";
exports.__esModule = true;
exports.cva = exports.cn = exports.mergeClasses = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
var class_variance_authority_1 = require("class-variance-authority");
exports.cva = class_variance_authority_1.cva;
function mergeClasses() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.mergeClasses = mergeClasses;
exports.cn = mergeClasses;
