// Barrier
//
// A class that represents barrier
class Barrier {

  // Constructor
  //
  // Sets the initial values for the barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.plW = 100;
    this.plH = 40;
  }

  // Display barrier
  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }

}
