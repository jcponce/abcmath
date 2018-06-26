let angle;
let aSlider, lSlider, rSlider;
let checkbox;
let r1, r2;

let WIDTH = 810;
let HEIGHT = 510;


let angle1 = 0;
let angle2 = 0;
let angle3 = 0;

let animate = false;


function setup() {
    createCanvas(WIDTH, HEIGHT);
    colorMode(HSB, 100);
    stroke(255);
    controls();
}

function animateTree() {
    if (this.checked()) { // if the selected check the tree is animated
        animate = true;
    } else {
        animate = false;
    }
}

function draw() {
    background(0);
    
    translate(width / 2-90, height/2+210);
   
    textSize(18);
    stroke(255);
    fill(255);
    text('PLAY', 400, 0);
    
    var Offset1 = 0;
    var Offset2 = 0;
    var Offset3 = 0;
    
    var x = map(sin(angle1+Offset1), -1, 1, 0, 80);
    var y = map(sin(angle2+Offset2), -1, 1, 0, 9);
    var z = map(sin(angle3+Offset3), -1, 1, 0, 9);
    if(animate==true){
        Offset1 += PI/2;
        Offset2 += PI/2;
        Offset3 += PI/2;
        
        aSlider.value(x);
        rSlider.value(y);
        lSlider.value(z);
        angle = aSlider.value();
        r1 = 0.1 * rSlider.value();
        r2 = 0.1 * lSlider.value();
        tree(100, angle, r1, r2, 10);
        angle1 += 0.002;
        angle2 += 0.004;
        angle3 += 0.007;
    }else{
        angle1 = 5;
        angle2 = 0;
        angle3 = 0;
        tree(70, aSlider.value(), 0.1 * rSlider.value(), 0.1 * lSlider.value(), 10);
    }
    
}

function tree(length, ang, r1, r2, level) {
    if (level == 0) {
        strokeWeight(1);
        line(0, 0, 0, -length);
        //uncomment for leaves:
        translate(0,-length)
        fill(0,255,0);
        ellipse(0,0,3,7);
    } else {
        push();
        stroke(100 - 10 * level, 100, 100);
        strokeWeight(level);
        line(0, 0, 0, -length);
        translate(0, -length);
        rotate(radians(ang));
        tree(length * r1, ang, r1, r2, level - 1);
        rotate(-2 * radians(ang));
        tree(length * r2, ang, r1, r2, level - 1);
        pop();
    }
}

function controls() {
    
    aSlider = createSlider(0, 80, 30, 0.01);
    aSlider.position(670, 200);
    aSlider.style('width', '120px');
    lSlider = createSlider(0, 9, 6, 0.01);
    lSlider.position(670, 280);
    lSlider.style('width', '120px');
    rSlider = createSlider(0, 9, 7, 0.01);
    rSlider.position(670, 360);
    rSlider.style('width', '120px');
    
    checkbox = createCheckbox(':', false); // create a checkbox with a name and an initial value
    checkbox.position(690, 450); // where it's located
    checkbox.changed(animateTree); // what happens when it is checed
    
}

