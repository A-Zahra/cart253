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
    this.opacity = 255;
  }

  // Handle jumping
  handleJumping(paddle, ballHeight) {
    // Check if ball is jumping
    if (this.isJumping === true) {
      // it is not falling
      this.isFalling = false;
      // increase the y Speed of ball
      this.ySpeed += 3;
      // update its y position
      this.y += this.ySpeed;

      // Check if is jumping and collided with paddle - then stop jumping.
      if (paddle.collidesWithBall(this)) {
        this.y = paddle.y - 12;
        this.ySpeed = 0;
        this.isJumping = false;
        this.isFalling = false;
        // Ball jumps
        this.goJump(ballHeight);
      }
    } else {
      this.y = paddle.y - 12;
    }
  }
  // Makes the ball jump
  goJump(ballHeight) {
    // Only jump when we are not in the middle of a jump
    if (this.isJumping === false && this.isFalling === false) {
      this.isJumping = true;
      if (ballHeight === 1) {
        this.ySpeed = this.maxJumpHeight;
      }
      else if (ballHeight === 2 ) {
        this.ySpeed = this.maxJumpHeight2;
      }
    }
  }

  // Updates ball x position based on paddle x position
  updatePosition(paddleX) {
    this.x = paddleX;
  }

  // Display player score
  displayScore() {
    let showScore = `The extent of target's worthiness: ${this.score}`;
    push();
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(showScore, 220, 50);
    pop();
  }

  // Display percentage of health
  displayHealth() {
    let health = `Health: ${this.healthPercent}%`;
    push();
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(health, width - 140, 50);
    pop();
  }

  // Display ball
//   display() {
//     push();
//     noStroke();
//     fill(255, 0, 0, this.opacity);
//     ellipse(this.x, this.y, this.size * 2, this.size * 2);
//     pop();
//   }
 }
