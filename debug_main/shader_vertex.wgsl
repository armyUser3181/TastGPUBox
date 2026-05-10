
struct Uniforms {
    color: vec4<f32>,
    time: f32,
    size: f32,
};

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex : u32, @location(0) pos : vec4<f32>) -> @builtin(position) vec4<f32> {
    return vec4<f32>(pos * uniforms.size);
}