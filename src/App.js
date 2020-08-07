import React from 'react';
import logo from './paint-bucket.svg';
import './App.css';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { render } from '@testing-library/react';

function currColor() {
  return document.getElementById('color2').style.fill; 
}

function setColor(val) {
  document.getElementById("color2").style.fill = val; 
}

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
    document.body.removeEventListener("keyup", textEditorListener);
    if(this.props.onclick) {
     
      this.props.onclick(); 
    }
  }

  render() {
    if(!this.props.isBucket) {
      return (
      <img width="50px" src={this.props.url} alt={this.props.altText} onClick={this.handleClick}/>
      );
    } else {
      return (<svg version="1.1" id="color2" x="0px" y="0px" style={{fill: '#000000ff'}}
      width="50px" viewBox="0 0 379.13 379.13" alt={this.props.altText} onClick={this.handleClick}>
   <g>
     <g>
       <path d="M374.742,329.056c-1.924-6.558-7.188-11.373-15.646-14.315c-4.768-1.656-10.161-2.695-15.886-3.799
         c-4.628-0.893-9.412-1.813-13.292-3.007c-0.478-0.146-0.917-0.293-1.319-0.432c0.999-1.021,2.034-2.048,2.904-2.91
         c4.104-4.061,8.351-8.261,11.271-13.063c5.422-8.918,4.794-18.369-1.678-25.282c0,0-6.153-6.954-17.972-6.954
         c-3.317,0-6.765,0.591-10.24,1.755c0.101-6.3,0.047-12.383-0.16-18.081c-1.074-29.662-5.979-48.147-15.434-58.178
         c0.023-22.692-9.021-56.099-24.194-89.363C250.033,44.866,219.626,8.17,200.796,8.17c-1.771,0-3.423,0.345-4.919,1.026
         c-0.187,0.084-0.365,0.177-0.572,0.286l-9.3,4.248c-6.788-2.36-20.356-6.799-34.954-10.01C139.834,1.252,130.126,0,122.197,0
         c-13.492,0-22.308,3.459-26.953,10.575c-2.41,3.692-4.77,9.95-2.322,18.786c0.493,1.779,1.177,3.634,2.034,5.511
         c9.438,20.69,52.658,54.961,100.531,79.715c1.051,0.544,2.262,0.696,3.413,0.433c0.964-0.222,1.953-0.333,2.944-0.333
         c5.175,0,9.905,3.039,12.051,7.742c1.47,3.221,1.597,6.819,0.357,10.136c-1.238,3.315-3.693,5.95-6.914,7.419
         c-1.742,0.795-3.59,1.197-5.491,1.198c-5.179,0-9.913-3.044-12.062-7.755c-0.462-1.015-0.793-2.079-0.984-3.163
         c-0.27-1.536-1.24-2.857-2.624-3.574c-38.121-19.751-73.136-44.636-93.667-66.568c-1.468-1.567-3.772-2.023-5.726-1.132
         L6.557,95.586c-1.999,0.912-3.168,3.021-2.882,5.2c1.469,11.192,8.085,51.709,31.55,103.146
         c23.463,51.438,49.724,82.994,57.214,91.44c1.458,1.646,3.818,2.146,5.816,1.231l167.184-76.265
         c0.206,1.544,0.419,3.117,0.644,4.757c1.438,10.559,3.07,22.524,3.11,32.352c0.028,6.927-0.744,10.773-1.398,12.783l0,0
         c-1.97-0.214-4.408-0.619-6.771-1.016c-4.793-0.799-9.747-1.626-14.512-1.626c-11.599,0-17.068,5.341-19.617,9.82
         c-5.986,10.531-0.033,23.457,5.82,33.543c-3.291,0.916-7.79,1.701-10.776,2.221c-4.479,0.781-9.108,1.589-13.123,2.859
         c-7.511,2.379-12.396,6.464-14.525,12.144c-1.672,4.458-2.248,11.52,4.49,19.839c8.809,10.871,21.499,19.078,37.722,24.396
         c13.405,4.396,29.27,6.719,45.876,6.719c16,0,32.021-2.082,46.328-6.021c10.648-2.933,25.358-8.347,34.965-17.488
         C367.706,351.784,378.417,341.591,374.742,329.056z M251.675,317.151c1.16-2.648,0.595-5.929-1.736-10.03
         c-5.625-9.902-7.554-16.623-5.734-19.977c0.393-0.721,1.583-2.916,7.17-2.916c3.206,0,7.051,0.673,10.775,1.323
         c3.615,0.63,7.028,1.229,9.802,1.229c1.474,0,2.625-0.168,3.521-0.517c0.584-0.226,1.116-0.582,1.56-1.041
         c9.311-9.688,7.153-36.916,4.148-63.981c-1.055-9.491-2-17.063-0.998-18.579c0.234-0.263,0.46-0.376,0.701-0.349
         c8.646,2.771,14.124,18.758,15.837,46.226c0.725,11.605,0.638,22.874,0.438,30.28c-0.046,1.746,0.86,3.366,2.34,4.175
         c1.479,0.809,3.268,0.661,4.606-0.376c3.513-2.721,8.796-5.963,14.036-5.965c2.734,0,5.131,0.838,7.325,2.561l0.002,0.002
         c3.938,4.407,0.54,9.42-8.058,18.331c-5.881,6.097-8.544,9.329-8.771,12.373c-0.052,0.708,0.053,1.421,0.311,2.08
         c2.803,7.205,13.857,9.437,24.549,11.592c8.934,1.804,17.371,3.505,18.674,8.155c0.836,2.988-1.311,6.988-6.562,12.223
         c-10.729,10.695-36.628,18.166-62.979,18.166c-28.88,0-52.202-8.737-63.986-23.975c-1.984-2.566-2.688-4.715-2.095-6.381
         c1.266-3.537,8.118-4.789,15.375-6.113C242.12,323.806,249.503,322.106,251.675,317.151z M231.327,114.478
         c-9.344-20.483-16.378-41.472-19.809-59.101c-1.194-6.131-1.938-11.761-2.206-16.734h0.001c3.582,3.467,7.35,7.719,11.192,12.638
         c11.062,14.146,22.303,33.217,31.646,53.697s16.378,41.468,19.809,59.1c1.194,6.127,1.938,11.757,2.206,16.734
         c-3.576-3.459-7.343-7.711-11.192-12.638C251.909,154.029,240.669,134.96,231.327,114.478z M107.806,18.772
         c0.743-1.138,3.611-3.783,14.187-3.783c6.916,0,15.562,1.127,25.698,3.35c5.588,1.225,11.647,2.791,18.007,4.653l-46.042,21.002
         c-5.281-5.665-8.99-10.797-11.022-15.252c-0.538-1.18-0.96-2.318-1.256-3.387C106.604,22.555,106.742,20.401,107.806,18.772z"/>
     </g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   </svg>
   )
    }
  }
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


function rgbToRgb(val) {
  var result = /([0-9]+), ([0-9]+), ([0-9]+)/.exec(val);
  return [result[1], result[2], result[3],255]
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
  ctx.strokeStyle = currColor();
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
  const pixelToFill = rgbToRgb(currColor());
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
  setColor(RGBToHex(imageData));
}

const charList = 'abcdefghijklmnopqrstuvwxyz0123456789!?><,./!@#$%^&*()_+-=[]\\{}|;\'\";| enterbackspace';


function textEditorListener(ev) {
  const key = ev.key.toLowerCase();
  if(charList.indexOf(key) === -1 || ev.ctrlKey)  return;
  
  if(ev.key == "Backspace") {
    window.buffer.pop();
  } else if(ev.key == "Enter") {
    // render the text field
    
    window.ctx.fillText(window.buffer.join(""), window.x, window.y);
    window.buffer = []; 
  } else {
    window.buffer.push(ev.key);
  }
}


function textEditor (canvas, coordinates){
  var ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();
  const x = Math.round(coordinates[0] - rect.left); 
  const y = Math.round(coordinates[1] -rect.top);
  ctx.fillStyle = currColor();
  ctx.font = "20pt sans-serif";
  window.buffer = []
  window.ctx = ctx;
  window.x = x;
  window.y = y;  
  document.body.addEventListener("keyup", textEditorListener);
  return canvas;
}

// current tool that is in use
var paintBrush  =  <Tool url="https://image.flaticon.com/icons/png/512/66/66246.png" 
                        text="paintbrush" 
                       
                        onCanvasHover={paintBrushMouseMove} 
                        onCanvasMouseUp={paintBrushMouseUp}
                        onCanvasMouseDown={paintBrushMouseDown} />;
window.current = paintBrush; 

function setVisible() {
  // first check if eyedropper API is available
  
  if(window.exists) {
    window.e.open(); 
  } else {
    let preview = document.getElementById("preview");
    preview.style.visibility="visible";
    preview.style.width = "50px";
    preview.style.height = "50px";
    preview.style.borderRadius = "20px";
    preview.style.backgroundColor = currColor();
  }
  
}

function setColorHover(canvas, coordinates) {
  var ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();
  
  const x = Math.round(coordinates[0] - rect.left); const y = Math.round(coordinates[1] -rect.top);
  const imageData = ctx.getImageData(x, y, 1,1).data;

  document.getElementById("preview").style.backgroundColor = RGBToHex(imageData);
}

function loadEyedropper() {
  
  try {
    window.e =eval("new EyeDropper()");
    window.e.oncolorselect = (ev) => {setColor(ev.value);}
    window.exists = true; 
  } catch(err) {
    window.exists = false; 
  } 


}
window.onload = loadEyedropper(); 
class App extends React.Component {

  render() {
    return (
      <div className="App">
        <script src="http://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.7.2.js"/>
        <header className="App-header">
          <div class = "title">
            <h3>Cutting <img src ="https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Microsoft_Edge_logo_%282019%29.svg/1200px-Microsoft_Edge_logo_%282019%29.svg.png" width="50px" ></img> Toolkit</h3>
          </div>
          <CanvasComponent /> 

           <div id="preview" style={{preview:"hidden"}}></div> <br/>
           
           <ButtonGroup color="primary" aria-label="outlined primary button group" >
            <IconButton>
              {paintBrush}
            </IconButton>
            <IconButton>
              <Tool url = "https://image.flaticon.com/icons/svg/25/25645.svg" text = "Text editor" onCanvasClick = {textEditor} />
            </IconButton>
            
            <IconButton>
              <Tool isBucket={true} text="Paint Bucket" onCanvasClick={paintBucketClick}  />
            </IconButton>
      <IconButton>
                <Tool url="https://cdn.onlinewebfonts.com/svg/img_535306.png" text="EyeDropper" onCanvasClick={setColorEyeDropper} onCanvasHover={setColorHover} onclick={setVisible} />
        </IconButton>
          </ButtonGroup>

        </header>
      </div>
    );
  }
}

export default App;