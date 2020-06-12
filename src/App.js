import React from 'react';
import logo from './logo.svg';
import './App.css';
//import * as paintBucket from "paintBucket.js"; 
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

// Example Functions 
function dothing(canvas, coordinates) {
  var ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();
  var x = coordinates[0]; var y = coordinates[1];
  let imageData = ctx.getImageData(x - rect.left, y - rect.top, 1,1).data;
  console.log(imageData);
  return canvas; 
}

function donothing(canvas, coordinates) {
  console.log(coordinates);
  return canvas; 
}
//
//

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

  handleClick = (event) => {
    // should take: complete canvas, current mouse coordinates
    // should return: modified canvas
    var coordinates = [event.clientX, event.clientY];
    
    //const replace = window.current.props.onCanvasClick(this.refs.canvas,coordinates);
    var ctx = this.refs.canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    const replace = window.current.props.onCanvasClick(this.refs.canvas, coordinates);
    this.refs.canvas.getContext("2d").drawImage(replace, 0,0);
  }

  handleHover = (event) => {
    // should take: complete canvas, current mouse coordinates
    // should return: modified canvas
    var coordinates = [event.clientX, event.clientY];
    
    const replace = window.current.props.onCanvasHover(this.refs.canvas,coordinates);
    this.refs.canvas.getContext("2d").drawImage(replace, 0,0);
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


function paintBucketClick(canvas, coordinates) {
  console.log(coordinates)
  var ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();
  
  const x = Math.round(coordinates[0] - rect.left); const y = Math.round(coordinates[1] -rect.top);
  const pixelToCompare = ctx.getImageData(x, y, 1,1).data;
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixelToFill = [11,11,11,255];
  const tolerance = 0.5; 

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
window.current =  <Tool url="https://image.flaticon.com/icons/png/512/66/66246.png" text="paintbrush" onCanvasClick={donothing} onCanvasHover={donothing}/>;


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <CanvasComponent /> 
          {window.current}
          <Tool url="https://cdn4.iconfinder.com/data/icons/proglyphs-design/512/Paint_Bucket-512.png" text="doggie time" onCanvasClick={paintBucketClick} onCanvasHover={donothing} />
        </header>
      </div>
    );
  }
}

export default App;