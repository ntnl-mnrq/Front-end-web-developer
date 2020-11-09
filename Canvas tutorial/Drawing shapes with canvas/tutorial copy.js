let body = document.querySelector('body');
body.addEventListener('load', draw());

// The script includes a function called draw(), which is executed once the page finishes loading; this is done by listening for the load event on the document. This function, or one like it, could also be called using window.setTimeout(), window.setInterval(), or any other event handler, as long as the page has been loaded first.


function draw() {
    console.log('c1 loaded');
    // let canvas = document.getElementById("tutorial");
    let canvas = document.querySelector('.tutorial');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // Drawing rectangles
        ctx.fillRect(25, 25, 100, 100); //    Draws a filled rectangle.
        ctx.clearRect(45, 45, 60, 60); //    Clears the specified rectangular area, making it fully transparent.
        ctx.strokeRect(50, 50, 50, 50);  //    Draws a rectangular outline.
    }
}
// The first line in the script retrieves the node in the DOM representing the <canvas> element by calling the document.getElementById() method. Once you have the element node, you can access the drawing context using its getContext() method.



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
body.addEventListener('load', draw2('.c2'));

function draw2(c) {
    console.log('c2 loaded');
    let canvas = document.querySelector(c);
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


// Moving the pen

// One very useful function, which doesn't actually draw anything but becomes part of the path list described above, is the moveTo() function. You can probably best think of this as lifting a pen or pencil from one spot on a piece of paper and placing it on the next.

// moveTo(x, y)
//     Moves the pen to the coordinates specified by x and y.

// When the canvas is initialized or beginPath() is called, you typically will want to use the moveTo() function to place the starting point somewhere else. We could also use moveTo() to draw unconnected paths.

body.onload = function () {
    let canvas = document.querySelector('.c3');
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



// Lines

// For drawing straight lines, use the lineTo() method.

// lineTo(x, y)
//     Draws a line from the current drawing position to the position specified by x and y.

// This method takes two arguments, x and y, which are the coordinates of the line's end point. The starting point is dependent on previously drawn paths, where the end point of the previous path is the starting point for the following, etc. The starting point can also be changed by using the moveTo() method.

// The example below draws two triangles, one filled and one outlined.

// body.onload = function () {
//     let canvas = document.querySelector('.c4');
//     if (canvas.getContext) {
//         let ctx = canvas.getContext('2d');

//         // Filled triangle
//         ctx.beginPath();
//         ctx.moveTo(25, 25);
//         ctx.lineTo(125,125);
//         ctx.fill();

//         // Stroked triangle
//     }
// }