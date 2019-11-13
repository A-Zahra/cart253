// class Straight
//
//
class PaddleStraight extends Paddle{

  constructor(x, y){
    super(x, y);
  }

  display()
 {
   fill(255);
   rectMode(CORNER);
   rect(this.x,this.y,this.paddleW,this.paddleH);
 }

 //function to check if player collides with paddle.
  collidesWithPlayer(p)
 {
   if(p.x > this.x && p.x< this.x+this.paddleW
   && p.y +(p.size/2)> this.y &&  p.y - (p.size/2)< this.y+this.paddleH)
   {
     return true;
   }
   return false;
 }
}
