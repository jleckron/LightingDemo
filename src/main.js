var shader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new Scene();
  var camera = new Camera();
  var light = new Light(32, 1, -20);
  scene.setLight(light);
  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);
  shaderBasic = new Shader(gl, ASG5_VSHADER, ASG5_FSHADER);
  shaderBasic.addAttribute("a_Position");
  shaderBasic.addAttribute("a_Color");
  shaderBasic.addAttribute("a_Normal");

  shaderBasic.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shaderBasic.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
  shaderBasic.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
  shaderBasic.addUniform("u_ViewMatrix", "mat4", new Matrix4());
  shaderBasic.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shaderBasic.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shaderBasic.addUniform("u_LightPosition", "vec3", new Vector3().elements);
  shaderBasic.addUniform("u_SpecularColor", "vec3", new Vector3().elements);
  shaderBasic.addUniform("u_CameraPosition", "vec3", new Vector3().elements);

  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_Normal");
  shader.addAttribute("a_TexCoord");

  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4());
  shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_Sampler", "sampler2D", 0);
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shader.addUniform("u_LightPosition", "vec3", new Vector3().elements);
  shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);
  shader.addUniform("u_CameraPosition", "vec3", new Vector3().elements);


  startWorld();

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}
