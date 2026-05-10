
/**
 * @type {GPUDevice | undefined} Device
 * @type {Room | undefined} Room
 */
let DeviceInstance = undefined;

class Room {

    constructor(device) {
        DeviceInstance = device;
    }

    /**
     * @param {Float32Array} buffer 
     * @param {Object} options
     */
    createBuffer(buffer, options = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST) {
        const gpuBuffer = DeviceInstance.createBuffer({
            size: buffer.byteLength,
            usage: options,
            mappedAtCreation: true
        });
        DeviceInstance.queue.writeBuffer(gpuBuffer, 0, buffer);
        return gpuBuffer;
    }

}

let roomInstance = undefined;

export default function room(device) {
    return device ? roomInstance ? DeviceInstance === device ? roomInstance : roomInstance = new Room(device) : roomInstance = new Room(device) : undefined;
}