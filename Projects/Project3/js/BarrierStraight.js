// Barrier
//
// A class that represents barrier
class BarrierStraight extends Barrier {

  // Constructor
  //
  // Sets the initial values for the barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor(barrier) {
    super(barrier);
    this.vx = 2;
  }
  // Update barrier x position
  updatePosition() {
    this.handleWrapping();
    this.x += this.vx;
  }

  // Make the barriers to wrap around the screen
  handleWrapping() {
    // Check if barrier went off screen
    if (this.x > width + 50) {
      // If so, set x position to -50 and id to 1 so that it would be shown and could be counted again.
      this.x = -50;
      this.id = 1;
      this.fillColor = color(255, 76, 39);
    }
  }

  // Check if ball collided barrier.
  // if so, decrease player health by 30%.
  ballBarrierCollision(ball) {
    let d = dist(this.x, this.y, ball.x, ball.y);
    let barrierSize = (this.h + this.w) * 2;
    if (d < ((ball.size + barrierSize) / 5) && this.id === 1) {
      ball.opacity -= 51;
      this.id = 2;
      this.fillColor = 255;
      ball.healthPercent -= 20;
    }
  }

  // Display barrier
  display() {
    push();
    fill(this.fillColor);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
