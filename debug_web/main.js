
import mainFunction from '../debug_main/main.js';
import { lib__debug, debugLog, getDebugGroundLog } from '../lib/lib.js';
import shaderClassPushClass from '../shaderClass/shaderClassPushClass.js';

const __debug = true;
const debugGroundLog = getDebugGroundLog(__debug);

class TestClass {
    constructor() {
        this.name = 'Test';
    }
}

function main() {
    debugGroundLog('Debug mode is enabled');
    const shaderClassPush = new shaderClassPushClass();
    shaderClassPush.pushClass(TestClass);
    mainFunction();
}

main();