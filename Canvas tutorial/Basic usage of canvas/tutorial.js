let body = document.querySelector('body');
body.addEventListener('load', draw());

// The script includes a function called draw(), which is executed once the page finishes loading; this is done by listening for the load event on the document. This function, or one like it, could also be called using window.setTimeout(), window.setInterval(), or any other event handler, as long as the page has been loaded first.


function draw() {
    let canvas = document.getElementById("tutorial");
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200,0,0)';
        ctx.fillRect(10,10,50,50);

        ctx.fillStyle = 'rgb(0,0,200,0.5)'
        ctx.fillRect(30,30,50,50);
    }
}
// The first line in the script retrieves the node in the DOM representing the <canvas> element by calling the document.getElementById() method. Once you have the element node, you can access the drawing context using its getContext() method.
