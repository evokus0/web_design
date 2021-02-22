// let's write a program that creates rock paper scissors logic using circle, square, triangle
//global variables
let player;
let mouseCoords = [];


// welcome to objects....
var myCircle = {
  x: 125,
  y: 125,
  w: 100,
  radius: 50,
};

// gets mouse position when clicked

// addEventListener('mousedown', mouseClick);

// function mouseClick(e) {
//   console.log(`
//     Screen X/Y: ${e.screenX}, ${e.screenY}
// 	Client X/Y: ${e.clientX}, ${e.clientY}`);
//   mouseCoords = [e.clientX, e.clientY];
//   if (myCircle.x < mouseCoords[0] && myCircle.x + myCircle.w > mouseCoords[0] - 25) {
//     console.log("inside");

//   }
// }


//initializing variables to create a canvas 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');









//set choices
let choices = ["rock", "paper", "scissors"];

function rand_choice(x) {
  return Math.floor(Math.random() * x);
}

let cpu_choice = "null" 
let running = false

function rps_begin() {
  running = true
  alert("Pick Rock, Paper or Scissors")
  let y = rand_choice(choices.length)    
  console.log("cpu has chosen " + choices[y])
  cpu_choice = y
}

function rps_finish(x) {
  if (running == true) {
  console.log("player has chosen " + choices[x])
  if (x == 0) {
    console.log(cpu_choice)
    if (cpu_choice == 0) {
      alert("Tie!")
    }
    else if (cpu_choice == 1) {
      alert("CPU Wins!")
    }
    else if (cpu_choice == 2) {
      alert("You Win!")
    }
  }
  if (x == 1) {
    console.log(cpu_choice)
    if (cpu_choice == 0) {
      alert("You Win!")
    }
    else if (cpu_choice == 1) {
      alert("Tie!")
    }
    else if (cpu_choice == 2) {
      alert("CPU Wins!")
    }
  }
  if (x == 2) {
    console.log(cpu_choice)
    if (cpu_choice == 0) {
      alert("CPU Wins!")
    }
    else if (cpu_choice == 1) {
      alert("You Win!")
    }
    else if (cpu_choice == 2) {
      alert("Tie!")
    }
  }
  running = false
}
}

















// if (cpuChoice == 0){
//   drawCircle();
// }
// else if (cpuChoice == 1){
//   drawSquare();
// }
// else {
//   drawTriangle();
// }

//init a function to draw a triangle on the canvas
function drawTriangle() {
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

function drawSquare() {
  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
}



console.log(myCircle.x);

function drawCircle() {
  //ctx.beginPath();
  ctx.arc(myCircle.x, myCircle.y, myCircle.radius, 0, 2 * Math.PI);
  ctx.stroke();
}
drawCircle();

function main() {}

main();