// SecondStepTarget
//
// A class that represents second and third step targets
class SecondStepTarget {
  
  // Constructor
  //
  // Sets the initial values for the target's properties
  // Either sets default values or uses the arguments provided.
  constructor(target) {
    this.x = target.x;
    this.y = target.y;
    this.size = target.radius;
    this.vx = 2;
    this.id = 1;
    this.moreValuable = target.image2;
    this.lessValuable = target.image1;
    this.imageId = target.imageId;
    this.support = target.support;
    this.sound = target.sound;
  }

  // Update target x position
  updatePosition() {
    this.handleWrapping();
    this.x += this.vx;
  }

  // Make the target to wrap around the screen
  handleWrapping() {
    // Check if target went off screen
    if (this.x > width + 50) {
      // If so, set x position to -50 and id to 1 so that it would be shown and could be counted again.
      this.x = -50;
      this.id = 1;
    }
  }

  // Display target
  display() {
    push();
    // Show targets images based on their Id
    imageMode(CENTER);
    if (this.imageId === 1) {
      image(this.lessValuable, this.x, this.y, this.size, this.size);
    } else if (this.imageId === 2) {
      image(this.moreValuable, this.x, this.y, this.size, this.size);
    } else if (this.imageId === 3) {
      image(this.support, this.x, this.y, this.size, this.size);
    }
    pop();
  }
}
