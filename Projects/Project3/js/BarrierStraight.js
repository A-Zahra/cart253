// Barrier
//
// A class that represents barrier
class BarrierStraight {

  // Constructor
  //
  // Sets the initial values for the barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor(barrier) {
    this.x = barrier.x;
    this.y = barrier.y;
    this.w = 100;
    this.h = 40;
    this.fillColor = color(255, 76, 39);
    this.id = 1;
    this.behaviour = barrier.behaviour;
    this.vx = 2;
    this.image = barrier.image;
    this.image2 = barrier.image2;
    this.imageReturned = barrier.image;
    this.secondBarrier = barrier.secondBarrier;
    this.imageReturne2 = barrier.secondBarrier;
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
      this.image = this.imageReturned;
      this.imageReturne2 = this.secondBarrier;
    }
  }

  // Check if ball collided first type of barriers.
  ballFirstBarrierCollision(ball, player) {
    let distance = dist(ball.x, ball.y, this.x, this.y);
    if (distance < ((ball.size + this.h) / 1.7) && this.id === 1) {
      // If ball overlapped first type of barriers, decrease health by 20 percent
      if (this.behaviour === 1) {
        player.ballOpacity -= 51;
        this.id = 2;
        player.healthPercent -= 20;
        this.image = this.image2;
      }
    }
  }

  // Check if ball collided first type of barriers.
  ballBarrierCollision(ball, positioning, player) {
    let distance;
    if (positioning === 1) {
      distance = dist(ball.x, ball.y - 15, this.x, this.y);
      console.log("came in");
    } else if (positioning === 2) {
      distance = dist(ball.x, ball.y, this.x, this.y + 80);
    }
    let barrierSize = (this.h + this.w) * 2;
    if (distance < ((ball.size + this.h) / 1.7) && this.id === 1) {
      // If ball overlapped first type of barriers, decrease health by 20 percent
      if (this.behaviour === 1) {
        player.ballOpacity -= 51;
        this.id = 2;
        player.healthPercent -= 20;
        this.image = this.image2;
      }
    }
  }

  // If ball overlapped the second type of barriers sends true
  warning(ball, positioning) {
    let d;
    if (positioning === 1) {
      d = dist(this.x, this.y - 15, ball.x, ball.y);
    } else if (positioning === 2) {
      d = dist(this.x, this.y + 80, ball.x, ball.y);
    }
    let barrierSize = (this.h + this.w) * 2;
    if (d < ((ball.size + this.h) / 1.05) && this.id === 1 && this.behaviour === 2) {
  //    this.image = this.image2;
      return true;
    } else {
      return false;
    }
  }

  displaySecond() {
    push();
    imageMode(CENTER);
      image(this.image, this.x, this.y, this.w, this.h);
    pop();
  }

  // Display barrier
  display(positioning) {
    push();
    imageMode(CENTER);
    // Differs barrier position based on game step
    if (positioning === 1) {
      if (this.behaviour === 1) {
        image(this.image, this.x, this.y, this.w, this.h);
      } else if (this.behaviour === 2) {
        image(this.secondBarrier, this.x, this.y, this.w, this.h);
      }
    } else if (positioning === 2) {
      if (this.behaviour === 1) {
        image(this.image, this.x, this.y + 130, this.w, this.h);
      } else if (this.behaviour === 2) {
        image(this.secondBarrier, this.x, this.y + 130, this.w, this.h);
      }
    }
    pop();
  }
}
