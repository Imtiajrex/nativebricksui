"use strict";
exports.__esModule = true;
exports.useColorScheme = void 0;
var nativewind_1 = require("nativewind");
function useColorScheme() {
    var _a = (0, nativewind_1.useColorScheme)(), colorScheme = _a.colorScheme, setColorScheme = _a.setColorScheme, toggleColorScheme = _a.toggleColorScheme;
    return {
        colorScheme: colorScheme !== null && colorScheme !== void 0 ? colorScheme : 'dark',
        isDarkColorScheme: colorScheme === 'dark',
        setColorScheme: setColorScheme,
        toggleColorScheme: toggleColorScheme
    };
}
exports.useColorScheme = useColorScheme;
