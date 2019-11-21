// class Ball
//
// Parent class that includes common properties of rotated and not rotated ball.
class Ball {

  // Constructor
  //
  // Sets the initial values for the ball's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.isJumping = false;
    this.isFalling = false;
    this.ySpeed = 1;
    this.maxJumpHeight = -35;
    this.numTargetsAchieved = 0;
    this.healthPercent = 100;
  }

  // Handles ball input
  handleInput(step) {
    // jump when space is pressed
    if (keyIsDown(32)) {
      this.maxJumpHeight += -2;
      if (step) {
        this.ySpeed += 0.2;
      } else {
        this.ySpeed += 0.1;
      }
    }
    // Reset jump height when Ctrl is pressed
    else if (keyIsDown(CONTROL)) {
      this.maxJumpHeight = -35;
      this.ySpeed = 1;
    }
  }

  // Display barrier
  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}
