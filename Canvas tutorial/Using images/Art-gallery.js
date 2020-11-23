// Art gallery example

// In the final example of this chapter, we'll build a little art gallery. The gallery consists of a table containing several images. When the page is loaded, a <canvas>  element is inserted for each image and a frame is drawn around it.

// In this case, every image has a fixed width and height, as does the frame that's drawn around them. You could enhance the script so that it uses the image's width and height to make the frame fit perfectly around it.

// The code below should be self-explanatory. We loop through the document.images container and add new canvas elements accordingly. Probably the only thing to note, for those not so familiar with the DOM, is the use of the Node.insertBefore method. insertBefore() is a method of the parent node (a table cell) of the element (the image) before which we want to insert our new node (the canvas element).

function draw() {

    // Loop through all images
    for (let i = 0; i < document.images.length; i++) {

        // Don't add a canvas for the frame image
        if (document.images[i].getAttribute('id') != 'frame') {

            // Create canvas element
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', 132);
            canvas.setAttribute('height', 150);

            // Insert before the image
            document.images[i].parentNode.insertBefore(canvas, document.images[i]);

            ctx = canvas.getContext('2d');

            // Draw image to canvas
            ctx.drawImage(document.images[i], 15, 20)

            // Add frame
            ctx.drawImage(document.getElementById('frame'), 0, 0);
        }
    }
}