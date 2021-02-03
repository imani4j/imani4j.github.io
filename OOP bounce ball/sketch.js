// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");
  for (let i=0; i<ballArray.length; i++) {

    //collision check
    for (let j=0; j<ballArray.length; j++) {
      //don't check self for collision
      if (i !== j) {
        ballArray[i].collisionCheck(ballArray[j]);
      }
    }

    ballArray[i].move();
    ballArray[i].display();
  }
}

function mousePressed() {
  let theBall = new Ball(mouseX, mouseY, random(10, 40));
  ballArray.push(theBall);
}

class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius =  radius;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.someColor = color(random(255), random(255), random(255));
  }

  display() {
    noStroke();
    fill(this.someColor);
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    // bounce ball
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.dx = this.dx * -1;
    }
    // bounce ball
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.dy = this.dy * -1;
    }
  }
  collisionCheck(otherBall) {
    let sumOfRadii = this.radius + otherBall.radius;
    let ballDistance = dist(this.x, this.y, otherBall.x, otherBall.y);

    if (sumOfRadii > ballDistance) {
      //temporary
      // this.someColor = "red";
      // otherBall.someColor = "red";

      let tempdx = this.dx;
      let tempdy = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = tempdx;
      otherBall.dy = tempdy;
    }
  }
}