/**
 * Specifies a tilted cube. A subclass of geometry.
 *
 @author John Leckrone
 * @this {tilted cube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {TiltedCube} Tilted Cube created
   */
   constructor(shader, x, y, size, r, g, b) {
       super(shader);
       this.x = x;
       this.y = y;
       this.vertices = this.generateCubeVertices(x, y, size, r, g, b);
       this.faces = {0: this.vertices};
       this.modelMatrix = new Matrix4();

       // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
       this.interleaveVertices();
       this.render();
   }

   generateCubeVertices(x, y, size, r, g, b) {
       var vertices = []

       //front face
       var vertex1 = new Vertex(x-size, y-size, size, r, g, b);
       var vertex2 = new Vertex(x-size, y+size, size, r, g, b);
       var vertex3 = new Vertex(x+size,  y-size, size, r, g, b);
       vertices.push(vertex1);
       vertices.push(vertex2);
       vertices.push(vertex3);

       var vertex4 = new Vertex(x+size, y+size, size, r, g, b);
       vertices.push(vertex2);
       vertices.push(vertex3);
       vertices.push(vertex4);

       //top face
       var vertex5 = new Vertex(x+size, y+size, -size, r, g, b);
       vertices.push(vertex5);
       vertices.push(vertex4);
       vertices.push(vertex2);

       var vertex6 = new Vertex(x-size, y+size, -size, r, g, b);
       vertices.push(vertex5);
       vertices.push(vertex6);
       vertices.push(vertex2);

       //bottom face
       var vertex7 = new Vertex(x-size, y-size, -size, r, g, b);
       vertices.push(vertex1);
       vertices.push(vertex7);
       vertices.push(vertex3);

       var vertex8 = new Vertex(x+size, y-size, -size, r, g, b);
       vertices.push(vertex8);
       vertices.push(vertex7);
       vertices.push(vertex3);

       //left face
       vertices.push(vertex1);
       vertices.push(vertex6);
       vertices.push(vertex2);

       vertices.push(vertex1);
       vertices.push(vertex6);
       vertices.push(vertex7);

       //right face
       vertices.push(vertex5);
       vertices.push(vertex4);
       vertices.push(vertex3);

       vertices.push(vertex8);
       vertices.push(vertex5);
       vertices.push(vertex3);

       //rear face
       vertices.push(vertex6);
       vertices.push(vertex7);
       vertices.push(vertex5);

       vertices.push(vertex8);
       vertices.push(vertex7);
       vertices.push(vertex5);

       return vertices;
   }

   render(){
     let rotateM = new Matrix4();
     rotateM.setRotate(1, 1, 1, 1);
     let translateM1 = new Matrix4();
     translateM1.setTranslate(-this.x, -this.y, 0);
     let translateM2 = new Matrix4();
     translateM2.setTranslate(this.x, this.y, 0);
     this.modelMatrix = translateM1.multiply(this.modelMatrix);
     this.modelMatrix = rotateM.multiply(this.modelMatrix);
     this.modelMatrix = translateM2.multiply(this.modelMatrix);

     this.shader.setUniform('u_ModelMatrix', this.modelMatrix.elements);
   }
  }
