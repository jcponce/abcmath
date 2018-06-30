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


function setup() {
    
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
    createGUI();
    
    
}

function draw() {
    
    
    initLines();
    background(0);
    stroke(255);
    translate(width / 2, height / 2);
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
    step = 360 / angle;
    end = createVector();
    for (var i = 0; i < angle; i++) {
        start = createVector(cosValues[(int(step * i) + 90) % 360] * r, sinValues[(int(step * i) + 90) % 360] * r);
        end = createVector(cosValues[(int(step * (i + 1)) + 90) % 360] * r, sinValues[(int(step * (i + 1)) + 90) % 360] * r);
        lines.push(new KochLine(end, start));
    }
    for (var i = 0; i < layer; i++) {
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
    var s = map(width/3, 0, width, -2, 2);
    v.mult(s);
    var t = map(height/4, 0, height, 0, PI * 2);
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


function createGUI() {
    var blank = 10;
    var runningX = width * 0.05;
    var p_back = "#4d170b";
    var m_back = "#0b3e4d";
    
    var p_font_size = "18px"
    var gui_w = "50px";
    var gui_h = "30px";
    
    if (sm()) {
        p_font_size = "12px"
        gui_w = "50px";
        gui_h = "20px";
    }
    
    angle_p = createElement("span", "Angle: " + angle + " - ");
    angle_p.style("color", "#fff");
    angle_p.style("font-size", p_font_size);
    angle_p.position(runningX, height * 0.85);
    
    a_plus_b = createButton("Plus");
    a_plus_b.mousePressed(function() {
                          if (angle < 15) angle += 1;
                          angle_p.html("Angle: " + angle + " - ");
                          });
    a_plus_b.style("width", gui_w);
    a_plus_b.style("height", gui_h);
    a_plus_b.style("background", p_back);
    a_plus_b.style("color", "#fff");
    a_plus_b.style("border", "solid 2px #fff");
    runningX += blank * 1 + angle_p.width;
    a_plus_b.position(runningX, height * 0.85);
    
    a_minus_b = createButton("Minus");
    a_minus_b.mousePressed(function() {
                           if (angle > 2) angle -= 1;
                           angle_p.html("Angle: " + angle + " - ");
                           });
    a_minus_b.style("width", gui_w);
    a_minus_b.style("height", gui_h);
    a_minus_b.style("background", m_back);
    a_minus_b.style("color", "#fff");
    a_minus_b.style("border", "solid 2px #fff");
    runningX += blank + a_plus_b.width;
    a_minus_b.position(runningX, (height * 0.85));
    
    runningX = width * 0.05;
    var blankY = 10;
    
    layer_p = createElement("span", "Layer: " + layer + " - ");
    layer_p.style("color", "#fff");
    layer_p.style("font-size", p_font_size);
    layer_p.position(runningX, height * 0.8 - blankY);
    
    l_plus_b = createButton("Plus");
    l_plus_b.mousePressed(function() {
                          var isOk = true;
                          //if (layer == 5) isOk = confirm("This level is a very heavy processing.\n If you have not enough performance, you shoud be back to the previous level.")
                          if (layer < 5) layer += 1;
                          layer_p.html("Layer: " + layer + " - ");
                          });
    l_plus_b.style("width", gui_w);
    l_plus_b.style("height", gui_h);
    l_plus_b.style("background", p_back);
    l_plus_b.style("color", "#fff");
    l_plus_b.style("border", "solid 2px #fff");
    runningX += blank * 1 + layer_p.width;
    l_plus_b.position(runningX, height * 0.8 - blankY);
    
    l_minus_b = createButton("Minus");
    l_minus_b.mousePressed(function() {
                           if (layer > 0) layer -= 1
                           layer_p.html("Layer: " + layer + " - ");
                           });
    l_minus_b.style("width", gui_w);
    l_minus_b.style("height", gui_h);
    l_minus_b.style("background", m_back);
    l_minus_b.style("color", "#fff");
    l_minus_b.style("border", "solid 2px #fff");
    runningX += blank + l_plus_b.width;
    l_minus_b.position(runningX, (height * 0.8 - blankY));
    
}


function keyTyped() {
    if(key=='s') saveCanvas("kochLine", "jpg");
}
