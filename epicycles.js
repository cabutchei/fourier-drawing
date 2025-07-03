class Epicycles {
    constructor(xDft, yDft, fps){
      this.xCircles = [];
      this.yCircles = [];
      this.fps = fps;
      let zx;
      let zy;
      for (let i = 0; i < xDft.length; i++){
        zx = xDft[i];
        zy = yDft[i];
        if (i == 0){
            this.xCircles.push({center: {x: width/2, y: 0}, radius: zx.abs(), freq: i/xDft.length, theta: zx.arg()});
            this.yCircles.push({center: {x: 0, y: height/2}, radius: zy.abs(), freq: i/xDft.length, theta: zy.arg()}); 
        }
        else{
            let prevXCircle = this.xCircles[i-1];
            let prevYCircle = this.yCircles[i-1];
            this.xCircles.push({center: {x: prevXCircle.center.x + cos(prevXCircle.theta), y: prevXCircle.center.y + sin(prevXCircle.theta)}, radius: zx.abs(), freq: i/xDft.length, theta: zx.arg()});
            this.yCircles.push({center: {x: prevYCircle.center.x + cos(prevYCircle.theta), y: prevYCircle.center.y + sin(prevYCircle.theta)}, radius: zy.abs(), freq: i/xDft.length, theta: zy.arg()});
        }
      }
    }

    updateCircles(fps){
        this.xCircles[0].theta += 2*PI*this.xCircles[0].freq/fps;
        this.yCircles[0].theta += 2*PI*this.yCircles[0].freq/fps; 
        for (let i = 1; i < this.xCircles.length; i++){
            let xCircle = this.xCircles[i];
            let yCircle = this.yCircles[i]; 
            let prevXCircle = this.xCircles[i-1];
            let prevYCircle = this.yCircles[i-1];
            xCircle.theta += 2*PI*xCircle.freq/fps;
            yCircle.theta += 2*PI*yCircle.freq/fps;
            xCircle.center.x = prevXCircle.center.x + prevXCircle.radius * cos(prevXCircle.theta);
            xCircle.center.y = prevXCircle.center.y + prevXCircle.radius * sin(prevXCircle.theta);
            yCircle.center.x = prevYCircle.center.x + prevYCircle.radius * cos(prevYCircle.theta);
            yCircle.center.y = prevYCircle.center.y + prevYCircle.radius * sin(prevYCircle.theta);
        }
    }

    drawCircles(){
        for (let i = 0; i < this.xCircles.length; i++){
            let xCircle = this.xCircles[i];
            let yCircle = this.yCircles[i];
            if (i < this.xCircles.length - 1){
                let nextXCircle = this.xCircles[i+1];
                let nextYCircle = this.yCircles[i+1];
                circle(xCircle.center.x, xCircle.center.y, xCircle.radius);
                line(xCircle.center.x, xCircle.center.y, nextXCircle.center.x, nextXCircle.center.y)
                circle(yCircle.center.x, yCircle.center.y, yCircle.radius);
                line(yCircle.center.x, yCircle.center.y, nextYCircle.center.x, nextYCircle.center.y)
            }
            else{
                circle(xCircle.center.x, xCircle.center.y, xCircle.radius);
                line(xCircle.center.x, xCircle.center.y, xCircle.center.x + xCircle.radius * cos(xCircle.theta), xCircle.center.y + xCircle.radius * sin(xCircle.theta))
                circle(yCircle.center.x, yCircle.center.y, yCircle.radius);
                line(yCircle.center.x, yCircle.center.y, yCircle.center.x + yCircle.radius * cos(yCircle.theta), yCircle.center.y + yCircle.radius * sin(yCircle.theta))
            }
        }
    }
  }

// export {Epicycles}