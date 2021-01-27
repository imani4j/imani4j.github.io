// 12 grid neighbours
// Imani Fodje
// 1/26/2021

const GRIDSIZE = 40;

let rows, cols, cellWidth, cellHeight, grid;
let bgMusic;
let autoTurn = false;
// let clickSound;

function preload() {
  bgMusic = loadSound("assets/riseofspirit.mp3");
  // clickSound = loadSound("assets/Coin01.aif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.loop();

  grid = createEmptyGrid(GRIDSIZE, GRIDSIZE);
  rows = grid.length;
  cols = grid[0].length;

  cellWidth = width / cols;
  cellHeight = height / rows;
}

function draw() {
  background(220);
  autoTurnIfRequired();
  displayGrid();
}

function autoTurnIfRequired() {
  if (autoTurn && frameCount % 20 === 0) {
    updateBoard();
  }
}

function mousePressed() {
  // clickSound.play();
  let x = Math.floor(mouseX / cellWidth);
  let y =  Math.floor(mouseY / cellHeight);

  toggleCell(x, y);
  // toggleCell(x, y-1);
  // toggleCell(x, y+1);
  // toggleCell(x-1, y);
  // toggleCell(x+1, y);
}

function toggleCell(x, y) {
  // check that the coordinates are in the array
  if (x>= 0 && x<cols && y>= 0 && y<rows) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}

function displayGrid() {
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      if (grid[y][x] === 0) {
        fill(148, 229, 255);
      }
      if (grid[y][x] === 1) {
        fill(255, 174, 148);
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createEmptyGrid(cols, rows) {
  let empty = [];
  for (let y=0; y<rows; y++) {
    empty.push([]);
    for (let x=0; x<cols; x++) {
      empty[y].push(0);
    }
  }
  return empty;
}

function createRandomGrid(cols, rows) {
  let empty = [];
  for (let y=0; y<rows; y++) {
    empty.push([]);
    for (let x=0; x<cols; x++) {
      if (random(100) < 50) {
        empty[y].push(0);
      }
      else {
        empty[y].push(1);
      }
    }
  }
  return empty;
}


function keyPressed() {
  if (key === " ") {
    updateBoard();
  }
  else if (key === "c") {
    setup();
  }
  if (key === "r") {
    grid = createRandomGrid(cols, rows);
  }
  else if (key === "a") {
    if (autoTurn === false) {
      autoTurn = true;
    }
    else if (autoTurn === true) {
      autoTurn = false;
    }
    
  }
}

function updateBoard() {
  let nextTurn = createEmptyGrid(cols, rows);
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbours = 0;
      
      // look at cells in a 3x3 grid around current cell
      for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
          // avoid falling off edge of array
          if (x + i >= 0 && x + 1 < cols && y + j >= 0 && y + j < rows) {
            neighbours += grid[y+j][x+i];
          }
        }
      }

      // remove self from neighbours count
      neighbours -= grid[y][x];

      // apply rules
      if (grid[y][x] === 0) { // currently dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] === 0;
        }
      }

      if (grid[y][x] ===1) { 
        // currently alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }

      }

    }
    
  }
  grid = nextTurn;
}