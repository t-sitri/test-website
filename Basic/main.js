const canvas = document.getElementById("c"); 
const ctx = canvas.getContext("2d");
const preview = document.getElementById("preview");
const rgba = document.getElementById("rgba");
var canChange = true;
window.onload = function() {
    
    
    const image = new this.Image()
    image.onload = drawImageActualSize;
    image.crossOrigin = "Anonymous";
    image.src="https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189";

}

function drawImageActualSize() {
    canvas.width = this.naturalWidth
    canvas.height = this.naturalHeight

    ctx.drawImage(this,0,0)

    ctx.drawImage(this, 0,0, this.width, this.height)
    intializeEyedropper()
}


function intializeEyedropper() {
    canvas.addEventListener("mousemove", function test (event) {
        eyedropper(event);
    });
    
    canvas.addEventListener("mousedown", function saveColor(event) {
        canChange = !canChange;
        eyedropper(event);
    });
 
}

function eyedropper(event){
    if(canChange) {
        let rect = canvas.getBoundingClientRect();
        var x = event.clientX; var y = event.clientY;
        let imageData = ctx.getImageData(x - rect.left, y - rect.top, 1,1).data;
        let text = "rgba("+ imageData[0] + "," + imageData[1] + "," + imageData[2] + "," + imageData[3] + ")";
        preview.style.backgroundColor = text;
        rgba.innerText = text; 
    }
}