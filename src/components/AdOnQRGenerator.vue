<template>
    <div class="row">
        <div class="col-sm-4">
            <div class="mb-3">
                <label for="reviewlink" class="form-label">Review link</label>
                <input type="text" class="form-control" id="review-link">
            </div>
            <label for="logoimage" class="form-label">Company logo</label><br>
            <div class="mb-3 input-group">
                <input class="form-control" type="file" name="image" accept="image/png, image/jpeg" @change="getImageBase64">
                <button class="btn btn-outline-secondary" type="button" id="btnUpload" @click="uploadImage">Upload</button>
            </div>
            <canvas id="imageCanvas" width="150" height="150">
            </canvas><br>
            <h5>{{imageName}}</h5>
            <img id="output"/>
            <a :href="image">View Image</a>
            <button @click="generateQR" class="btn btn-outline-primary">Generate QR</button>
            <!-- <button @click="clearQRCode" class="btn btn-outline-danger">Resets QR</button> -->
        </div>
        <div class="col-sm-8">
            <p>{{ imageBase64 }}</p>
            <div id="qrcode" style="text-align: center;">
            </div>
        </div>
    </div>
</template>
<script>
import * as QRCode from 'easyqrcodejs'
// import axios from 'axios'
// import { upload } from '../file-upload-service'
// import { upload } from '../fake-file-upload-service'
export default {
  name: 'QR generator',
  data(){
      return {
        // isShow: false,
        qrWidth: 300,
        qrHeight: 300,
        imageName: '',
        image: '',
        imageBase64: '',
        canvas: '',
        generatedQRCode: '',
        vueCanvas: ''
      }
  },
  mounted () {
    //generated QR output
    const qrcode = document.getElementById("qrcode");
    this.generatedQRCode = qrcode;
    //image upload
    const img = document.getElementById('output');
    this.image = img
    //canvas
    var c = document.getElementById("imageCanvas");
    this.canvas = c;
    var ctx = c.getContext("2d");
    // this.canvas.width = this.image.width;
    // this.canvas.height = this.image.height;
    ctx.fillStyle = "#fff";
    // ctx.strokeRect(0, 0, c.width, c.height);

    // ctx.fillStyle = "#222";
    // ctx.font = "20px serif";
    // ctx.fillText("LOGO", 25, 55);

    this.vueCanvas = ctx;
  },
  methods: {
    getImageBase64(event){
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            // console.log('RESULT', reader.result)
            // const samp = reader.result
            // const b64 = samp.toDataURL();
            // console.log(samp)
            this.imageBase64 = reader.result
            console.log(this.imageBase64)
        }
        reader.readAsDataURL(file);
        this.imageName = file.name
        this.image.src = URL.createObjectURL(event.target.files[0]);
    },
    loadFile(event){
        this.image.src = URL.createObjectURL(event.target.files[0]);
    },
    // uploadImage(){
    //     // console.log("image source height "+ this.image.height)
    //     // console.log("canvas height "+ this.canvas.height)
    //     // const toCenterH = (this.canvas.height - this.image.height)/2;
    //     // const toCenterW = (this.canvas.width - this.image.width)/2;
    //     // this.vueCanvas.drawImage(this.image,toCenterW,toCenterH,this.image.width,this.image.height);
    //     // this.base64Image = this.canvas.toDataURL();
    // },
    generateQR(){
        const rLink = document.getElementById("review-link").value;
        var options = {
            text: rLink,
            width: this.qrWidth,
            height: this.qrHeight,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            drawer: 'svg',
            dotScale: 1,
            logo: this.imageBase64,
            logoWidth: this.image.width,
            logoHeight: this.image.height,
            logoBackgroundTransparent: false,
            logoBackgroundColor: "#ffffff",
        }
        new QRCode(this.generatedQRCode, options)
    }
  }
}
</script>
<style scoped>
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
  #output{
      width: auto;
      height: 100px;
  }
</style>