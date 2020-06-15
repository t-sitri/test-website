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
    window.current.props.onCanvasClick(this.refs.canvas, coordinates);
  }

  handleHover = (event) => {
    var coordinates = [event.clientX, event.clientY];
    window.current.props.onCanvasHover(this.refs.canvas,coordinates);
  }

  render() {
      return (
        <span>
          <input type="file" accept="image/*" ref={this.fileInput} onChange={this.getInput}/> <br/>
          <canvas ref="canvas" width={300} height={300} onMouseDown={this.handleClick} onMouseMove={this.handleHover}></canvas>
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


function paintBucketClick(canvas, coordinates) {
  var ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();
  
  const x = Math.round(coordinates[0] - rect.left); const y = Math.round(coordinates[1] -rect.top);
  const pixelToCompare = ctx.getImageData(x, y, 1,1).data;
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixelToFill = hexToRgb(document.getElementById("color").value);
  const tolerance = 0.1; 

  let visited = {};
  let q = [[x,y]];
  let currCoordinates;
  let currPixelCoord;
  let canDoIt;
  while(q.length != 0) {
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


// current tool that is in use
var paintBrush  =  <Tool url="https://image.flaticon.com/icons/png/512/66/66246.png" text="paintbrush" onCanvasClick={donothing} onCanvasHover={donothing}/>;
window.current = paintBrush; 

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <CanvasComponent /> 
          <input type="color" id="color"></input>
          {paintBrush}
          <Tool url="https://cdn4.iconfinder.com/data/icons/proglyphs-design/512/Paint_Bucket-512.png" text="doggie time" onCanvasClick={paintBucketClick} onCanvasHover={donothing} />
        </header>
      </div>
    );
  }
}

export default App;