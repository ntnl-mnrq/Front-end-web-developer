let body = document.querySelector('body');
body.addEventListener('load', draw());

// The script includes a function called draw(), which is executed once the page finishes loading; this is done by listening for the load event on the document. This function, or one like it, could also be called using window.setTimeout(), window.setInterval(), or any other event handler, as long as the page has been loaded first.


function draw() {
    c1('.tutorial');
    c2('.c2');
    c3('.c3');
    c4('.c4');
    // c5('.c5');
    // c6('.c6');
    // c7('.c7');
    // c8('.c8');
    // c9('.c9');
    // c10('.c10');
    // c11('.c11');
    // c12('.c12'); 
    // c13('.c13'); 
}

// Drawing text

// The canvas rendering context provides two methods to render text:

// fillText(text, x, y [, maxWidth])
//     Fills a given text at the given (x,y) position. Optionally with a maximum width to draw.
// strokeText(text, x, y [, maxWidth])
//     Strokes a given text at the given (x,y) position. Optionally with a maximum width to draw. 

// A fillText example
// The text is filled using the current fillStyle.
function c1(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.font='48px serif';
        ctx.fillText('Holu :)', 10, 50);        
    }
}

// A strokeText example
// The text is filled using the current strokeStyle.
function c2(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.font='48px serif';
        ctx.strokeText('Holu :)', 10, 50);        
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// Styling text

// In the examples above we are already making use of the font property to make the text a bit larger than the default size. There are some more properties which let you adjust the way the text gets displayed on the canvas:

// font = value
//     The current text style being used when drawing text. This string uses the same syntax as the CSS font property. The default font is 10px sans-serif.
// textAlign = value
//     Text alignment setting. Possible values: start, end, left, right or center. The default value is start.
// textBaseline = value
//     Baseline alignment setting. Possible values: top, hanging, middle, alphabetic, ideographic, bottom. The default value is alphabetic.
// direction = value
//     Directionality. Possible values: ltr, rtl, inherit. The default value is inherit.

// These properties might be familiar to you, if you have worked with CSS before.

// A textBaseline example

function c3(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.font ='48px serif';
        ctx.textBaseline = 'hanging';
        // ctx.textBaseline = 'bottom';
        ctx.strokeText('Holu :)', 0, 100);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// Advanced text measurements

// In the case you need to obtain more details about the text, the following method allows you to measure it.

// measureText()
//     Returns a TextMetrics object containing the width, in pixels, that the specified text will be when drawn in the current text style.

// The following code snippet shows how you can measure a text and get its width.

// function draw() {
//   var ctx = document.getElementById('canvas').getContext('2d');
//   var text = ctx.measureText('foo'); // TextMetrics object
//   text.width; // 16;
// }


