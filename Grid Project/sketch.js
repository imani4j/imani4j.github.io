// Sokoban
// Imani Fodje
// 1/27/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//  for moving boxes: if key is right {
// if grid[y][x+1] === 2 {
// move player and thebox
// }
// }
    
let grid;
let rows = 20;
let cols = 20;
let cellWidth, cellHeight;
let playerX = 0;
let playerY = 0;

let player = {x: 0, y: 0, kind: 3, onTop: 0};
let boxes = [];
let obstacles = [];
let goals = [];
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

}


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
        fill("brown");
      }
      else if (grid[y][x] === 3) {
        fill("red");
      }
      else if (grid[y][x] === 4) {
        fill("LightBlue");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
    
  }
}

function doYouWin() {
  let numberOfBoxesDone = 0;
  for (let i=0; i<boxes.length+1; i++) {
    if (boxes[i].onTop === 4) {
      numberOfBoxesDone++;
    }
  }
  if (numberOfBoxesDone === boxes.length) {
    console.log("you win yay");
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

function drawObject(object) {
  grid[object.y][object.x] = object.kind;
}

function clearObject(object) {
  grid[object.y][object.x] = object.onTop;
  object.onTop = 0;
}

function moveObject(object, direction) {
  let xOff = 0;
  let yOff = 0;
  let spotValue = 0;
  if (direction === "right") {
    xOff = 1;
  }
  else if (direction === "left") {
    xOff = -1;
  }
  else if (direction === "up") {
    yOff = -1;
  }
  else if (direction === "down") {
    yOff = 1;
  }

  clearObject(object);
  
  object.x += xOff;
  object.y += yOff;
  
  spotValue = grid[object.y][object.x];
  drawObject(object);
  object.onTop = spotValue;
  
}

function canMove(object, direction) {
  let xOff = 0;
  let yOff = 0;
  
  if (direction === "right") {
    xOff = 1;
  }
  else if (direction === "left") {
    xOff = -1;
  }
  else if (direction === "up") {
    yOff = -1;
  }
  else if (direction === "down") {
    yOff = 1;
  }
  
  if  (grid[object.y+yOff][object.x+xOff] === 0 || grid[object.y+yOff][object.x+xOff] === 4) {
    return true;
  }
  else {
    return false;
  }
}

function checkBox(direction) {
  let thebox = null;
  let xOff = 0;
  let yOff = 0;
  if (direction === "right") {
    xOff = 1;
  }
  else if (direction === "left") {
    xOff = -1;
  }
  else if (direction === "up") {
    yOff = -1;
  }
  else if (direction === "down") {
    yOff = 1;
  }

  if (grid[player.y+yOff][player.x+xOff] === 2) {
    console.log("found box");
    let i = 0;
    while (i < boxes.length) {
      if (boxes[i].y === player.y+yOff && boxes[i].x === player.x+xOff) {
        thebox = boxes[i];
        console.log(thebox);
        break;
      }
      i++;
    }
  } 
  return thebox;
}

// function movePlayer1(x, y, oldX, oldY, direction) {
//   if (x >= 0  && x < cols && y >= 0 && y < rows && grid[y][x] !== 1) {
//     // let oldNum = grid[y][x];

//     if (direction === "right") {
//       if (grid[y][x+1] === 2 && grid[y][x+2] !== 1) {
//         grid[y][x+2] = 2;
//         grid[y][x+1] = 0;
//         playerX++;
//       }
//       else if (grid[y][x+1] !== 2) {
//         playerX++;
//       }
//     }
//     if (direction === "left") {
//       playerX--;
//     }
//     if (direction === "up") {
//       playerY--;
//     }
//     if (direction === "down") {
//       playerY++;
//     }
//     grid[y][x] = 3; // new player location
//     grid[oldY][oldX] = 0; // remove player from old spot
//   }
// }
        
function pushBox(thebox, direction) {
  if (canMove(thebox, direction)) {
    moveObject(thebox, direction);
    moveObject(player, direction);
  }
}



function keyPressed() {
  let theDirection;
  if (key === "d") {
    theDirection = "right";
  }
  if (key === "a") {
    theDirection = "left";
  }
  if (key === "w") {
    theDirection = "up";
  }
  if (key === "s") {
    theDirection = "down";
  }
  
  if (canMove(player, theDirection)) {
    moveObject(player,theDirection);
  }
  else {
    let thebox = checkBox(theDirection);
    if (thebox !== null) {
      pushBox(thebox,theDirection);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  let obj;

  if (mouseButton === LEFT) {
    obj = {x: x, y: y, kind: 1};
    obstacles.push(obj);
    drawObject(obj);
  }
  else if (mouseButton === RIGHT) {
    obj = {x: x, y: y, kind: 2, onTop: 0};
    if (grid[y][x] === 0) {
      boxes.push(obj);
      drawObject(obj);
    }
    else if (grid[y][x] === 2) {
      obj = {x: x, y: y, kind: 4};
      boxes.splice(boxes.length+1, 1);
      goals.push(obj);
      drawObject(obj);
    }
    else if (grid[y][x] === 4) {
      goals.splice(goals.length+1, 1);
      boxes.push(obj);
      drawObject(obj);
    }
  }
  
}