
import mainFunction from '../debug_main/main.js';
import { lib__debug, debugLog, getDebugGroundLog } from '../utils/debug.js';
import shaderClassPushClass from '../shaderClass/shaderClassPushClass.js';

const __debug = true;
const debugGroundLog = getDebugGroundLog(__debug);

class TestClass {
    /** @type {string} */
    name = 'Test';
}

/** @returns {void} */
function main() {
    debugGroundLog('Debug mode is enabled');
    const shaderClassPush = new shaderClassPushClass();
    shaderClassPush.pushClass(TestClass);
    mainFunction();
}

main();