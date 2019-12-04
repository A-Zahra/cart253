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
    this.instructionX = 100;
    this.instructionY = 100;
    this.endTitleX = endTitleX;
    this.endTitleY = endTitleY;
    this.gameName = "GAME OF LIFE!";
    this.gameOver = "Game Over!";
    this.victory = "HOHO, YOU DID IT BUDDY!";
    this.playButton = 0;
    this.restartButton = 0;
    this.fillColor = color(0, 0, 0);
    this.instFillColor = color(0,	134, 120);
    this.transitionFillColor = color(0,	134, 120);
    this.winned = 0;
    this.failed = 0;
    this.timeCubeX = (width / 2) - 300;
    this.timeCubeY = (height / 2) + 100;
    this.timeLimitX = width / 2 + 300;
    this.timeLimitY = (height / 2) + 100;
    this.score = 0;
    this.healthPercent = 100;
    this.ballOpacity = 255;
    // This instruction was added only for the prototype purpose and
    // will be replaced with the original instruction once game programming is finished.
    this.startInstuction = "1. Everytime to start the game click on the paddle. Paddle moves with mouse\n" +
    "2. Always keep your mouse over the paddle\n3. Press SPACE to make higher jumps\n" +
    "4. Don't keep SPACE pressed (I am sure you won't like the result!)\n" + "4. Press Ctrl to reset jump height\n" +
    "5. If you Keep Ctrl pressed, ball sticks to the paddle (Might be needed!)\n" + "6. Use the experience you gain in first and second step\n" +
    "Otherwise you won't be able to win the game!\n" + "7. Use your jump power wisely, otherwise it hurts you more than helping you!";
    // 1. Hit 7 of first row targets, 6 of second row and 5 of third row\n" +
      // "2. Click to make the ball jump. Press SPACE key to jump higher and CTRL key to reset jump height";
    this.hint = "1. Be careful of the barriers. not all them act the same!\n" +
                 "2. In first step stay away from the play area top border to not stick to it!\n" +
                 "3. First step has been design for you to get trained and know \nhow to play the game. Make best use of it!";
  }

  // Displays start screen
  startScreenDisplay() {
    push();
    let title = this.gameName;
    fill(this.fillColor);
    textSize(20);
    textAlign(CENTER, CENTER);
    // textLeading(35);
    // text(this.startInstuction, this.startTitleX, this.startTitleY - 100);
    textSize(70);
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

  // Display instructions
  displayInstruction() {
    push();
    let instructionTitle = "INSTRUCTION";
    let hintTitle = "Hint"
    fill(this.instFillColor);
    textAlign(LEFT);
    textSize(30);
    text(instructionTitle, this.instructionX, this.instructionY);
    text(hintTitle, this.instructionX, this.instructionY * 4.5);
    textSize(17);
    textLeading(30);
    text(this.startInstuction, this.instructionX, this.instructionY + 50);
    text(this.hint, this.instructionX, (this.instructionY * 5));
    pop();
    this.next();
  }

  // Draw next button
  next() {
    // next button properties
    this.nextButton = {
      x: 150,
      y: height / 2 + 300,
      w: 120,
      h: 50,
      tl: 15,
      tr: 15,
      bl: 15,
      br: 15,
      textSize: 25,
      fillColor: color(255, 64, 99)
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.nextButton.fillColor);
    rect(this.nextButton.x, this.nextButton.y, this.nextButton.w, this.nextButton.h, this.nextButton.tl, this.nextButton.tr, this.nextButton.br, this.nextButton.bl);
    fill(255);
    textSize(this.nextButton.textSize);
    textAlign(CENTER, CENTER);
    text("Next", this.nextButton.x, this.nextButton.y);
    pop();
  }

  // Defines a specific play area for the paddle.
  playArea() {
    push();
    strokeWeight(10);
    stroke(123, 47, 186, 255);
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2 + 290, width, 160);
    pop();
  }

  // Track number of targets achieved
  targetTracker(numTarget) {
    push();
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    let recorder = `Number of Target Acheived: ${numTarget}`;
    text(recorder, 170, 50);
    //  console.log("came");
    pop();
  }

  // Display the screen that connects layers to each other.
  // This screen would either congradulates the player victory and send him to next step
  // or asks him to play again.
  TransitionScreenDisplay(message, result) {
    push();
    let title = message;
    fill(this.transitionFillColor);
    textSize(70);
    textAlign(CENTER, CENTER);
    text(title, this.startTitleX, this.startTitleY);
    textSize(20);
    // textLeading(32);
    // text(this.noteForProf, this.startTitleX, this.startTitleY + 85);
    pop();
    // If player won
    if (result) {
      this.winned = true;
      this.continue();
    }
    // If he failed
    else {
      this.failed = false;
      this.continue();
    }
  }

  // Draw continue button
  continue() {
    // continue button properties
    this.continueButton = {
      x: 200,
      y: height - 100,
      w: 200,
      h: 70,
      tl: 15,
      tr: 15,
      bl: 15,
      br: 15,
      textSize: 27,
      fillColor: color(255, 64, 99)
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.continueButton.fillColor);
    rect(this.continueButton.x, this.continueButton.y, this.continueButton.w, this.continueButton.h, this.continueButton.tl, this.continueButton.tr, this.continueButton.br, this.continueButton.bl);
    fill(255);
    textSize(this.continueButton.textSize);
    textAlign(CENTER);
    let message = 0;
    if (this.winned) {
      message = "Continue";
    } else if (!this.failed) {
      message = "Play Again";
    }
    text(message, this.continueButton.x, this.continueButton.y + 10);
    pop();
  }

  // The screen which is displayed between the two screens of rotated and not rotated
  // and warns the player about what awaits them.
  displayWarningScreen() {
    background(0);
    let warningMessage = "You might choose the wrong way to achieve your goal\n But no worries! Although your point of view has changed,\n don't lose your hope, you can still do it";
    push();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(warningMessage, width / 2, height / 2 - 100);
    pop();
    // Show timer
    push();
    fill(100, 255, 140);
    rectMode(CENTER);
    rect(this.timeCubeX, this.timeCubeY, 50, 50);
    fill(250, 100, 255);
    rect(this.timeLimitX, this.timeLimitY, 50, 50);
    pop();
    // Add to x position
    this.timeCubeX += 3;
  }

  // To specify a certain amount of time for the player to read the message
  timeToRead(warning, rotated) {
    // If time is over, shows next screen
    if (dist(this.timeCubeX, this.timeCubeY, this.timeLimitX, this.timeLimitY) < 100) {
      warning = false;
      rotated = true;
    }
  }

  // Displays victory screen
  victoryDisplay() {
    push();
    let title = this.victory;
    fill(255);
    textSize(70);
    textAlign(CENTER, CENTER);
    text(title, this.endTitleX, this.endTitleY);
    pop();
    this.restart();
  }

  //updateHealth
  //
  //Updates target health
  // I keep this code cause I might want to use it again.
  // updateHealth() {
  //   // Reduce player health
  //   this.health = this.health - this.r;
  //   // Constrain the result to a sensible range
  //   this.health = constrain(this.health, 0, this.maxHealth);
  // }


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
      x: 200,
      y: height - 100,
      w: 200,
      h: 75,
      tl: 15,
      tr: 15,
      bl: 15,
      br: 15,
      textSize: 27,
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
