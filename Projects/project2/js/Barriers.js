// barriers
//
// A class that represents Barriers on screen.
// The barriers make the player to hesitate about his goals
// they become invisible to the player.

class Barriers {

  // constructor
  //
  //  Sets the initial values for the Barrier's properties
  // Either sets default values or uses the arguments provided
  constructor(barrier) {
    // Position, size, fill color
    this.x = barrier.x;
    this.y = barrier.y;
    this.w = barrier.w;
    this.h = barrier.h;
    this.fillColor = color(179, 81, 8);
  }

  // If the player encountered barrier, he hesitates (send true).
  lostGoal(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.w / 2 || d < this.h / 2) {
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
