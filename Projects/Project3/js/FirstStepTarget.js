// Target
//
// A class that represents first step targets.
class FirstStepTarget {
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
    this.image = target.image;
    this.sound = target.sound;
  }

  // goalAchieved()
  //
  // Check whether ball overlapped the target of first row, second row or third row.
  // If so, hide this target and assign the same id number to targetIdTrue that the target has
  // Hide it and play the sound
  goalAchieved(ball) {
    let d = dist(this.x, this.y, ball.x, ball.y);
    if (d < this.size / 2) {
      if (this.targetId === 1 && this.targetIdTrue === 0) {
        this.sound.setVolume(0.05);
        this.sound.play();
        this.targetIdTrue = 1;
      } else if (this.targetId === 3 && this.targetIdTrue === 0) {
        this.sound.setVolume(0.05);
        this.sound.play();
        this.targetIdTrue = 3;
      } else if (this.targetId === 5 && this.targetIdTrue === 0) {
        this.sound.setVolume(0.05);
        this.sound.play();
        this.targetIdTrue = 5;
      }
    }
  }

  // Display target
  display() {
    if (this.targetIdTrue === 0) {
      push();
      noStroke();
      fill(this.fillColor);
      imageMode(CENTER);
      image(this.image, this.x, this.y, this.size, this.size);
      pop();
    }
  }
}
