
import HelloWorld from '../debug_hello_world/helloWorld.js'
import { debugLog } from '../lib/lib.js'
import WebGPUDebug from './webGPU.js'


export function main(args) {
    debugLog('Main function called');
    const helloWorld = new HelloWorld("hello world");
    const webGPUDebug = new WebGPUDebug();

}

export default main;