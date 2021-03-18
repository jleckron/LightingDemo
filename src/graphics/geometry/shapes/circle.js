/**
 * Specifies a circle. A subclass of geometry.
 *
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Circle} Circle created
   */
  constructor(shader, x, y, size, r, g, b) {
      super(shader);

      this.vertices = this.generateCircleVertices(x, y, size, r, g, b);
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCircleVertices(x, y, size, r, g, b) {
      var vertices = []

      var segs= document.getElementById("segCount");
      segs = segs.value;

      let ang = 0;
      let curX = size * Math.cos(ang);
      let curY = size * Math.sin(ang);
      var vertex1 = new Vertex(x, y, 0.0, r, g, b);
      for(let i=0; i<=segs; i++){
        var vertex2 = new Vertex(x+curX, y+curY, 0.0, r, g, b);

        ang = i*2*Math.PI / segs;
        let nextX = size * Math.cos(ang);
        let nextY = size * Math.sin(ang);

        var vertex3 = new Vertex(x+nextX, y+nextY, 0.0, r, g, b);

        curX=nextX;
        curY=nextY;
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
      }
      return vertices;
  }
}
