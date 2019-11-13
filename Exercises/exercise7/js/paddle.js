// Class will
//
//
class Paddle {

  // Constructor
  //
  // Sets the initial values for the paddle's properties
  // Either sets default values or uses the arguments provided.
  constructor( _x, _y)
  {
    this.x=_x;
    this.y=_y;
    this.paddleW=100;
    this.paddleH =40;
    this.onPaddle =true;
  }

  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}