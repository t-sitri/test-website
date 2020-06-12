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
    window.current.props.onCanvasClick(this.refs.canvas, coordinates);
    //this.refs.canvas.getContext("2d").drawImage(replace, 0,0);
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
  //let matrix = imageDataToMatrix(imageData, canvas.width);

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

  /*
  function recursivelyPaintBucket(currentCoordinates, tolerance, colourToReplace, colourToCompare) {

    if(!(currentCoordinates in visited) && (currentCoordinates[0] >= 0 && currentCoordinates[1] >= 0 && currentCoordinates[0] <= canvas.width && currentCoordinates[1] <= canvas.height)) {
      console.log(visited);
      const currentPixel = matrix[currentCoordinates[1]][currentCoordinates[0]];
      var canDoIt = true;
      visited[currentCoordinates] = 1;
      for(var i = 0; i < 3; i ++ ) {
        if(Math.abs(currentPixel[i]-colourToCompare[i])/255 > tolerance) {
          
          canDoIt = false;
          break;
        }
      }
      if(canDoIt) {
        // change the value of the current pixel
        for(var j = 0; j < 3; j ++ ) {
          matrix[currentCoordinates[1]][currentCoordinates[0]][j] = colourToReplace[j];
        }
        matrix[currentCoordinates[1]][currentCoordinates[0]][4] = 255;

        // add the nearby pixels
        const coordinatesToCheck = [[coordinates[0] - 1, coordinates[1]], [coordinates[0], coordinates[1] - 1], [coordinates[0]+1, coordinates[1]], [coordinates[0], coordinates[1]+1]];

        for (var coordinate of coordinatesToCheck) {
          recursivelyPaintBucket(coordinate, tolerance, colourToReplace, colourToCompare);
        }
      }
    }
  }
  */
  //recursivelyPaintBucket([x, y], 0.20, [255, 255, 255, 255], currPixel);
  //matrix[20][20] = [255, 255, 255, 255];
  //ctx.putImageData(new ImageData(new Uint8ClampedArray(matrixToImageData(matrix)), canvas.width, canvas.height),0,0);
  
  ctx.putImageData(imageData, 0,0);
  return 0; 
}

function matrixToImageData(matrix) {
  let to_ret = [];
  for(let row of matrix) {
    for(let rgba of matrix) {
      rgba.forEach(element => {
        to_ret.push(element);
      });
    }
  }
  return to_ret;
}

function imageDataToMatrix(imageData, width) {
  var to_ret = [];
  var temp = [];
  var group = 0; 
  
  for(var i = 0; i < imageData.data.length; i+=4) {
    temp.push([imageData.data[i], imageData.data[i+1], imageData.data[i+2], imageData.data[i+3]]);
    if ((group+1) % width === 0 ) {
      to_ret.push(temp);
      temp = [];
    }
    group += 1;
  }
  return to_ret; 
}


// current tool that is in use
window.current =  <Tool url="https://image.flaticon.com/icons/png/512/66/66246.png" text="paintbrush" onCanvasClick={dothing} onCanvasHover={dothing}/>;


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