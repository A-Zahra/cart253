// Barrier
//
// A class that represents barrier
class BarrierStraight extends Barrier {

  // Constructor
  //
  // Sets the initial values for the barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y) {
    super(x, y);
    this.vx = 1;
  }

  updatePosition() {
    this.handleWrapping();
      this.x += this.vx;
  }

  handleWrapping() {
  // Check for collisions with top or bottom...
 if (this.x > width) {
    // It hit so reverse velocity
    this.x = 0;
  }
}
  // Display barrier
  display() {
    fill(255, 76, 39);
    rectMode(CORNER);
    rect(this.x, this.y, this.plW, this.plH);
  }

}
