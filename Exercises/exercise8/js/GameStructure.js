// Game structure
//
// A class that represents game start and end screen
class GameStructure {

  // Constructor
  //
  // Sets the initial values for the game's start and end screen properties
  // Either sets default values or uses the arguments provided.
  constructor(startTitleX, startTitleY, endTitleX, endTitleY) {
    this.startTitleX = startTitleX;
    this.startTitleY = startTitleY;
    this.endTitleX = endTitleX;
    this.endTitleY = endTitleY;
    this.gameName = "Game of life!";
    this.gameOver = "Game Over!";
    this.playButton = 0;
    this.restartButton = 0;
    this.fillColor = color(0, 0, 0);
    this.winned = 0;
    this.failed = 0;
  }

  // Displays start screen
  startScreenDisplay() {
    push();
    let title = this.gameName;
    fill(this.fillColor);
    textSize(70);
    textAlign(CENTER, CENTER);
    text(title, this.startTitleX, this.startTitleY);
    pop();
    this.play();
  }

  // Draw play button
  // (Borrowed from my second project)
  play() {
    // play button properties
    this.playButton = {
      x: width / 2,
      y: height / 2 + 50,
      w: 150,
      h: 80,
      tl: 15,
      tr: 15,
      bl: 15,
      br: 15,
      textSize: 35,
      fillColor: color(255, 64, 99)
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.playButton.fillColor);
    rect(this.playButton.x, this.playButton.y, this.playButton.w, this.playButton.h, this.playButton.tl, this.playButton.tr, this.playButton.br, this.playButton.bl);
    fill(255);
    textSize(this.playButton.textSize);
    textAlign(CENTER);
    text("PLAY", this.playButton.x, this.playButton.y + 10);
    pop();
  }

  // Defines a specific play area for the paddle.
  playArea() {
    push();
    strokeWeight(5);
    stroke(123, 47, 186, 255);
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2 + 290, width, 160);
    pop();
  }

  // Track number of targets achieved
  targetTracker(numTarget) {
    push();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    let recorder = `Number of Target Acheived: ${numTarget}`;
    text(recorder, 170, 50);
    console.log("came");
    pop();
  }

  // Display the screen that connects layers to each other.
  // This screen would either congradulates the player victory and send him to next step
  // or asks him to play again.
  TransitionScreenDisplay(message, result) {
    push();
    let title = message;
    fill(this.fillColor);
    textSize(70);
    textAlign(CENTER, CENTER);
    text(title, this.startTitleX, this.startTitleY);
    pop();
    // If player won
    if (result) {
      this.winned = true;
      this.next();
    }
    // If he failed
    else {
      this.failed = false;
      this.next();
    }
  }

  // Draw next button
  next() {
    // next button properties
    this.nextButton = {
      x: width / 2,
      y: height / 2 + 100,
      w: 210,
      h: 80,
      tl: 15,
      tr: 15,
      bl: 15,
      br: 15,
      textSize: 35,
      fillColor: color(255, 64, 99)
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.nextButton.fillColor);
    rect(this.nextButton.x, this.nextButton.y, this.nextButton.w, this.nextButton.h, this.nextButton.tl, this.nextButton.tr, this.nextButton.br, this.nextButton.bl);
    fill(255);
    textSize(this.nextButton.textSize);
    textAlign(CENTER);
    let message = 0;
    if (this.winned) {
      message = "Next Step";
    } else if (!this.failed) {
      message = "Play Again";
    }
    text(message, this.nextButton.x, this.nextButton.y + 10);
    pop();
  }

  // Displays game over screen
  gameOverDisplay() {
    push();
    let title = this.gameOver;
    fill(255);
    textSize(70);
    textAlign(CENTER, CENTER);
    text(title, this.endTitleX, this.endTitleY);
    pop();
    this.restart();
  }

  // Draw restart button
  // (Borrowed from my second project)
  restart() {
    // Restart button properties
    this.restartButton = {
      x: width / 2,
      y: height / 2 + 50,
      w: 200,
      h: 100,
      tl: 15,
      tr: 15,
      bl: 15,
      br: 15,
      textSize: 35,
      fillColor: color(255, 64, 99)
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.restartButton.fillColor);
    rect(this.restartButton.x, this.restartButton.y, this.restartButton.w, this.restartButton.h, this.restartButton.tl, this.restartButton.tr, this.restartButton.br, this.restartButton.bl);
    fill(255);
    textSize(this.restartButton.textSize);
    textAlign(CENTER);
    text("RESTART", this.restartButton.x, this.restartButton.y + 10);
    pop();
  }
}
