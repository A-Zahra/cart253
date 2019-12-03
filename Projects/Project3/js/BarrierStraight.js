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
  ballBarrierCollision(ball, positioning, player) {
    let d;
    if (positioning === 1) {
      d = dist(this.x, this.y, ball.x, ball.y);
    } else if (positioning === 2) {
      d = dist(this.x, this.y + 130, ball.x, ball.y);
    }
    //let d = dist(this.x, this.y, ball.x, ball.y);
    let barrierSize = (this.h + this.w) * 2;
    if (d < ((ball.size + barrierSize) / 5) && this.id === 1) {
      // If ball overlapped first type of barriers, decrease health by 20 percent
      if (this.behaviour === 1) {
        player.ballOpacity -= 51;
        this.id = 2;
      //  this.fillColor = 255;
        player.healthPercent -= 20;
      }
    }
  }

  // If ball overlapped the second type of barriers sends true
  warning (ball, positioning) {
    let d;
    if (positioning === 1) {
      d = dist(this.x, this.y, ball.x, ball.y);
    } else if (positioning === 2) {
      d = dist(this.x, this.y + 130, ball.x, ball.y);
    }
    let barrierSize = (this.h + this.w) * 2;
    if (d < ((ball.size + barrierSize) / 5.5) && this.id === 1 && this.behaviour === 2) {
      //this.fillColor = color(200,100,200);
      return true;
    }
      else {
        return false;
      }
  }
  // Display barrier
  display(positioning) {
    push();
    fill(this.fillColor);
    rectMode(CENTER);
    if (positioning === 1) {
      rect(this.x, this.y, this.w, this.h);
    }else if (positioning === 2) {
      rect(this.x, this.y + 130, this.w, this.h);
    }

    pop();
  }
}
