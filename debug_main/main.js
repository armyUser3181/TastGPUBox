
import HelloWorld from '../debug_hello_world/helloWorld.js'
import { getDebugGroundLog, getDebugGroundError } from '../utils/debug.js'
import WebGPUDebug from './webGPU.js'

/**
 * Renders the WebGPU debug scene with animation
 * @param {WebGPUDebug} webGPUDebug - The WebGPU debug instance
 */
export function rendering(webGPUDebug) {
    let t = 0;
    const animate = () => {
        webGPUDebug.render(t);
        t += 0.016;
        //console.log(t);
        webGPUDebug.uniform.time = t;
        //webGPUDebug.uniform.color.r = Math.sin(t);
        //webGPUDebug.uniform.color.g = Math.cos(t);
        //webGPUDebug.uniform.color.b = Math.sin(t * 2);
        //webGPUDebug.uniform.size = 0.5 + Math.sin(t) * 0.5;
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}

export function main(args) {

    const debugFlag = true;
    const debugLog = getDebugGroundLog(debugFlag);
    const debugError = getDebugGroundError(debugFlag);
    debugLog('Main function called');

    const helloWorld = new HelloWorld("hello world");
    const webGPUDebug = new WebGPUDebug();
    
    webGPUDebug.init()
    .then(() => {
        debugLog('WebGPU debug initialized');
        debugLog('Hello world: ' + helloWorld.getMessage());
        rendering(webGPUDebug);
    })
    .catch((error) => {
        debugError('WebGPU debug initialization failed: ' + error);
    });
    
}

export default main;