

export const lib__debug = true;

export function debugGroundFunction(func, debugFlag) {
    return function (...args) {
        if (lib__debug && debugFlag) {
            func(...args);
        }
    }
}

export function getDebugGroundLog(debugFlag) {
    return debugGroundFunction(console.log, debugFlag);
}

export function getDebugGroundError(debugFlag) {
    return debugGroundFunction(console.error, debugFlag);
}

export function debugLog(...args) {
    if (lib__debug) {
        console.log(...args);
    }
}

export function debugError(...args) {
    if (lib__debug) {
        console.error(...args);
    }
}