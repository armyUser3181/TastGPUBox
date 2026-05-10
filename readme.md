# TastGPUBox - WebGPU Debugging Project

## Overview
This project provides comprehensive WebGPU type recognition and debugging capabilities. It includes TypeScript definitions, utility functions, and debugging tools to help identify and work with different GPU types.

## Recent Updates

### 🎨 WebGPU Rendering Pipeline
- **Custom Pipeline Layout**: Implemented manual bind group layouts for uniform buffers
- **Shader System**: Separate vertex and fragment shaders with uniform data support
- **Animation System**: Real-time rendering with animated uniforms (color, time, size)
- **Buffer Management**: Efficient GPU buffer creation and management via Loom utility

### � Enhanced Debug System
- **Modular Debug**: Ground-based debug functions with flag control
- **Class Management**: Shader class push system for dynamic class registration
- **Type Safety**: Complete WebGPU type definitions including GPUCanvasContext
- **Error Handling**: Comprehensive error reporting and debugging utilities

### 📁 Project Structure Updates
```
TastGPUBox/
├── debug_main/
│   ├── webGPU.js          # Main WebGPU rendering system
│   ├── main.js            # Application entry point with animation
│   ├── shader_vertex.wgsl # Vertex shader with uniform support
│   ├── shader_fragment.wgsl # Fragment shader
│   └── helloWorld.js      # UI component system
├── debug_web/
│   ├── index.html         # Test page
│   └── main.js           # Web entry point
├── shaderClass/
│   └── shaderClassPushClass.js # Dynamic class management
├── types/
│   ├── webgpu.d.ts       # Complete WebGPU type definitions
│   └── readme.md         # Type documentation
├── utils/
│   └── gpuTypeChecker.js # GPU type checking utility
├── lib/
│   ├── lib.js           # Core utilities and debug system
│   └── loom.js          # GPU buffer management
├── tsconfig.json        # TypeScript configuration
├── package.json         # Node.js dependencies
└── README.md           # This file
```

## Features

### 🎯 GPU Type Recognition
- Automatic detection of WebGPU support
- GPU adapter information extraction
- Hardware vs fallback adapter identification
- Detailed error reporting

### 🛠️ Development Tools
- TypeScript configuration with WebGPU types
- Type checking utilities
- Ground-based debug logging system
- Browser compatibility checks

### 🎨 Rendering Capabilities
- Custom WebGPU pipeline creation
- Uniform buffer management
- Real-time animation system
- Shader-based graphics rendering

## Setup

### Prerequisites
- Node.js (v16 or higher)
- Modern browser with WebGPU support (Chrome/Edge with WebGPU flags enabled)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser and navigate to `http://localhost:8080`

## Usage

### Basic GPU Type Checking
```javascript
import { GPUTypeChecker } from './utils/gpuTypeChecker.js';

// Check WebGPU support
const support = GPUTypeChecker.checkWebGPUSupport();
console.log('WebGPU Support:', support);

// Get GPU type information
const gpuType = GPUTypeChecker.getGPUType();
console.log('GPU Type:', gpuType);

// Detailed adapter and device info
const info = await GPUTypeChecker.checkAdapterAndDevice();
console.log('GPU Info:', info);
```

### TypeScript Support
The project includes comprehensive WebGPU type definitions in `types/webgpu.d.ts`. This provides:

- Full WebGPU API type coverage
- Navigator GPU extension types
- GPU adapter and device interfaces
- Shader and pipeline types
- Error handling types

### Debug Logging
Use the built-in debug logging system:
```javascript
import { debugLog } from './lib/lib.js';

debugLog('GPU Adapter:', adapter);
debugLog('Device Info:', device);
```

## Browser Compatibility

### Supported Browsers
- Chrome 113+ (with WebGPU enabled)
- Edge 113+ (with WebGPU enabled)
- Firefox (experimental support)

### Enabling WebGPU
1. **Chrome/Edge**: 
   - Navigate to `chrome://flags/`
   - Enable "WebGPU" flag
   - Restart browser

2. **Firefox**:
   - Navigate to `about:config`
   - Set `dom.webgpu.enabled` to `true`
   - Restart browser

## GPU Types

### Hardware GPU
- Direct hardware acceleration
- Best performance
- Full feature support

### Fallback GPU
- Software emulation
- Limited performance
- Basic feature set

### No GPU Support
- WebGPU not available
- Use WebGL fallback or alternative

## Troubleshooting

### Common Issues

1. **"WebGPU is not supported"**
   - Check browser compatibility
   - Enable WebGPU flags
   - Use secure context (HTTPS/localhost)

2. **"Failed to get GPU adapter"**
   - Update graphics drivers
   - Check hardware compatibility
   - Try fallback adapter option

3. **TypeScript errors**
   - Run `npm install` to get dependencies
   - Check `tsconfig.json` configuration
   - Verify type definitions

### Debug Information
The `GPUTypeChecker.logGPUInfo()` method provides comprehensive debugging output:
- WebGPU support status
- Navigator GPU object availability
- Adapter information (name, vendor, architecture)
- Device creation status
- Error details

## Development

### Build Commands
```bash
# Build TypeScript
npm run build

# Watch for changes
npm run watch

# Start development server
npm run serve
```

### Adding New Features
1. Update TypeScript definitions in `types/webgpu.d.ts`
2. Add utility functions to `utils/`
3. Update main debug code in `debug_main/webGPU.js`
4. Test with `debug_web/index.html`

## License
MIT License - see LICENSE file for details.

## Contributing
1. Fork the repository
2. Create feature branch
3. Submit pull request

## Resources
- [WebGPU Specification](https://gpuweb.github.io/gpuweb/)
- [WebGPU MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Shader Language](https://gpuweb.github.io/gpuweb/wgsl/)