// class Ball
//
// Parent class that includes common properties of rotated and not rotated ball.
class Ball {

  // Constructor
  //
  // Sets the initial values for the ball's properties
  // Either sets default values or uses the arguments provided.
  constructor(x, y, stone) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.isJumping = false;
    this.isFalling = false;
    this.ySpeed = 1;
    this.ySpeedRotated = -1;
    this.maxJumpHeight = -35;
    this.maxJumpHeight2 = -25;
    this.maxJumpHeightRotated = 25;
    this.numTargetsAchieved = 0;
    this.healthPercent = 100;
    this.image = stone;
    this.PositionInFirstStep = 1;
    this.PositionInNextSteps = 2;
  }

  // Handles ball input
  handleInput(step, ballHeight) {
    // jump when space is pressed
    if (keyIsDown(32) && this.maxJumpHeight > -62 || keyIsDown(32) && this.maxJumpHeight > -62) {
      // Differs ball jump height based on the steps
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
      this.maxJumpHeightRotated = 25;
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
      // If target image id was equal 1 add five points to the player score
      if (target.imageId === 1) {
        player.score += 5;
        target.id = 0;
        target.sound.setVolume(0.05);
        target.sound.play();
      }
      // If target image id was equal 2 add ten points to the player score
      else if (target.imageId === 2) {
        player.score += 10;
        target.id = 0;
        target.sound.setVolume(0.05);
        target.sound.play();
      }
      // If target image id was equal 3 add 20% to player health
      else if (target.imageId === 3) {
        target.sound.setVolume(0.05);
        target.sound.play();
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
    fill(0);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(showScore, 240, 50);
    pop();
  }

  // Display percentage of health
  displayHealth(player) {
    let health = `Health: ${player.healthPercent}%`;
    push();
    fill(0);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(health, width - 140, 50);
    pop();
  }

  // Display ball
  display(positioning) {
    push();
    imageMode(CENTER);
    // Check the step and then display the ball
    if (positioning === this.PositionInFirstStep) {
      image(this.image, this.x, this.y + 10, this.size * 2, this.size * 2);
    } else if (positioning === this.PositionInNextSteps) {
      image(this.image, this.x, this.y + 30, this.size * 2, this.size * 2);
    }
    pop();
  }
}
