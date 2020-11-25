let body = document.querySelector('body');
body.addEventListener('load', draw());

function draw() {
    c1('.c1');
    c2('.c2');
    c3('.c3');
    c4('.c4');
    c5('.c5');
    c6('.c6');
    c7('.c7');
    c8('.c8');
    c9('.c9');
    c10('.c10');
    c11('.c11');
    c12('.c12');
    c13('.c13');
    c14('.c14');
    c15('.c15');
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Saving and restoring state

// Before we look at the transformation methods, let's look at two other methods which are indispensable once you start generating ever more complex drawings.

// save()
//     Saves the entire state of the canvas.
// restore()
//     Restores the most recently saved canvas state.

// Canvas states are stored on a stack. Every time the save() method is called, the current drawing state is pushed onto the stack. A drawing state consists of

//     The transformations that have been applied (i.e. translate, rotate and scale – see below).
//     The current values of the following attributes: strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled.
//     The current clipping path, which we'll see in the next section.

// You can call the save() method as many times as you like. Each time the restore() method is called, the last saved state is popped off the stack and all saved settings are restored.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// A save and restore canvas state example

// This example tries to illustrate how the stack of drawing states functions by drawing a set of consecutive rectangles.


function c1(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        // const str = `El no el no inóvulo el no nonato el noo el no poslodocosmos de impuros ceros noes que noan noan noan y nooan y plurimono noan al morbo amorfo noo no démono no deo sin son sin sexo ni órbita el yerto inóseo noo en unisolo amódulo sin poros ya sin nódulo ni yo ni fosa ni hoyo el macro no ni polvo el no más nada todo el puro no sin no `;
        const str = 'abc de fghij kl mnñop qrst u vw xyz ABCDEF G HI JKL MN ÑOPQ RSTUV WXYZ '
        const palabras = str.split(' ');
        console.log(palabras);
        let p = 0;
        let x, y, rx, ry;
        // let w = 14.75;
        let w;
        let h = 10;
        let r = 25;
        let c = 30
        ctx.translate(30, 30);
        for (let j = 0; j < r; j++) {
            for (let i = 0; i < c; i++) {
                ctx.save();
                rx = 0//2 * (i / ((n - 1))) * (Math.PI);
                ry = 0//1//(j/(n-1)) * (Math.PI);
                w = ctx.measureText(palabras[p]).width;
                // h = ctx.measureText(palabras[p]).height;
                // w = palabras[p].length * (14.75) / 4;
                // console.log('w '+ w);
                x = i * (2 * w) - w / 2;
                // y = j * (2 * h) - h / 2;
                // x = i * w//(2 * w) - w / 2;
                y = j * (2 * h) - h / 2;
                ctx.translate(x, y);
                ctx.rotate((rx * ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '15px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText(palabras[p], -w / 2, -h / 2);
                ctx.restore();
                p < palabras.length - 1 ? p++ : p = 0;
            }
        }
    }
}

// The first step is to draw a large rectangle with the default settings. Next we save this state and make changes to the fill color. We then draw the second and smaller blue rectangle and save the state. Again we change some drawing settings and draw the third semi-transparent white rectangle.

// So far this is pretty similar to what we've done in previous sections. However once we call the first restore() statement, the top drawing state is removed from the stack, and settings are restored. If we hadn't saved the state using save(), we would need to change the fill color and transparency manually in order to return to the previous state. This would be easy for two properties, but if we have more than that, our code would become very long, very fast.

// When the second restore() statement is called, the original state (the one we set up before the first call to save) is restored and the last rectangle is once again drawn in black.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Translating

// The first of the transformation methods we'll look at is translate(). This method is used to move the canvas and its origin to a different point in the grid.

// translate(x, y)
//     Moves the canvas and its origin on the grid. x indicates the horizontal distance to move, and y indicates how far to move the grid vertically.

// It's a good idea to save the canvas state before doing any transformations. In most cases, it is just easier to call the restore method than having to do a reverse translation to return to the original state. Also if you're translating inside a loop and don't save and restore the canvas state, you might end up missing part of your drawing, because it was drawn outside the canvas edge.


// A translate example

// This example demonstrates some of the benefits of translating the canvas origin. Without the translate() method, all of the rectangles would be drawn at the same position (0,0). The translate() method also gives us the freedom to place the rectangle anywhere on the canvas without having to manually adjust coordinates in the fillRect() function. This makes it a little easier to understand and use.

// In the draw() function, we call the fillRect() function nine times using two for loops. In each loop, the canvas is translated, the rectangle is drawn, and the canvas is returned back to its original state. Note how the call to fillRect() uses the same coordinates each time, relying on translate() to adjust the drawing position.

function c2(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.save();
                ctx.fillStyle = `rgb(${51 * i}, ${255 - 51 * i}, 255)`;
                ctx.translate(10 + j * 50, 10 + i * 50);
                ctx.fillRect(0, 0, 25, 25);
                ctx.restore();
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Rotating

// The second transformation method is rotate(). We use it to rotate the canvas around the current origin.

// rotate(angle)
//     Rotates the canvas clockwise around the current origin by the angle number of radians.

// The rotation center point is always the canvas origin. To change the center point, we will need to move the canvas by using the translate() method.


// A rotate example

// In this example, we'll use the rotate() method to first rotate a rectangle from the canvas origin and then from the center of the rectangle itself with the help of translate().

// Reminder: Angles are in radians, not degrees. To convert, we are using: radians = (Math.PI/180)*degrees.

function c3(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // left rectangles, rotate from canvas origin
        ctx.save();
        // blue rect
        ctx.fillStyle = '#0095dd';
        ctx.fillRect(30, 30, 100, 100);
        ctx.rotate((Math.PI / 180) * 25);
        // grey rect
        ctx.fillStyle = '#4d4e53';
        ctx.fillRect(30, 30, 100, 100);
        ctx.restore();

        // right rectangles, rotate from rectangle center
        // draw blue rect
        ctx.fillStyle = '#0095dd';
        ctx.fillRect(150, 30, 100, 100);
        ctx.translate(200, 80);
        // translate to rectangle center 
        // x = x + 0.5 * width
        // y = y + 0.5 * height
        ctx.rotate((Math.PI / 180) * 45); // rotate
        ctx.translate(-200, -80);

        // draw grey rect
        ctx.fillStyle = '#4d4e53';
        ctx.fillRect(150, 30, 100, 100);
    }
}


function c4(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 10;
        ctx.translate(15, 15);
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                ctx.save();
                x = i * 20 - w / 2;
                y = j * 20 - w / 2;
                ctx.translate(x, y);
                rx = (i / 19) * (Math.PI * 2);
                ry = (j / 19) * (Math.PI * 2);
                ctx.rotate((rx * ry));
                ctx.fillRect(-w / 2, -w / 2, 10, 10);
                ctx.restore();
            }
        }
    }
}

function c5(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 10;
        let n = 20;
        ctx.translate(15, 15);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * 20 - w / 2;
                y = j * 20 - w / 2;
                ctx.translate(x, y);
                rx = (i / (n - 1)) * (Math.PI * 2);
                ry = (j / (n - 1)) * (Math.PI * 2);
                ctx.rotate((rx * ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '12px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('A', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

// function c6(s) {
//     console.log(`${s} loaded`);
//     let canvas = document.querySelector(s);
//     if (canvas.getContext) {
//         let ctx = canvas.getContext('2d');

//         // ctx.fillStyle = '#0095dd';
//         let x, y, rx, ry;
//         let w = 10;
//         let n = 20;
//         ctx.translate(15, 15);
//         for (let i = 0; i < n; i++) {
//             for (let j = 0; j < n; j++) {
//                 ctx.save();
//                 // x = i * 20 - w / 2;
//                 // y = j * 20 - w / 2;
//                 x = i * 20 - w / 2;
//                 y = j * 20 - w / 2;
//                 ctx.translate(x, y);
//                 rx = (i/(n-1)) * (Math.PI*2);
//                 ry = (j/(n-1)) * (Math.PI*2);
//                 ctx.rotate((rx*ry));
//                 // ctx.rotate(i * 0.1 - j * 0.1);
//                 // ctx.fillRect(-w/2, -w/2, 10, 10);
//                 ctx.font='10px serif';
//                 ctx.textBaseline = 'hanging';
//                 ctx.fillText('raro', -w/2, -w/2);  

//                 ctx.restore();
//             }
//         }
//     }
// }

function c6(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let n = 24;
        let w = n / 2;
        let ii, jj;
        ctx.translate(w * 2, w * 2);
        for (let i = 0; i < n; i++) {
            // ii = i < n/2 ? i : n/2-i;
            // ii = i < n/2 ? i : i -(n/2-i);
            ii = i <= n / 2 ? i : -(n - 1 - i);
            console.log(ii);
            for (let j = 0; j < n; j++) {
                jj = j <= n / 2 ? j : -(n - 1 - j);
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * n - w / 2;
                y = j * n - w / 2;
                ctx.translate(x, y);
                // rx = (ii/((n-1)/2)) * (Math.PI*2);
                // ry = (jj/((n-1)/2)) * (Math.PI*2);
                rx = (ii / ((n - 1))) * (Math.PI * 2);
                ry = (jj / ((n - 1))) * (Math.PI * 2);
                ctx.rotate((rx * ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = `${n / 2}px serif`;
                ctx.textBaseline = 'hanging';
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c7(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 14.75;
        let n = 20;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                rx = (i / (n - 1)) * (Math.PI);
                ry = (j / (n - 1)) * (Math.PI * 2);
                ctx.rotate((rx * ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '15px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c8(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 14.75;
        let n = 20;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                rx = 2 * (i / ((n - 1))) * (Math.PI);
                ry = 1//(j/(n-1)) * (Math.PI);
                ctx.rotate((rx * ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '15px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c9(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 14.75;
        let n = 20;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                rx = 2 * (i / ((n - 1))) * (Math.PI);
                ry = 2 * (j / ((n - 1))) * (Math.PI);
                ctx.rotate((rx - ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '15px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c10(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 14.75;
        let n = 20;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                // rx = (i/(n-1)) * (Math.PI);
                // ry = (j/(n-1)) * (Math.PI*2);
                rx = (i / (n - 1)) * (Math.PI * 2);
                ry = (j / (n - 1)) * (Math.PI * 2);
                rx = 2 * Math.sin(rx);
                ry = 2 * Math.sin(ry);
                // console.log(rx, ry);
                ctx.rotate((rx * ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '15px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c11(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 14.75;
        let n = 20;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                // rx = (i/(n-1)) * (Math.PI);
                // ry = (j/(n-1)) * (Math.PI*2);
                rx = (i / (n - 1)) * (Math.PI * 2);
                ry = (j / (n - 1)) * (Math.PI * 2);
                rx = 2 * Math.sin(rx);
                ry = 2 * Math.sin(ry);
                // console.log(rx, ry);
                ctx.rotate((rx + ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '15px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c12(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 14.75;
        let n = 20;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                // rx = (i/(n-1)) * (Math.PI);
                // ry = (j/(n-1)) * (Math.PI*2);
                rx = (i / (n - 1)) * (Math.PI * 2);
                ry = (j / (n - 1)) * (Math.PI * 2);
                rx = 2 * Math.sin(rx);
                ry = 2 * Math.sin(ry);
                // console.log(rx, ry);
                ctx.rotate((rx + ry) * (rx - ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '15px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c13(s) {
    // console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 14.75;
        let n = 20;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                // rx = (i/(n-1)) * (Math.PI);
                // ry = (j/(n-1)) * (Math.PI*2);
                rx = (i / (n - 1)) * (Math.PI * 2);
                ry = (j / (n - 1)) * (Math.PI * 2);
                rx = Math.abs(Math.sin(rx + Math.sin(ry)));
                ry = Math.cos(ry + Math.cos(rx));
                // console.log(rx, ry);
                ctx.rotate(Math.PI * rx * 0.5);
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '17px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillStyle = `rgb(${rx * 255},${0},${0})`;
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c14(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 14.75;
        let n = 20;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                // rx = (i/(n-1)) * (Math.PI);
                // ry = (j/(n-1)) * (Math.PI*2);
                rx = (i / (n - 1)) * (Math.PI * 2);
                ry = (j / (n - 1)) * (Math.PI * 2);
                let r = 1 * Math.sin(rx + ry) + 1 * Math.cos(rx + ry);
                // ry = 300+2*Math.cos(ry);
                // console.log(rx, ry);
                ctx.rotate(r);
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                // ctx.font='15px Quicksand, sans-serif';
                // ctx.font='25px "Great Vibes", cursive';
                // ctx.font='11px "Druk Wide Super", sans-serif';
                // ctx.font='30px "Druk XCond Super", sans-serif';
                // ctx.font='14px "Farisea Dark", sans-serif';
                ctx.font = '17px "BlackmoonFY-Regular", sans-serif';
                // ctx.font='17px "Alkhemikal", sans-serif';
                // ctx.font='20px "BM", sans-serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('Raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}

function c15(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        let x, y, rx, ry;
        let w = 10;
        let n = 20 * 3;
        ctx.translate(w * 1.5, w * 1.5);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.save();
                // x = i * 20 - w / 2;
                // y = j * 20 - w / 2;
                x = i * (2 * w) - w / 2;
                y = j * (2 * w) - w / 2;
                ctx.translate(x, y);
                // rx = (i/(n-1)) * (Math.PI);
                // ry = (j/(n-1)) * (Math.PI*2);
                rx = (i / (n - 1)) * (Math.PI);
                ry = (j / (n - 1)) * (Math.PI * 2);
                rx = Math.abs(Math.sin(4 * rx + Math.sin(4 * ry)));
                ry = 1//Math.abs(Math.sin(ry));
                // console.log(rx, ry);
                ctx.rotate((rx * ry));
                // ctx.rotate(i * 0.1 - j * 0.1);
                // ctx.fillRect(-w/2, -w/2, 10, 10);
                ctx.font = '18px serif';
                ctx.textBaseline = 'hanging';
                ctx.fillText('raro', -w / 2, -w / 2);
                ctx.restore();
            }
        }
    }
}