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
    this.fillColor = color(25, 37, 123);

  }

  // startScreenDisplay
  //
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

  // Defines a specific play area for the paddle.
  playArea() {
    push();
    strokeWeight(5);
    stroke(123, 47, 186, 255);
    noFill();
    rectMode(CENTER);
    rect(width/2, height / 2 + 290, width, 160);
    pop();
  }
  // playButton()
  //
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
      fillColor: color(35, 145, 200)
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
  //gameOverDisplay
  //
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

  // restartButton()
  //
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
      fillColor: color(35, 145, 200)
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
