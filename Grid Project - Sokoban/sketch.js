// Sokoban
// Imani Fodje
// 1/27/2021
//
// Extra for Experts:
// I made the sprites myself
// this probably doesnt count as extra for experts, but:
// The whole entire loadJSON thing got really weird at the end. Even though the json file was there, it wouldn't work.
// All of the empty arrays I was trying to add to would end up undefined.
// also Im very bad at creating puzzles. Level design is hard

//  for moving boxes: if key is right {
// if grid[y][x+1] === 2 {
// move player and thebox
// }
// }

// glabal variables
let grid;
let rows = 20;
let cols = 20;
let cellWidth, cellHeight;
let playerX = 3;
let playerY = 4;

// objects + arrays

const OBJECT_TYPE = {
  empty: 0,
  obstacle: 1,
  box: 2,
  player: 3,
  goal: 4
};

let player = {x: playerX, y: playerY, kind: OBJECT_TYPE.player, onTop: 0};
let boxes = [];
let obstacles = [];
let goals = [];

//  assets
let firstPlayerImg, wall, ground, goal, firstBox;
//  puzzles
let currentLevel = 1;

// preloading assets
function preload() {
  firstPlayerImg = loadImage("assets/player.png");
  wall = loadImage("assets/wall.png");
  ground = loadImage("assets/floor.png");
  goal = loadImage("assets/goal.png");
  firstBox = loadImage("assets/box.png");
  
}

function setup() {
  let size = min(windowWidth, windowHeight);
  createCanvas(size, size);
  document.addEventListener("contextmenu", event => event.preventDefault());
  grid = createEmptyGrid(cols, rows);
  loadJSON(`assets/level-${currentLevel}.json`, loadLevel); //loads level
  cellWidth = width / cols;
  cellHeight = height / rows;
}

function draw() {
  background(220);
  displayGrid();
}

// displays grid
function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OBJECT_TYPE.empty) {
        image(ground, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === OBJECT_TYPE.obstacle) {
        image(wall, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === OBJECT_TYPE.box) {
        image(firstBox, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === OBJECT_TYPE.player) {
        image(firstPlayerImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === OBJECT_TYPE.goal) {
        image(goal, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
    }
    
  }
}

function clearGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = OBJECT_TYPE.empty;
      image(ground, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function checkWin() { // checks to see if you've completed the level
  let numberOfBoxesDone = 0;
  for (let i=0; i<boxes.length; i++) {
    if (boxes[i].onTop === OBJECT_TYPE.goal) {
      numberOfBoxesDone++;
    }
  }
  if (numberOfBoxesDone === goals.length) {
    console.log("You win!");
    if (currentLevel < 3) {
      currentLevel++;
      loadJSON(`assets/level-${currentLevel}.json`, loadLevel);
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

function drawObject(object) {
  grid[object.y][object.x] = object.kind;
}

function clearObject(object) {
  grid[object.y][object.x] = object.onTop;
  object.onTop = OBJECT_TYPE.empty;
}

function moveObject(object, direction) {
  // responsible for moving all the objects
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
  
  spotValue = grid[object.y][object.x]; // records value of spot before object moves to it
  drawObject(object);
  object.onTop = spotValue; // sets object's onTop to the spotValue. that way the spot can change back when they move off
  
}

function canMove(object, direction) {
  // checks to see if player can move
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
  
  if  (grid[object.y+yOff][object.x+xOff] === OBJECT_TYPE.empty || grid[object.y+yOff][object.x+xOff] === OBJECT_TYPE.goal) {
    return true;
  }
  else {
    return false;
  }
}

function checkBox(direction) {
  // checks to see if the player is moving into a box or not
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

  if (grid[player.y+yOff][player.x+xOff] === OBJECT_TYPE.box) {
    let i = 0;
    while (i < boxes.length) {
      if (boxes[i].y === player.y+yOff && boxes[i].x === player.x+xOff) {
        thebox = boxes[i];
        break;
      }
      i++;
    }
  } 
  return thebox;
}
      
function pushBox(thebox, direction) {
  if (canMove(thebox, direction)) {
    moveObject(thebox, direction);
    moveObject(player, direction);
    if (thebox.onTop === OBJECT_TYPE.goal) {
      checkWin();
    }
  }
}



function keyPressed() {
  // controls
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
  // This was used to test and create levels. I've kept it so you can mess around with it
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
      for (let i=0; i<boxes.length; i++) {
        if (boxes[i].x === x && boxes[i].y === y) {
          boxes.splice(i, 1);
          break;
        }
      }
      goals.push(obj);
      drawObject(obj);
    }
    else if (grid[y][x] === 4) {
      for (let i=0; i<goals.length; i++) {
        if (goals[i].x === x && goals[i].y === y) {
          goals.splice(i, 1);
          break;
        }
      }
      boxes.push(obj);
      drawObject(obj);
    }
  }
}

function loadLevel(level) {
  // takes the objects saved in the JSON files and draws them
  boxes = level.boxes;
  goals = level.goals;
  obstacles = level.obstacles;
  player = level.player;
  clearGrid();
  for (const box of boxes) {
    drawObject(box);
  }
  for (const obstacle of obstacles) {
    drawObject(obstacle);
  }
  for (const goal of goals) {
    drawObject(goal);
  }
  drawObject(player);
}

function saveLevel(number) {
  // was used to save levels
  let level = {
    boxes: boxes,
    goals: goals,
    obstacles: obstacles,
    player: player,
  };
  saveJSON(level, "level-" + number);
}
