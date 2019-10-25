// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

/////////////////////////
// ~10 ERRORS IN HERE
/////////////////////////
// Edited wrong dictation of class. Replaced 'g' with 'c'.
class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  // Edited wrong dictation of 'y'. Erased 'w' and 'h'.
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    // Missing one 'e' letter. I added one.
    this.speed = speed;
    // Time properties for noise() function
    // Defining meaningless random function. I change the second value from 0 to 1000.
    this.tx = random(0, 1000); // To make x and y noise different
    // Again defining meaningless random function. I change the second value from 0 to 1000.
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  // Having an extra "r" at the end of 'move' word. Removing the letter of "r" from the end of this word.
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    // Wrong dictation of the word "wrapping". I modified it.
    this.handleWrapping();
  // The move method is missing the ending brace. I added one.
  }

    // handleWrapping
    //
    // Checks if the prey has gone off the canvas and
    // wraps it to the other side if so
    handleWrapping() {
      // Off the left or right
      // Using wrong sign. It should be if this.x < 0 in order for making the method works. So, I replaced ">" with "<".
      if (this.x < 0) {
        this.x += width;
      }
      else if (this.x > width) {
        this.x -= width;
      }
      // Off the top or bottom
      if (this.y < 0) {
        this.y += height;
      }
      else if (this.y > height) {
        // Missing the letter "e". I added one.
        this.y -= height;
      }
    }

    // display
    //
    // Draw the prey as an ellipse on the canvas
    // with a radius the same size as its current health.
    display() {
      push();
      noStroke();
      fill(this.fillColor);
      this.radius = this.health;
      // Wrong way of multiplicatin. I replaced the string with a number.
      ellipse(this.x, this.y, this.radius * 2);
      pop();
    }

    // reset
    //
    // Set the position to a random location and reset health
    // and radius back to default
    reset() {
      // Random position
      this.x = random(0, width);
      this.y = random(0, height);
      // Default health
      this.health = this.maxHealth;
      // Default radius
      this.radius = this.health;
    }
  }
