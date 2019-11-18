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
  }

  // Display barrier
  display() {
    fill(255, 76, 39);
    rectMode(CORNER);
    rect(this.x, this.y, this.plW, this.plH);
  }

}
