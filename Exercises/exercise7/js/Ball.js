// class Ball
//
//
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
  }

  // Handles ball input
  handleInput() {
    // jump when j is pressed
    if (keyIsDown(SHIFT)) {
      ball.maxJumpHeight += -2;
      ball.ySpeed += 0.2;

    } else if (keyIsDown(CONTROL)) {
      ball.maxJumpHeight = -35;
      ball.ySpeed = 1;
    }
  }

  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}
