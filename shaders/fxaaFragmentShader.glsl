precision mediump float;

#include lygia/sample/fxaa.glsl

uniform sampler2D tMap;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec4 raw = texture2D(tMap, vUv);
  vec4 aa = fxaa(tMap, vUv, uResolution);
  // Split screen in half to show side-by-side comparison
  gl_FragColor = mix(raw, aa, step(0.5, vUv.x));
  // Darken left side a tad for clarity
  gl_FragColor -= step(vUv.x, 0.5) * 0.5;
}
