// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];
let coloR = [173, 204];
let colorG = [216, 202, 230, 201];
let colorB = [230, 255];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // runs spawnBubble every half second
  window.setInterval(spawnBubble, 500);
}

setInterval;

function draw() {
  background(220);
  for (let i = theBubbles.length - 1; i>=0; i--) {
    if (theBubbles[i].isPopped) {
      theBubbles.splice(i, 1);
    }
    else {
      theBubbles[i].move();
      theBubbles[i].display();
    }
  }
}

function spawnBubble() {
  let someBubble = new Bubble();
  theBubbles.push(someBubble);
}

class Bubble {
  constructor() {
    this.x = random(width);
    this.y = height + 100;
    this.dx = 0;
    this.dy = -3;
    this.radius = random(20, 40);
    this.theta = 0;
    this.isAlive = true;
    this.whenIDied = 0;
    this.waitTime = 1000;
    this.isPopped = false;
    this.r = random(coloR);
    this.g = random(colorG);
    this.b = random(colorB);
  }

  move() {
    if (this.y - this.radius > 0) {
      this.y += this.dy;
      this.x += this.dx;
      
      this.dx = map(noise(this.theta), 0, 1, -5, 5);
      this.theta += 0.01;
    }
    // when it hits the top
    else if (this.isAlive) {
      this.isAlive = false;
      this.whenIDied = millis();
    }
    // stuck on the top
    else {
      if (millis() > this.whenIDied + this.waitTime) {
        this.isPopped = true;
      }
    }
    
  }
  display() {
    if (!this.isPopped) {
      stroke("white");
      fill(this.r, this.g, this.b, 200);
      ellipse(this.x, this.y, this.radius*2, this.radius*2);
    }
  }
}
