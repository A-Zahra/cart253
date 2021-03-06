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
    this.size = target.radius;
    this.maxHealth = 255;
    this.targetId = target.id;
    this.targetIdTrue = 0;
    this.targetIdTrue2 = 0;
    this.targetIdTrue3 = 0;
    this.health = this.maxHealth;
    this.r = random(0.04, 1.5);
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

  // goalAchieved()
  //
  // Check whether ball overlapped the target of first row or second row or third row.
  // If so, hide the target and turn it of so that it won't be counted again.
  goalAchieved(ball) {
   let d = dist(this.x, this.y, ball.x, ball.y);
   if (d < this.size + (ball.size / 2)) {
     if ( this.targetId === 1 && this.targetIdTrue===0) {
       this.fillColor = 0;
       this.targetIdTrue = 1;
     }
     else if (this.targetId === 3 && this.targetIdTrue2===0) {
       this.fillColor = 0;
       this.targetIdTrue2 = 3;
     }
     else if (this.targetId === 5 && this.targetIdTrue3===0) {
       this.fillColor = 0;
       this.targetIdTrue3 = 5;
     }
   }
 }

  // goalAchieved(ball) {
  //   let d = dist(this.x, this.y, ball.x, ball.y);
  //   if (d < this.size + (ball.size / 3)) {
  //     if ( this.targetId === 1 && this.targetIdTrue===0) {
  //       this.fillColor = 220;
  //       this.targetIdTrue = 1;
  //     }
  //     else if (this.targetId === 3 && this.targetIdTrue === 0) {
  //       this.fillColor = 0;
  //       this.targetIdTrue = 3;
  //     }
  //     else if (this.targetId === 5 && this.targetIdTrue===0) {
  //       this.fillColor = 0;
  //       this.targetIdTrue = 5;
  //     }
  //   }
  // }

  // display()
  //
  // Display target
  display() {
      push();
      noStroke();
      fill(this.fillColor);
      ellipseMode(CENTER);
      ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
