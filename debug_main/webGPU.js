import { getFileText, debugLog } from '../lib/lib.js'
import { GPUTypeChecker } from '../utils/gpuTypeChecker.js'

async function compileDebug() {
    const na = navigator;
    debugLog("Navigator object:", na);
    debugLog("Navigator.gpu:", na.gpu);
    
    if(!na.gpu) {
        console.error("WebGPU is not supported in this browser.");
        return;
    }
    const gpu = na.gpu;
    debugLog("GPU object:", gpu);
    const adapter = await gpu.requestAdapter();
    if(!adapter) {
        debugError("Failed to get GPU adapter.");
        return;
    }
    debugLog("GPU Adapter:", adapter);
    debugLog("Adapter info:", {
        name: adapter.name,
        architecture: adapter.architecture,
        vendor: adapter.vendor,
        device: adapter.device,
        description: adapter.description
    });
    const devicePromise = adapter.requestDevice();
    const vertexShaderCodePromise = getFileText('../debug_main/shader_vertex.wgsl');
    const fragmentShaderCodePromise = getFileText('../debug_main/shader_fragment.wgsl');
    
    const device = await devicePromise;
    const vertexShaderCode = await vertexShaderCodePromise;
    const fragmentShaderCode = await fragmentShaderCodePromise;

    const vertexShaderModule = device.createShaderModule({
        code: vertexShaderCode
    });
    const fragmentShaderModule = device.createShaderModule({
        code: fragmentShaderCode
    });

    debugLog(device);
    debugLog(vertexShaderModule);
    debugLog(fragmentShaderModule);

    const pipelinePromise = device.createRenderPipelineAsync({
        layout: "auto",
        vertex: {
            module: vertexShaderModule,
            entryPoint: "vs_main"
            
        },
        fragment: {
            module: fragmentShaderModule,
            entryPoint: "fs_main",
            targets: [{
                format: navigator.gpu.getPreferredCanvasFormat()
                // format: "bgra8unorm"
            }]
        }
    });

    const pipeline = await pipelinePromise;
    debugLog(pipeline);

}

function midDebug() {

}

function runtimeDebug() {

}










class WebGPUDebug {
    constructor() {
        // Initialize GPU type checking
        GPUTypeChecker.logGPUInfo();
        
        this.canvas = document.getElementById("mainCanvas");
        this.context = this.canvas.getContext("webgpu");
        compileDebug();
    }
}

export default WebGPUDebug;