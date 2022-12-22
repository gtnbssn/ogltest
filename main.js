import { Renderer, Geometry, Program, Mesh, Post, Vec2 } from "ogl";
import vertexShader from "./shaders/vertexShader.glsl";
import fragmentShader from "./shaders/fragmentShader.glsl";
import fxaa from "./shaders/fxaaFragmentShader.glsl";
import "./style.css";

{
  const renderer = new Renderer({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const gl = renderer.gl;
  document.body.appendChild(gl.canvas);

  // Triangle that covers viewport, with UVs that still span 0 > 1 across viewport
  const geometry = new Geometry(gl, {
    position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
  });
  // Alternatively, you could use the Triangle class.

  const resolution = { value: new Vec2() };

  const post = new Post(gl);

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    post.resize();
    resolution.value.set(gl.canvas.width, gl.canvas.height);
  }
  window.addEventListener("resize", resize, false);
  resize();

  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: resolution,
    },
  });

  const mesh = new Mesh(gl, { geometry, program });

  const pass = post.addPass({
    fragment: fxaa,
    uniforms: {
      uResolution: resolution,
    }
  });

  setTimeout(() => {
    requestAnimationFrame(update);
  }, 1500);

  function update(t) {
    requestAnimationFrame(update);

    program.uniforms.uTime.value = t * 0.001;

    // renderer.render({ scene: mesh });
    post.render({ scene: mesh });
  }
}
