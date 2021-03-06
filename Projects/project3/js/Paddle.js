// Paddle
//
// Parent class that includes common properites and methods of rotated and not rotated paddle.
class Paddle {

  // Constructor
  //
  // Sets the initial values for the paddle's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y, paddle) {
    this.x = x;
    this.y = y;
    this.paddleW = 120;
    this.paddleH = 60;
    this.onPaddle = true;
    this.image = paddle;
  }

  // Display paddle
  display() {
    push()
    fill(255);
    imageMode(CORNER);
    image(this.image, this.x, this.y, this.paddleW, this.paddleH);
    pop();
  }
}
