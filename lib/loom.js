
/**
 * @type {GPUDevice | undefined} Device
 * @type {Loom | undefined} Loom
 */
let DeviceInstance = undefined;

/**
 * WebGPU Buffer Management Utility
 */
export class Loom {

    /**
     * @param {GPUDevice} device 
     */
    constructor(device) {
        DeviceInstance = device;
    }

    /**
     * Creates a GPU buffer from Float32Array data
     * @param {Object} params
     * @param {Float32Array} params.buffer - The data to upload to GPU
     * @param {GPUBufferUsageFlags} [params.options=GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST] - Buffer usage flags
     * @returns {GPUBuffer} The created GPU buffer
     */
    createBuffer({buffer, options = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST}) {
        const gpuBuffer = DeviceInstance.createBuffer({
            size: buffer.byteLength,
            usage: options,
            mappedAtCreation: true
        });
        DeviceInstance.queue.writeBuffer(gpuBuffer, 0, buffer);
        return gpuBuffer;
    }

}

let loomInstance = undefined;

/**
 * @param {GPUDevice} device 
 * @returns {Loom | undefined}
 */
export function loom(device) {
    return device ? loomInstance ? DeviceInstance === device ? loomInstance : loomInstance = new Loom(device) : loomInstance = new Loom(device) : undefined;
}
