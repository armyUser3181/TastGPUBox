// WebGPU Type Definitions
declare global {
  interface Navigator {
    gpu?: GPU;
  }

  interface GPU {
    requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
    getPreferredCanvasFormat(): GPUTextureFormat;
  }

  interface GPUAdapter {
    name: string;
    architecture?: string;
    vendor?: string;
    device?: string;
    description?: string;
    limits: GPUSupportedLimits;
    features: GPUSupportedFeatures;
    requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
    isFallbackAdapter?: boolean;
  }

  interface GPUDevice {
    label?: string;
    lost: Promise<GPUDeviceLostInfo>;
    queue: GPUQueue;
    createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
    createRenderPipeline(descriptor: GPURenderPipelineDescriptor): GPURenderPipeline;
    createRenderPipelineAsync(descriptor: GPURenderPipelineDescriptor): Promise<GPURenderPipeline>;
    createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
    createTexture(descriptor: GPUTextureDescriptor): GPUTexture;
    createSampler(descriptor?: GPUSamplerDescriptor): GPUSampler;
    createBindGroupLayout(descriptor: GPUBindGroupLayoutDescriptor): GPUBindGroupLayout;
    createPipelineLayout(descriptor: GPUPipelineLayoutDescriptor): GPUPipelineLayout;
    createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;
    createQuerySet(descriptor: GPUQuerySetDescriptor): GPUQuerySet;
    createCommandEncoder(descriptor?: GPUCommandEncoderDescriptor): GPUCommandEncoder;
    createRenderBundleEncoder(descriptor: GPURenderBundleEncoderDescriptor): GPURenderBundleEncoder;
    importExternalTexture(descriptor: GPUImportExternalTextureDescriptor): GPUExternalTexture;
    destroy(): void;
    popErrorScope(): Promise<GPUError | null>;
    pushErrorScope(filter: GPUErrorFilter): void;
  }

  interface GPURequestAdapterOptions {
    powerPreference?: GPUPowerPreference;
    forceFallbackAdapter?: boolean;
  }

  type GPUPowerPreference = "low-power" | "high-performance";

  type GPUTextureFormat = 
    | "r8unorm"
    | "r8snorm"
    | "r8uint"
    | "r8sint"
    | "r16uint"
    | "r16sint"
    | "r16float"
    | "rg8unorm"
    | "rg8snorm"
    | "rg8uint"
    | "rg8sint"
    | "rg16uint"
    | "rg16sint"
    | "rg16float"
    | "rgba8unorm"
    | "rgba8unorm-srgb"
    | "rgba8snorm"
    | "rgba8uint"
    | "rgba8sint"
    | "bgra8unorm"
    | "bgra8unorm-srgb"
    | "rgb10a2unorm"
    | "rg11b10float"
    | "rgb9e5ufloat"
    | "rg32uint"
    | "rg32sint"
    | "rg32float"
    | "rgba16uint"
    | "rgba16sint"
    | "rgba16float"
    | "rgba32uint"
    | "rgba32sint"
    | "rgba32float"
    | "stencil8"
    | "depth24plus"
    | "depth24plus-stencil8"
    | "depth32float"
    | "depth32float-stencil8"
    | "bc1-rgba-unorm"
    | "bc1-rgba-unorm-srgb"
    | "bc2-rgba-unorm"
    | "bc2-rgba-unorm-srgb"
    | "bc3-rgba-unorm"
    | "bc3-rgba-unorm-srgb"
    | "bc4-r-unorm"
    | "bc4-r-snorm"
    | "bc5-rg-unorm"
    | "bc5-rg-snorm"
    | "bc6h-rgb-ufloat"
    | "bc6h-rgb-float"
    | "bc7-rgba-unorm"
    | "bc7-rgba-unorm-srgb"
    | "etc2-rgb8unorm"
    | "etc2-rgb8unorm-srgb"
    | "etc2-rgb8a1unorm"
    | "etc2-rgb8a1unorm-srgb"
    | "etc2-rgba8unorm"
    | "etc2-rgba8unorm-srgb"
    | "eac-r11unorm"
    | "eac-r11snorm"
    | "eac-rg11unorm"
    | "eac-rg11snorm"
    | "astc-4x4-unorm"
    | "astc-4x4-unorm-srgb"
    | "astc-5x4-unorm"
    | "astc-5x4-unorm-srgb"
    | "astc-5x5-unorm"
    | "astc-5x5-unorm-srgb"
    | "astc-6x5-unorm"
    | "astc-6x5-unorm-srgb"
    | "astc-6x6-unorm"
    | "astc-6x6-unorm-srgb"
    | "astc-8x5-unorm"
    | "astc-8x5-unorm-srgb"
    | "astc-8x6-unorm"
    | "astc-8x6-unorm-srgb"
    | "astc-8x8-unorm"
    | "astc-8x8-unorm-srgb"
    | "astc-10x5-unorm"
    | "astc-10x5-unorm-srgb"
    | "astc-10x6-unorm"
    | "astc-10x6-unorm-srgb"
    | "astc-10x8-unorm"
    | "astc-10x8-unorm-srgb"
    | "astc-10x10-unorm"
    | "astc-10x10-unorm-srgb"
    | "astc-12x10-unorm"
    | "astc-12x10-unorm-srgb"
    | "astc-12x12-unorm"
    | "astc-12x12-unorm-srgb";

  type GPUErrorFilter = "out-of-memory" | "validation";

  interface GPUShaderModule {
    label?: string;
    getCompilationInfo(): Promise<GPUCompilationInfo>;
  }

  interface GPURenderPipeline {
    label?: string;
    getBindGroupLayout(index: number): GPUBindGroupLayout;
  }

  interface GPUSupportedLimits {
    maxTextureDimension1D?: number;
    maxTextureDimension2D?: number;
    maxTextureDimension3D?: number;
    maxTextureArrayLayers?: number;
    maxBindGroups?: number;
    maxDynamicUniformBuffersPerPipelineLayout?: number;
    maxDynamicStorageBuffersPerPipelineLayout?: number;
    maxSampledTexturesPerShaderStage?: number;
    maxSamplersPerShaderStage?: number;
    maxStorageBuffersPerShaderStage?: number;
    maxStorageTexturesPerShaderStage?: number;
    maxUniformBuffersPerShaderStage?: number;
    maxUniformBufferBindingSize?: number;
    maxStorageBufferBindingSize?: number;
    minUniformBufferOffsetAlignment?: number;
    minStorageBufferOffsetAlignment?: number;
    maxVertexBuffers?: number;
    maxBufferSize?: number;
    maxVertexAttributes?: number;
    maxVertexBufferArrayStride?: number;
    maxInterStageShaderComponents?: number;
    maxComputeWorkgroupStorageSize?: number;
    maxComputeInvocationsPerWorkgroup?: number;
    maxComputeWorkgroupSizeX?: number;
    maxComputeWorkgroupSizeY?: number;
    maxComputeWorkgroupSizeZ?: number;
    maxComputeWorkgroupsPerDimension?: number;
  }

  interface GPUSupportedFeatures {
    has(feature: GPUFeatureName): boolean;
    keys(): IterableIterator<GPUFeatureName>;
    values(): IterableIterator<boolean>;
    entries(): IterableIterator<[GPUFeatureName, boolean]>;
    forEach(callbackfn: (value: boolean, key: GPUFeatureName, parent: GPUSupportedFeatures) => void, thisArg?: any): void;
    [Symbol.iterator](): IterableIterator<[GPUFeatureName, boolean]>;
  }

  type GPUFeatureName = 
    | "depth-clip-control"
    | "depth24unorm-stencil8"
    | "depth32float-stencil8"
    | "timestamp-query"
    | "pipeline-statistics-query"
    | "texture-compression-bc"
    | "texture-compression-etc2"
    | "texture-compression-astc"
    | "indirect-first-instance"
    | "shader-f16"
    | "rg11b10ufloat-renderable"
    | "bgra8unorm-storage"
    | "float32-filterable";

  // Additional WebGPU types...
  interface GPUShaderModuleDescriptor {
    code: string;
    label?: string;
    hints?: Record<string, unknown>;
  }

  interface GPURenderPipelineDescriptor {
    label?: string;
    layout: GPUPipelineLayout | "auto";
    vertex: GPUVertexState;
    fragment?: GPUFragmentState;
    primitive?: GPUPrimitiveState;
    depthStencil?: GPUDepthStencilState;
    multisample?: GPUMultisampleState;
    multiview?: GPUMultiviewState;
  }

  interface GPUVertexState {
    module: GPUShaderModule;
    entryPoint: string;
    buffers?: GPUVertexBufferLayout[];
  }

  interface GPUFragmentState {
    module: GPUShaderModule;
    entryPoint: string;
    targets: GPUCOLORTargetState[];
  }

  interface GPUCOLORTargetSTATE {
    format: GPUTextureFormat;
    blend?: GPUBlendState;
    writeMask?: GPUColorWriteFlags;
  }

  interface GPUBlendState {
    color: GPUBlendComponent;
    alpha: GPUBlendComponent;
  }

  interface GPUBlendComponent {
    operation?: GPUBlendOperation;
    srcFactor?: GPUBlendFactor;
    dstFactor?: GPUBlendFactor;
  }

  type GPUBlendOperation = 
    | "add"
    | "subtract"
    | "reverse-subtract"
    | "min"
    | "max";

  type GPUBlendFactor = 
    | "zero"
    | "one"
    | "src"
    | "one-minus-src"
    | "src-alpha"
    | "one-minus-src-alpha"
    | "dst"
    | "one-minus-dst"
    | "dst-alpha"
    | "one-minus-dst-alpha"
    | "src-alpha-saturated"
    | "constant"
    | "one-minus-constant";

  type GPUColorWriteFlags = number;

  interface GPUPrimitiveState {
    topology?: GPUPrimitiveTopology;
    stripIndexFormat?: GPUIndexFormat;
    frontFace?: GPUFrontFace;
    cullMode?: GPUCullMode;
    unclippedDepth?: boolean;
  }

  type GPUPrimitiveTopology = 
    | "point-list"
    | "line-list"
    | "line-strip"
    | "triangle-list"
    | "triangle-strip";

  type GPUIndexFormat = 
    | "uint16"
    | "uint32";

  type GPUFrontFace = 
    | "ccw"
    | "cw";

  type GPUCullMode = 
    | "none"
    | "front"
    | "back";

  interface GPUDepthStencilState {
    format: GPUTextureFormat;
    depthWriteEnabled?: boolean;
    depthCompare?: GPUCompareFunction;
    stencilFront?: GPUStencilFaceState;
    stencilBack?: GPUStencilFaceState;
    depthBias?: number;
    depthBiasSlopeScale?: number;
    depthBiasClamp?: number;
  }

  type GPUCompareFunction = 
    | "never"
    | "less"
    | "equal"
    | "less-equal"
    | "greater"
    | "not-equal"
    | "greater-equal"
    | "always";

  interface GPUStencilFaceState {
    compare?: GPUCompareFunction;
    failOp?: GPUStencilOperation;
    depthFailOp?: GPUStencilOperation;
    passOp?: GPUStencilOperation;
  }

  type GPUStencilOperation = 
    | "keep"
    | "zero"
    | "replace"
    | "invert"
    | "increment-clamp"
    | "decrement-clamp"
    | "increment-wrap"
    | "decrement-wrap";

  interface GPUMultisampleState {
    count?: number;
    mask?: number;
    alphaToCoverageEnabled?: boolean;
  }

  interface GPUMultiviewState {
    viewportCount?: number;
    viewportDynamicScissorCount?: number;
  }

  interface GPUPipelineLayout {
    label?: string;
    getBindGroupLayout(index: number): GPUBindGroupLayout;
  }

  interface GPUVertexBufferLayout {
    arrayStride: number;
    stepMode?: GPUVertexStepMode;
    attributes: GPUVertexAttribute[];
  }

  type GPUVertexStepMode = 
    | "vertex"
    | "instance";

  interface GPUVertexAttribute {
    format: GPUVertexFormat;
    offset: number;
    shaderLocation: number;
  }

  type GPUVertexFormat = 
    | "uint8x2"
    | "uint8x4"
    | "sint8x2"
    | "sint8x4"
    | "unorm8x2"
    | "unorm8x4"
    | "snorm8x2"
    | "snorm8x4"
    | "uint16x2"
    | "uint16x4"
    | "sint16x2"
    | "sint16x4"
    | "unorm16x2"
    | "unorm16x4"
    | "snorm16x2"
    | "snorm16x4"
    | "float16x2"
    | "float16x4"
    | "float32"
    | "float32x2"
    | "float32x3"
    | "float32x4"
    | "uint32"
    | "uint32x2"
    | "uint32x3"
    | "uint32x4"
    | "sint32"
    | "sint32x2"
    | "sint32x3"
    | "sint32x4";

  interface GPUDeviceDescriptor {
    label?: string;
    requiredFeatures?: GPUFeatureName[];
    requiredLimits?: Record<string, number>;
  }

  interface GPUBufferDescriptor {
    label?: string;
    size: number;
    usage: GPUBufferUsageFlags;
    mappedAtCreation?: boolean;
  }

  type GPUBufferUsageFlags = number;

  interface GPUTextureDescriptor {
    label?: string;
    size: GPUExtent3D;
    mipLevelCount?: number;
    sampleCount?: number;
    dimension?: GPUTextureDimension;
    format: GPUTextureFormat;
    usage: GPUTextureUsageFlags;
    viewFormats?: GPUTextureFormat[];
  }

  interface GPUExtent3D {
    width: number;
    height?: number;
    depthOrArrayLayers?: number;
  }

  type GPUTextureDimension = 
    | "1d"
    | "2d"
    | "3d";

  type GPUTextureUsageFlags = number;

  interface GPUSamplerDescriptor {
    label?: string;
    addressModeU?: GPUAddressMode;
    addressModeV?: GPUAddressMode;
    addressModeW?: GPUAddressMode;
    magFilter?: GPUFilterMode;
    minFilter?: GPUFilterMode;
    mipmapFilter?: GPUMipmapFilterMode;
    lodMinClamp?: number;
    lodMaxClamp?: number;
    compare?: GPUCompareFunction;
    maxAnisotropy?: number;
  }

  type GPUAddressMode = 
    | "clamp-to-edge"
    | "repeat"
    | "mirror-repeat";

  type GPUFilterMode = 
    | "nearest"
    | "linear";

  type GPUMipmapFilterMode = 
    | "nearest"
    | "linear";

  interface GPUBindGroupLayoutDescriptor {
    label?: string;
    entries: GPUBindGroupLayoutEntry[];
  }

  interface GPUBindGroupLayoutEntry {
    binding: number;
    visibility: GPUShaderStageFlags;
    buffer?: GPUBufferBindingLayout;
    sampler?: GPUSamplerBindingLayout;
    texture?: GPUTextureBindingLayout;
    storageTexture?: GPUStorageTextureBindingLayout;
    externalTexture?: GPUExternalTextureBindingLayout;
  }

  type GPUShaderStageFlags = number;

  interface GPUBufferBindingLayout {
    type?: GPUBufferBindingType;
    hasDynamicOffset?: boolean;
    minBindingSize?: number;
  }

  type GPUBufferBindingType = 
    | "uniform"
    | "storage"
    | "read-only-storage";

  interface GPUSamplerBindingLayout {
    type?: GPUSamplerBindingType;
  }

  type GPUSamplerBindingType = 
    | "filtering"
    | "non-filtering"
    | "comparison";

  interface GPUTextureBindingLayout {
    sampleType?: GPUTextureSampleType;
    viewDimension?: GPUTextureViewDimension;
    multisampled?: boolean;
  }

  type GPUTextureSampleType = 
    | "float"
    | "unfilterable-float"
    | "depth"
    | "sint"
    | "uint";

  type GPUTextureViewDimension = 
    | "1d"
    | "2d"
    | "2d-array"
    | "cube"
    | "cube-array"
    | "3d";

  interface GPUStorageTextureBindingLayout {
    access?: GPUStorageTextureAccess;
    format: GPUTextureFormat;
    viewDimension?: GPUTextureViewDimension;
  }

  type GPUStorageTextureAccess = 
    | "write-only"
    | "read-only"
    | "read-write";

  interface GPUExternalTextureBindingLayout {
    label?: string;
  }

  interface GPUPipelineLayoutDescriptor {
    label?: string;
    bindGroupLayouts: GPUBindGroupLayout[];
  }

  interface GPUBindGroupDescriptor {
    label?: string;
    layout: GPUBindGroupLayout;
    entries: GPUBindGroupEntry[];
  }

  interface GPUBindGroupEntry {
    binding: number;
    resource: GPUBindingResource;
  }

  type GPUBindingResource = 
    | GPUBufferBinding
    | GPUSampler
    | GPUTextureView
    | GPUExternalTexture;

  interface GPUBufferBinding {
    buffer: GPUBuffer;
    offset?: number;
    size?: number;
  }

  interface GPUTextureView {
    label?: string;
  }

  interface GPUExternalTexture {
    label?: string;
  }

  interface GPUQuerySetDescriptor {
    label?: string;
    type: GPUQueryType;
    count: number;
    pipelineStatistics?: GPUPipelineStatisticName[];
  }

  type GPUQueryType = 
    | "occlusion"
    | "timestamp"
    | "pipeline-statistics";

  type GPUPipelineStatisticName = 
    | "vertex-shader-invocations"
    | "clipper-invocations"
    | "clipper-primitives-out"
    | "fragment-shader-invocations"
    | "compute-shader-invocations";

  interface GPUCommandEncoderDescriptor {
    label?: string;
    colorFormats?: GPUTextureFormat[];
    depthStencilFormat?: GPUTextureFormat;
    sampleCount?: number;
  }

  interface GPUCommandEncoder {
    label?: string;
    beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder;
    beginComputePass(descriptor?: GPUComputePassDescriptor): GPUComputePassEncoder;
    copyBufferToBuffer(source: GPUBuffer, sourceOffset: number, destination: GPUBuffer, destinationOffset: number, size: number): void;
    copyBufferToTexture(source: GPUImageCopyBuffer, destination: GPUImageCopyTexture, copySize: GPUExtent3D): void;
    copyTextureToBuffer(source: GPUImageCopyTexture, destination: GPUImageCopyBuffer, copySize: GPUExtent3D): void;
    copyTextureToTexture(source: GPUImageCopyTexture, destination: GPUImageCopyTexture, copySize: GPUExtent3D): void;
    fillBuffer(buffer: GPUBuffer, offset: number, size: number, value: number): void;
    resolveQuerySet(querySet: GPUQuerySet, firstQuery: number, queryCount: number, destination: GPUBuffer, destinationOffset: number): void;
    finish(descriptor?: GPUCommandBufferDescriptor): GPUCommandBuffer;
  }

  interface GPURenderPassDescriptor {
    label?: string;
    colorAttachments: GPURenderPassColorAttachment[];
    depthStencilAttachment?: GPURenderPassDepthStencilAttachment;
    occlusionQuerySet?: GPUQuerySet;
    timestampWrites?: GPURenderPassTimestampWrites;
  }

  interface GPURenderPassColorAttachment {
    view: GPUTextureView;
    resolveTarget?: GPUTextureView;
    clearValue?: GPUColor;
    loadOp: GPULoadOp;
    storeOp: GPUStoreOp;
  }

  interface GPUColor {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  type GPULoadOp = 
    | "load"
    | "clear";

  type GPUStoreOp = 
    | "store"
    | "discard";

  interface GPURenderPassDepthStencilAttachment {
    view: GPUTextureView;
    depthClearValue?: number;
    depthLoadOp?: GPULoadOp;
    depthStoreOp?: GPUStoreOp;
    depthReadOnly?: boolean;
    stencilClearValue?: number;
    stencilLoadOp?: GPULoadOp;
    stencilStoreOp?: GPUStoreOp;
    stencilReadOnly?: boolean;
  }

  interface GPURenderPassTimestampWrites {
    querySet: GPUQuerySet;
    beginningOfPassWriteIndex?: number;
    endOfPassWriteIndex?: number;
  }

  interface GPUComputePassDescriptor {
    label?: string;
    timestampWrites?: GPUComputePassTimestampWrites;
  }

  interface GPUComputePassTimestampWrites {
    querySet: GPUQuerySet;
    beginningOfPassWriteIndex?: number;
    endOfPassWriteIndex?: number;
  }

  interface GPURenderPassEncoder {
    label?: string;
    setPipeline(pipeline: GPURenderPipeline): void;
    setBindGroup(index: number, bindGroup: GPUBindGroup, dynamicOffsets?: number[]): void;
    setIndexBuffer(buffer: GPUBuffer, indexFormat: GPUIndexFormat, offset?: number, size?: number): void;
    setVertexBuffer(slot: number, buffer: GPUBuffer, offset?: number, size?: number): void;
    draw(vertexCount: number, instanceCount?: number, firstVertex?: number, firstInstance?: number): void;
    drawIndexed(indexCount: number, instanceCount?: number, firstIndex?: number, baseVertex?: number, firstInstance?: number): void;
    drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): void;
    drawIndexedIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): void;
    setViewport(x: number, y: number, width: number, height: number, minDepth: number, maxDepth: number): void;
    setScissorRect(x: number, y: number, width: number, height: number): void;
    setBlendConstant(color: GPUColor): void;
    setStencilReference(reference: number): void;
    beginOcclusionQuery(queryIndex: number): void;
    endOcclusionQuery(): void;
    beginPipelineStatisticsQuery(querySet: GPUQuerySet, queryIndex: number): void;
    endPipelineStatisticsQuery(): void;
    executeBundles(bundles: GPURenderBundle[]): void;
    end(): void;
  }

  interface GPUComputePassEncoder {
    label?: string;
    setPipeline(pipeline: GPUComputePipeline): void;
    setBindGroup(index: number, bindGroup: GPUBindGroup, dynamicOffsets?: number[]): void;
    dispatchWorkgroups(workgroupCountX: number, workgroupCountY?: number, workgroupCountZ?: number): void;
    dispatchWorkgroupsIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): void;
    end(): void;
  }

  interface GPUComputePipeline {
    label?: string;
    getBindGroupLayout(index: number): GPUBindGroupLayout;
  }

  interface GPURenderBundleEncoder {
    label?: string;
    setPipeline(pipeline: GPURenderPipeline): void;
    setBindGroup(index: number, bindGroup: GPUBindGroup, dynamicOffsets?: number[]): void;
    setIndexBuffer(buffer: GPUBuffer, indexFormat: GPUIndexFormat, offset?: number, size?: number): void;
    setVertexBuffer(slot: number, buffer: GPUBuffer, offset?: number, size?: number): void;
    draw(vertexCount: number, instanceCount?: number, firstVertex?: number, firstInstance?: number): void;
    drawIndexed(indexCount: number, instanceCount?: number, firstIndex?: number, baseVertex?: number, firstInstance?: number): void;
    drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): void;
    drawIndexedIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): void;
    finish(descriptor?: GPURenderBundleDescriptor): GPURenderBundle;
  }

  interface GPURenderBundleDescriptor {
    label?: string;
  }

  interface GPURenderBundle {
    label?: string;
  }

  interface GPUCommandBufferDescriptor {
    label?: string;
  }

  interface GPUCommandBuffer {
    label?: string;
  }

  interface GPUQueue {
    label?: string;
    submit(commandBuffers: GPUCommandBuffer[]): void;
    onSubmittedWorkDone(): Promise<void>;
    writeBuffer(buffer: GPUBuffer, bufferOffset: number, data: ArrayBufferView, dataOffset?: number, size?: number): void;
    writeTexture(destination: GPUImageCopyTexture, data: ArrayBufferView, dataLayout: GPUImageDataLayout, size: GPUExtent3D): void;
    copyExternalImageToTexture(source: GPUImageCopyExternalImage, destination: GPUImageCopyTexture, copySize: GPUExtent3D): void;
  }

  interface GPUImageCopyBuffer {
    buffer: GPUBuffer;
    offset?: number;
    bytesPerRow?: number;
    rowsPerImage?: number;
  }

  interface GPUImageCopyTexture {
    texture: GPUTexture;
    mipLevel?: number;
    origin?: GPUOrigin3D;
    aspect?: GPUTextureAspect;
  }

  interface GPUImageCopyExternalImage {
    source: HTMLImageElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap | VideoFrame;
    origin?: GPUOrigin2D;
    flipY?: boolean;
  }

  interface GPUOrigin3D {
    x?: number;
    y?: number;
    z?: number;
  }

  type GPUTextureAspect = 
    | "all"
    | "stencil-only"
    | "depth-only";

  interface GPUImageDataLayout {
    offset?: number;
    bytesPerRow?: number;
    rowsPerImage?: number;
  }

  interface GPUOrigin2D {
    x?: number;
    y?: number;
  }

  interface GPUDeviceLostInfo {
    reason?: GPUDeviceLostReason;
    message?: string;
  }

  type GPUDeviceLostReason = 
    | "destroyed"
    | "unknown";

  interface GPUCompilationInfo {
    messages: GPUCompilationMessage[];
  }

  interface GPUCompilationMessage {
    message: string;
    type: GPUCompilationMessageType;
    lineNum?: number;
    linePos?: number;
    offset?: number;
    length?: number;
  }

  type GPUCompilationMessageType = 
    | "error"
    | "warning"
    | "info";

  interface GPUError {
    message: string;
  }

  interface GPUOutOfMemoryError extends GPUError {
    readonly type: "out-of-memory";
  }

  interface GPUValidationError extends GPUError {
    readonly type: "validation";
  }

  interface GPUInternalError extends GPUError {
    readonly type: "internal";
  }

  interface GPUSampler {
    label?: string;
  }

  interface GPUBuffer {
    label?: string;
    mapAsync(mode: GPUMapModeFlags, offset?: number, size?: number): Promise<void>;
    getMappedRange(offset?: number, size?: number): ArrayBuffer;
    unmap(offset?: number, size?: number): void;
    destroy(): void;
  }

  type GPUMapModeFlags = number;

  interface GPUTexture {
    label?: string;
    createView(descriptor?: GPUTextureViewDescriptor): GPUTextureView;
    destroy(): void;
  }

  interface GPUTextureViewDescriptor {
    label?: string;
    format?: GPUTextureFormat;
    dimension?: GPUTextureViewDimension;
    aspect?: GPUTextureAspect;
    baseMipLevel?: number;
    mipLevelCount?: number;
    baseArrayLayer?: number;
    arrayLayerCount?: number;
    origin?: GPUOrigin3D;
  }

  interface GPUBindGroup {
    label?: string;
  }

  interface GPUQuerySet {
    label?: string;
    destroy(): void;
  }
}

export {};
