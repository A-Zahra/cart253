// Game structure
//
// A class that represents all screens excluding the steps
class GameStructure {

  // Constructor
  //
  // Sets the initial values for the game's start and end screen properties
  // Either sets default values or uses the arguments provided.
  constructor(startTitleX, startTitleY, endTitleX, endTitleY, paddleImg, ballImg, orangeBarrier, redBarrier, brownBarrier, mouse, spaceKey, controlKey, plug, outlet) {

    // Sets positions and sizes
    this.startTitleX = startTitleX;
    this.startTitleY = startTitleY;
    this.instructionX = 90;
    this.instructionY = 100;
    this.hintX = (width / 2) + 130;
    this.hintY = (height / 2) + 215;
    this.storyX = width / 2;
    this.storyY = height / 4;
    this.storyOtherPartX = width / 2;
    this.storyOtherPartY = height / 4;
    this.endTitleX = endTitleX;
    this.endTitleY = endTitleY;
    this.victoryTextSize = 10;
    this.textSizeLimit = 70;
    this.playerImgY = 80;
    this.playerImgX = (width - 170);
    this.plugX = (width / 2) - 300;
    this.plugY = (height / 2) + 100;
    this.plugSize = 80;
    this.outletX = (width / 2) + 300;
    this.outletY = (height / 2) + 100;
    this.outletSize = 80;

    // Assigns game different screen names
    this.gameName = "GAME OF LIFE!";
    this.gameOver = "Game Over!";
    this.victory = "CONGRADULATION!!\nYOU WON THE GAME!!";
    this.gameStory = "GAME STORY";

    // Elements properties values
    this.playButton = 0;
    this.restartButton = 0;

    // Checks if it has to display winning screen or failure screen
    this.winned = 0;
    this.failed = 0;

    // Elements colors
    this.fillColor = color(0, 0, 0);
    this.instFillColor = color(0, 0, 0);
    this.transitionFillColor = color(0, 0, 0);

    // Records player score + health percentage
    this.score = 0;
    this.healthPercent = 100;
    this.ballOpacity = 255;

    // Import images
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

    // Instruction
    this.startInstuction = "1. Everytime to start the game click on the paddle. Paddle moves with mouse\n" +
      "2. Always keep your mouse over the paddle\n3. Press SPACE to make higher jumps\n" +
      "4. Don't keep SPACE pressed (I am sure you won't like the result!)\n" + "4. Press Ctrl to reset jump height\n" +
      "5. If you Keep Ctrl pressed, ball sticks to the paddle (Might be needed!)\n" + "6. Use the experience you gain in first and second step\n" +
      "Otherwise you won't be able to win the game!\n" + "7. Use your jump power wisely, otherwise it hurts you more than helping you!\n" +
      "8. From the second step, the goals are divided into two groups:\n" + "Less valuable goals like bicycle or a house and\n" +
      "More valuable goals like graduation or having a baby\n" + "9. The first group of goals worth for 5 points and the second group for 10\n" +
      "10. In third step you have the family as well. Every time\nthat the ball overlaps family your health is retrieved by 20%";

    // Hints
    this.hint = "1. Be careful of barriers. not all of them act the same!\n" +
      "2. In 1st and 2nd steps stay away from the play-area top border to not stick to it!\n" +
      "3. First step has been design for you to get trained and \nknow how to play the game. Make best use of it!";

    // Game story first part
    this.storyPart1 = "From childhood to death, the most important thing that we are all time trying to achieve is our goals.\n" +
      "The extent to which those goals are important to us changes as we grow up. The motive force of us in life\n" +
      "to achieve our goals is the extent of our will. However, the proper guidance and use of this force is a\n" +
      "prerequisite to achieve our goals. Most often, the best place, to learn how to control this power is school.\n" +
      "We learn how to prioritize our purposes and learn the extent of effort we make to achieve them should differ\n" +
      "based on their importance. That is, too much effort for small goals will result in exhaustion and too little\n" +
      "effort leads to failure.\n" +
      "By taking the first step, our goals become more realistic to us and we get one step closer to them!\n\n" +
      "How to win this step: Gain 7 goals out of first row, 6 out of second row and five out of last row.";
    // Game story second part
    this.storyPart2 = "As we grow up, our goals and their importance grow and become more serious.\n" +
      "Naturally, goals that are more valuable to us When we achieve them, we feel more satisfied\n " +
      "and successful than goals that are more material to us. At the same time, the goals we achieve\n" +
      "at this stage of our lives can serve as the basis for the larger ones. Like education\n" +
      "that leads us to work in our field of interest. Meanwhile, As goals grow more, the path to achieve\n" +
      "them become harder and more complex. We always have to be aware of barriers that are in our way.\n" +
      "They may exhaust us to the extent that we give up in the halfway!\n\n" +
      "How to win this step: Gain more than fifty points to win.";
    // Game story third part
    this.storyPart3 = "After achieving our basic goals, such as gaining knowledge or work, it's time to pursue\n" +
      "the great goals of life like any other person. But we should remember that there are always big obstacles\n" +
      "in the way of achieving great goals. Obstacles that can sometimes, completely change our view of our purpose.\n" +
      "Or can be big enough to deter us from achieving them. In the meantime, Perhaps one of the thing that can\n" +
      "encourage us to keep trying to achieve our big dreams, is the support we can get from the family!\n\n" +
      "How to win this step: Gain more than 60 points to win.";
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
    let hintTitle = "HINT";
    fill(this.instFillColor);
    textAlign(LEFT);
    textSize(30);
    text(instructionTitle, this.instructionX, this.instructionY);
    textSize(25);
    text(hintTitle, this.hintX, this.hintY);
    textSize(17);
    textLeading(30);
    text(this.startInstuction, this.instructionX, this.instructionY + 50);
    text(this.hint, this.hintX, this.hintY + 40);
    pop();
    push();
    fill(0);
    textAlign(LEFT);
    textSize(17);
    text("Paddle", this.playerImgX, this.playerImgY);
    text("Ball", this.playerImgX - 170, this.playerImgY);
    // Ball and paddle
    imageMode(CENTER);
    image(this.paddleImg, this.playerImgX + 25, this.playerImgY + 55, 70, 70);
    image(this.ballImg, this.playerImgX - 155, this.playerImgY + 55, 50, 50);
    // Barriers
    text("Health Reduction Barrier", this.playerImgX - 480, this.playerImgY);
    text("Touched Barrier", this.playerImgX - 480, this.playerImgY + 140);
    text("Barrier that changes view angle", this.playerImgX - 480, this.playerImgY + 250);
    imageMode(CENTER);
    image(this.orangeBarrier, this.playerImgX - 430, this.playerImgY + 50, 100, 40);
    image(this.redBarrier, this.playerImgX - 430, this.playerImgY + 190, 100, 40);
    image(this.brownBarrier, this.playerImgX - 430, this.playerImgY + 300, 100, 40);
    // Mouse
    text("Left click on paddle to start", this.playerImgX - 155, this.playerImgY + 140);
    image(this.mouse, this.playerImgX - 50, (this.playerImgY + 250), 160, 160);
    // Keyboard keys
    text("Press Ctrl to reset jump height", this.playerImgX - 480, this.playerImgY + 360);
    image(this.controlKey, this.playerImgX - 430, (this.playerImgY + 420), 100, 100);
    text("Press Space to jump higher", this.playerImgX - 160, this.playerImgY + 360);
    image(this.spaceKey, this.playerImgX - 60, (this.playerImgY + 420), 250, 250);
    pop();
    this.next();
  }

  // Display game story
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
    strokeWeight(7);
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
      } else if (turn === 2) {
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
  continue () {
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
    // If he won
    if (this.winned) {
      message = "Continue";
    }
    // If he failed
    else if (!this.failed) {
      message = "Play Again";
    }
    text(message, this.continueButton.x, this.continueButton.y);
    pop();
  }

  // The screen which is displayed between the two screens of rotated and not rotated
  // and warns the player about what awaits him.
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
    this.plugX += 2.5;
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

  // Update size of victory screen message
  updateVictoryTextSize() {
    if (this.victoryTextSize < this.textSizeLimit) {
      this.victoryTextSize += 1.5;
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
