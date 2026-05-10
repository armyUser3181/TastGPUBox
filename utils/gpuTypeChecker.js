/**
 * WebGPU Type Checker Utility
 * Helps identify and validate WebGPU types and capabilities
 */

export class GPUTypeChecker {
    static checkWebGPUSupport() {
        const results = {
            supported: false,
            navigatorGPU: false,
            gpuObject: false,
            adapterAvailable: false,
            deviceAvailable: false,
            errors: []
        };

        try {
            // Check if navigator exists
            if (typeof navigator === 'undefined') {
                results.errors.push('Navigator object not available');
                return results;
            }

            // Check if navigator.gpu exists
            if (!navigator.gpu) {
                results.errors.push('navigator.gpu not available - WebGPU not supported');
                return results;
            }
            results.navigatorGPU = true;

            // Check GPU object
            const gpu = navigator.gpu;
            if (!gpu || typeof gpu !== 'object') {
                results.errors.push('GPU object is not valid');
                return results;
            }
            results.gpuObject = true;

            // Check required methods
            const requiredMethods = ['requestAdapter', 'getPreferredCanvasFormat'];
            for (const method of requiredMethods) {
                if (typeof gpu[method] !== 'function') {
                    results.errors.push(`GPU.${method} method not available`);
                    return results;
                }
            }

            results.supported = true;
            return results;

        } catch (error) {
            results.errors.push(`Exception during check: ${error.message}`);
            return results;
        }
    }

    static async checkAdapterAndDevice() {
        const results = {
            adapter: null,
            device: null,
            adapterInfo: {},
            errors: []
        };

        try {
            if (!navigator.gpu) {
                results.errors.push('WebGPU not supported');
                return results;
            }

            // Request adapter
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                results.errors.push('No GPU adapter available');
                return results;
            }
            results.adapter = adapter;

            // Get adapter information
            results.adapterInfo = {
                name: adapter.name || 'Unknown',
                architecture: adapter.architecture || 'Unknown',
                vendor: adapter.vendor || 'Unknown',
                device: adapter.device || 'Unknown',
                description: adapter.description || 'Unknown',
                isFallback: adapter.isFallbackAdapter || false
            };

            // Request device
            const device = await adapter.requestDevice();
            if (!device) {
                results.errors.push('Failed to create GPU device');
                return results;
            }
            results.device = device;

            return results;

        } catch (error) {
            results.errors.push(`Exception during adapter/device check: ${error.message}`);
            return results;
        }
    }

    static logGPUInfo() {
        console.log('=== WebGPU Type Check ===');
        
        const support = this.checkWebGPUSupport();
        console.log('WebGPU Support:', support);
        
        if (!support.supported) {
            console.error('WebGPU not supported:', support.errors);
            return;
        }

        this.checkAdapterAndDevice().then(results => {
            if (results.errors.length > 0) {
                console.error('GPU Adapter/Device errors:', results.errors);
                return;
            }
            
            console.log('GPU Adapter Info:', results.adapterInfo);
            console.log('GPU Device:', results.device ? 'Available' : 'Not available');
            console.log('=== End WebGPU Type Check ===');
        });
    }

    static getGPUType() {
        if (!navigator.gpu) {
            return {
                type: 'none',
                supported: false,
                message: 'WebGPU not supported'
            };
        }

        const gpu = navigator.gpu;
        
        // Check if it's a fallback adapter
        if (gpu.isFallbackAdapter) {
            return {
                type: 'fallback',
                supported: true,
                message: 'Using fallback GPU adapter'
            };
        }

        // Try to determine GPU type based on adapter info
        return {
            type: 'hardware',
            supported: true,
            message: 'Hardware GPU detected'
        };
    }
}

// Auto-check on module load
if (typeof window !== 'undefined') {
    // Browser environment
    document.addEventListener('DOMContentLoaded', () => {
        GPUTypeChecker.logGPUInfo();
    });
} else {
    // Node.js environment - just log the check
    GPUTypeChecker.logGPUInfo();
}

export default GPUTypeChecker;
