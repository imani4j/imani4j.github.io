// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bullets = [];
let playerX; 
let playerY; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerX = width/2;
  playerY = height/2;
}

function draw() {
  background(220);
  displayPlayer();
  handleBullets();
  spawnBullets();
}

function displayPlayer() {
  fill('black');
  ellipse(playerX, playerY, 75, 75);
}

function handleBullets() {
  for (let bullet of bullets) {
    // move
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;

    // display
    fill("red");
    ellipse(bullet.x, bullet.y, bullet.radius*2, bullet.radius*2);
  }
}

function spawnBullets() {

  let xDiff = mouseX - playerX;
  let yDiff = mouseY - playerY;
  let xSpeed = map(xDiff, -width/2, width/2, )

  let bullet = {
    x: playerX,
    y: playerX,
    radius: 20,
    dx: 4,
    dy: 3,
  };
  bullets.push(bullet);

}

function mousePressed() {
  spawnBullets();
}