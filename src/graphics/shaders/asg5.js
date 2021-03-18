// Vertex Shader
var ASG5_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  varying vec3 v_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  attribute vec4 a_Normal;
  varying vec3 v_Normal;

  uniform mat4 u_ModelMatrix;
  uniform mat4 u_NormalMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_ViewMatrix;

  void main() {
    v_Color = a_Color;
    v_Position = vec3(a_Position);
    v_Normal = normalize(vec3(a_Normal));
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * a_Position;
  }`;




// Fragment Shader
var ASG5_FSHADER =
  `precision mediump float;
  varying vec3 v_Position;
  varying vec4 v_Color;
  varying vec3 v_Normal;

  uniform vec3 u_DiffuseColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_LightPosition;
  uniform vec3 u_SpecularColor;
  uniform vec3 u_CameraPosition;



  void main() {
    vec3 normal = normalize(v_Normal);
    vec3 lightDirection = normalize(u_LightPosition - v_Position);
    float nDotL = max(dot(normal, lightDirection), 0.0);
    vec3 r = 2.0*(dot(normal, lightDirection)) * normal - lightDirection;
    float specAng = max(dot(normalize(u_CameraPosition - v_Position), normalize(r)), 0.0);
    float spec = pow(specAng, 2.0);
    vec3 specular = u_SpecularColor * v_Color.rgb * spec;
    vec3 diffuse = u_DiffuseColor * v_Color.rgb * nDotL;
    vec3 ambient = u_AmbientColor * v_Color.rgb;
    gl_FragColor = vec4(specular + diffuse + ambient, v_Color.a);
  }`;
