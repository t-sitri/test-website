import React from 'react';
import logo from './logo.svg';
import './App.css';



// Whatever tool you implement will extend this class
class Tool extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.current = this; 
    const preview = document.getElementById("preview");
    preview.style.height = "0px";
    preview.style.visibility ="hidden";

    if(this.props.onclick) {
     
      this.props.onclick(); 
    }
  }

  render() {
    return (
    <img width="50px" src={this.props.url} alt={this.props.altText} onClick={this.handleClick}/>
    );
  }
}


function donothing(canvas, coordinates) {
  console.log(coordinates);
  return canvas; 
}

// How we interact with the canvas 
class CanvasComponent extends React.Component {
 constructor(props) {
  super(props);
  this.getInput = this.getInput.bind(this);
  this.fileInput = React.createRef();
 }

 getInput(event) {
   event.preventDefault();
   var image = new Image();
   image.src = URL.createObjectURL(this.fileInput.current.files[0]);
   image.onload = () => {this.drawImage(image)};
  
 }

 drawImage(image) {
  const canvas = this.refs.canvas;
  const ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight; 
  
  ctx.drawImage(image,0,0);
 }

  // For a function to be able to behave like an onCanvasClick or an onCanvasHover
  // it needs to take the canvas and the current mouse coordinates as a parameter. 
  handleClick = (event) => {
    var coordinates = [event.clientX, event.clientY];
    if(window.current.props.onCanvasClick) {
      window.current.props.onCanvasClick(this.refs.canvas, coordinates);
    }
  }

  handleHover = (event) => {
    var coordinates = [event.clientX, event.clientY];
    if(window.current.props.onCanvasHover) {
      window.current.props.onCanvasHover(this.refs.canvas, coordinates);
    }
    
  }

  handleMouseDown = (event) => {
    var coordinates = [event.clientX, event.clientY];
    if(window.current.props.onCanvasMouseDown) {
      window.current.props.onCanvasMouseDown(this.refs.canvas, coordinates);
    }

  }

  handleMouseMove = (event) => {
    var coordinates = [event.clientX, event.clientY];
    if(window.current.props.onCanvasMouseDown) {
      window.current.props.onCanvasMouseDown(this.refs.canvas, coordinates);
    }
  }

  handleMouseUp = (event) => {
    var coordinates = [event.clientX, event.clientY];
    if(window.current.props.onCanvasMouseUp) {
      window.current.props.onCanvasMouseUp(this.refs.canvas, coordinates);
    }
  }

  render() {
      return (
        <span>
          <input type="file" accept="image/*" ref={this.fileInput} onChange={this.getInput}/> <br/>
      <canvas ref="canvas" 
        width={300} 
        height={300}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown} 
        onMouseMove={this.handleHover}
        onMouseUp={this.handleMouseUp}>
      </canvas>
        </span>
      );
  }
}

function getRGBAFromCoordinate(coordinates, imageData) {
  let redCoord = coordinates[1]*(imageData.width * 4) + coordinates[0]*4;

  return [redCoord, redCoord+1, redCoord+2,redCoord+3];
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16), 255]
} 

window.isDrawing = false;
let x1 = 0;
let y1 = 0;

//updates x1 and y1 values to coordinates of the mouse down event
function paintBrushMouseDown(canvas, coordinates) {
  let rect = canvas.getBoundingClientRect();
  x1 = Math.round(coordinates[0] - rect.left); 
  y1 = Math.round(coordinates[1] -rect.top);
  window.isDrawing = true;
}

/*draws a line between the previous coordinate and
  the new coordinate passed to the method*/
function paintBrushMouseMove(canvas, coordinates) {
  let rect = canvas.getBoundingClientRect();
  let x2 = Math.round(coordinates[0] - rect.left); 
  let y2 = Math.round(coordinates[1] -rect.top);
  if (window.isDrawing === true) {
    drawLine(canvas, x1, y1, x2, y2);
    x1 = Math.round(coordinates[0] - rect.left);
    y1 = Math.round(coordinates[1] -rect.top);
  }
}

/*completes the line being drawn between the previous coordinate and
  the new coordinate passed to the method*/
function paintBrushMouseUp(canvas, coordinates) {
  let rect = canvas.getBoundingClientRect();
  let x2 = Math.round(coordinates[0] - rect.left); 
  let y2 = Math.round(coordinates[1] -rect.top);
  if (window.isDrawing === true) {
    drawLine(canvas, x1, y1, x2, y2);
    x1 = 0;
    x2 = 0;
    window.isDrawing = false;
  }
}

function drawLine(canvas, x1, y1, x2, y2) {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.strokeStyle = document.getElementById('color').value;
  ctx.lineWidth = 1;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}


function paintBucketClick(canvas, coordinates) {
  var ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();
  
  const x = Math.round(coordinates[0] - rect.left); const y = Math.round(coordinates[1] -rect.top);
  const pixelToCompare = ctx.getImageData(x, y, 1,1).data;
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixelToFill = hexToRgb(document.getElementById("color").value);
  const tolerance = 0.1; 

  let visited = new Map();
  let q = [[x,y]];
  let currCoordinates;
  let currPixelCoord;
  let canDoIt;
  while(q.length !== 0) {
    canDoIt = true;
    currCoordinates = q.shift();
    if(!(currCoordinates in visited) && (currCoordinates[0] >= 0 && currCoordinates[1] >= 0 && currCoordinates[0] <= canvas.width && currCoordinates[1] <= canvas.height)) {
      visited[currCoordinates] = 1;
      currPixelCoord = getRGBAFromCoordinate(currCoordinates, imageData);
      for(var i = 0; i < 4; i++) {
        if(Math.abs(imageData.data[currPixelCoord[i]] - pixelToCompare[i])/255 > tolerance) {
          canDoIt = false;
          break;
        }
      }

      if(canDoIt) {
        for(i = 0; i < 4; i++) {
          imageData.data[currPixelCoord[i]] = pixelToFill[i];
        }

        const coordinatesToCheck = [[currCoordinates[0] - 1, currCoordinates[1]], [currCoordinates[0], currCoordinates[1] - 1], [currCoordinates[0]+1, currCoordinates[1]], [currCoordinates[0], currCoordinates[1]+1]];
        coordinatesToCheck.forEach((t) => {q.push(t);});

      }

    }
    
  }


  ctx.putImageData(imageData, 0,0);
  return canvas; 
}
function RGBToHex(rgba) {
  let to_ret = "#";
  let temp;
  for(let i = 0; i < 3; i++) {
    temp = rgba[i].toString(16);
    if (temp.length === 1) {
      to_ret += "0";
    }
    to_ret += temp; 
  }
  return to_ret;
}

function setColorEyeDropper(canvas, coordinates) {
  var ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();
  
  const x = Math.round(coordinates[0] - rect.left); const y = Math.round(coordinates[1] -rect.top);
  const imageData = ctx.getImageData(x, y, 1,1).data;
  console.log(RGBToHex(imageData));
  document.getElementById("color").value = RGBToHex(imageData);
}


// current tool that is in use
var paintBrush  =  <Tool url="https://image.flaticon.com/icons/png/512/66/66246.png" 
                        text="paintbrush" 
                        onCanvasClick={donothing} 
                        onCanvasHover={paintBrushMouseMove} 
                        onCanvasMouseUp={paintBrushMouseUp}
                        onCanvasMouseDown={paintBrushMouseDown} />;
window.current = paintBrush; 

function setVisible() {
  let preview = document.getElementById("preview");

  preview.style.visibility="visible";
  preview.style.width = "50px";
  preview.style.height = "50px";
  preview.style.borderRadius = "20px";
  preview.style.backgroundColor = document.getElementById("color").value;
}

function setColorHover(canvas, coordinates) {
  var ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();
  
  const x = Math.round(coordinates[0] - rect.left); const y = Math.round(coordinates[1] -rect.top);
  const imageData = ctx.getImageData(x, y, 1,1).data;

  document.getElementById("preview").style.backgroundColor = RGBToHex(imageData);
}

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <CanvasComponent /> 
          <div id="preview" style={{preview:"hidden"}}></div> <br/>
          <input type="color" id="color"></input> 
          {paintBrush}
          <Tool url="https://cdn4.iconfinder.com/data/icons/proglyphs-design/512/Paint_Bucket-512.png" text="Paint Bucket" onCanvasClick={paintBucketClick} />
          <Tool url="https://cdn.onlinewebfonts.com/svg/img_535306.png" text="EyeDropper" onCanvasClick={setColorEyeDropper} onCanvasHover={setColorHover} onclick={setVisible} />
        </header>
      </div>
    );
  }
}

export default App;