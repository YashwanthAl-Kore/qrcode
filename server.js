const express = require('express');
const app = express();
const path = require('path');
const { createCanvas, Image } = require('canvas');
const canvasToBuffer = require('canvas-to-buffer');

const qrcodeRoute = require('./routes/qrcode.js');
const apiRoute = require('./routes/api.js');

app.use(express.json());
app.use('/qrcode',qrcodeRoute);
app.use('/api',apiRoute);
app.use(express.static('public'));

app.get('/canvas',(req,res)=>{
    const url = req.query.url;
    const canvasImage = createCanvasImage();
    sendCanvasImage(canvasImage, res);
})

app.listen(3000);



function createCanvasImage() {
  // Create a canvas and draw something on it
  const canvas = createCanvas(300, 300);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'green';
  ctx.fillRect(10, 10, 100, 100);

  // Create an Image object from the canvas
  const image = new Image();
  image.src = canvas.toDataURL(); // Convert canvas to data URL

  return image;
}

function sendCanvasImage(image, response) {
  // Convert the canvas to a buffer
  const buffer = canvasToBuffer(image, 'image/png');

  // Create a writable stream
  const writableStream = fs.createWriteStream('output.png');

  // Pipe the buffer to the writable stream
  buffer.pipe(writableStream);

  // Send a response (optional)
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Canvas image saved as output.png');
}