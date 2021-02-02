// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theWalkers = [];
let theColours = ["red", "green", "blue", "perple", "cyan", "pink", "yellow", "white"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  background("black");
}

function draw() {
  for (let i = 0; i < theWalkers; i++) {
    theWalkers[i].move;
    theWalkers[i].display;
  }
}

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 10, 10);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      this.x += this.speed;
    }
    else if (choice > 75) {
      this.y -= this.speed;
    }
    else if (choice < 50 && choice > 25) {
      this.x -= this.speed;
    }
    else if (choice < 75 && choice > 50) {
      this.y += this.speed;
    }
  }
}

function mousePressed() {
  let someWalker = new Walker(mouseX, mouseY, random(theColours));
  theWalkers.push(someWalker);
}