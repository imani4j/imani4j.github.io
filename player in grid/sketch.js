// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 20;
const COLS = 20;
let grid, cellWidth, cellHeight;
let playerX = 0;
let playerY = 0;
let someMaze;
let playerIMG;

function preload(){
  someMaze = loadJSON("assets/mymaze.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid(COLS, ROWS);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  // add player to grid
  grid[playerY][playerX] = 9;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
}

function keyPressed() {
  if (key === "d" && playerX < COLS) { // dont go off screen
    movePlayer(playerX + 1, playerY, playerX, playerY);
    playerX++;
  }
  if (key === "a" && playerX > 0) { // dont go off screen
    movePlayer(playerX - 1, playerY, playerX, playerY);
    playerX--;
  }
  if (key === "s" && playerY < ROWS) { // dont go off screen
    movePlayer(playerX, playerY + 1, playerX, playerY);
    playerY++;
  }
  if (key === "w" && playerY > 0) { // dont go off screen
    movePlayer(playerX, playerY - 1, playerX, playerY);
    playerY--;
  }
}

function movePlayer(x, y, oldX, oldY) {
  if (x >= 0  && x < COLS && y>= 0 && y < ROWS) {
    grid[y][x] = 9; // new player location
    grid[oldY][oldX] = 0; // remove player from old spot
  }
}

function displayGrid() {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x]=== 0) {
        fill("white");
      }
      else if (grid[y][x]=== 1) {
        fill("black");
      }
      else if (grid[y][x]=== 9) {
        fill("red");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createEmptyGrid() {
  let empty = [];
  for (let y = 0; y < ROWS; y++) {
    empty.push([]);
    for (let x = 0; x < COLS; x++) {
      empty[y].push(0);
    }
  }
  return empty;
}
