// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// This script gets a reference to the <canvas> element, then calls the getContext() method on it to give us a context on which we can start to draw. The resulting constant (ctx) is the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it.

// Next, we set constants called width and height, and the width and height of the canvas element (represented by the canvas.width and canvas.height properties) to equal the width and height of the browser viewport (the area that the webpage appears on — this can be gotten from the Window.innerWidth and Window.innerHeight properties).


// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}


// Modeling a ball in our program
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

//  Drawing the ball 
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill()
    // ctx.strokeStyle = 'red';
    // ctx.stroke();
}

// Using this function, we can tell the ball to draw itself onto the screen, by calling a series of members of the 2D canvas context we defined earlier (ctx). The context is like the paper, and now we want to command our pen to draw something on it:

// -First, we use beginPath() to state that we want to draw a shape on the paper.
// -Next, we use fillStyle to define what color we want the shape to be — we set it to our ball's color property.
// -Next, we use the arc() method to trace an arc shape on the paper. Its parameters are:
// *The x and y position of the arc's center — we are specifying the ball's x and y properties.
// *The radius of the arc — in this case, the ball's size property.
// *The last two parameters specify the start and end number of degrees around the circle that the arc is drawn between. Here we specify 0 degrees, and 2 * PI, which is the equivalent of 360 degrees in radians (annoyingly, you have to specify this in radians). That gives us a complete circle. If you had specified only 1 * PI, you'd get a semi-circle (180 degrees).
// -Last of all, we use the fill() method, which basically states "finish drawing the path we started with beginPath(), and fill the area it takes up with the color we specified earlier in fillStyle."

let testBall = new Ball(random(0, width), random(0, height), 10, 10, 'blue', 50);
testBall.draw();


//  Updating the ball's data 
Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}
// The first four parts of the function check whether the ball has reached the edge of the canvas. If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction. So for example, if the ball was traveling upwards (positive velY), then the vertical velocity is changed so that it starts to travel downwards instead (negative velY).

// In the four cases, we are checking to see:

// -if the x coordinate is greater than the width of the canvas (the ball is going off the right edge).
// -if the x coordinate is smaller than 0 (the ball is going off the left edge).
// -if the y coordinate is greater than the height of the canvas (the ball is going off the bottom edge).
// -if the y coordinate is smaller than 0 (the ball is going off the top edge).

// In each case, we include the size of the ball in the calculation because the x/y coordinates are in the center of the ball, but we want the edge of the ball to bounce off the perimeter — we don't want the ball to go halfway off the screen before it starts to bounce back.

// The last two lines add the velX value to the x coordinate, and the velY value to the y coordinate — the ball is in effect moved each time this method is called.


// Adding collision detection
Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                // balls[j].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;

                // this.velX = -(this.velX);
                // this.velY = -(this.velY);
                balls[j].velX = -(balls[j].velX);
                balls[j].velY = -(balls[j].velY);
                // this.velX = -(balls[j].velX);
                // this.velY = -(balls[j].velY);
                // balls[j].velX = -(this.velX);
                // balls[j].velY = -(this.velY);
            }
        }
    }
}
// This method is a little complex, so don't worry if you don't understand exactly how it works for now. An explanation follows:

//-For each ball, we need to check every other ball to see if it has collided with the current ball. To do this, we start another for loop to loop through all the balls in the balls[] array.
//-Immediately inside the for loop, we use an if statement to check whether the current ball being looped through is the same ball as the one we are currently checking. We don't want to check whether a ball has collided with itself! To do this, we check whether the current ball (i.e., the ball whose collisionDetect method is being invoked) is the same as the loop ball (i.e., the ball that is being referred to by the current iteration of the for loop in the collisionDetect method). We then use ! to negate the check, so that the code inside the if statement only runs if they are not the same.
//-We then use a common algorithm to check the collision of two circles. We are basically checking whether any of the two circle's areas overlap. This is explained further in 2D collision detection.
//-If a collision is detected, the code inside the inner if statement is run. In this case we only set the color property of both the circles to a new random color. We could have done something far more complex, like get the balls to bounce off each other realistically, but that would have been far more complex to implement. For such physics simulations, developers tend to use a games or physics library such as PhysicsJS, matter.js, Phaser, etc.



// Animating the ball
// First, we need to create somewhere to store all our balls and then populate it.
let balls = [];

while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
        size
    );

    balls.push(ball);
}
// The while loop creates a new instance of our Ball() using random values generated with our random() function, then push()es it onto the end of our balls array, but only while the number of balls in the array is less than 25. So when we have 25 balls on screen, no more balls appear. You can try varying the number in balls.length < 25 to get more or fewer balls on screen.

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

// All programs that animate things generally involve an animation loop, which serves to update the information in the program and then render the resulting view on each frame of the animation; this is the basis for most games and other such programs. Our loop() function does the following:

//-Sets the canvas fill color to semi-transparent black, then draws a rectangle of the color across the whole width and height of the canvas, using fillRect() (the four parameters provide a start coordinate, and a width and height for the rectangle drawn). This serves to cover up the previous frame's drawing before the next one is drawn. If you don't do this, you'll just see long snakes worming their way around the canvas instead of balls moving! The color of the fill is set to semi-transparent, rgba(0,0,0,0.25), to allow the previous few frames to shine through slightly, producing the little trails behind the balls as they move. If you changed 0.25 to 1, you won't see them at all any more. Try varying this number to see the effect it has.
//-Loops through all the balls in the balls array, and runs each ball's draw() and update() function to draw each one on the screen, then do the necessary updates to position and velocity in time for the next frame.
//-Runs the function again using the requestAnimationFrame() method — when this method is repeatedly run and passed the same function name, it runs that function a set number of times per second to create a smooth animation. This is generally done recursively — which means that the function is calling itself every time it runs, so it runs over and over again.

// Last but not least, add the following line to the bottom of your code — we need to call the function once to get the animation started. 
loop();


