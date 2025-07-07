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
            this.xCircles.push({center: {x: 0, y: 3*height/8}, radius: zx.abs(), freq: i*1/xDft.length, theta: zx.arg()});
            this.yCircles.push({center: {x: -3*width/8, y: 0}, radius: zy.abs(), freq: i*1/xDft.length, theta: zy.arg()}); 
        }
        else{
            let prevXCircle = this.xCircles[i-1];
            let prevYCircle = this.yCircles[i-1];
            this.xCircles.push({center: {x: prevXCircle.center.x + prevXCircle.radius * cos(prevXCircle.theta), y: prevXCircle.center.y + prevXCircle.radius * sin(prevXCircle.theta)}, radius: zx.abs(), freq: i/xDft.length, theta: zx.arg()});
            this.yCircles.push({center: {x: prevYCircle.center.x + prevYCircle.radius * cos(prevYCircle.theta), y: prevYCircle.center.y + prevYCircle.radius * sin(prevYCircle.theta)}, radius: zy.abs(), freq: i/xDft.length, theta: zy.arg()});
        }
      }
      this.xCircles.sort((a,b) => b.radius-a.radius);
      this.yCircles.sort((a,b) => b.radius-a.radius);
    }

    updateCircles(fps){
        this.xCircles[0].theta += 2*PI*this.xCircles[0].freq;
        this.yCircles[0].theta += 2*PI*this.yCircles[0].freq; 
        for (let i = 1; i < this.xCircles.length; i++){
            let xCircle = this.xCircles[i];
            let yCircle = this.yCircles[i]; 
            let prevXCircle = this.xCircles[i-1];
            let prevYCircle = this.yCircles[i-1];
            xCircle.theta += 2*PI*xCircle.freq;
            yCircle.theta += 2*PI*yCircle.freq;
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
                circle(ireframeX(xCircle.center.x), ireframeY(xCircle.center.y), 2*xCircle.radius);
                line(ireframeX(xCircle.center.x), ireframeY(xCircle.center.y), ireframeX(nextXCircle.center.x), ireframeY(nextXCircle.center.y))
                circle(ireframeX(yCircle.center.x), ireframeY(yCircle.center.y), 2*yCircle.radius);
                line(ireframeX(yCircle.center.x), ireframeY(yCircle.center.y), ireframeX(nextYCircle.center.x), ireframeY(nextYCircle.center.y))
            }
            else{
                circle(ireframeX(xCircle.center.x), ireframeY(xCircle.center.y), 2*xCircle.radius);
                line(ireframeX(xCircle.center.x), ireframeY(xCircle.center.y), ireframeX(xCircle.center.x + xCircle.radius * cos(xCircle.theta)), ireframeY(xCircle.center.y + xCircle.radius * sin(xCircle.theta)))
                circle(ireframeX(yCircle.center.x), ireframeY(yCircle.center.y), 2*yCircle.radius);
                line(ireframeX(yCircle.center.x), ireframeY(yCircle.center.y), ireframeX(yCircle.center.x + yCircle.radius * cos(yCircle.theta)), ireframeY(yCircle.center.y + yCircle.radius * sin(yCircle.theta)))
            }
        }
    }
    drawLines(){
        let lastXCircle = this.xCircles.slice(-1)[0];
        let lastYCircle = this.yCircles.slice(-1)[0];
        line(ireframeX(lastXCircle.center.x), ireframeY(lastXCircle.center.y), ireframeX(lastXCircle.center.x), ireframeY(lastYCircle.center.y))
        line(ireframeX(lastYCircle.center.x), ireframeY(lastYCircle.center.y), ireframeX(lastXCircle.center.x), ireframeY(lastYCircle.center.y))
    }
  }
