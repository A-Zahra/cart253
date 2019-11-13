

class GameStructure {

  constructor(startTitleX, startTitleY, endTitleX, endTitleY) {
    this.startTitleX = startTitleX;
    this.startTitleY = startTitleY;
    this.endTitleX = endTitleX;
    this.endTitleY = endTitleY;
    this.gameName = "Real Life 2";
    this.gameOver = "Game Over!";
    this.playButton = 0;
    this.restartButton = 0;
    this.fillColor = color(25, 37, 123);

  }

  startScreenDisplay () {
    push();
    let title = this.gameName;
    fill(this.fillColor);
    textSize(70);
    textAlign(CENTER,CENTER);
    text(title, this.startTitleX, this.startTitleY);
    pop();
    this.play();
  }

  // playButton()
    //
    // Draw start button
    play() {
      // Start button rectangle properties
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

    gameOverDisplay() {
      push();
      let title = this.gameOver;
      fill(this.fillColor);
      textSize(70);
      textAlign(CENTER,CENTER);
      text(title, this.endTitleX, this.endTitleY);
      pop();
      this.restart();
    }

    // restartButton()
  //
  // Draw restart button
  restart() {
    // Restart button rectangle properties
    this.restartButton = {
      x: width / 2,
      y: height / 2 + 200,
      w: 180,
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
    rect(this.restartButton.x, this.restartButton.y, this.restartButton.w, this.restartButton.h);
    fill(255);
    textSize(this.restartButton.textSize);
    textAlign(CENTER);
    text("RESTART", this.restartButton.x, this.restartButton.y + 10);
    pop();

  }
}
