// Barrier
//
//
class BarrierStraight {

  // Constructor
  //
  // Sets the initial values for the barrier's properties
  // Either sets default values or uses the arguments provided.
  constructor( _x, _y)
  {
    this.x=_x;
    this.y=_y;
    this.plW=60;
    this.plH =20;
  }

   display()
  {
    fill(255,76,39);
    rectMode(CORNER);
    rect(this.x,this.y,this.plW,this.plH);
  }

}
