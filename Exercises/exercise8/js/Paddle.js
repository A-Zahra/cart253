// Paddle
//
// Parent class that includes common properites and methods of rotated and not rotated paddle.
class Paddle {

  // Constructor
  //
  // Sets the initial values for the paddle's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.paddleW = 100;
    this.paddleH = 40;
    this.onPaddle = true;
  }

  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}
