import React from 'react';
import logo from './logo.svg';
import './App.css';


class CanvasComponent extends React.Component {
  /*
  componentDidMount() {
      this.drawImage();
  }
  
  updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.fillRect(0,0, 100, 100);
  }
  */
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
   
   //this.drawImage(image);
   

   /*
   canvas.width = image.naturalWidth;
   canvas.height = image.naturalHeight; 
   console.log(image.name)
   ctx.drawImage(image, 0,0, image.width, image.height);
   ctx.fillRect(0,0,100,100);
   */
 }

 drawImage(image) {
  const canvas = this.refs.canvas;
  const ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight; 
  
  ctx.drawImage(image,0,0);
 }
  render() {
      return (
        <span>
          <input type="file" accept="image/*" ref={this.fileInput} onChange={this.getInput}/> <br/>
          <canvas ref="canvas" width={300} height={300}></canvas>
        </span>
      );
  }
}


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <CanvasComponent /> 
        
        </header>
      </div>
    );
  }
}







export default App;
