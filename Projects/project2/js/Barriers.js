
class Barriers {
  constructor (barrier) {
    this.x = barrier.x;
    this.y = barrier.y;
    this.w = barrier.w;
    this.h = barrier.h;
    this.fillColor = color(179, 81, 8);
  }

  display() {
    push()
    fill(this.fillColor);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop()
  }
}
