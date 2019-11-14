// Barrier
//
//
class BarrierStraight {

  // Constructor
  //
  // Sets the initial values for the barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.plW = 60;
    this.plH = 20;
  }

  // Display barrier
  display() {
    fill(255, 76, 39);
    rectMode(CORNER);
    rect(this.x, this.y, this.plW, this.plH);
  }

}
