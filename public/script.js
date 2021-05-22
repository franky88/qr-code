const btnUpload = document.getElementById('btnUpload');
const myCanvas = document.getElementById('myCanvas');
const ctx = myCanvas.getContext("2d");

ctx.fillStyle = "#ccc";
ctx.rect(0,0,myCanvas.width, myCanvas.height);
ctx.fill();

ctx.fillStyle = "blue";
ctx.font = "35px serif";
ctx.fillText("dcode base64", 30, 60);

btnUpload.addEventListener('click', uploadCanvasImage);

function uploadCanvasImage(){
    const base64 = myCanvas.toDataURL();
    console.log(base64)
}