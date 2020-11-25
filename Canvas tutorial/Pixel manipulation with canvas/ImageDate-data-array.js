// The ImageData object

// The ImageData object represents the underlying pixel data of an area of a canvas object. It contains the following read-only attributes:

// width
//     The width of the image in pixels.
// height
//     The height of the image in pixels.
// data
//     A Uint8ClampedArray representing a one-dimensional array containing the data in the RGBA order, with integer values between 0 and 255 (included).

// The data property returns a Uint8ClampedArray which can be accessed to look at the raw pixel data; each pixel is represented by four one-byte values (red, green, blue, and alpha, in that order; that is, "RGBA" format). Each color component is represented by an integer between 0 and 255. Each component is assigned a consecutive index within the array, with the top left pixel's red component being at index 0 within the array. Pixels then proceed from left to right, then downward, throughout the array.

// The Uint8ClampedArray contains height × width × 4 bytes of data, with index values ranging from 0 to (height×width×4)-1.

// For example, to read the blue component's value from the pixel at column 200, row 50 in the image, you would do the following:

// blueComponent = imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 2];

// If given a set of coordinates (X and Y), you may end up doing something like this:

var xCoord = 50;
var yCoord = 100;
var canvasWidth = 1024;

function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

var colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);

var redIndex = colorIndices[0];
var greenIndex = colorIndices[1];
var blueIndex = colorIndices[2];
var alphaIndex = colorIndices[3];

var redForCoord = imageData.data[redIndex];
var greenForCoord = imageData.data[greenIndex];
var blueForCoord = imageData.data[blueIndex];
var alphaForCoord = imageData.data[alphaIndex];

// Or, if ES2015 is appropriate:

const xCoord = 50;
const yCoord = 100;
const canvasWidth = 1024;

const getColorIndicesForCoord = (x, y, width) => {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
};

const colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);

const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices;

// You may also access the size of the pixel array in bytes by reading the Uint8ClampedArray.length attribute:

var numBytes = imageData.data.length;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Creating an ImageData object

// To create a new, blank ImageData object, you should use the createImageData() method. There are two versions of the createImageData() method:
var myImageData = ctx.createImageData(width, height);
// This creates a new ImageData object with the specified dimensions. All pixels are preset to transparent black (all zeroes i.e rgba(0,0,0,0)).

// You can also create a new ImageData object with the same dimensions as the object specified by anotherImageData. The new object's pixels are all preset to transparent black. 
// This does not copy the image data!
var myImageData = ctx.createImageData(anotherImageData);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Getting the pixel data for a context

// To obtain an ImageData object containing a copy of the pixel data for a canvas context, you can use the getImageData() method:

var myImageData = ctx.getImageData(left, top, width, height);

// This method returns an ImageData object representing the pixel data for the area of the canvas whose corners are represented by the points (left,top), (left+width, top), (left, top+height), and (left+width, top+height). The coordinates are specified in canvas coordinate space units.

// Note: Any pixels outside the canvas are returned as transparent black in the resulting ImageData object.

// This method is also demonstrated in the article Manipulating video using canvas.