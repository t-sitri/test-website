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
    
    const replace = window.current.props.onCanvasClick(this.refs.canvas,coordinates);
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
// current tool that is in use
window.current =  <Tool url="https://image.flaticon.com/icons/png/512/66/66246.png" text="paintbrush" onCanvasClick={dothing} onCanvasHover={dothing}/>;


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <CanvasComponent /> 
          {window.current}
          <Tool url="https://cdn4.iconfinder.com/data/icons/proglyphs-design/512/Paint_Bucket-512.png" text="doggie time" onCanvasClick={donothing} onCanvasHover={donothing} />
        </header>
      </div>
    );
  }
}







export default App;
