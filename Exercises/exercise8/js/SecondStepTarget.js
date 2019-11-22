// SecondStepTarget
//
// A class that represents second step targets
class SecondStepTarget extends Target{
  // Constructor
  //
  // Sets the initial values for the target's properties
  // Either sets default values or uses the arguments provided.
  constructor(target) {
    super(target);
    this.size = target.size;
    this.vx = 1;
    this.fillColor = color(170, 47, 213);
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
    fill(this.fillColor);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
