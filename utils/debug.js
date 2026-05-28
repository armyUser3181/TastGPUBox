export const lib__debug = true;

/** @param {Function} func @param {boolean} debugFlag @returns {Function} */
export function debugGroundFunction(func, debugFlag) {
    return function (...args) {
        if (lib__debug && debugFlag) {
            func(...args);
        }
    }
}

/** @param {boolean} debugFlag @returns {Function} */
export function getDebugGroundLog(debugFlag) {
    return debugGroundFunction(console.log, debugFlag);
}

/** @param {boolean} debugFlag @returns {Function} */
export function getDebugGroundError(debugFlag) {
    return debugGroundFunction(console.error, debugFlag);
}

/** @param {...any} args */
export function debugLog(...args) {
    if (lib__debug) {
        console.log(...args);
    }
}

/** @param {...any} args */
export function debugError(...args) {
    if (lib__debug) {
        console.error(...args);
    }
}
