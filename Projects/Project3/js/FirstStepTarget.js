// Target
//
// A class that represents targets.
class FirstStepTarget extends Target {
// Constructor
//
// Sets the initial values for the target's properties
// Either sets default values or uses the arguments provided.
constructor(target) {
  super(target);
  this.maxHealth = 255;
  this.targetId = target.id;
  this.targetIdTrue = 0;
  this.targetIdTrue2 = 0;
  this.targetIdTrue3 = 0;
  this.health = this.maxHealth;
  this.r = random(0.04, 1.5);
}

// goalAchieved()
//
// Check whether ball overlapped the target of first row, second row or third row.
// If so, hide this target and assign the same id number to targetIdTrue that the target has
goalAchieved(ball) {
  let d = dist(this.x, this.y, ball.x, ball.y);
  if (d < this.size + (ball.size / 2)) {
    if (this.targetId === 1 && this.targetIdTrue === 0) {
      this.fillColor = 0;
      this.targetIdTrue = 1;
      console.log("test");
    } else if (this.targetId === 3 && this.targetIdTrue === 0) {
      this.fillColor = 0;
      this.targetIdTrue = 3;
    } else if (this.targetId === 5 && this.targetIdTrue === 0) {
      this.fillColor = 0;
      this.targetIdTrue = 5;
    }
  }
}

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
