let body = document.querySelector('body');
body.addEventListener('load', draw());

function draw() {
    c1('.c1');
    // c2('.c2');
    // c3('.c3');
    // c4('.c4');
    // c5('.c5');
    // c6('.c6');
    // c7('.c7');
    // c8('.c8');
    // c9('.c9');
    // c10('.c10');
    // c11('.c11');
    // c12('.c12');
    // c13('.c13');
    // c14('.c14');
    // c15('.c15');
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

        //!!Agregar un espacio al final de la cadena siempre
        // const str = `El no el no inóvulo el no nonato el noo el no poslodocosmos de impuros ceros noes que noan noan noan y nooan y plurimono noan al morbo amorfo noo no démono no deo sin son sin sexo ni órbita el yerto inóseo noo en unisolo amódulo sin poros ya sin nódulo ni yo ni fosa ni hoyo el macro no ni polvo el no más nada todo el puro no sin no. `;
        // const str = "Cansado. ¡Sí! Cansado de usar un solo bazo, dos labios, veinte dedos, no sé cuántas palabras, no sé cuantos recuerdos, grisáceos, fragmentarios. Cansado, muy cansado de este frío esqueleto, tan púdico, tan casto, que cuando se desnude no sabrá si es el mismo que usé mientras vivía. Cansado. ¡Sí! Cansado por carecer de antenas, de un ojo en cada omóplato y de una cola autentica, alegre desatada, y no este rabo hipócrita, degenerado, enano. Cansado, sobre todo, de estar siempre conmigo, de hallarme cada día, cuando termina el sueño, allí, donde me encuentre, con las mismas narices y con las mismas piernas; como si no deseara esperar la rompiente con un cutis de playa, ofrecer, al rocío, dos senos de magnolia, acariciar la tierra con un vientre de oruga, y vivir, unos meses, adentro de una piedra. "
        const str = "Abandoné las sombras, las espesas paredes, los ruidos familiares, la amistad de los libros, el tabaco, las plumas, los secos cielorrasos; para salir volando, desesperadamente. Abajo: en la penumbra, las amargas cornisas, las calles desoladas, los faroles sonámbulos, las muertas chimeneas los rumores cansados, desesperadamente. Ya todo era silencio, simuladas catástrofes, grandes charcos de sombra, aguaceros, relámpagos, vagabundos islotes de inestable riberas; pero seguí volando, desesperadamente. Un resplandor desnudo, una luz calcinante se interpuso en mi ruta, me fascinó de muerte, pero logré evadirme de su letal influjo, para seguir volando, desesperadamente. Todavía el destino de mundos fenecidos, desorientó mi vuelo -de sideral constancia- con sus vanas parábolas y sus aureolas falsas; pero seguí volando, desesperadamente. Me oprimía lo flúido, la limpidez maciza, el vacío escarchado, la inaudible distancia, la oquedad insonora, el reposo asfixiante; pero seguía volando, desesperadamente. Ya no existía nada, la nada estaba ausente; ni oscuridad, ni lumbre, -ni unas manos celestes- ni vida, ni destino, ni misterio, ni muerte; pero seguía volando, desesperadamente. ";
        // const  str = "Toco toco poros amarras calas toco teclas de nervios muelles tejidos que me tocan cicatrices cenizas trópicos vientres toco solos solos resacas estertores toco y mas toco y nada Prefiguras de ausencia inconsistentes tropos qué tú qué qué qué quenas qué hondonadas qué máscaras qué soledades huecas qué sí qué no qué sino que me destempla el toque qué reflejos qué fondos qué materiales brujos qué llaves qué ingredientes nocturnos qué fallebas heladas que no abren qué nada toco en todo. ";
//         const str = `Toco 
// toco poros
// amarras
// calas toco
// teclas de nervios
// muelles
// tejidos que me tocan
// cicatrices
// cenizas
// trópicos vientres toco
// solos solos
// resacas
// estertores
// toco y mas toco
// y nada
// Prefiguras de ausencia
// inconsistentes tropos
// qué tú
// qué qué
// qué quenas
// qué hondonadas
// qué máscaras
// qué soledades huecas
// qué sí qué no
// qué sino que me destempla el toque
// qué reflejos
// qué fondos
// qué materiales brujos
// qué llaves
// qué ingredientes nocturnos
// qué fallebas heladas que no abren
// qué nada toco
// en todo`
        // const str = 'abc de fghij kl mnñop qrst u vw xyz ABCDEF G HI JKL MN ÑOPQ RSTUV WXYZ '
        const palabras = str.split(' ');
        console.log(palabras);
        console.log(palabras.length);
        let ip = 0; //índice de palabra
        let x = 0; //coord x del centro de la palabra
        let y = 0; //coord y del centro de la palabra
        let rx, ry; //parámetros de la rotación
        fontSize = 13;
        ctx.font = `${fontSize}px serif`;
        ctx.textBaseline = 'hanging';
        let w; //ancho en px de cada palabra 
        let mw = maxW(palabras, ctx);  //ancho en px de la palabra más larga
        let s = ctx.measureText(' ').width * 2; // ancho del espacio horizontal entre palabras en px
        // let h = fontSize / 2; //altura de la línea
        //densidad vertical
        h = mw/8;
        //
        let r = 15; //filas *no usado
        // let c = 12; //columnas, o sea, palabras por fila
        let c = Math.sqrt(palabras.length);
        let margen = 30;
        ctx.translate(margen, margen);
        // for (let j = 0; j < r; j++) {
        // En lugar de contar r filas, agrego tantas filas como sean necesarias para completar el texto
        for (let j = 0; ip < palabras.length - 1; j++) {
            x = -s;
            // for (let i = 0; i < c; i++) {
            for (let i = 0; i < c; i++) {
                // w = ctx.measureText(palabras[ip]).width;
                // densidad horizontal
                w = mw*0.5;
                //
                // w = Math.ceil(ctx.measureText(palabras[ip]).actualBoundingBoxRight);
                // console.log('l = ' + ctx.measureText(palabras[ip]).actualBoundingBoxLeft);
                // console.log('r = ' + ctx.measureText(palabras[ip]).actualBoundingBoxRight);
                //////////////////////////////////////////////////////////////////////////
                // fontHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;         //
                // actualHeight = actualBoundingBoxAscent + actualBoundingBoxDescent;   //
                //                                                                      //
                // fontHeight is the bounding box height regardless of the string being //
                // rendered. actualHeight is specific to the string being rendered.     //
                //////////////////////////////////////////////////////////////////////////
                // h = ctx.measureText(palabras[ip]).actualBoundingBoxAscent + ctx.measureText(palabras[ip]).actualBoundingBoxDescent;
                // h = ctx.measureText(palabras[ip]).fontBoundingBoxAscent + ctx.measureText(palabras[ip]).fontBoundingBoxDescent;
                // console.log('h ' + h);
                // h = ctx.measureText(palabras[ip]).height;
                // w = palabras[ip].length * (14.75) / 4;
                // x = i * (2 * w) - w / 2;
                // x += 20 +( w) - w / 2;
                // x < canvas.width ? x += s +( w) - w / 2 : x = 0;
                // x = centro de la palabra
                if (x + w / 2 + s < canvas.width - 3 * margen) {
                    ctx.save();
                    // rx = 0;
                    // ry = 0;
                    // rx = 2 * (i / ((c - 1))) * (Math.PI);
                    // ry = (j / (c - 1)) * (Math.PI);
                    x += s + w / 2;
                    // console.log(canvas.width);
                    // console.log(`w[${ip}]` + w);
                    // console.log(`x[${ip}]` + x);
                    // y = j * (2 * h) - h / 2;
                    // x = i * w//(2 * w) - w / 2;
                    y = 2 * j * (2 * h) - h / 2;
                    ctx.translate(x, y);
                    // ctx.rotate((rx * ry));
                    ctx.rotate(rotacion(i, j, c, 9));
                    // ctx.rotate(i * 0.1 - j * 0.1);
                    //
                    // guias(w, h, s, ctx);
                    //
                    // ctx.textAlign = 'left';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'rgba(0,0,0,1)';
                    // ctx.fillText(palabras[ip], w/2, -h / 2);
                    ctx.fillText(palabras[ip], 0, -h / 2);
                    ctx.restore();
                    // ip < palabras.length - 1 ? ip++ : ip = 0;
                    ip < palabras.length - 1 ? ip++ : null;
                    x += w / 2; // x = final de la palabra
                }
            }
        }
    }
}

function rotacion(i, j, c, a) {
    let rx = 0;
    let ry = 0;
    let r;
    switch (a) {
        case 0:
            rx = 2 * (i / ((c - 1))) * (Math.PI);
            ry = (j / (c - 1)) * (Math.PI);
            r = rx * ry;
            break;
        case 1:
            r = i * 0.1 - j * 0.2;
            break;
        case 2:
            rx = 2 * (i / ((c - 1))) * (Math.PI);
            ry = 1//(j/(n-1)) * (Math.PI);
            r = (rx * ry) * 0.5;
            break;
        case 3:
            rx = (i / (c - 1)) * (Math.PI * 2);
            ry = (j / (c - 1)) * (Math.PI * 2);
            r = rx * ry;
            break;
        case 4:
            rx = 2 * (i / ((c - 1))) * (Math.PI);
            ry = 2 * (j / ((c - 1))) * (Math.PI);
            r = (rx - ry);
            break;
        case 5:
            rx = (i / (c - 1)) * (Math.PI * 2);
            ry = (j / (c - 1)) * (Math.PI * 2);
            rx = 2 * Math.sin(rx);
            ry = 2 * Math.sin(ry);
            r = (rx * ry);
            break;
        case 6:
            rx = (i / (c - 1)) * (Math.PI * 2);
            ry = (j / (c - 1)) * (Math.PI * 2);
            rx = 2 * Math.sin(rx);
            ry = 2 * Math.sin(ry);
            r = (rx + ry);
            break;
        case 7:
            rx = (i / (c - 1)) * (Math.PI * 2);
            ry = (j / (c - 1)) * (Math.PI * 2);
            rx = 2 * Math.sin(rx);
            ry = 2 * Math.sin(ry);
            r = ((rx + ry) * (rx - ry));
            break;
        case 8:
            rx = (i / (c - 1)) * (Math.PI * 2);
            ry = (j / (c - 1)) * (Math.PI * 2);
            rx = Math.abs(Math.sin(rx + Math.sin(ry)));
            ry = Math.cos(ry + Math.cos(rx));
            r = (Math.PI * rx * 0.5);
            break;
        case 9:
            rx = (i / (c - 1)) * (Math.PI * 2);
            ry = (j / (c - 1)) * (Math.PI * 2);
            r = 1 * Math.sin(rx + ry) + 1 * Math.cos(rx + ry);
            break;
        case 10:
            rx = (i / (c - 1)) * (Math.PI);
            ry = (j / (c - 1)) * (Math.PI * 2);
            rx = Math.abs(Math.sin(4 * rx + Math.sin(4 * ry)));
            ry = 1
            r = (rx * ry);
            break;
        default:
            r = 0;
            break;
    }
    return r;
}

function maxW(palabras, ctx) {
    var i = palabras.length, max = 0; 
    var im = 0;
    while (i--) {
      if (palabras[i].length > max) {
        max = palabras[i].length;
        im = i;
      }
    }
    console.log('palabra más larga: "'+palabras[im]+'" '+palabras[im].length+ ' letras, '+ctx.measureText(palabras[im]).width+'px,'+' n '+ im);
    return ctx.measureText(palabras[im]).width;
  };

function guias(w, h, s, ctx){
    ctx.fillStyle = 'rgba(255,0,0,0.25)';
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.fillStyle = 'rgba(0,255,0,0.25)';
    ctx.fillRect(w / 2, -h / 2, s, h);
}

// function maxW (palabras) {
//     let ws = [];
//     let i = 0;
//     palabras.forEach(element => {
//         ws[i] = element.length;
//         i++;
//     });
//     return Math.max.apply(Math, ws);
// }

// function arrayMax(arr) {
//   var len = arr.length, max = -Infinity;
//   while (len--) {
//     if (arr[len] > max) {
//       max = arr[len];
//     }
//   }
//   return max;
// };

function c2(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        //!!Agregar un espacio al final de la cadena siempre
        // const str = `El no el no inóvulo el no nonato el noo el no poslodocosmos de impuros ceros noes que noan noan noan y nooan y plurimono noan al morbo amorfo noo no démono no deo sin son sin sexo ni órbita el yerto inóseo noo en unisolo amódulo sin poros ya sin nódulo ni yo ni fosa ni hoyo el macro no ni polvo el no más nada todo el puro no sin no. `;
        // const str = "Cansado. ¡Sí! Cansado de usar un solo bazo, dos labios, veinte dedos, no sé cuántas palabras, no sé cuantos recuerdos, grisáceos, fragmentarios.  Cansado, muy cansado de este frío esqueleto, tan púdico, tan casto, que cuando se desnude no sabrá si es el mismo que usé mientras vivía.  Cansado. ¡Sí! Cansado por carecer de antenas, de un ojo en cada omóplato y de una cola autentica, alegre desatada, y no este rabo hipócrita, degenerado, enano.  Cansado, sobre todo, de estar siempre conmigo, de hallarme cada día, cuando termina el sueño, allí, donde me encuentre, con las mismas narices y con las mismas piernas; como si no deseara esperar la rompiente con un cutis de playa, ofrecer, al rocío, dos senos de magnolia, acariciar la tierra con un vientre de oruga, y vivir, unos meses, adentro de una piedra."
        const str = "Abandoné las sombras, las espesas paredes, los ruidos familiares, la amistad de los libros, el tabaco, las plumas, los secos cielorrasos; para salir volando, desesperadamente. Abajo: en la penumbra, las amargas cornisas, las calles desoladas, los faroles sonámbulos, las muertas chimeneas los rumores cansados, desesperadamente. Ya todo era silencio, simuladas catástrofes, grandes charcos de sombra, aguaceros, relámpagos, vagabundos islotes de inestable riberas; pero seguí volando, desesperadamente. Un resplandor desnudo, una luz calcinante se interpuso en mi ruta, me fascinó de muerte, pero logré evadirme de su letal influjo, para seguir volando, desesperadamente. Todavía el destino de mundos fenecidos, desorientó mi vuelo -de sideral constancia- con sus vanas parábolas y sus aureolas falsas; pero seguí volando, desesperadamente. Me oprimía lo flúido, la limpidez maciza, el vacío escarchado, la inaudible distancia, la oquedad insonora, el reposo asfixiante; pero seguía volando, desesperadamente. Ya no existía nada, la nada estaba ausente; ni oscuridad, ni lumbre, -ni unas manos celestes- ni vida, ni destino, ni misterio, ni muerte; pero seguía volando, desesperadamente. ";
        // const str = 'abc de fghij kl mnñop qrst u vw xyz ABCDEF G HI JKL MN ÑOPQ RSTUV WXYZ '
        const palabras = str.split(' ');
        console.log(palabras);
        console.log(palabras.length);
        let p = 0;
        let x = 0;
        let y, rx, ry;
        // let w = 14.75;
        fontSize = 15;
        let w; //ancho de cada palabra en px
        // let s = 20; // ancho del espacio entre palabras en px
        // let s = ctx.measureText(' ').width; 
        let s = ctx.measureText(' ').width * 2;
        let h = fontSize / 2;
        let r = 10; //filas 
        let c = 10; //columnas
        let margen = 30;
        ctx.translate(margen, margen);
        // for (let j = 0; j < r; j++) {
        // En lugar de contar r filas, agrego tantas filas como sean necesarias para completar el texto
        for (let j = 0; p < palabras.length - 1; j++) {
            x = -s;
            for (let i = 0; i < c; i++) {
                ctx.save();
                // rx = 0;
                // ry = 0;
                rx = 2 * (i / ((c - 1))) * (Math.PI);
                ry = (j / (c - 1)) * (Math.PI);
                ctx.font = `${fontSize}px serif`;
                ctx.textBaseline = 'hanging';
                w = ctx.measureText(palabras[p]).width;
                // w = Math.ceil(ctx.measureText(palabras[p]).actualBoundingBoxRight);
                // console.log('l = ' + ctx.measureText(palabras[p]).actualBoundingBoxLeft);
                // console.log('r = ' + ctx.measureText(palabras[p]).actualBoundingBoxRight);
                //////////////////////////////////////////////////////////////////////////
                // fontHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;         //
                // actualHeight = actualBoundingBoxAscent + actualBoundingBoxDescent;   //
                //                                                                      //
                // fontHeight is the bounding box height regardless of the string being //
                // rendered. actualHeight is specific to the string being rendered.     //
                //////////////////////////////////////////////////////////////////////////
                // h = ctx.measureText(palabras[p]).actualBoundingBoxAscent + ctx.measureText(palabras[p]).actualBoundingBoxDescent;
                // h = ctx.measureText(palabras[p]).fontBoundingBoxAscent + ctx.measureText(palabras[p]).fontBoundingBoxDescent;
                console.log('h ' + h);
                // h = ctx.measureText(palabras[p]).height;
                // w = palabras[p].length * (14.75) / 4;
                // x = i * (2 * w) - w / 2;
                // x += 20 +( w) - w / 2;
                // x < canvas.width ? x += s +( w) - w / 2 : x = 0;
                x += s + w / 2;
                // x = centro de la palabra
                if (x + w / 2 < canvas.width - margen) {
                    // console.log(canvas.width);
                    console.log(`w[${p}]` + w);
                    console.log(`x[${p}]` + x);
                    // y = j * (2 * h) - h / 2;
                    // x = i * w//(2 * w) - w / 2;
                    y = 2 * j * (2 * h) - h / 2;
                    ctx.translate(x, y);
                    // ctx.rotate((rx * ry));
                    ctx.rotate(i * 0.1 - j * 0.2);
                    // ctx.fillStyle = 'rgba(255,0,0,0.25)';
                    // ctx.fillRect(-w / 2, -h / 2, w, h);
                    // ctx.fillStyle = 'rgba(0,255,0,0.25)';
                    // ctx.fillRect(w / 2, -h / 2, s, h);
                    // ctx.textAlign = 'left';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'rgba(0,0,0,1)';
                    // ctx.fillText(palabras[p], w/2, -h / 2);
                    ctx.fillText(palabras[p], 0, -h / 2);
                    ctx.restore();
                    // p < palabras.length - 1 ? p++ : p = 0;
                    p < palabras.length - 1 ? p++ : null;
                    x += w / 2; // x = final de la palabra
                }
            }
        }
    }
}


function c3(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        const str = "Cansado. ¡Sí! Cansado de usar un solo bazo, dos labios, veinte dedos, no sé cuántas palabras, no sé cuantos recuerdos, grisáceos, fragmentarios. Cansado, muy cansado de este frío esqueleto, tan púdico, tan casto, que cuando se desnude no sabrá si es el mismo que usé mientras vivía.  Cansado. ¡Sí! Cansado por carecer de antenas, de un ojo en cada omóplato y de una cola autentica, alegre desatada, y no este rabo hipócrita, degenerado, enano. Cansado, sobre todo, de estar siempre conmigo, de hallarme cada día, cuando termina el sueño, allí, donde me encuentre, con las mismas narices y con las mismas piernas; como si no deseara esperar la rompiente con un cutis de playa, ofrecer, al rocío, dos senos de magnolia, acariciar la tierra con un vientre de oruga, y vivir, unos meses, adentro de una piedra."
        const palabras = str.split(' ');
        console.log(palabras);
        console.log(palabras.length);
        let ip = 0; // índice de palabra
        let x = 0;
        let y, rx, ry;
        // let w = 14.75;
        fontSize = 14;
        let w; //ancho de cada palabra en px
        // let s = 20; // ancho del espacio entre palabras en px
        let s = ctx.measureText(' ').width * 2;
        let h = fontSize / 3;
        let r = 10;
        let c = 10;
        let margen = 30;
        ctx.translate(margen, margen);

        for (let j = 0; ip < palabras.length - 1; j++) {
            x = -s;
            for (let i = 0; i < c; i++) {
                ctx.save();
                ctx.font = `${fontSize}px serif`;
                ctx.textBaseline = 'hanging';
                w = ctx.measureText(palabras[ip]).width;
                x += s + w / 2;

                if (x + w / 2 + s < canvas.width - margen) {
                    // console.log(canvas.width);
                    console.log(`w[${ip}]` + w);
                    console.log(`x[${ip}]` + x);
                    // y = j * (2 * h) - h / 2;
                    // x = i * w//(2 * w) - w / 2;
                    y = 4 * j * (2 * h) - h / 2;
                    ctx.translate(x, y);
                    rx = 2 * (i / ((c - 1))) * (Math.PI);
                    ry = 1//(j/(n-1)) * (Math.PI);
                    ctx.rotate((rx * ry) * 0.5);

                    ctx.fillStyle = 'rgba(255,0,0,0.15)';
                    ctx.fillRect(-w / 2, -h / 2, w, h);
                    ctx.fillStyle = 'rgba(0,255,0,0.15)';
                    ctx.fillRect(w / 2, -h / 2, s, h);

                    // ctx.textAlign = 'left';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'rgba(0,0,0,1)';
                    // ctx.fillText(palabras[ip], w/2, -h / 2);
                    ctx.fillText(palabras[ip], 0, -h / 2);
                    ctx.restore();
                    // ip < palabras.length - 1 ? ip++ : ip = 0;
                    ip < palabras.length - 1 ? ip++ : null;
                    x += w / 2; // x = final de la palabra
                }

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

function c4(s) {
    console.log(`${s} loaded`);
    let canvas = document.querySelector(s);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = '#0095dd';
        //!!Agregar un espacio al final de la cadena siempre
        // const str = `El no el no inóvulo el no nonato el noo el no poslodocosmos de impuros ceros noes que noan noan noan y nooan y plurimono noan al morbo amorfo noo no démono no deo sin son sin sexo ni órbita el yerto inóseo noo en unisolo amódulo sin poros ya sin nódulo ni yo ni fosa ni hoyo el macro no ni polvo el no más nada todo el puro no sin no. `;
        // const str = "Cansado. ¡Sí! Cansado de usar un solo bazo, dos labios, veinte dedos, no sé cuántas palabras, no sé cuantos recuerdos, grisáceos, fragmentarios.  Cansado, muy cansado de este frío esqueleto, tan púdico, tan casto, que cuando se desnude no sabrá si es el mismo que usé mientras vivía.  Cansado. ¡Sí! Cansado por carecer de antenas, de un ojo en cada omóplato y de una cola autentica, alegre desatada, y no este rabo hipócrita, degenerado, enano.  Cansado, sobre todo, de estar siempre conmigo, de hallarme cada día, cuando termina el sueño, allí, donde me encuentre, con las mismas narices y con las mismas piernas; como si no deseara esperar la rompiente con un cutis de playa, ofrecer, al rocío, dos senos de magnolia, acariciar la tierra con un vientre de oruga, y vivir, unos meses, adentro de una piedra."
        const str = "Abandoné las sombras, las espesas paredes, los ruidos familiares, la amistad de los libros, el tabaco, las plumas, los secos cielorrasos; para salir volando, desesperadamente. Abajo: en la penumbra, las amargas cornisas, las calles desoladas, los faroles sonámbulos, las muertas chimeneas los rumores cansados, desesperadamente. Ya todo era silencio, simuladas catástrofes, grandes charcos de sombra, aguaceros, relámpagos, vagabundos islotes de inestable riberas; pero seguí volando, desesperadamente. Un resplandor desnudo, una luz calcinante se interpuso en mi ruta, me fascinó de muerte, pero logré evadirme de su letal influjo, para seguir volando, desesperadamente. Todavía el destino de mundos fenecidos, desorientó mi vuelo -de sideral constancia- con sus vanas parábolas y sus aureolas falsas; pero seguí volando, desesperadamente. Me oprimía lo flúido, la limpidez maciza, el vacío escarchado, la inaudible distancia, la oquedad insonora, el reposo asfixiante; pero seguía volando, desesperadamente. Ya no existía nada, la nada estaba ausente; ni oscuridad, ni lumbre, -ni unas manos celestes- ni vida, ni destino, ni misterio, ni muerte; pero seguía volando, desesperadamente. ";
        // const str = 'abc de fghij kl mnñop qrst u vw xyz ABCDEF G HI JKL MN ÑOPQ RSTUV WXYZ '
        const palabras = str.split(' ');
        console.log(palabras);
        console.log(palabras.length);
        let p = 0;
        let x = 0;
        let y, rx, ry;
        // let w = 14.75;
        fontSize = 15;
        let w; //ancho de cada palabra en px
        // let s = 20; // ancho del espacio entre palabras en px
        // let s = ctx.measureText(' ').width; 
        let s = ctx.measureText(' ').width * 2;
        let h = fontSize / 3;
        let r = 10; //filas 
        let c = 10; //columnas
        let margen = 30;
        ctx.translate(margen, margen);
        // for (let j = 0; j < r; j++) {
        // En lugar de contar r filas, agrego tantas filas como sean necesarias para completar el texto
        for (let j = 0; p < palabras.length - 1; j++) {
            x = -s;
            for (let i = 0; i < c; i++) {
                ctx.save();
                // rx = 0;
                // ry = 0;
                rx = 2 * (i / ((c - 1))) * (Math.PI);
                ry = (j / (c - 1)) * (Math.PI);
                ctx.font = `${fontSize}px serif`;
                ctx.textBaseline = 'hanging';
                w = ctx.measureText(palabras[p]).width;
                // w = Math.ceil(ctx.measureText(palabras[p]).actualBoundingBoxRight);
                // console.log('l = ' + ctx.measureText(palabras[p]).actualBoundingBoxLeft);
                // console.log('r = ' + ctx.measureText(palabras[p]).actualBoundingBoxRight);
                //////////////////////////////////////////////////////////////////////////
                // fontHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;         //
                // actualHeight = actualBoundingBoxAscent + actualBoundingBoxDescent;   //
                //                                                                      //
                // fontHeight is the bounding box height regardless of the string being //
                // rendered. actualHeight is specific to the string being rendered.     //
                //////////////////////////////////////////////////////////////////////////
                // h = ctx.measureText(palabras[p]).actualBoundingBoxAscent + ctx.measureText(palabras[p]).actualBoundingBoxDescent;
                // h = ctx.measureText(palabras[p]).fontBoundingBoxAscent + ctx.measureText(palabras[p]).fontBoundingBoxDescent;
                console.log('h ' + h);
                // h = ctx.measureText(palabras[p]).height;
                // w = palabras[p].length * (14.75) / 4;
                // x = i * (2 * w) - w / 2;
                // x += 20 +( w) - w / 2;
                // x < canvas.width ? x += s +( w) - w / 2 : x = 0;
                x += s + w / 2;
                // x = centro de la palabra
                if (x + w / 2 + s < canvas.width - margen) {
                    // console.log(canvas.width);
                    console.log(`w[${p}]` + w);
                    console.log(`x[${p}]` + x);
                    // y = j * (2 * h) - h / 2;
                    // x = i * w//(2 * w) - w / 2;
                    y = 4 * j * (2 * h) - h / 2;
                    ctx.translate(x, y);
                    ctx.rotate((rx * ry));
                    // ctx.rotate(i * 0.1 - j * 0.1);
                    ctx.fillStyle = 'rgba(255,0,0,0.17)';
                    ctx.fillRect(-w / 2, -h / 2, w, h * 2);
                    ctx.fillStyle = 'rgba(0,255,0,0.25)';
                    ctx.fillRect(w / 2, -h / 2, s, h * 2);
                    // ctx.textAlign = 'left';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'rgba(0,0,0,1)';
                    // ctx.fillText(palabras[p], w/2, -h / 2);
                    ctx.fillText(palabras[p], 0, -h / 2);
                    ctx.restore();
                    // p < palabras.length - 1 ? p++ : p = 0;
                    p < palabras.length - 1 ? p++ : null;
                    x += w / 2; // x = final de la palabra
                }
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