var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
var size = 32;
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene, camera) {
      this.canvas = canvas;
      this.scene = scene;
      this.camera = camera;

      _inputHandler = this;

      this.image = null;

      this.canvas.onmousemove = function(ev) { _inputHandler.mouseMove(ev) };
      document.addEventListener('keydown', function(ev) {_inputHandler.keyDown(ev)});
      document.addEventListener('keyup', function(ev) {_inputHandler.keyUp(ev)});
      document.addEventListener("wheel", function(ev) {_inputHandler.mouseWheel(ev)});

    }

    keyDown(ev){
      var keyName = event.key;
      if(keyName == "a" || keyName == "A" || keyName == "ArrowLeft"){
        this.camera.truck(-1);
      }
      else if (keyName == "d" || keyName == "D" || keyName == "ArrowRight"){
        this.camera.truck(1);
      }
      else if (keyName == "w" || keyName == "W" || keyName == "ArrowUp"){
        this.camera.dolly(1);
      }
      else if (keyName == "s" || keyName == "S" || keyName == "ArrowDown"){
        this.camera.dolly(-1);
      }
      else if(keyName == "z" || keyName == "Z"){
        this.camera.switchView(1);
      }
      else if(keyName=="o" || keyName=="O"){
        this.camera.zoom(-5);
      }
      else if(keyName=="l" || keyName=="L"){
        this.camera.zoom(5);
      }
    }

    mouseMove(ev) {
      var movementX = ev.movementX;
      if(movementX != 0){
        this.camera.pan(-movementX);
      }
      var movementY = ev.movementY;
      if(movementY != 0){
        this.camera.tilt(-movementY);
      }
    }

    mouseWheel(ev){
      var dir = Math.sign(ev.deltaY);
      this.camera.zoom(dir);
    }

    keyUp(ev) {
        return true;
    }
}

function startWorld(){
  var imageSky = new Image();
  imageSky.src = 'https://github.com/jleckron/LightingDemo/blob/main/objs/cloud.jpg';
  imageSky.onload = function() {
      _inputHandler.image = imageSky;
      var shape = new TexturedTiltedCube(shader, -.1, -.1, .1, size+.2, imageSky, 1);
      _inputHandler.scene.addGeometry(shape);
  };
  var ground = new Square(shaderBasic, 0, 0.001, 0, size, .3, .2, 0.1);
  _inputHandler.scene.addGeometry(ground);
  var imageWall = new Image();
  imageWall.onload = function() {
      _inputHandler.image = imageWall;
      generateWalls(imageWall);
  };
  imageWall.src = 'https://github.com/jleckron/LightingDemo/blob/main/objs/wall.jpg';
}

function generateWalls(imageWall){
  var worldArray = createArray(size);
  for(let i=0; i<size; i++){
    for(let j=0; j<size; j++){
      var height = worldArray[i][j];
      if(i==j && (i==5 || i==27)){
        var shape = new Sphere(shaderBasic, 30, i, 2, -j, 0.5, 0.1, 0.1);
        _inputHandler.scene.addGeometry(shape);
      }
      for(let k=0; k<height; k++){
        var shape = new TexturedTiltedCube(shader, i, k, -j, 1, imageWall, 0);
        _inputHandler.scene.addGeometry(shape);
      }
      if(i==j && i==16){
        var shape = new Sphere(shaderBasic, 30, i+.5, height+2, -j+.5, 0.1, 0.1, 0.7);
        _inputHandler.scene.addGeometry(shape);
      }
    }
  }
}

function createArray(size){
  var arr = [];
  for(let i=0; i<size; i++){
    arr[i] = [];
  }
  arr[0] = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
  arr[1] = [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[2] = [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[3] = [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 3, 2, 2, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[4] = [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 2, 0, 0, 0, 0, 0, 4];
  arr[5] = [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 4];
  arr[6] = [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 3, 4, 4, 4];
  arr[7] = [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[8] = [4, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 3, 3, 3, 0, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[9] = [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[10]= [4, 0, 4, 3, 3, 3, 2, 0, 0, 0, 1, 1, 1, 0, 0, 3, 0, 0, 1, 1, 1, 0, 3, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[11]= [4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[12]= [4, 0, 4, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[13]= [4, 0, 4, 0, 3, 0, 2, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 3, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[14]= [4, 0, 4, 0, 3, 0, 2, 0, 0, 0, 1, 0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 2, 3, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[15]= [4, 0, 4, 0, 3, 0, 2, 0, 0, 0, 1, 0, 1, 2, 3, 3, 3, 2, 1, 0, 1, 0, 0, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[16]= [4, 0, 4, 0, 2, 0, 2, 0, 0, 0, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[17]= [4, 0, 4, 0, 2, 0, 2, 0, 0, 0, 1, 0, 1, 2, 3, 3, 3, 2, 1, 0, 1, 0, 0, 0, 0, 2, 0, 3, 0, 4, 0, 4];
  arr[18]= [4, 0, 4, 0, 1, 0, 2, 0, 0, 0, 1, 0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[19]= [4, 0, 4, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[20]= [4, 0, 4, 3, 3, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4];
  arr[21]= [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[22]= [4, 0, 0, 0, 0, 2, 2, 2, 2, 0, 1, 1, 1, 0, 0, 3, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[23]= [4, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 4];
  arr[24]= [4, 0, 0, 0, 3, 3, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[25]= [4, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[26]= [4, 0, 4, 4, 4, 0, 3, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 3, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[27]= [4, 0, 0, 0, 4, 0, 3, 0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[28]= [4, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[29]= [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 3, 0, 0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[30]= [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
  arr[31]= [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

  return arr;
}
