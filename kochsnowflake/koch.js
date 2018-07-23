//Original sketch by Karut https://www.openprocessing.org/user/79533
// https://www.openprocessing.org/sketch/412889

var lines;
var start;
var end;
var step;
var next;
var sinValues = [];
var cosValues = [];
var r;
var angle = 3;
var layer = 0;
var canvas;
var startCol;
var endCol;

var sliderLayer;
var sliderAngle;

var sliderO;
var sliderP;
var text1,text2,text3,text4;

function setup() {
    
    var runningX = 20;
    var runningY = windowHeight*1/6;

    sliderLayer = createSlider(0, 4, 0, 1);
    sliderLayer.position(runningX, runningY);
    sliderLayer.style('width', '140px');
    
    
    
    sliderAngle = createSlider(2, 13, 3, 1);
    sliderAngle.position(runningX, 2*runningY);
    sliderAngle.style('width', '140px');
    
    sliderO = createSlider(-2, 2, -0.66, 0.01);
    sliderO.position(runningX, 4*runningY);
    sliderO.style('width', '140px');
    
    sliderP = createSlider(0, 3.14, 1.57, 0.01);
    sliderP.position(runningX, 5*runningY);
    sliderP.style('width', '140px');
    
    /*text1 = createElement("span", "Layer: " + sliderLayer.value() + " - ");
    text1.position(runningX, height * 0.3*0.85);
    text1.style("color", "#fff");
    text1.style("font-size", "20px");
    text1.mouseReleased(function(){text1.html("Layer: " + sliderLayer.value() + " - ");});
    */
    
    var canvas = createCanvas(windowWidth, windowHeight);
    startCol = color("#ffffff");
    endCol = color("#555555");
    if (sm()) r = width * 0.4;
    else r = height * 0.4;
    for (var i = 0; i <= 360; i++) {
        sinValues[i] = sin(radians(i));
        cosValues[i] = cos(radians(i));
    }
    initLines();
    
}

function draw() {
    background(0);
    textSize(20);
    fill(255);
    strokeWeight(1);
    var textP = 20;
    var textQ = windowHeight*1/6;
    text('Step - ' + sliderLayer.value(), textP, textQ-7);
    text('Angle -  ' + sliderAngle.value(), textP, 2*textQ-7);
    
    text('Convex/Concave', textP, 4*textQ-7);
    text('Rotate', textP, 5*textQ-7);
    
    initLines();
    //background(0);
    
    stroke(255);
    translate(width / 2+90, height / 2);
    for (var i = 0; i < lines.length; i++) {
        lines[i].display();
    }
    translate(-width / 2, -height / 2);
    
    
}

function sm() {
    if (width < 640) return true;
    else return false;
}



function initLines() {
    lines = [];
    step = 360 / sliderAngle.value();
    end = createVector();
    for (var i = 0; i < sliderAngle.value(); i++) {
        start = createVector(cosValues[(int(step * i) + 90) % 360] * r, sinValues[(int(step * i) + 90) % 360] * r);
        end = createVector(cosValues[(int(step * (i + 1)) + 90) % 360] * r, sinValues[(int(step * (i + 1)) + 90) % 360] * r);
        lines.push(new KochLine(end, start));
    }
    for (var i = 0; i < sliderLayer.value(); i++) {
        generate();
    }
}

function generate() {
    next = [];
    for (var i = 0; i < lines.length; i++) {
        next.push(new KochLine(lines[i].start, lines[i].kochB));
        next.push(new KochLine(lines[i].kochB, lines[i].kochC));
        next.push(new KochLine(lines[i].kochC, lines[i].kochD));
        next.push(new KochLine(lines[i].kochD, lines[i].end));
    }
    lines = next;
}

var KochLine = function(_start, _end) {
    this.start = _start;
    this.end = _end;
    var v = p5.Vector.sub(this.end, this.start);
    this.weight = 3 * (1 - map(v.mag() / 10, 0, 5, 1, 0)) + 0.7;
    
    var dis = dist(0, 0, this.start.x, this.start.y);
    var scalCol = map(dis, 0, width*0.35, 0, 1);
    this.col = lerpColor(startCol, endCol, scalCol);
    
    this.kochB = v.copy();
    this.kochB.div(3.0);
    this.kochB.add(this.start);
    
    this.kochC = this.start.copy();
    
    this.kochD = v.copy();
    this.kochD.mult(2 / 3.0);
    this.kochD.add(this.start);
    
    v.mult(0.5);
    this.kochC.add(v);
    var s = sliderO.value();//map(width/3, 0, width, -2, 2);
    v.mult(s);
    var t = sliderP.value();//map(height/4, 0, height, 0, PI * 2);
    v.rotate(-t);
    this.kochC.add(v);
};


KochLine.prototype.display = function() {
    fill(128, 212, 255, 90);
    stroke(128, 255, 255, 110);
    strokeWeight(this.weight*0.8);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(this.weight);
    fill(this.col);
    ellipse(this.start.x, this.start.y, this.weight * 1.5, this.weight * 1.5);
    ellipse(this.end.x, this.end.y, this.weight * 1.5, this.weight * 1.5);
};

function keyTyped() {
    save
}
