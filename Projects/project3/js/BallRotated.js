// Ball Rotated
//
// A class that represents ball in it's rotated mode.
class BallRotated extends Ball {

  // Constructor
  //
  // Sets the initial values for the ball's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y, stone) {
    super(x, y, stone);
    this.opacity = 255;
  }

  // Handle jumping
  handleJumping(paddle) {
    // Check if ball is jumping
    if (this.isJumping === true) {
      // it is not falling
      this.isFalling = false;
      // increase the y Speed of ball
      this.ySpeedRotated += -3;
      // update its y position
      this.y += this.ySpeedRotated;

      // Check if is jumping and collided with paddle - then stop jumping.
      if (paddle.collidesWithBall(this)) {
        this.y = paddle.y + 12;
        this.ySpeedRotated = 0;
        this.isJumping = false;
        this.isFalling = false;
        // Ball jumps
        this.goJump();
      }
    } else {
      this.y = paddle.y + 12;
    }
  }

  // Makes the ball jump
  goJump() {
    // Only jump when we are not in the middle of a jump
    if (this.isJumping === false && this.isFalling === false) {
      this.isJumping = true;
      this.ySpeedRotated = this.maxJumpHeightRotated;
    }
  }
}
