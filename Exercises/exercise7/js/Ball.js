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
    this.ySpeed = 6;
    this.maxJumpHeight = -15;
  }

  // Handles ball input
  handleInput() {
    // jump when j is pressed
    if (keyIsDown(SHIFT)) {
      ball.maxJumpHeight += -1;
      ball.ySpeed += 0.1;

    } else if (keyIsDown(CONTROL)) {
      ball.maxJumpHeight = -15;
      ball.ySpeed = 6;
    }
  }

  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}
