
import mainFunction from '../debug_main/main.js';
import { debug, debugLog } from '../lib/lib.js';

function main() {
    debugLog('Debug mode is enabled');
    mainFunction();
}

main();