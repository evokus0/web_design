//sources
// https://eloquentjavascript.net/code/chapter/17_canvas.js

//initializing GLOBAL variables to create a canvas
let canvasDiv;
let canvas;
let ctx;
let WIDTH = 750;
let HEIGHT= 750;

//container array for mobs/enemies
let evil_mobs = [];
let food_mobs = [];
let SCORE = 0
let ROUND = 0

// lets us know if game is initialized
let initialized = false;

// creating object with keys pressed

let keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.key] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.key];
}, false);


function init() {
  // create a new div element
  canvasDiv = document.createElement("div");
  canvasDiv.id = "chuck";
  // and give it some content
  canvas = document.createElement('canvas');
  // add the text node to the newly created div
  canvasDiv.appendChild(canvas);
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(canvasDiv, currentDiv);
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  document.getElementById("chuck").style.width = canvas.width + 'px';
  document.getElementById("chuck").style.height = canvas.height + 'px';
  ctx = canvas.getContext('2d');
  initialized = true;
}

class Sprite {
  constructor(w, h, x, y, c) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.color = c;
    this.spliced = false;
    }
    inbounds(){
      if (this.x + this.w < WIDTH &&
          this.x > 0 &&
          this.y > 0 &&
          this.y + this.h < HEIGHT){
        return true;
      }
      else{
        return false;
      }
    }
    collide(obj) {
      if (this.x <= obj.x + obj.w &&
        obj.x <= this.x + this.w &&
        this.y <= obj.y + obj.h &&
        obj.y <= this.y + this.h
      ) {
        return true;
      }
    }
}

class Player extends Sprite {
  constructor(w, h, x, y, c, vx, vy) {
  super(w, h, x, y, c);
  this.vx = vx;
  this.vy = vy;
  this.speed = 4;
  }
  // Player control
  moveinput() {
    if ('w' in keysDown || 'W' in keysDown) {
        this.vx = 0;
        this.vy = -this.speed;
    } else if ('s' in keysDown || 'S' in keysDown) {
        this.vx = 0;
        this.vy = this.speed;

    } else if ('a' in keysDown || 'A' in keysDown) {
        this.vy = 0;
        this.vx = -this.speed;

    } else if ('d' in keysDown || 'D' in keysDown) {
        this.vy = 0;
        this.vx = this.speed;
    }
    else{
      this.vx = 0;
      this.vy = 0;
    }
}
  update(){
    this.moveinput();
    this.x += this.vx;
    this.y += this.vy;
    if (!this.inbounds()){
      if (this.x <= 0) {
        this.x = 0;
      }
      if (this.y <= 0) {
        this.y = 0;
      }
      if (this.x + this.w >= WIDTH) {
        this.x = WIDTH-this.w;
      }
      if (this.y+this.h >= HEIGHT) {
        this.y = HEIGHT-this.h;
      }
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
}

class EvilMob extends Sprite {
  constructor(w, h, x, y, c, vx, vy) {
    super(w, h, x, y, c);
    this.vx = vx;
    this.vy = vy;
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      if (!this.inbounds()){
        if (this.x < 0 || this.x + this.w > WIDTH) {
          this.vx *= -1;
        }
        if (this.y < 0 || this.y + this.h > HEIGHT) {
          this.vy *= -1;
        }

      }
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      // ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}
class FoodMob extends Sprite {
  constructor(w, h, x, y, c, vx, vy) {
    super(w, h, x, y, c);
    this.vx = vx;
    this.vy = vy;
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      if (!this.inbounds()){
        if (this.x < 0 || this.x + this.w > WIDTH) {
          this.vx *= -1;
        }
        if (this.y < 0 || this.y + this.h > HEIGHT) {
          this.vy *= -1;
        }

      }
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      // ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}


// create instance of player
let player = new Player(25, 25, WIDTH/2, HEIGHT/4*3, '#0000FF', 0, 0);

function signum(){
  let options = [-1, 1];
  index = Math.floor(Math.random()*options.length);
  result = options[index];
  return result;
}

function spawn_evil_mob(qty) {
  for (i = 0; i < qty; i++){
    evil_mobs.push(new EvilMob(40,40, WIDTH/2, HEIGHT/2, '#FF0000', Math.random()*3*signum(), Math.random()*3*signum()));
}
}

function spawn_food_mob(qty) {
for (i = 0; i < qty; i++){
  food_mobs.push(new FoodMob(10,10, WIDTH/2, HEIGHT/2, '#00FF00', Math.random()*3*signum(), Math.random()*3*signum()));
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

// ########## updates all elements on canvas ##########
function update() {
  player.update();
  //updates all mobs in a group
  for (let em of evil_mobs){
    em.update();
    if (player.collide(em)){
      for (let fm of food_mobs) {
        fm.spliced = true;
      }
      for (let em of evil_mobs) {
        em.spliced = true;
      }
      SCORE = 0
      ROUND = 0 
      player.x = WIDTH/2
      player.y = HEIGHT/4*3
    }
  }
  for (let fm of food_mobs){
    fm.update();
    if (player.collide(fm)){
      fm.spliced = true;
      SCORE += 1;
    }
  }

  for (let fm in food_mobs){
    if (food_mobs[fm].spliced){
      food_mobs.splice(fm, 1);
    }
  }
  for (let em in evil_mobs){
    if (evil_mobs[em].spliced){
      evil_mobs.splice(em, 1);
    }
  }

  if (food_mobs.length == 0) {
    ROUND += 1
    spawn_food_mob(ROUND * 2)
    spawn_evil_mob(2)
  }
}

// draws all the stuff on the canvas that you want to draw
function draw() {
  // clears the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText('black', "24px Helvetica", "left", "top", "SCORE: " + SCORE, 100, 0);
  drawText('black', "24px Helvetica", "left", "top", "ROUND: " + ROUND, 500, 0);
  player.draw();
  for (let em of evil_mobs){
    em.draw();
  }
  for (let fm of food_mobs){
    fm.draw();
  }
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