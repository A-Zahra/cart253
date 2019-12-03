// class Ball
//
// Parent class that includes common properties of rotated and not rotated ball.
class Ball {

  // Constructor
  //
  // Sets the initial values for the ball's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.isJumping = false;
    this.isFalling = false;
    this.ySpeed = 1;
    this.ySpeedRotated = -1;
    this.maxJumpHeight = -35;
    this.maxJumpHeight2 = -25;
    this.maxJumpHeightRotated = 30;
    this.numTargetsAchieved = 0;
    this.healthPercent = 100;
    this.fillColor = color(255, 0, 0);
  }

  // Handles ball input
  handleInput(step, ballHeight) {
    // jump when space is pressed
    if (keyIsDown(32) && this.maxJumpHeight > -62 || keyIsDown(32) && this.maxJumpHeight > -62) {
      if (ballHeight === 1) {
        this.maxJumpHeight += -1.8;
      } else if (ballHeight === 2) {
        this.maxJumpHeight2 += -1.5;
        this.maxJumpHeightRotated += 1.5;
      }
      if (step) {
        this.ySpeed += 0.2;
        this.ySpeedRotated += -0.2;
      } else {
        this.ySpeed += 0.1;
      }
    }
    // Reset jump height when Ctrl is pressed
    else if (keyIsDown(CONTROL)) {
      this.maxJumpHeight = -35;
      this.maxJumpHeight2 = -25;
      this.maxJumpHeightRotated = 30;
      this.ySpeed = 1;
      this.ySpeedRotated = -1;
    }
  }

  // Updates ball x position based on paddle x position
  updatePosition(paddleX) {
    this.x = paddleX;
  }

  // Check ball target collision
  // If collided, either add to the player score or to his health
  targetCollision(target, player) {
    let d = dist(target.x, target.y, this.x, this.y);
    if (d < (target.size + this.size) / 2 && target.id === 1) {
      // If target size is between 40 and 50 add 5 points to score
      if (target.size > 40 && target.size < 50) {
        player.score += 5;
        target.id = 0;
      }
      // If target size is more than or equal to 50 and less than 60 add 10 points to score
      else if (target.size >= 50 && target.size < 60) {
        player.score += 10;
        target.id = 0;
      }
      // If target size is more than or equal to 60 increase health by 20%
      else if (target.size >= 60) {
        player.ballOpacity += 51;
        // Increase health as long as it is less than 100
        if (player.healthPercent < 100) {
          player.healthPercent += 20;
        }
        target.id = 0;
      }
    }
  }

  // Display player score
  displayScore(player) {
    let showScore = `The extent of target's worthiness: ${player.score}`;
    push();
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(showScore, 220, 50);
    pop();
  }

  // Display percentage of health
  displayHealth(player) {
    let health = `Health: ${player.healthPercent}%`;
    push();
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(health, width - 140, 50);
    pop();
  }

  // Display barrier
  display(player) {
    push();
    noStroke();
    fill(255, 0, 0, player.ballOpacity);
    ellipse(this.x, this.y, this.size * 2, this.size * 2);
    pop();
  }
}
