// SecondStepTarget
//
// A class that represents second step targets
class SecondStepTarget {
  // Constructor
  //
  // Sets the initial values for the target's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 1;
  }

  // Update target x position
  updatePosition() {
    this.handleWrapping();
    this.x += this.vx;
  }


  // Make the target to wrap around the screen
  handleWrapping() {
    // Check if target went off screen
    if (this.x > width + 50) {
      // If so set x position to zero
      this.x = -50;
    }
  }

  // Display target
  display() {
    push();
    fill(130, 47, 213);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
