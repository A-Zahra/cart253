// Barrier
//
// A class that represents barrier
class Barrier {

  // Constructor
  //
  // Sets the initial values for the barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor(barrier) {
    this.x = barrier.x;
    this.y = barrier.y;
    this.w = 100;
    this.h = 40;
    this.id = 1;
    this.vx = 2;
    this.behaviour = barrier.behaviour;
    this.image = barrier.image;
    this.image2 = barrier.image2;
    this.imageReturned = barrier.image;
    this.secondBarrier = barrier.secondBarrier;
    this.imageReturne2 = barrier.secondBarrier;
    this.sound = barrier.sound;
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
      this.image = this.imageReturned;
      this.imageReturne2 = this.secondBarrier;
    }
  }

  // Check if ball collided first type of barriers.
  ballFirstBarrierCollision(ball, player) {
    let distance = dist(ball.x, ball.y, this.x, this.y);
    if (distance < ((ball.size + this.h) / 1.7) && this.id === 1) {
      // If ball overlapped first type of barriers, decreases health by 20 percent + play the sound
      if (this.behaviour === 1) {
        player.ballOpacity -= 51;
        this.id = 2;
        player.healthPercent -= 20;
        this.image = this.image2;
        this.sound.setVolume(0.05);
        this.sound.play();
      }
    }
  }

  // Check if ball collided first type of barriers.
  ballBarrierCollision(ball, positioning, player) {
    let distance;
    // Check if the screen rotated or not.
    // Check distance based on their position in rotated or not rotated screen
    if (positioning === 1) {
      distance = dist(ball.x, ball.y, this.x, this.y - 15);
    } else if (positioning === 2) {
      distance = dist(ball.x, ball.y, this.x, this.y + 100);
    }
    if (distance < ((ball.size + this.h) / 1.7) && this.id === 1) {
      // If ball overlapped first type of barriers, decrease health by 20 percent + play the sound
      if (this.behaviour === 1) {
        player.ballOpacity -= 51;
        this.id = 2;
        player.healthPercent -= 20;
        this.image = this.image2;
        this.sound.setVolume(0.05);
        this.sound.play();
      }
    }
  }

  // If ball overlapped the second type of barriers sends true
  warning(ball, positioning) {
    let d;
    if (positioning === 1) {
      d = dist(this.x, this.y - 15, ball.x, ball.y);
    } else if (positioning === 2) {
      d = dist(this.x, this.y + 105, ball.x, ball.y);
    }
    if (d < ((ball.size + this.h) / 1.2) && this.id === 1 && this.behaviour === 2) {
      return true;
    } else {
      return false;
    }
  }

  // Display barriers of second step
  displaySecond() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.w, this.h);
    pop();
  }

  // Display barriers of third step
  display(positioning) {
    push();
    imageMode(CENTER);
    // Differs barrier position based on screen rotation condition
    // Before rotation
    if (positioning === 1) {
      if (this.behaviour === 1) {
        image(this.image, this.x, this.y, this.w, this.h);
      } else if (this.behaviour === 2) {
        image(this.secondBarrier, this.x, this.y, this.w, this.h);
      }
    }
    // After rotation
    else if (positioning === 2) {
      if (this.behaviour === 1) {
        image(this.image, this.x, this.y + 130, this.w, this.h);
      } else if (this.behaviour === 2) {
        image(this.secondBarrier, this.x, this.y + 130, this.w, this.h);
      }
    }
    pop();
  }
}
