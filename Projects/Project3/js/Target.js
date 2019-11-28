// Target
//
// A class that represents targets.
class Target {

  // Constructor
  //
  // Sets the initial values for the target's properties
  // Either sets default values or uses the arguments provided.
  constructor(target) {
    this.x = target.x;
    this.y = target.y;
    this.fillColor = target.fillColor;
    this.score = 0;
  }

  // updateHealth
  //
  // Updates target health
  // I keep this code cause I might want to use it again.
  // updateHealth() {
  //   // Reduce player health
  //   this.health = this.health - this.r;
  //   // Constrain the result to a sensible range
  //   this.health = constrain(this.health, 0, this.maxHealth);
  // }

  // Display target
  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}
