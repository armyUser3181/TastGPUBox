
import { getFileText } from '../utils/file.js'
import { getDebugGroundLog, getDebugGroundError } from '../utils/debug.js'
import { GPUTypeChecker } from '../utils/gpuTypeChecker.js'
import { Loom, loom } from '../utils/loom.js'

async function compileDebug() {

    const debugFlag = true

    const debugLog = getDebugGroundLog(debugFlag);
    const debugError = getDebugGroundError(debugFlag);

    const na = navigator;
    debugLog("Navigator object:", na);

    if(!na.gpu) {
        debugError("WebGPU is not supported in this browser.");
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

    const devicePromise = adapter.requestDevice();
    const vertexShaderCodePromise = getFileText('../debug_main/shader_vertex.wgsl');
    const fragmentShaderCodePromise = getFileText('../debug_main/shader_fragment.wgsl');
    
    const device = await devicePromise;
    const vertexShaderCode = await vertexShaderCodePromise;
    const fragmentShaderCode = await fragmentShaderCodePromise;

    debugLog(device);

    const vertexShaderModule = device.createShaderModule({
        code: vertexShaderCode
    });
    const fragmentShaderModule = device.createShaderModule({
        code: fragmentShaderCode
    });

    const uniformLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                buffer: {
                    type: "uniform"
                }
            }
        ]
    });

    const layout = device.createPipelineLayout({
        bindGroupLayouts: [uniformLayout]
    });

    const pipelinePromise = device.createRenderPipelineAsync({
        layout: layout,
        vertex: {
            module: vertexShaderModule,
            entryPoint: "vs_main",
            buffers: [{
                arrayStride: 4 * 4,
                attributes: [
                    {
                        shaderLocation: 0,
                        offset: 0,
                        format: "float32x3"
                    }
                ],
                stepMode: "vertex"
            }]
        },
        fragment: {
            module: fragmentShaderModule,
            entryPoint: "fs_main",
            targets: [{
                format: navigator.gpu.getPreferredCanvasFormat(),
            }]
        },
        primitive: {
            topology: "triangle-strip"
        }
    });

    const pipeline = await pipelinePromise;
    debugLog(pipeline);

    return {
        device: device,
        pipeline: pipeline
    }

}

/**
 * @param {{canvas: HTMLCanvasElement, context: GPUCanvasContext, device: GPUDevice, pipeline: GPURenderPipeline}} param0 
 */
async function midDebug({canvas, context, device, pipeline}) {
    console.log(context);
    context.configure({
        device: device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: "opaque"
    });
    
    const uniformBuffer = device.createBuffer({
        size: 4 * 8,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const buffer = device.createBuffer({
        size: 4 * 4 * 8,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });

    console.log(buffer);

    return {
        buffer: buffer,
        uniforms: uniformBuffer
    }
    
}



/**
 * Renders a frame using WebGPU
 * @param {Object} params - Rendering parameters
 * @param {GPUDevice} params.device - The GPU device
 * @param {GPURenderPipeline} params.pipeline - The render pipeline
 * @param {HTMLCanvasElement} params.canvas - The canvas element
 * @param {GPUCanvasContext} params.context - The WebGPU canvas context
 * @returns {render: (ibuffer: GPUBuffer, iuniforms: {color: {r: number, g: number, b: number, a: number}, time: number, size: number}) => void} A function that renders a frame and the buffer and uniforms
 */
function runtimeDebug({device, pipeline, canvas, context, vertexGPUBuffer, uniformsGPUBuffer}) {
    const debugClass = new class {
        constructor() {
            this.map = new Map();
        }

        debugEventAppend(line, event) {
            
            if(this.map.has(line)) {
                console.log(line, event);
            }
            this.map.set(line, event);

        }

    }();

    /** @type ({buffer: Float32Array, uniforms: {color: {r: number, g: number, b: number, a: number}, time: number, size: number}}) => void} */
    return ({buffer, uniforms}) => {

        device.queue.writeBuffer(vertexGPUBuffer, 0, buffer);
        const uniformsBuffer = new Float32Array([uniforms.color.a, uniforms.color.r, uniforms.color.g, uniforms.color.b, uniforms.time, uniforms.size]);
        device.queue.writeBuffer(uniformsGPUBuffer, 0, uniformsBuffer);
        const uniformBindGroup = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: { buffer: uniformsGPUBuffer }
                }
            ]
        });

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();
        const passEncoder = commandEncoder.beginRenderPass({
            colorAttachments: [{
                view: textureView,
                loadOp: "clear",
                storeOp: "store"
            }]
        });
        passEncoder.setPipeline(pipeline);
        passEncoder.setVertexBuffer(0, vertexGPUBuffer);
        passEncoder.setBindGroup(0, uniformBindGroup);
        passEncoder.draw(4);
        passEncoder.end();
        device.queue.submit([commandEncoder.finish()]);
    }
}







class WebGPUDebug {
    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas = null;
        /** @type {GPUCanvasContext} */
        this.context = null;
        /** @type {GPUDevice} */
        this.device = null;
        /** @type {GPURenderPipeline} */
        this.pipeline = null;
        /** @type {GPUBuffer} */
        this.vertexGPUBuffer = null;
        /** @type {GPUBuffer} */
        this.uniformsGPUBuffer = null;
        /** @type {{color: {r: number, g: number, b: number, a: number}, time: number, size: number}} */
        this.uniform = null;
        /** @type {(params: {buffer: Float32Array, uniforms: {color: {r: number, g: number, b: number, a: number}, time: number, size: number}}) => void} */
        this.runtimeDebugFunction = null;
    }

    async init() {
        // Initialize GPU type checking
        GPUTypeChecker.logGPUInfo();
        
        this.canvas = document.getElementById("mainCanvas");
        this.context = this.canvas.getContext("webgpu");
        const result = await compileDebug();
        this.device = result.device;
        this.pipeline = result.pipeline;
        const result2 = await midDebug({
            canvas: this.canvas,
            context: this.context,
            device: this.device,
            pipeline: this.pipeline
        });
        this.vertexGPUBuffer = result2.buffer;
        this.uniformsGPUBuffer = result2.uniforms;

        const vertexBuffer = new Float32Array([
            0, 1.0, 0.5, 1.0,
            -0.5, 0.0, 0.5, 1.0,
            0.5, 0.0, 0.5, 1.0,
            0, -1, 0.5, 1.0
        ]);
        const uniforms = {
            color: {r: 1.0, g: 0.0, b: 0.0, a: 1.0},
            time: 0.0,
            size: 1.0
        };

        this.vertexBuffer = vertexBuffer;
        this.uniform = uniforms;
        this.runtimeDebugFunction = runtimeDebug({
            device: this.device,
            pipeline: this.pipeline,
            canvas: this.canvas,
            context: this.context,
            vertexGPUBuffer: this.vertexGPUBuffer,
            uniformsGPUBuffer: this.uniformsGPUBuffer
        });
    }

    start() {
        
    }

    render() {
        this.runtimeDebugFunction({
            buffer: this.vertexBuffer,
            uniforms: this.uniform
        });
    }

}

export default WebGPUDebug;