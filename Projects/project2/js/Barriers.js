
class Barriers {
  constructor (barrier) {
    this.x = barrier.x;
    this.y = barrier.y;
    this.w = barrier.w;
    this.h = barrier.h;
    this.fillColor = color(179, 81, 8);
    this.goalDisappeared = false;
  }
  lostGoal(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.w || d < this.h) {
      this.goalDisappeared  = true;
    }
  }
  goalInvisibility (goal) {
    if (this.goalDisappeared) {
      goal.fillColor = color(0,0,0,0);
    
    }
  }
  display() {
    push()
    fill(this.fillColor);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop()
  }
}
