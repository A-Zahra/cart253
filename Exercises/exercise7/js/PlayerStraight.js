// class Straight
//
//
class PlayerStraight extends Player {

  // Constructor
  constructor(x, y) {
    super(x, y);
  }

  goJump() {
    // only jump when we are not in the middle of a jump
    if (this.isJumping === false && this.isFalling === false) {

      this.isJumping = true;
      this.ySpeed = this.maxJumpHeight;
    }
  }
  // Updates player x position based on paddle x position
  updatePosition(paddleX) {
    this.x = paddleX;
  }

  // Display ball
  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size * 2, this.size * 2);
  }

}
