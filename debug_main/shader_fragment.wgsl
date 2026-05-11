
struct Uniforms {
    color: vec4<f32>,
    time: f32,
    size: f32,
};

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

fn colorFunction( pos : vec4<f32> ) -> vec4<f32> {
    var gap = 80.0;
    var color = uniforms.color;
    var one = abs(pos.y / gap + uniforms.time / 2 + sin( sin(-uniforms.time * 4 + pos.x / 10) * 4 / gap)) * gap % gap / gap / 2 + 0.5;
    color.r = one;
    color.g = one;
    color.b = one;
    return color;
}

@fragment
fn fs_main( @builtin(position) pos : vec4<f32> ) -> @location(0) vec4<f32> {
    var rpos = pos;
    var t = uniforms.time * 0.01;
    rpos.x = pos.x * cos(t) - pos.y * sin(t);
    rpos.y = pos.x * sin(t) + pos.y * cos(t);
    return colorFunction(rpos);
}