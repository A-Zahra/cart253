/*****************

Title of Project: Mrs.Sindy
Author Name: Zahra Ahmadi

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
// Description of preload
function preload() {

}
// setup()
// Description of setup
function setup() {
  createCanvas(500,500);
  background(50,135,90);

  // Body
  ellipseMode(CENTER);
  fill(50,70,150);
  noStroke();
  ellipse(250,550,270,300);
  stroke(0,0,0);
  strokeWeight(2);
  line(250,415,250,550);

  // RightSide lines
  line(230,414,230,550);
  line(210,413,210,550);
  line(190,422,190,550);
  line(170,435,170,550);
  line(150,455,150,550);

  // Leftside lines
  line(270,414,270,550);
  line(290,413,290,550);
  line(310,422,310,550);
  line(330,435,330,550);
  line(350,455,350,550);

  // Face
  ellipseMode(CENTER);
  fill("#ffe0bd");
  noStroke();
  ellipse(250,250,250,320);

  // Hair circles
  ellipseMode(CORNER);

  // left side of hair
  fill("#673410");
  ellipse(210,25,160,160);
  fill("#834200");
  ellipse(210,35,140,140);
  fill("#964b00");
  ellipse(210,45,120,120);

  // Right side of hair
  ellipse(98,25,200,200);
  fill("#A4550A");
  ellipse(118,35,180,180);
  fill("#b5651d");
  ellipse(138,45,160,160);

  // Outer eyes
  ellipseMode(CENTER);
  fill(0,0,0);
  ellipse(200,250,30,30);
  ellipse(300,250,30,30);

  // Inner eyes
  fill(255,255,255);
  ellipse(202,250,10,10);
  ellipse(298,250,10,10);

  // Glasses
  fill(169,169,169,130);
  stroke(254,127,156);
  strokeWeight(2);
  ellipse(200,250,90,90);
  ellipse(300,250,90,90);

  rectMode(CENTER);
  fill(254,127,156);
  rect(250,250,20,10);

  // Cheeks
  fill(255,0,0,35);
  noStroke();
  ellipse(180,305,60,60);
  ellipse(320,305,60,60);

  // Nose
  fill(207,111,97);
  triangle(235, 320, 250, 280, 265, 320);

  // Lips
  ellipseMode(CENTER);
  fill(255,0,0);
  noStroke();
  ellipse(250,350,50,10);

  // Earings
  rectMode(CENTER);
  fill(220,215,80);
  noStroke();
  rect(130,325, 10,50);
  rect(370,325,10,50);

  // Top part of Earings
  fill(50,70,150);
  ellipse(130,300,25,25);
  ellipse(370,300,25,25);
}
// draw()
// Description of draw()
function draw() {

}
