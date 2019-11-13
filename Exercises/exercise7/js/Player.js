// class Logic
//
//
class Player {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.isJumping =false;
    this.isFalling =false;
    this.ySpeed =4;
    this.maxJumpHeight =-15;
  }
  handleInput() {
        // jump when j is pressed
        if (keyIsDown(SHIFT)) {
          player.maxJumpHeight += -1;
          player.ySpeed += 0.1;
          console.log("JUMP")
          //player.isJumping =true;
        }
        else if (keyIsDown(CONTROL)){
          player.maxJumpHeight = -15;
          player.ySpeed = 4;
        }
  }

  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}
