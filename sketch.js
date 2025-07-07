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
let fps = 200;
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
      // let point = createVector(mouseX - width / 2, mouseY - height / 2);
      let point = createVector(mouseX, mouseY);
      drawing.push(math.Complex(point.x, point.y));
      // complexDrawing.push(math.Complex(point.x, point.y));
      stroke(255);
      noFill();
      beginShape();
      for (let v of drawing) {
        vertex(v.re, v.im);
      }
      endShape();
      break;
    
    case FOURIER_DRAWING:
      if (!dft) {
        dft = true;
        drawing.forEach(i => {i.re = reframeX(i.re); i.im = reframeY(i.im)});
        xDrawing = drawing.map(i => math.Complex(i.re, 0));
        yDrawing = drawing.map(i => math.Complex(0, i.im));
        let xDft = math.fft(xDrawing).map(num => num.div(xDrawing.length));
        let yDft = math.fft(yDrawing).map(num => num.div(xDrawing.length));
        epicycles = new Epicycles(xDft, yDft, fps);
      }
      else {
        if (fourierDrawing.length == drawing.length){
          fourierDrawing = [];
        }
        let v = createVector(epicycles.xCircles.slice(-1)[0].center.x, epicycles.yCircles.slice(-1)[0].center.y)
        fourierDrawing.push(v);
        epicycles.drawCircles();
        epicycles.drawLines();
        stroke(255);
        noFill();
        beginShape();
        for (let v of fourierDrawing) {
          vertex(ireframeX(v.x), ireframeY(v.y));
        }
        endShape();
        epicycles.updateCircles(fps);
      }
      break;

  }

}

function reframeX(x){
  return x-width/2;
}

function ireframeX(x){
  return x+width/2;
}

function reframeY(y){
  return height/2 - y;
}

function ireframeY(y){
  return height/2 - y;
}

function reframeAxes(x,y){
  return {x: reframeX(x), y: reframeY(y)};
}

function ireframeAxes(x,y){
  return {x: ireframeX(x), y: ireframeY(y)}
}

function invfft(circles){
  let r = 0;
  circles.forEach(circ => {
    r = (math.exp((math.i).mul(circ.theta)).mul(circ.radius)).add(r)
  })
  return r
}