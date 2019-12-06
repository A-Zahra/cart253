// Game structure
//
// A class that represents game start and end screen
class GameStructure {

  // Constructor
  //
  // Sets the initial values for the game's start and end screen properties
  // Either sets default values or uses the arguments provided.
  constructor(startTitleX, startTitleY, endTitleX, endTitleY, paddleImg, ballImg, orangeBarrier, redBarrier, brownBarrier, mouse, spaceKey, controlKey, plug, outlet) {
    this.startTitleX = startTitleX;
    this.startTitleY = startTitleY;
    this.instructionX = 100;
    this.instructionY = 100;
    this.storyX = width/ 2;
    this.storyY = height / 4;
    this.storyOtherPartX = width/ 2;
    this.storyOtherPartY = height / 4;
    this.endTitleX = endTitleX;
    this.endTitleY = endTitleY;
    this.gameName = "GAME OF LIFE!";
    this.gameOver = "Game Over!";
    this.victory = "HOORAY, YOU DID IT BUDDY!";
    this.victoryTextSize = 10;
    this.gameStory = "GAME STORY";
    this.playButton = 0;
    this.restartButton = 0;
    this.fillColor = color(0, 0, 0);
    this.instFillColor = color(0,	0, 0);
    this.transitionFillColor = color(0,	0, 0);
    this.paddleImg = paddleImg;
    this.ballImg = ballImg;
    this.redBarrier = redBarrier;
    this.orangeBarrier = orangeBarrier;
    this.brownBarrier = brownBarrier;
    this.mouse = mouse;
    this.controlKey = controlKey;
    this.spaceKey = spaceKey;
    this.plug = plug;
    this.outlet = outlet;
    this.playerImgY = 130;
    this.playerImgX = (width / 2) + 350;
    this.winned = 0;
    this.failed = 0;
    this.plugX = (width / 2) - 300;
    this.plugY = (height / 2) + 100;
    this.plugSize = 80;
    this.outletX = (width / 2) + 300;
    this.outletY = (height / 2) + 100;
    this.outletSize = 80;
    this.score = 0;
    this.healthPercent = 100;
    this.ballOpacity = 255;

    // will be replaced with the original instruction once game programming is finished.
    this.startInstuction = "1. Everytime to start the game click on the paddle. Paddle moves with mouse\n" +
    "2. Always keep your mouse over the paddle\n3. Press SPACE to make higher jumps\n" +
    "4. Don't keep SPACE pressed (I am sure you won't like the result!)\n" + "4. Press Ctrl to reset jump height\n" +
    "5. If you Keep Ctrl pressed, ball sticks to the paddle (Might be needed!)\n" + "6. Use the experience you gain in first and second step\n" +
    "Otherwise you won't be able to win the game!\n" + "7. Use your jump power wisely, otherwise it hurts you more than helping you!";

      // "2. Click to make the ball jump. Press SPACE key to jump higher and CTRL key to reset jump height";
    this.hint = "1. Be careful of the barriers. not all them act the same!\n" +
                 "2. In first step stay away from the play area top border to not stick to it!\n" +
                 "3. First step has been design for you to get trained and know \nhow to play the game. Make best use of it!";

    this.storyPart1 = "From childhood to death, the most important thing that we are all time trying to achieve is their goals.\n" +
                      "The extent to which those goals are important to us changes as we grow up. The motive force of us in life\n" +
                      "to achieve our goals is the extent of our will. However, the proper guidance and use of this force is a\n" +
                      "prerequisite to achieve our goals. Most often, the best place, to learn how to control this power is school.\n" +
                      "We learn how to prioritize our goals and learn the extent of effort we make to achieve them should differ\n" +
                      "based on their importance.  That is, too much effort for small goals will result in exhaustion and too little\n" +
                      "effort leads to failure.\n" +
                      "By taking the first step, our goals become more realistic to us and we get one step closer to them!";

    this.storyPart2 = "As we grow up, our goals and their importance grow and become more serious.\n" +
                      "Naturally, goals that are more valuable to us When we achieve them, we feel more satisfied\n " +
                      "and successful than goals that are more material to us. At the same time, the goals we achieve\n" +
                      "at this stage of our lives can serve as the basis for larger goals. Like education\n" +
                      "that leads us to work in our field of interest. Meanwhile, As goals grow more, the path to achieve\n" +
                      "them become harder and more complex. We always have to be aware of barriers that are in our way.\n" +
                      "They may exhaust us to the extent that we give up in the halfway!";

    this.storyPart3 = "After achieving our basic goals, such as gaining knowledge or work, it's time to pursue\n" +
                      "the great goals of life like any other person. But we should remember that there are always big obstacles\n" +
                      "in the way of achieving great goals. Obstacles that can sometimes, completely change our view of our purpose.\n" +
                      "Or can be big enough to deter us from achieving our goal. In the meantime, Perhaps the only thing that can\n" +
                      "encourage us to keep trying to achieve our big dreams, is the support we can get from the family!";

  }

  // Displays start screen
  startScreenDisplay() {
    push();
    let title = this.gameName;
    fill(this.fillColor);
    textSize(20);
    textAlign(CENTER, CENTER);
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
    rectMode(CENTER, CENTER);
    fill(this.playButton.fillColor);
    rect(this.playButton.x, this.playButton.y, this.playButton.w, this.playButton.h, this.playButton.tl, this.playButton.tr, this.playButton.br, this.playButton.bl);
    fill(255);
    textSize(this.playButton.textSize);
    textAlign(CENTER, CENTER);
    text("PLAY", this.playButton.x, this.playButton.y);
    pop();
  }

  // Display instructions
  displayInstruction() {
    push();
    let instructionTitle = "INSTRUCTION";
    let hintTitle = "Hint";
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
    push();
    fill(0);
    textAlign(LEFT);
    textSize(20);
    text("Paddle", this.playerImgX - 150, this.playerImgY);
    text("Ball", this.playerImgX + 150, this.playerImgY);
    imageMode(CENTER);
    image(this.paddleImg, this.playerImgX, this.playerImgY, 100, 100);
    image(this.ballImg, this.playerImgX + 250, this.playerImgY, 70, 70);

    text("Health Reduction Barrier", this.playerImgX - 350, this.playerImgY + 120);
    text("Touched Barrier", this.playerImgX - 100, this.playerImgY + 120);
    text("Barrier that changes view angle", this.playerImgX + 70, this.playerImgY + 120);
    imageMode(CENTER);
    image(this.orangeBarrier, this.playerImgX - 240, this.playerImgY + 180, 140, 70);
    image(this.redBarrier, this.playerImgX - 28, this.playerImgY + 180, 140, 70);
    image(this.brownBarrier, this.playerImgX + 210, this.playerImgY + 180, 140, 70);

    text("Left click on paddle to start", this.playerImgX + 100, this.playerImgY + 310);
    image(this.mouse, this.playerImgX + 220, (this.playerImgY + 440), 200, 200);

    text("Press Ctrl to reset jump height", this.playerImgX - 350, this.playerImgY + 310);
    image(this.controlKey, this.playerImgX - 220, (this.playerImgY + 370), 100, 100);
    text("Press Space to jump higher", this.playerImgX - 350, this.playerImgY + 455);
    image(this.spaceKey, this.playerImgX - 227, (this.playerImgY + 510), 250, 250);
    pop();
    this.next();
  }

  displayStory() {
    push();
    let title = this.gameStory;
    fill(this.fillColor);
    textAlign(CENTER, CENTER);
    textSize(35);
    text(title, this.storyX, this.storyY);
    textSize(20);
    textLeading(35);
    text(this.storyPart1, this.storyX, this.storyY + 200);
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
    rectMode(CENTER, CENTER);
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
    text(recorder, width / 2, 50);
    pop();
  }

  // Display the screen that connects layers to each other.
  // This screen would either congradulates the player victory and send him to next step
  // or asks him to play again.
  TransitionScreenDisplay(message, result, turn) {
    push();
    let title = message;
    fill(this.transitionFillColor);
    textSize(40);
    textAlign(CENTER);
    text(title, this.storyOtherPartX, this.storyOtherPartY);
    pop();
    // If player won
    if (result) {
      this.winned = true;
      push();
      fill(this.transitionFillColor);
      textAlign(CENTER);
      textSize(20);
      textLeading(35);
      if (turn === 1) {
          text(this.storyPart2, this.storyOtherPartX, this.storyOtherPartY + 100);
      }
      else if (turn === 2) {
            text(this.storyPart3, this.storyOtherPartX, this.storyOtherPartY + 100);
      }
      pop();
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
      w: 150,
      h: 80,
      tl: 15,
      tr: 15,
      bl: 15,
      br: 15,
      textSize: 25,
      fillColor: color(255, 64, 99)
    }
    push();
    noStroke();
    rectMode(CENTER, CENTER);
    fill(this.continueButton.fillColor);
    rect(this.continueButton.x, this.continueButton.y, this.continueButton.w, this.continueButton.h, this.continueButton.tl, this.continueButton.tr, this.continueButton.br, this.continueButton.bl);
    fill(255);
    textSize(this.continueButton.textSize);
    textAlign(CENTER, CENTER);
    let message = 0;
    if (this.winned) {
      message = "Continue";
    } else if (!this.failed) {
      message = "Play Again";
    }
    text(message, this.continueButton.x, this.continueButton.y);
    pop();
  }

  // The screen which is displayed between the two screens of rotated and not rotated
  // and warns the player about what awaits them.
  displayWarningScreen() {
    background(0);
    let warningMessage = "There is always something to prevent you from reaching to your goal or disapoint you!\n" +
                          "it may affect your point of view but cannot stop you from trying!";
    push();
    fill(255);
    textSize(25);
    textLeading(35);
    textAlign(CENTER, CENTER);
    text(warningMessage, width / 2, height / 2 - 100);
    pop();
    // Show timer
    push();
    fill(100, 255, 140);
    imageMode(CENTER);
    image(this.plug, this.plugX, this.plugY, this.plugSize, this.plugSize);
    fill(250, 100, 255);
    image(this.outlet, this.outletX, this.outletY, this.outletSize, this.outletSize);
    pop();
    // Add to x position
    this.plugX += 3;
  }

  // To specify a certain amount of time for the player to read the message
  timeToRead(warning, rotated) {
    let plugOutletDist = 100;
    // If time is over, shows next screen
    if (dist(this.plugX, this.plugY, this.outletX, this.outletY) < plugOutletDist) {
      warning = false;
      rotated = true;
    }
  }

  // Displays victory screen
  victoryDisplay() {
    push();
    let title = this.victory;
    fill(255);
    textSize(this.victoryTextSize);
    textAlign(CENTER, CENTER);
    text(title, this.endTitleX, this.endTitleY);
    pop();
    this.restart();
  }
  updateVictoryTextSize() {
    if (this.victoryTextSize < 70) {
      this.victoryTextSize++;
    }
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
      x: 200,
      y: height - 100,
      w: 150,
      h: 80,
      tl: 15,
      tr: 15,
      bl: 15,
      br: 15,
      textSize: 25,
      fillColor: color(255, 64, 99)
    }
    push();
    noStroke();
    rectMode(CENTER, CENTER);
    fill(this.restartButton.fillColor);
    rect(this.restartButton.x, this.restartButton.y, this.restartButton.w, this.restartButton.h, this.restartButton.tl, this.restartButton.tr, this.restartButton.br, this.restartButton.bl);
    fill(255);
    textSize(this.restartButton.textSize);
    textAlign(CENTER, CENTER);
    text("RESTART", this.restartButton.x, this.restartButton.y);
    pop();
  }
}
