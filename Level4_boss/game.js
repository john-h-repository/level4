let plr = new GameObject(canvas.width/2 - 125, canvas.height-90, 0);
let core = new GameObject(canvas.width/2, canvas.height/2, 5);
let animInt = setInterval(animate, 1000/60);
let spawnInt = setInterval(spawn, 1500);

let objs = []
let keys = {};
let target = 0;
let dead = false;
let xcenter = canvas.width/2
let ycenter = canvas.height/2

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	



for (let i = 0; i < 10; i++) {
    objs.push(
        new GameObject(9999, 0, Math.random()*0.2 + 0.1)
    );
};

function spawn() {
    let rad = Math.max(canvas.width, canvas.height)*.75;
    let angle = Math.random() * Math.PI * 2;
    let xspawn = xcenter + Math.cos(angle) * rad;
    let yspawn = ycenter + Math.sin(angle) * rad;

    if (target >= objs.length) {target = 0};
    console.log(target);
    objs[target].x = xspawn;
    objs[target].y = yspawn;
    objs[target].permission = true; 

    target++;
};

function animate() {
    context.clearRect(0,0,canvas.width, canvas.height);
    if (!dead) {
        plr.move(keys);
        plr.drawPlr();
        for (let i of objs) {
            i.drawObstacle();
            checkcollide(i);
        }
    } else {

        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        core.color = 'white';
        context.fillStyle = 'white'
        context.font = "48px serif";
        context.fillText("Game over", canvas.width * 0.5 - context.measureText("Game over").width * 0.5, canvas.height * 0.3)
    };
    core.drawCore();
}


function checkcollide(i) {

    if (i.collide() == "death") {
        console.log("player fail state");

        i.permission = false;
        i.x = 9999;
        clearInterval(spawnInt);
        dead = true;
    };
    if (i.collide() == "collision") {
        console.log("player destroyed obstacle");

        i.permission = false;
        i.x = 9999;
    };
};