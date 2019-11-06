// GameFeatures
//
// A class that represents start, victory and end screen

class GameFeatures {
  constructor(textx, titley, descy, fillColor, leftPlayerImg, rightPlayerImg, friends, familyLeft, familyRight) {
    // Title and description position
    this.textX = textx;
    this.introX = width - 320;
    this.titleY = titley;
    this.descY = descy;
    // Images positions and radius
    this.radius = 50;
    // Players
    this.leftImgx = width - 315;
    this.rightImgx = width - 215;
    this.imgy = height / 3.2;
    // Essentials
    this.friendsFamilyY = height / 1.8;
    this.friendsX = width - 350;
    this.familyLeftX = width - 260;
    this.familyRightX = width - 180;
    // Barrier
    this.barrierx = width - 265;
    this.barriery = height - 150;

    // Description and barrier color
    this.fillColor = fillColor;
    this.barrierColor = color(179, 81, 8);
    // Transfer sample images
    this.leftPlayerImg = leftPlayerImg;
    this.rightPlayerImg = rightPlayerImg;
    this.friends = friends;
    this.familyLeft = familyLeft;
    this.familyRight = familyRight;
    // start and restart button properties objects declaration
    this.startRectProperties = 0;
    this.RestartRectProperties = 0;

    this.angle = 0;
  }

  // displayStart()
  //
  // Display start screen
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
                              "always be helpful to reach what you want, otherwise tiredness of not acheiving even one of your\n"+
                              "goals can prevent you from achieving the other ones. In real life, you most often try to acheive\n" +
                              "as much goal as possible cause this is one of the main things that gives meaning to your life.\n" +
                              "So, do the same in this game to win.\n" +
                              "Hint: To achieve your goals there is a key that can be used to speed up\n(Left Player: SHIFT / Right Player: CAPS LOCK).\n";
    let note = "Note: Don't play this game with your mom! There is no equal condition in this game!"
  push();
    noStroke();
    // Barrier shape
    rectMode(CENTER);
    fill(this.barrierColor);
    rect(this.barrierx, this.barriery, this.radius * 2, this.radius);
    console.log(this.barrierColor);
    imageMode(CENTER);
    // Players images
    image(this.leftPlayerImg, this.leftImgx, this.imgy, this.radius * 2, this.radius * 2);
    image(this.rightPlayerImg, this.rightImgx, this.imgy, this.radius * 2, this.radius * 2);
    // Success essentials images
    image(this.friends, this.friendsX, this.friendsFamilyY, this.radius * 2, this.radius * 2);
    image(this.familyLeft, this.familyLeftX, this.friendsFamilyY, this.radius * 2, this.radius * 2);
    image(this.familyRight, this.familyRightX, this.friendsFamilyY, this.radius * 2, this.radius * 2);

  pop();
  push();
    fill(this.fillColor);
    textSize(30);
    textAlign(LEFT);
    text(10);
    text(title, this.textX, this.titleY);
    textSize(20);
    text(descriptionFirstPart, this.textX, this.descY);
    text(descriptionSecondPart, this.textX , this.descY * 1.63);
    text(note, this.textX, this.descY * 2.76);
    textSize(30);
    textAlign(LEFT);
    text(10);
    text("Players", this.introX, this.titleY);
    text("Friends and Families", this.introX - 85, this.titleY * 2.3);
    text("Barriers", this.introX , this.titleY * 3.5);
  pop();
    this.startButton();
  }

  // startButton()
  //
  // Draw start button
  startButton() {
    // Start button rectangle properties
    this.startRectProperties = {
      x: width / 3,
      y: height / 2 + 250,
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
    background(255);
    // push();

    // rotateX(radians(this.angle));
    imageMode(CENTER);
    image(this.leftPlayerImg, width / 2, height / 3, this.radius * 4, this.radius * 4);
    // pop()
    push();
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text(`Good job left player!!\nYou won the game buddy!\nNumber of goals achieved: ${leftPlayer.goalGained}`, width / 2, height / 2);
    this.restartButton();
    pop();
    this.angle += 0.01;
  }

  // rightPlayerVictory()
  //
  // right Player victory screen
  rightPlayerVictory() {

    push();
    background(255);
    imageMode(CENTER);
    image(this.rightPlayerImg, width / 2, height / 3, this.radius * 4, this.radius * 4);
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text(`Good job right player!!\nYou won the game buddy!\nNumber of goals achieved: ${rightPlayer.goalGained}`, width / 2, height / 2);
    this.restartButton();
    pop();
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
    this.restartButton();
    pop();
  }
  // restartButton()
  //
  // Draw restart button
  restartButton() {
    // Restart button rectangle properties
    this.RestartRectProperties = {
      x: width / 2,
      y: height / 2 + 170,
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
