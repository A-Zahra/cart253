// GameFeatures
//
// A class that represents start, victory and end screen

class GameFeatures {

  // constructor
  //
  // Sets the initial values for the screen's properties
  // Either sets default values or uses the arguments provided.
  constructor(textx, titley, descy, fillColor, startScreenImages, deathSound, victorySound) {
    // Titles and description position
    this.textX = textx;
    this.introX = width - 310;
    this.titleY = titley;
    this.descY = descy;
    // Images positions and radius
    this.radius = 50;
    // Players, essentials and goals
    this.imagesx = [width - 315, width - 215, width - 350, width - 260, width - 180];
    this.imagesy = [height / 3.8, height / 2, height/ 1.1];
    this.goalsImgx = [width / 2 + 250, width - 435, width - 350, width - 265, width - 180];
    // Barrier
    this.barrierx = width - 265;
    this.barriery = height - 220;

    // Description, barrier, keys and victory screen text colors
    this.fillColor = fillColor;
    this.barrierColor = color(179, 81, 8);
    this.keysColor = color (200, 180, 120);
    this.victoryScreenBackground = color(0);

    // Add sample images to arrays
    // Specify the number of images in order to be used in for loops
    this.playersEssentialsImgs = [startScreenImages.playerLeft, startScreenImages.playerRight, startScreenImages.friends, startScreenImages.familyLeft, startScreenImages.familyRight];
    this.goalsImgs = [startScreenImages.championship, startScreenImages.education, startScreenImages.marriage, startScreenImages.toBeScientist, startScreenImages.toBeArtist];
    this.numImages = 5;

    // start and restart button objects declaration
    this.startRectProperties = 0;
    this.RestartRectProperties = 0;

    // Victory screen elements properties
    this.victory = {
      x: width / 2,
      winnery: height / 2,
      losery: height / 2 + 115,
      imagey: height / 3,
      textSize: 30,
      textColor: 255
    };

    this.angle = 0;
    // Control keys positions, sizes, number of them and names
    this.controlsx = [width / 4.1, width / 3.36, width / 3 + 30, width / 2.23, width / 2 + 5, width / 2 + 89, width / 3.36, width / 2 + 5];
    this.controlsy = [height - 60, height - 120];
    this.controlsNames = ["A", "S", "D", "LEFT", "DOWN", "RIGHT", "W", "UP"];
    this.controlsw = 60;
    this.controlsh = 40;
    this.numKeys = 6;
    // Victory and end sounds
    this.deathSound = deathSound;
    this.victorySound = victorySound;
  }

  // displayStart()
  //
  // Display start screen elements
  displayStart() {
    let title = "GAME STORY : REAL LIFE ";
    let descriptionFirstPart = "In real life, you follow your goals. You acheive them step by step and as long as\n" +
      "you are not sure one goal has been fully acheived, you might not go for the next one!\n" +
      "However, the path to reach the goals is not always easy and with no trouble. There are\n" +
      "always some barriers in front of you which makes you hesitate that whether you still want\n" +
      "to acheive them or not.Or when people around you hesitate about their goals, it may affect\n";
    let descriptionSecondPart = "you and makes you hesitate about yours. The moment hesitation comes to your mind, goals are\n" +
      "hidden from your view. At such moments, most often asking for friends help and consulting with\n" +
      "them is helpful. It helps you to get certain about your goals again. Moreover, family support can\n" +
      "always be helpful to reach what you want. Sometimes, in abscence of their support and encouragement,\n" +
      "tiredness of not acheiving even one of your goals can prevent you from achieving the other ones.\n" +
      "In real life, you most often try to acheive as much goal as possible cause this is one of the main\n" +
      " things that gives meaning to your life. So, do the same in this game to win.\n" +
      "Hint: To achieve your goals there is a key that can be used to speed up\n(Left Player: SHIFT / Right Player: CAPS LOCK).\n";
    let note = "Note: Don't play this game with your mom! There is no equal condition in this game!"
    push();
    fill(this.fillColor);
    textSize(30);
    textAlign(LEFT);
    text(10);
    text(title, this.textX, this.titleY);
    textSize(20);
    text(descriptionFirstPart, this.textX, this.descY);
    text(descriptionSecondPart, this.textX, this.descY * 1.7);
    text(note, this.textX, this.descY * 2.95);
    pop();
    this.displayElements();
    this.displayControlKeys();
    this.startButton();
  }

  // displayElements
  //
  // display sample images of players, essentials
  displayElements() {
    push();
    noStroke();
    // Barrier shape
    rectMode(CENTER);
    fill(this.barrierColor);
    rect(this.barrierx, this.barriery, this.radius * 2, this.radius);
    imageMode(CENTER);
    // Players images
    for (let i = 0; i < this.numImages - 3; i++) {
      image(this.playersEssentialsImgs[i], this.imagesx[i], this.imagesy[0], this.radius * 2, this.radius * 2);
    }
    // Essentials images
    for (let i = 2; i < this.numImages; i++) {
      image(this.playersEssentialsImgs[i], this.imagesx[i], this.imagesy[1], this.radius * 2, this.radius * 2);
    }
    for (let i = 0; i < this.numImages; i++) {
      image(this.goalsImgs[i], this.goalsImgx[i], this.imagesy[2], this.radius * 1.5, this.radius * 1.5);
    }
    pop();
    push();
    fill(this.fillColor);
    textSize(25);
    textAlign(LEFT);
    text("Players", this.introX, this.titleY);
    text("Friends and Families", this.introX - 70, this.titleY * 2.5);
    text("Barriers", this.introX, this.titleY * 3.9);
    text("Goals", this.introX, this.titleY * 5.1);
    pop();
  }

  // displayControlKeys
  //
  // display player control keys
  displayControlKeys() {
    push();
    rectMode(CENTER);
    fill(this.keysColor);
    for (let i = 0; i < this.numKeys; i++) {
      rect(this.controlsx[i], this.controlsy[0], this.controlsw, this.controlsh);
      rect(this.controlsx[i + 6], this.controlsy[1], this.controlsw, this.controlsh);
    }
    pop();
    push();
    fill(this.fillColor);
    textSize(20);
    textAlign(LEFT);
    text("Right Player Control Keys", width / 4.5, height - 170);
    text("Left Player Control Keys", width / 2 - 105, height - 170);
    textSize(15);
    textAlign(CENTER, CENTER);
    // Left, Down, Right keys
    for (let i = 0; i < this.numKeys; i += 3) {
      text(this.controlsNames[i], this.controlsx[i], this.controlsy[0]);
      text(this.controlsNames[i + 1], this.controlsx[i + 1], this.controlsy[0]);
      text(this.controlsNames[i + 2], this.controlsx[i + 2], this.controlsy[0]);
    }
    // Up keys
    for (let i = 6; i < this.numKeys + 2; i++) {
      text(this.controlsNames[i], this.controlsx[i], this.controlsy[1]);
    }
    pop();
  }

  // startButton()
  //
  // Draw start button
  startButton() {
    // Start button rectangle properties
    this.startRectProperties = {
      x: width / 7.1,
      y: height / 2 + 230,
      w: 150,
      h: 80,
      fillColor: color(35, 145, 200)
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.startRectProperties.fillColor);
    rect(this.startRectProperties.x, this.startRectProperties.y, this.startRectProperties.w, this.startRectProperties.h);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("START", this.startRectProperties.x, this.startRectProperties.y + 10);
    pop();
  }

  // leftPlayerVictory
  //
  // Left player victory screen
  leftPlayerVictory() {

    background(this.victoryScreenBackground);
    // rotateX(radians(this.angle));
    push();
    imageMode(CENTER);
    image(this.playersEssentialsImgs[0], this.victory.x, this.victory.imagey, this.radius * 4, this.radius * 4);
    fill(this.victory.textColor);
    textAlign(CENTER);
    textSize(this.victory.textSize);
    text(`Good job left player!!\nYou won the game buddy!\nNumber of goals achieved by winner: ${leftPlayer.goalGained}\n`, this.victory.x, this.victory.winnery);
    text(`Number of goals achieved by loser: ${rightPlayer.goalGained}`, this.victory.x, this.victory.losery);
    pop();
    // Victory sound
    this.victorySound.play();
    this.restartButton();
    this.angle += 0.01;
  }

  // rightPlayerVictory()
  //
  // right Player victory screen
  rightPlayerVictory() {
    background(this.victoryScreenBackground);
    push();
    imageMode(CENTER);
    image(this.playersEssentialsImgs[1], this.victory.x, this.victory.imagey, this.radius * 4, this.radius * 4);
    fill(this.victory.textColor);
    textAlign(CENTER);
    textSize(this.victory.textSize);
    text(`Good job right player!!\nYou won the game buddy!\nNumber of goals achieved by winner: ${rightPlayer.goalGained}\n`, this.victory.x, this.victory.winnery);
    text(`Number of goals achieved by loser: ${leftPlayer.goalGained}`, this.victory.x, this.victory.losery);
    pop();
    // Victory Sound
    this.victorySound.play();
    this.restartButton();
  }

  // displayEndScreen
  //
  // Display end screen
  displayEndScreen() {
    push();
    background(this.barrierColor);
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text("What kind of players are you???\nHow you could both die and not acheive even one goal??", width / 2, height / 2);
    pop();
    // If both player died, makes this sound.
    this.deathSound.play();
    this.restartButton();
  }

  // restartButton()
  //
  // Draw restart button
  restartButton() {
    // Restart button rectangle properties
    this.RestartRectProperties = {
      x: width / 2,
      y: height / 2 + 200,
      w: 180,
      h: 100,
      fillColor: color(35, 145, 200)
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.RestartRectProperties.fillColor);
    rect(this.RestartRectProperties.x, this.RestartRectProperties.y, this.RestartRectProperties.w, this.RestartRectProperties.h);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("RESTART", this.RestartRectProperties.x, this.RestartRectProperties.y + 10);
    pop();

  }
}
