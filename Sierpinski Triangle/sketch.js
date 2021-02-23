// Sierpinksy Triangle Recursion Demo

let triangleVertices = [
  {x: 400, y: 100},
  {x: 100, y: 600},
  {x: 700, y: 600}
];
let numOfTri = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // console.log(getMidpoint(triangleVertices[0], triangleVertices[1]));
}

function draw() {
  background(220);
  sierpinski(triangleVertices, numOfTri);
}

function sierpinski(points, depth) {
  let theColors = ["blue", "red", "green", "white", "yellow", "pink", "orange", "black"];
  fill(theColors[depth]);
  noStroke();
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if (depth > 0) {
    sierpinski([points[1],
      getMidpoint(points[0], points[1]),
      getMidpoint(points[1], points[2])],
    depth - 1);

    sierpinski([points[0],
      getMidpoint(points[0], points[1]),
      getMidpoint(points[0], points[2])],
    depth - 1);

    sierpinski([points[2],
      getMidpoint(points[2], points[1]),
      getMidpoint(points[0], points[2])],
    depth - 1);
  }

}

function getMidpoint(point1, point2) {
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return {x: midX, y: midY};
}
function mousePressed() {
  if (numOfTri < 7) {
    numOfTri++;
  }
}