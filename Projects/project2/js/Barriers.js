// barriers
//
// A class that represents Barriers on screen.
// The barrier makes the player to hesitate about his goals.
// It becomes invisible to the player.

class Barriers {

  // constructor
  //
  //  Sets the initial values for the Barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor(barrier) {
    // Position, size, fill color
    this.x = barrier.x;
    this.y = barrier.y;
    this.w = barrier.w;
    this.h = barrier.h;
    this.fillColor = color(179, 81, 8);
    // If player overlapped barrier, makes this sound.
    this.sound = 0;
  }

  // lostGoal
  //
  // If player overlapped barrier, goals become invisible (send true).
  lostGoal(player, sound) {
    let d = dist(this.x, this.y, player.x, player.y);
    this.sound = sound;
    if (d < this.w && d < this.h) {
      // this.sound.currentTime = 0;
      this.sound.play();
      return true;
    }
    return false;
  }

  // Display
  //
  // Draw the barrier as an image on the canvas.
  display() {
    push()
    fill(this.fillColor);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop()
  }
}
