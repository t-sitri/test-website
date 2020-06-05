const canvas = document.getElementById("c"); 
const ctx = canvas.getContext("2d");
const preview = document.getElementById("preview");
const rgba = document.getElementById("rgba");
var canChange = true;
window.onload = function() {
    
    
    var image = new this.Image()
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            
            image.src = URL.createObjectURL(this.files[0]);
            img.onload = imageIsLoaded;
        }
    });
    image.onload = drawImageActualSize;
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