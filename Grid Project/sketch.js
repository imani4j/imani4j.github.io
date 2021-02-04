// Sokoban
// Imani Fodje
// 1/27/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//  for moving boxes: if key is right {
// if grid[y][x+1] === 2 {
// move player and box
// }
// }

let grid;
let rows = 20;
let cols = 20;
let cellWidth, cellHeight;
let playerX = 0;
let playerY = 0;

//  puzzles
let lvl0, lvl1, lvl2, lvl3, lvl4, lvl5;



function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid(cols, rows);
  cellWidth = width / cols;
  cellHeight = height / rows;
  grid[playerY][playerX] = 3;
}

function draw() {
  background(220);
  displayGrid();
  movePlayer();
}

// class Boxes {
//   conductor() {

//   }
// }

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 2) {
        fill("white");
      }
      else if (grid[y][x] === 3) {
        fill("red");
      }
      else if (grid[y][x] === 4) {
        fill("blue");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
    
  }
}



function createEmptyGrid() {
  let empty = [];
  for (let y = 0; y < rows; y++) {
    empty.push([]);
    for (let x = 0; x < cols; x++) {
      empty[y].push(0);
    }
  }
  return empty;
}

function movePlayer(x, y, oldX, oldY, direction) {
  if (x >= 0  && x < cols && y >= 0 && y < rows && grid[y][x] !== 1) {
    // let oldNum = grid[y][x];
    grid[y][x] = 3; // new player location
    grid[oldY][oldX] = 0; // remove player from old spot
    
    if (direction === "right") {
      playerX++;
    }
    if (direction === "left") {
      playerX--;
    }
    if (direction === "up") {
      playerY--;
    }
    if (direction === "down") {
      playerY++;
    }
  }
}

function keyPressed() {
  if (key === "d" && playerX < cols) {
    movePlayer(playerX + 1, playerY, playerX, playerY, "right");
  }
  if (key === "a" && playerX > 0) {
    movePlayer(playerX - 1, playerY, playerX, playerY, "left");
  }
  if (key === "w" && playerY > 0) {
    movePlayer(playerX, playerY - 1, playerX, playerY, "up");
  }
  if (key === "s" && playerY < rows) {
    movePlayer(playerX, playerY + 1, playerX, playerY, "down");
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1) {
    grid[y][x] = 2;
  }
  else if (grid[y][x] === 2) {
    grid[y][x] = 4;
  }
  else if (grid[y][x] === 4) {
    grid[y][x] = 0;
  }
}