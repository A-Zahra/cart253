// Ball Straight
//
// A class that represents ball in it's normal mode.
class BallStraight extends Ball {

  // Constructor
  //
  // Sets the initial values for the ball's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y) {
    super(x, y);
  }

  // Makes the ball jump
  goJump() {
    // only jump when we are not in the middle of a jump
    if (this.isJumping === false && this.isFalling === false) {

      this.isJumping = true;
      this.ySpeed = this.maxJumpHeight;
    }
  }

  // Updates ball x position based on paddle x position
  updatePosition(paddleX) {
    this.x = paddleX;
  }

  // Display ball
  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size * 2, this.size * 2);
  }
}
