// Barrier
//
// A class that represents barrier
class Barrier {

  // Constructor
  //
  // Sets the initial values for the barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor(barrier) {
    this.x = barrier.x;
    this.y = barrier.y;
    this.w = 100;
    this.h = 40;
    this.fillColor = color(255, 76, 39);
    this.id = 1;
    this.behaviour = barrier.behaviour;
  }

  // Display barrier
  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}
