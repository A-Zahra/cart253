// Paddle Straight
//
// A class that represents paddle in it's normal mode
// Has a method which check paddle collision with ball.
class PaddleStraight extends Paddle {

  // Constructor
  //
  // Sets the initial values for the paddle's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y, bow) {
    super(x, y, bow);
  }

  // Check if player collided with paddle.
  collidesWithBall(ball) {
    if (ball.x > this.x && ball.x < this.x + this.paddleW &&
      ball.y + (ball.size / 2) > this.y && ball.y - (ball.size / 2) < this.y + this.paddleH) {
      return true;
    }
    return false;
  }
}
