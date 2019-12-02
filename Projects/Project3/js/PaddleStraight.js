// Paddle Straight
//
// A class that represents paddle in it's normal mode
// Has methods which control ball movement, and
// collision with other elements.
class PaddleStraight extends Paddle {

  // Constructor
  //
  // Sets the initial values for the paddle's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y) {
    super(x, y);
  }

  // Methode to check if player collides with paddle.
  collidesWithBall(ball) {
    if (ball.x > this.x && ball.x < this.x + this.paddleW &&
      ball.y + (ball.size / 2) > this.y && ball.y - (ball.size / 2) < this.y + this.paddleH) {
      return true;
    }
    return false;
  }

  // // Displays paddle
  // display() {
  //   fill(255);
  //   rectMode(CORNER);
  //   rect(this.x, this.y, this.paddleW, this.paddleH);
  // }
}
