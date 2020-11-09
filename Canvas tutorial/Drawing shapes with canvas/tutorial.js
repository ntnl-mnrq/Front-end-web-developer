let body = document.querySelector('body');
body.addEventListener('load', draw());

// The script includes a function called draw(), which is executed once the page finishes loading; this is done by listening for the load event on the document. This function, or one like it, could also be called using window.setTimeout(), window.setInterval(), or any other event handler, as long as the page has been loaded first.


function draw() {
    c1('.tutorial');
    c2('.c2');
    c3('.c3');
    c4('.c4');
    c5('.c5');
    c6('.c6');
    c7('.c7');
    c8('.c8');
    c9('.c9');
}

function c1(s) {
    console.log(`${s} loaded`);
    // let canvas = document.getElementById("tutorial");
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // Drawing rectangles
        ctx.fillRect(25, 25, 100, 100); //    Draws a filled rectangle.
        ctx.clearRect(45, 45, 60, 60); //    Clears the specified rectangular area, making it fully transparent.
        ctx.strokeRect(50, 50, 50, 50);  //    Draws a rectangular outline.
    }
}
// The first line in the script retrieves the node in the DOM representing the <canvas> element by calling the document.getElementById() method. Once you have the element node, you can access the drawing context using its getContext() method.


//////////////////////////////////////////////////////////////////

// Drawing paths
// Now let's look at paths. A path is a list of points, connected by segments of lines that can be of different shapes, curved or not, of different width and of different color. A path, or even a subpath, can be closed. To make shapes using paths, we take some extra steps:
// -First, you create the path.
// -Then you use drawing commands to draw into the path.
// -Once the path has been created, you can stroke or fill the path to render it.

// Here are the functions used to perform these steps:
// beginPath()
//     Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.
// Path methods
//     Methods to set different paths for objects.
// closePath()
//     Adds a straight line to the path, going to the start of the current sub-path.
// stroke()
//     Draws the shape by stroking its outline.
// fill()
//     Draws a solid shape by filling the path's content area. 

// The first step to create a path is to call the beginPath(). Internally, paths are stored as a list of sub-paths (lines, arcs, etc) which together form a shape. Every time this method is called, the list is reset and we can start drawing new shapes.

// Note: When the current path is empty, such as immediately after calling beginPath(), or on a newly created canvas, the first path construction command is always treated as a moveTo(), regardless of what it actually is. For that reason, you will almost always want to specifically set your starting position after resetting a path.

// The second step is calling the methods that actually specify the paths to be drawn. We'll see these shortly.

// The third, and an optional step, is to call closePath(). This method tries to close the shape by drawing a straight line from the current point to the start. If the shape has already been closed or there's only one point in the list, this function does nothing.

// Note: When you call fill(), any open shapes are closed automatically, so you don't have to call closePath(). This is not the case when you call stroke().

function c2(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();

    }
};



// no funciona 🤔  
// body.addEventListener('load', function () {
//     let canvas = document.querySelector('.c3');
//     if (canvas.getContext) {
//         let ctx = canvas.getContext('2d');
//         ctx.beginPath();
//         ctx.moveTo(75, 50);
//         ctx.lineTo(100, 75);
//         ctx.lineTo(100, 25);
//         ctx.fill();
//     }
// })


//////////////////////////////////////////////////////////////////

// Moving the pen

// One very useful function, which doesn't actually draw anything but becomes part of the path list described above, is the moveTo() function. You can probably best think of this as lifting a pen or pencil from one spot on a piece of paper and placing it on the next.

// moveTo(x, y)
//     Moves the pen to the coordinates specified by x and y.

// When the canvas is initialized or beginPath() is called, you typically will want to use the moveTo() function to place the starting point somewhere else. We could also use moveTo() to draw unconnected paths.
function c3(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
        ctx.stroke();
    }
}


//////////////////////////////////////////////////////////////////

// Lines

// For drawing straight lines, use the lineTo() method.

// lineTo(x, y)
//     Draws a line from the current drawing position to the position specified by x and y.

// This method takes two arguments, x and y, which are the coordinates of the line's end point. The starting point is dependent on previously drawn paths, where the end point of the previous path is the starting point for the following, etc. The starting point can also be changed by using the moveTo() method.

// The example below draws two triangles, one filled and one outlined.

function c4(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // Filled triangle
        ctx.beginPath();
        ctx.moveTo(25, 25);
        ctx.lineTo(105, 25);
        ctx.lineTo(25, 105);
        ctx.fill();

        // Stroked triangle
        ctx.beginPath();
        ctx.moveTo(125, 125);
        ctx.lineTo(125, 45);
        ctx.lineTo(45, 125);
        ctx.closePath();
        ctx.stroke();
    }
}


//////////////////////////////////////////////////////////////////

// Arcs

// To draw arcs or circles, we use the arc() or arcTo() methods.

// arc(x, y, radius, startAngle, endAngle, anticlockwise)
//     Draws an arc which is centered at (x, y) position with radius r starting at startAngle and ending at endAngle (radians) going in the given direction indicated by anticlockwise (defaulting to clockwise).
// arcTo(x1, y1, x2, y2, radius)
//     Draws an arc with the given control points and radius, connected to the previous point by a straight line. 


// The following example is a little more complex than the ones we've seen above. It draws 12 different arcs all with different angles and fills.

// The two for loops are for looping through the rows and columns of arcs. For each arc, we start a new path by calling beginPath(). In the code, each of the parameters for the arc is in a variable for clarity, but you wouldn't necessarily do that in real life.

// The x and y coordinates should be clear enough. radius and startAngle are fixed. The endAngle starts at 180 degrees (half a circle) in the first column and is increased by steps of 90 degrees, culminating in a complete circle in the last column.

// The statement for the clockwise parameter results in the first and third row being drawn as clockwise arcs and the second and fourth row as counterclockwise arcs. Finally, the if statement makes the top half stroked arcs and the bottom half filled arcs.

function c5(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.beginPath();
                let x = 25 + j * 50;
                let y = 25 + i * 50;
                let r = 20;
                let startAngle = 0;
                let endAngle = Math.PI + (Math.PI * j) / 2;
                let anticlockwise = i % 2 !== 0;

                ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);

                i > 1 ? ctx.fill() : ctx.stroke();
            }
        }
    }
}

//////////////////////////////////////////////////////////////////

// Bezier and quadratic curves

// The next type of paths available are Bézier curves, available in both cubic and quadratic varieties. These are generally used to draw complex organic shapes.

// quadraticCurveTo(cp1x, cp1y, x, y)
//     Draws a quadratic Bézier curve from the current pen position to the end point specified by x and y, using the control point specified by cp1x and cp1y.
// bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
//     Draws a cubic Bézier curve from the current pen position to the end point specified by x and y, using the control points specified by (cp1x, cp1y) and (cp2x, cp2y).

// The difference between these can best be described using the image on the right. A quadratic Bézier curve has a start and an end point (blue dots) and just one control point (indicated by the red dot) while a cubic Bézier curve uses two control points.

// The x and y parameters in both of these methods are the coordinates of the end point. cp1x and cp1y are the coordinates of the first control point, and cp2x and cp2y are the coordinates of the second control point.

// Quadratic Bezier curves
function c6(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(75, 25);
        ctx.quadraticCurveTo(25, 25, 25, 62.5);
        ctx.quadraticCurveTo(25, 100, 50, 100);
        ctx.quadraticCurveTo(50, 120, 30, 125);
        ctx.quadraticCurveTo(60, 120, 65, 100);
        ctx.quadraticCurveTo(125, 100, 125, 62.5);
        ctx.quadraticCurveTo(125, 25, 75, 25);
        ctx.stroke();
    }
}

// Cubic Bezier curves
function c7(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fill();
    }
}


//////////////////////////////////////////////////////////////////

// Rectangles

// In addition to the three methods we saw in Drawing rectangles, which draw rectangular shapes directly to the canvas, there's also the rect() method, which adds a rectangular path to a currently open path.

// rect(x, y, width, height)
//     Draws a rectangle whose top-left corner is specified by (x, y) with the specified width and height.

// Before this method is executed, the moveTo() method is automatically called with the parameters (x,y). In other words, the current pen position is automatically reset to the default coordinates.

//////////////////////////////////////////////////////////////////

//  Making combinations 

function c8(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        roundedRect(ctx, 12, 12, 150, 150, 15);
        roundedRect(ctx, 19, 19, 150, 150, 9);
        roundedRect(ctx, 53, 53, 49, 33, 10);
        roundedRect(ctx, 53, 119, 49, 16, 6);
        roundedRect(ctx, 135, 53, 49, 33, 10);
        roundedRect(ctx, 135, 119, 25, 49, 10);

        ctx.beginPath();
        ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
        ctx.lineTo(31, 37);
        ctx.fill();

        for (var i = 0; i < 8; i++) {
            ctx.fillRect(51 + i * 16, 35, 4, 4);
        }

        for (i = 0; i < 6; i++) {
            ctx.fillRect(115, 51 + i * 16, 4, 4);
        }

        for (i = 0; i < 8; i++) {
            ctx.fillRect(51 + i * 16, 99, 4, 4);
        }

        ctx.beginPath();
        ctx.moveTo(83, 116);
        ctx.lineTo(83, 102);
        ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
        ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
        ctx.lineTo(111, 116);
        ctx.lineTo(106.333, 111.333);
        ctx.lineTo(101.666, 116);
        ctx.lineTo(97, 111.333);
        ctx.lineTo(92.333, 116);
        ctx.lineTo(87.666, 111.333);
        ctx.lineTo(83, 116);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(91, 96);
        ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
        ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
        ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
        ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
        ctx.moveTo(103, 96);
        ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
        ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
        ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
        ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

// A utility function to draw a rectangle with rounded corners.

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
}

//////////////////////////////////////////////////////////////////

//   Path2D objects

//   As we have seen in the last example, there can be a series of paths and drawing commands to draw objects onto your canvas. To simplify the code and to improve performance, the Path2D object, available in recent versions of browsers, lets you cache or record these drawing commands. You are able to play back your paths quickly.
//   Let's see how we can construct a Path2D object:

//   Path2D()
//       The Path2D() constructor returns a newly instantiated Path2D object, optionally with another path as an argument (creates a copy), or optionally with a string consisting of SVG path data.

//   new Path2D();     // empty path object
//   new Path2D(path); // copy from another Path2D object
//   new Path2D(d);    // path from SVG path data

//   All path methods like moveTo, rect, arc or quadraticCurveTo, etc., which we got to know above, are available on Path2D objects.

//   The Path2D API also adds a way to combine paths using the addPath method. This can be useful when you want to build objects from several components, for example.

//   Path2D.addPath(path [, transform])
//       Adds a path to the current path with an optional transformation matrix. 



function c8(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        let rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);

        let circle = new Path2D();
        circle.arc(100, 35, 25, 0, 2 * Math.PI);

        ctx.stroke(rectangle);
        ctx.fill(circle);
    }
}

function c9(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        let rects = [];
        for (let i = 0; i < 10; i++) {
            rects[i] = new Path2D();
            rects[i].rect(10 + 5 * i, 5 + 5 * i, 50, 50);
            ctx.stroke(rects[i]);
        }
        for (let i = 0; i < 10; i++) {
            rects[i] = new Path2D();
            rects[i].rect(55 - 5 * i, 50 + 5 * i, 50, 50);
            ctx.stroke(rects[i]);
        }

        let circs = [];
        for (let i = 0; i < 30; i++) {
            circs[i] = new Path2D();
            circs[i].arc(130 + 7 * Math.sin(i*0.5) + 3 * i, 30 + 3 * i, 25, 0, 2 * Math.PI);
            ctx.stroke(circs[i]);
        }
    }
}

