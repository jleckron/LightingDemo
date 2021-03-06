// Vertex Shader
var ASG3_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  uniform mat4 u_ModelMatrix;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  varying vec4 v_Color;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    gl_Position = u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var ASG3_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;

  uniform sampler2D u_Sampler;

  void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  }`;
