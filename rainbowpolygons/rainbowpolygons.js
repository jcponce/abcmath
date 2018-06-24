let color = 360;
let splatter = 50;
let WIDTH = 1090;
let HEIGHT = 736;
let paint = false;
let beating = 0;
let speed;
let clear = false;


function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(255);
    //noStroke();
    colorMode(HSB);
    rectMode(CENTER);
    
    
    
    //Create button to reset simulation
    var button = createButton("Reset");
    button.mousePressed(resetC);
    button.position(910,25);
    button.style("font-size", "20px");
}

function resetC(){
    
    if(clear == false){
        clear = true;
    }else{
        clear = false;
    }
    
    
}

function draw() {
    
    if(clear==true){
        fill(255);
        rect(0,0,2*width,2*height);
        clear=false;
    }
    
    
    robot();
    
    if(color >= 355) {
        color = 0;
    }
    else {
        color++;
    }
    
    fill(color,255,255,1);
    stroke(color,255,255,1);
    hearts(width/2+22, 2*height/8+145, 10*(sin(speed*beating)+2),10*(sin(speed*beating)+2));
    beating += PI/200;
    
    fill(color, 255, 255);
    stroke(color, 0, 1);
    
    let xh = random(-splatter, splatter);
    let yh = random(-splatter, splatter);
    
    let x = new regularPolygon(xh + mouseX, yh + mouseY);
    if(paint==true){
        speed = 30;
        x.display();
    }else{
        speed = 10;
    }
    
    
    
}

function mousePressed() {
    if (paint==false) {
        paint = true;
    }
}

function mouseReleased() {
    if(paint==true){
        paint = false;
    }
}

class regularPolygon {
    
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.r = random(5,30);
        this.n = Math.round(random(3,10));
        
    }
    
    display() {
        push();
        beginShape();
        for(let i=0; i<=this.n; i++){
            let nextx, nexty;
            nextx = this.x + this.r * cos(i*2*PI/this.n);
            nexty = this.y + this.r * sin(i*2*PI/this.n);
            vertex(nextx, nexty);
        }
        endShape(CLOSE);
        pop();
    }
    
}

function hearts(x, y, w, h) {
    w /= 2
    h /= 2
    push();
    translate(x, y - h * 0.7);
    beginShape();
    vertex(0, 0.3 * h);
    bezierVertex(0.25 * w, -0.5 * h, 1 * w, -0.5 * h, 1 * w, 0.25 * h);
    bezierVertex(1 * w, 0.5 * h, 1 * w, 1 * h, 0 * w, 1.6 * h);
    vertex(0, 1.60 * h);
    bezierVertex(-1 * w, 1 * h, -1 * w, 0.5 * h, -1 * w, 0.25 * h);
    bezierVertex(-1 * w, -0.5 * h, -0.25 * w, -0.5 * h, 0 * w, 0.3 * h);
    endShape(CLOSE);
    pop();
    //print(lerp(-0.5, 1.6, 0.5))
}

function robot(){
    //Body
    fill(0);
    stroke(0);
    rect(width/2,2*height/8+40,130,90);//head
    rect(width/2,2*height/8+95,20,20);//neck
    rect(width/2,2*height/8+155,100,110);//chest
    
    rect(width/2-78,2*height/8+40,20,50);//right ear
    rect(width/2+78,2*height/8+40,20,50);//left ear
    
    rect(width/2-63,2*height/8+160,20,80);//right arm
    rect(width/2+63,2*height/8+160,20,80);//left arm
    
    rect(width/2-25,2*height/8+245,20,65);//right leg
    rect(width/2+25,2*height/8+245,20,65);//left leg
    
    rect(width/2-40,2*height/8-19,10,20);//right antena
    rect(width/2+40,2*height/8-19,10,20);//left antena
    
    //Eyes
    eye("LeftEye",width/2-26,2*height/8+30,25,0.8);
    eye("RightEye",width/2+26,2*height/8+30,25,0.8);
    
    //mouth
    if (paint==true) {
        fill(250);
    } else {
        fill(0);
    }
    arc(width/2-5, 2*height/8+65, 25, 25, 0, PI + QUARTER_PI, CHORD);
    stroke(255);
    noFill();
    arc(width/2-5, 2*height/8+65, 25, 25, 0, PI + QUARTER_PI, OPEN);
}

function eye(spec,xpos,ypos,size,sens){
name: spec;
    
    var xDis = width-xpos+size;
    var yDis = height-ypos+size;
    //print(xpos-size);
    //var d = dist(xpos, ypos, mouseX, mouseY);
    var upXpos= map(mouseX,-size,width+size,-(size*sens),width+size);
    var upYpos= map(mouseY,-size,height+size,-(size*0.5*sens),height+(size*0.5));
    
    
    //How do you creat a circular constraint area??
    var pubXpos= constrain(upXpos, xpos-(size/4),xpos+(size/4));
    var pubYpos= constrain(upYpos, ypos-(size/4),ypos+(size/4));
    
    noStroke();
    fill(255);
    ellipseMode(CENTER);
    ellipse(xpos,ypos,size);
    
    //Pupil
    fill(0);
    ellipse(pubXpos,pubYpos,size/3);
}
