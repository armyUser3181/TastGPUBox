


async function compileDebug() {
    const na = navigator;
    if(!na.gpu) {
        console.error("WebGPU is not supported in this browser.");
        return;
    }
    const adapter = await na.gpu.requestAdapter();
    if(!adapter) {
        console.error("Failed to get GPU adapter.");
        return;
    }
    const devicePromise = adapter.requestDevice();
    devicePromise.then(device => {
        
    })
}

function midDebug() {

}

function runtimeDebug() {

}










class webGPUDebug {
    constructor() {
        this.canvas = document.getElementById("mainCanvas");
        this.context = this.canvas.getContext("webgpu");
        compileDebug();
    }
}

export default webGPUDebug;