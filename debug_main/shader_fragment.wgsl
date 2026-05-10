
struct Uniforms {
    color: vec4<f32>,
    time: f32,
    size: f32,
};

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@fragment
fn fs_main( @builtin(position) pos : vec4<f32> ) -> @location(0) vec4<f32> {
    return uniforms.color;
}