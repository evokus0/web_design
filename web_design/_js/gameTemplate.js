//sources
// https://eloquentjavascript.net/code/chapter/17_canvas.js
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event

//initializing global variables to create a canvas
// used to alter and initialize the canvas
let canvasDiv;
let canvas;
let ctx;
let initialized = false;

// setup mouse position variables
// just intiilizes the variables (sets to 0), does not move the mouse
let mouseX = 0;
let mouseY = 0;
// objects, not a variables
let mousePos = {
  x: 0,
  y: 0
};
let mouseClicks = {
  x: 0,
  y: 0
};
let mouseClickX = 0;
let mouseClickY = 0;

// Everything else depends on this running
// Change the global variables
// sets up the canvas attributes
// creates a new div inside the document. Takes the HTML document and created a div, id = chuck
function init() {
  // create a new div element
  canvasDiv = document.createElement("div");
  canvasDiv.id = "chuck";
  // and give it some content (creates the canvas)
  // storing "canvas" inside div "canvas"
  canvas = document.createElement('canvas');
  // add the text node to the newly created div
  // code writing code
  canvasDiv.appendChild(canvas);
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(canvasDiv, currentDiv);
  canvas.width = 500;
  canvas.height = 500;
  // gets "chuck" and changes it to the dimensions of the canvas
  document.getElementById("chuck").style.width = canvas.width + 'px';
  document.getElementById("chuck").style.height = canvas.height + 'px';
  // ctx = context, thing that lets us draw on the canvas
  ctx = canvas.getContext('2d');
  initialized = true;
}

// create an object to hold attributes in order to draw a shape on canvas
// square object, sets the dimensions
let mySquare = {
  w: 50,
  h: 50,
  x: 150,
  y: 200,
  // comments not here...
  vx: 0.1,
  vy: 0.1,
  color: 'black'
};

// gets mouse position when clicked
// records the mouse position
// event listener - built in thing call back function
// Arrow function [=>] passes entire function in to e by the computer as its read.
addEventListener('mousemove', e => {
  // global variables being changed
  mouseX = e.offsetX;
  mouseY = e.offsetY;
  // we're gonna use this later
  mousePos = {
    x: mouseX,
    y: mouseY
  };
});

// gets mouse position when clicked
// could make it ana arrow function
addEventListener('mousedown', mouseClick);

function mouseClick(e) {
  console.log(`Screen X/Y: ${e.screenX}, ${e.screenY}, Client X/Y: ${e.clientX}, ${e.clientY}`);
  mouseClickX = e.clientX;
  mouseClickY = e.clientY;
  mouseClicks = {
    x: mouseClickX,
    y: mouseClickY
  };
}

// collision detection
// What objects have X positions [the box, the mouse]
function collide(a, b) {
  if (a.x <= b.x &&
    b.x <= a.x + a.w &&
    a.y <= b.y &&
    b.y <= a.y + a.h
  ) {
    console.log('collided');
    return true;
  }
}

// updates all elements on canvas
function update(mod) {
  if (collide(mySquare, mousePos)) {
    mySquare.color = 'red';
  }

  mySquare.x += mySquare.vx * mod;
  mySquare.y += mySquare.vy * mod;
  if (mySquare.x + mySquare.w >= canvas.width || mySquare.x <= 0) {
    mySquare.vx *= -1;
    mySquare.color = 'blue';
  }
  if (mySquare.y + mySquare.h >= canvas.height || mySquare.y <= 0) {
    mySquare.vy *= -1;
    mySquare.color = 'green';
  }
}

// draws text on canvas
function drawText(color, font, align, base, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = base;
  ctx.fillText(text, x, y);
}

// draws a square, circle, or rectangle
function drawSquare() {
  ctx.fillStyle = mySquare.color;
  ctx.fillRect(mySquare.x, mySquare.y, mySquare.w, mySquare.h);
  ctx.strokeRect(mySquare.x, mySquare.y, mySquare.w, mySquare.h);
}

// function drawCircle() {
//   ctx.fillStyle = myCircle.color;
//   ctx.beginPath();
//   ctx.arc(myCircle.x, myCircle.y, myCircle.r, 0, 2 * Math.PI);
//   ctx.stroke();
//   ctx.fill();
// }

// draws all the stuff on the canvas that you want to draw
function draw() {
  // clears the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText('black', "24px Helvetica", "left", "top", "FPS: " + fps, 400, 0);
  drawText('black', "24px Helvetica", "left", "top", "Delta: " + gDelta, 400, 32);
  drawText('black', "24px Helvetica", "left", "top", "mousepos: " + mouseX + " " + mouseY, 0, 0);
  drawText('black', "24px Helvetica", "left", "top", "mouseclick: " + mouseClickX + " " + mouseClickY, 0, 32);
  drawSquare();
}

// set variables necessary for game loop
let fps;
let now;
let delta;
let gDelta;
let then = performance.now();

//main game loop
function main() {
  now = performance.now();
  delta = now - then;
  gDelta = (Math.min(delta, 17));
  fps = Math.ceil(1000 / gDelta);
  if (initialized) {
    update(gDelta);
    draw();
  }
  then = now;
  requestAnimationFrame(main);
}