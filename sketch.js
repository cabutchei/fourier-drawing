// import { Epicycles } from "./epicycles";

let state;
let drawing = [];
let xDrawing = [];
let yDrawing = [];
let fourierDrawing = [];
const USER_DRAWING = 0;
const FOURIER_DRAWING = 1;
let dft;
let xdft;
let ydft;
let circles = [];
let theta;
let fps = 60;
let epicycles;

function setup() {
  createCanvas(1500, 800);
  frameRate(fps);
}

function mousePressed() {
  if (state != FOURIER_DRAWING){
    state = USER_DRAWING;
  }
}

function mouseReleased() {
  state = FOURIER_DRAWING;
  console.log(state)
}

function draw() {
  background(200,200);
  switch (state){
    case USER_DRAWING:
      let point = createVector(mouseX - width / 2, mouseY - height / 2);
      drawing.push(math.Complex(point.x, point.y));
      // complexDrawing.push(math.Complex(point.x, point.y));
      stroke(255);
      noFill();
      beginShape();
      for (let v of drawing) {
        vertex(v.re + width / 2, v.im + height / 2);
      }
      endShape();
      break;
    
    case FOURIER_DRAWING:
      if (!dft) {
        dft = true;
        xDrawing = drawing.map(i => i.re);
        yDrawing = drawing.map(i => i.im);
        let xDft = math.fft(xDrawing).map(num => num.div(xDrawing.length));
        let yDft = math.fft(yDrawing).map(num => num.div(xDrawing.length));
        epicycles = new Epicycles(xDft, yDft, fps);
      }
      else {
        epicycles.drawCircles();
        epicycles.updateCircles(fps);
      }
      break;

  }

}