const canvas = document.getElementById("c"); 
const ctx = canvas.getContext("2d");

const rgba = document.getElementById("rgba");
const table = document.getElementById("table-preview");
const visible = document.getElementById("visible");
var canChange = true;
window.onload = function() {
    
    
    var image = new this.Image()
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            
            image.src = URL.createObjectURL(this.files[0]);
            canChange = true; 
        }
    });
    image.onload = drawImageActualSize;
}

function drawImageActualSize() {
    canvas.width = this.naturalWidth
    canvas.height = this.naturalHeight

    ctx.drawImage(this,0,0)

    ctx.drawImage(this, 0,0, this.width, this.height)
    visible.style.visibility = "visible";
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
        let text = imageDataToRGBA(imageData)
        rgba.innerText = text; 

        let boxData = ctx.getImageData(x - rect.left - 1, y - rect.top - 1, 3,3).data;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                let s = 4*(3*i + j)
                table.rows[i].cells[j].style.backgroundColor = imageDataToRGBA(boxData.slice(s, s+4));
            }
        }
    }
}

function imageDataToRGBA(imageData) {
    return  "rgba("+ imageData[0] + "," + imageData[1] + "," + imageData[2] + "," + imageData[3] + ")";
}