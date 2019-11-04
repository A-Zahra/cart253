// barriers
//
// A class that represents Barriers on screen.
// There are two kinds of barriers. The first kind makes
// the player to hesitate about his goals. The second one makes the player
// to rush to acheive his goals.

class Barriers {

  // constructor
  //
  //  Sets the initial values for the Barrier's properties
  // Either sets default values or uses the arguments provided
  constructor(barrier) {
    // Position, size, fill color
    // A boolean object to check if the goals disappeared.
    this.x = barrier.x;
    this.y = barrier.y;
    this.w = barrier.w;
    this.h = barrier.h;
    this.fillColor = color(179, 81, 8);
    this.hesitation = false;
  }

  // If the player encountered barrier, he hesitates.
  lostGoal(barrier) {
    let d = dist(this.x, this.y, barrier.x, barrier.y);
    if (d < this.w || d < this.h) {
      this.hesitation = true;
    }
  }
  // If he hesitated, goals get invisible to him.
  goalInvisibility(goal) {
    if (this.hesitation) {
      goal.fillColor = color(0, 0, 0, 0);

    }
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
