canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

function GameObject(x, y, accel) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.width;
    this.height;
    this.color = 'black';
    this.accel = accel;
    this.permission = false;

	this.drawRect = function() {
        this.width = 250;
        this.height = 40;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // console.log(player1.top(true), player1.bottom(true), player1.left(true), player1.right(true));
	};

    this.drawPlr = function() {
        this.width = 40;
        this.color = 'blue';
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.width/2, 0, 360*Math.PI/180, true);
        context.fill();
        context.closePath();
    };

    this.drawObstacle = function() {
        this.width = 40;
        this.color = 'magenta';

        // if (this.y > ycenter) {this.vy -= (this.accel * (ycenter/this.y))} else {this.vy += (this.accel * (ycenter/this.y))};
        // if (this.x > xcenter) {this.vx -= (this.accel * (xcenter/this.x))} else {this.vx += (this.accel * (xcenter/this.x))};

        if (this.permission) {
            dx = xcenter - this.x;
            dy = ycenter - this.y;

            dist = Math.sqrt(dx * dx + dy * dy);    
            this.accel += accel * 0.1

            if (dist > this.accel) {
                this.vx = (dx / dist) * this.accel;
                this.vy = (dy / dist) * this.accel;
                this.x += this.vx;
                this.y += this.vy;
            } else {
                this.x = xcenter;
                this.y = ycenter;
                this.vx = 0;
                this.vy = 0;
            }
        }

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.width/2, 0, 360*Math.PI/180, true);
        context.fill();
        context.closePath();

        // console.log(this.top(), this.bottom(), this.left(), this.right())
    };

    this.drawCore = function() {
        this.width = 80;

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.width/2, 0, 360*Math.PI/180, true);
        context.fill();
        context.closePath();
    };

    this.collide = function() {
        if (this.top()+this.width/2 == core.x) {return "death"}

        if ((plr.top()) < this.bottom() && ((plr.bottom())) > this.top() && ((plr.right())) > this.left() && (plr.left()) < this.right()) {
            return "collision";
        };   
    };

    this.move = function(key) {
        let ax = 0;
        let ay = 0;
        let r = this.width / 2;


        if (keys["a"]) {ax -= 0.6};
        if (keys["d"]) {ax += 0.6};
        if (keys["w"]) {ay -= 0.6};
        if (keys["s"]) {ay += 0.6};

        this.vx += ax;
        this.vy += ay;
        this.vx *= 0.85;
        this.vy *= 0.85;
        this.vx = Math.max(-10, Math.min(10, this.vx));
        this.vy = Math.max(-10, Math.min(10, this.vy));
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - r < 0) {
            this.x = r;
            this.vx = 0;
        }

        if (this.x + r > canvas.width) {
            this.x = canvas.width - r;
            this.vx = 0;
        }

        if (this.y - r < 0) {
            this.y = r;
            this.vy = 0;
        }

        if (this.y + r > canvas.height) {
            this.y = canvas.height - r;
            this.vy = 0;
        }
    };
	
    this.top = function() {
        return this.y - this.width / 2;
    };

    this.right = function() {
        return this.x + this.width / 2;
    };

    this.bottom = function() {
        return this.y + this.width / 2;
    };

    this.left = function() {
        return this.x - this.width / 2;
    };

}