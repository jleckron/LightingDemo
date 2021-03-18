/**
 * Specifies a randomly moving circle. A subclass of circle.
 *
 * @this {Circle}
 */
class RandomCircle extends Circle {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {RandomCircle} Random Circle created
   */
   constructor(shader, x, y, size, r, g, b) {
    super(shader);
    this.modelMatrix = new Matrix4();
    this.vertices = this.generateCircleVertices(x, y, size, r, g, b);

    this.x = x;
    this.y =y;
    this.timer = 0;
    this.destX = 0;
    this.destY = 0;

    this.xFlagCount = 0;
    this.yFlagCount = 0;


    this.interleaveVertices();
    this.render();

  }

  render(){
    let translateM = new Matrix4();
    let z = this.timer%60;
    if(z==0){
      let negX = Math.random();
      let negY = Math.random();
      this.destX = Math.random()/80;
      this.destY = Math.random()/80;
      if(negX < .5){
        this.destX = this.destX * -1;
        this.xFlagCount--;
      }
      else{
        this.xFlagCount++;
      }
      if(negY < .5){
        this.destY = this.destY * -1;
        this.yFlagCount--;
      }
      else{
        this.yFlagCount++;
      }
      if(Math.abs(this.xFlagCount)==2){
        this.destX = this.destX * -1;
      }
      if(Math.abs(this.yFlagCount)==2){
        this.destY = this.destY * -1;
      }
    }
    this.timer++;
    translateM.setTranslate(this.destX, this.destY, 0);
    this.modelMatrix = translateM.multiply(this.modelMatrix);

    this.shader.setUniform('u_ModelMatrix', this.modelMatrix.elements);

  }
}
