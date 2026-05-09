
struct Uniforms {
    time: f32,
    size: f32,
    @align(16) 
    color: vec4<f32>,
};

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@fragment
fn fs_main( @builtin(position) pos : vec4<f32> ) -> @location(0) vec4<f32> {
    let pulse = 0.5 + 0.5 * sin(uniforms.time);
    return uniforms.color * pulse;
}