
/**
 * @type {GPUDevice | undefined} Device
 * @type {Room | undefined} Room
 */
let Device = undefined;

class Room {

    constructor(device) {
        Device = device;
    }

    /**
     * @param {Float32Array} buffer 
     * @param {Object} options
     */
    createBuffer(buffer, options = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST) {
        const gpuBuffer = Device.createBuffer({
            size: buffer.byteLength,
            usage: options,
            mappedAtCreation: true
        });
        Device.queue.writeBuffer(gpuBuffer, 0, buffer);
        return gpuBuffer;
    }

}

let room = undefined;


export default function room(device) {
    return device ? room ? Device === device ? room : room = new Room(device) : room = new Room(device) : undefined;
}