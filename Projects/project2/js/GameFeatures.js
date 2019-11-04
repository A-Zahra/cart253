// GameFeatures
//
// A class that represents start, victory and end screen

class GameFeatures {
  constructor(textx, titley, descy, fillColor) {
    this.textX = textx;
    this.titleY = titley;
    this.descY = descy;
    this.fillColor = fillColor;
    this.startRectProperties = 0;
    this.RestartRectProperties = 0;
  }

  // displayStart()
  //
  // Display start screen
  displayStart() {
    push();
    let title = "GAME STORY : REAL LIFE ";
    let description = "This game is about human real life.\nAs a player you are going to follow your goals in your life.\n" +
      "Besides that You have four main priorities in your life.\nYou should take care of them while you are following your goals.\n" +
      "Otherwise, you lose the game. There are also some\nbarriers in your way that if you hit them, it slows you down.\n" +
      "The winner is the one who's been able to save more priorities and more goals. "
    "Hint: To achieve your goals there is a key that can be used to sprint (Left Player: SHIFT / Right Player: CAPS LOCK).";

    fill(this.fillColor);
    textSize(30);
    textAlign(LEFT);
    text(10);
    text(title, this.textX, this.titleY);
    textSize(25);
    text(description, this.textX, this.descY);
    pop();
    this.startButton();
  }

  // startButton()
  //
  // Draw start button
  startButton() {
    // Start button rectangle properties
    this.startRectProperties = {
      x: width / 2,
      y: height / 2 + 150,
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
    push();
    background(leftPlayer.fillColor);
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text(`Good job left player!!\nYou won the game buddy!\nNumber of goals achieved: ${leftPlayer.preyEaten}`, width / 2, height / 2);
    this.restartButton();
    pop();

  }

  // rightPlayerVictory()
  //
  // right Player victory screen
  rightPlayerVictory() {
    push();
    background(rightPlayer.fillColor);
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text(`Good job right player!!\nYou won the game buddy!\nNumber of goals achieved: ${rightPlayer.preyEaten}`, width / 2, height / 2);
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
