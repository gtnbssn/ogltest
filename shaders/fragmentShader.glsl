precision mediump float;

#include lygia/space/ratio.glsl
#include lygia/math/decimation.glsl
#include lygia/draw/circle.glsl
// #include lygia/filter/gaussianBlur.glsl

uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec3 color = vec3(0.0);
  vec2 st = gl_FragCoord.xy/uResolution.xy;
  st = ratio(st, uResolution);
  color = vec3(st.x,st.y,abs(sin(uTime)));
  color = decimation(color, 20.);
  color += circle(st, .5, .1);
  
  // gl_FragColor.rgb = vec3(0.8, 0.7, 1.0) + 0.3 * cos(vUv.xyx + uTime);
  gl_FragColor.rgb = color;
  gl_FragColor.a = 1.0;
}
