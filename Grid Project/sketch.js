// Music Squares ?? or something??
// Imani Fodje
// 1/27/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [
  [0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0,],
];

let squareSize = 50;
let bgMusic;
let rows, cols;

function setup() {
  createCanvas(windowWidth, windowHeight);

  rows = grid.length;
  cols = grid[0].length;
}

function draw() {
  background(220);
  displayGrid();
  mousePressed();
}

function mousePressed() {
  let x = Math.floor(mouseX / squareSize);
  let y =  Math.floor(mouseY / squareSize);
  musicSquare();
}

function mouseReleased() {
  
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*squareSize, y*squareSize, squareSize, squareSize);
    }
  } 
}

function musicSquare(x, y) {
  if (x>= 0 && x<cols && y>= 0 && y<rows) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}
  