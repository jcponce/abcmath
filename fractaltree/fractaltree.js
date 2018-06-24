let angle;
let aSlider, lSlider, rSlider;
let checkbox;
let r1, r2;

let WIDTH = 1090;
let HEIGHT = 736;


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

//function animateTree() {
//    if (this.checked()) { // if the selected check the tree is animated
//        animate = true;
//    } else {
//        animate = false;
//    }
//}

function draw() {
    background(0);
    
    //noFill();
    //stroke(100);
    //rect(0,0,width-1, height-1);
    translate(width / 2-150, height/2+250);
    //rotate(radians(90));
    
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
        tree(100, aSlider.value(), 0.1 * rSlider.value(), 0.1 * lSlider.value(), 10);
    }
    
    translate(-width / 2+150, -height/2-250);
    translate(WIDTH/2, HEIGHT/2);
    buttons.forEach(button => button.update());
    
}

function tree(length, ang, r1, r2, level) {
    if (level == 0) {
        strokeWeight(1);
        line(0, 0, 0, -length);
        //uncomment for leaves:
        //translate(0,-length)
        //fill(0,255,0);
        //ellipse(0,0,15,30);
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
    aSlider.position(880, 200);
    aSlider.style('width', '160px');
    lSlider = createSlider(0, 9, 6, 0.01);
    lSlider.position(880, 280);
    lSlider.style('width', '160px');
    rSlider = createSlider(0, 9, 7, 0.01);
    rSlider.position(880, 360);
    rSlider.style('width', '160px');
    
    //checkbox = createCheckbox('.', false); // create a checkbox with a name and an initial value
    //checkbox.position(780, 470); // where it's located
    //checkbox.changed(animateTree); // what happens when it is checed
    
}


class Button {
    
    constructor(x, y, width, height, text, onclick) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.onclick = onclick;
    }
    
    hovering() {
        return mouseX > (this.x + WIDTH/2) - this.width/2 && mouseX < (this.x + WIDTH/2) + this.width/2 &&
        mouseY > (this.y + HEIGHT/2) - this.height/2 && mouseY < (this.y + HEIGHT/2) + this.height/2;
    }
    
    display() {
        noStroke();
        fill(0, 0, 40);
        if (this.hovering())
            fill(0, 0, 40);
        rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        fill(0, 0, 100);
        textSize(this.height/2);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y);
    }
    
    click() {
        if (this.hovering()) {
            this.onclick();
        }
    }
    
    update() {
        this.display();
    }
    
}

function mousePressed() {
    buttons.forEach(button => button.click());
}

var buttons = [
               new Button(WIDTH/2 - WIDTH/8, -HEIGHT/2+600, WIDTH/14, HEIGHT/14, "Play", function() {
                          animate = !animate;
                          if (animate)
                          this.text = "Stop";
                          else
                          this.text = "Play";
                          }),
               ];
buttons.forEach(button => button.onclick = button.onclick.bind(button));
