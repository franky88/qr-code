<template>
    <div class="row">
        <div class="col-sm-4">
          <div class="card card-body">
            <h4 class="card-title">AOR QR Generator</h4>
            <div class="mb-3">
                <label for="businessName" class="form-label">Business Name</label>
                <input v-model="busName" type="text" class="form-control form-control-sm" id="businessName">
            </div>
            <div class="mb-3">
                <label for="reviewlink" class="form-label">Review link</label>
                <input type="url" class="form-control form-control-sm" id="review-link">
            </div>
            <div class="input-group input-group-sm mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Review type</label>
              <select v-model="reviewFor" class="form-select" id="reviewfor">
                <option value="Google" selected>Google</option>
                <option value="Google or Facebook">Google or Facebook</option>
                <option value="Facebook">Facebook</option>
              </select>
            </div>
            <label for="logoimage" class="form-label">Company logo</label><br>
            <div class="mb-3 input-group">
                <input class="form-control form-control-sm" type="file" name="image" accept="image/png, image/jpeg" @change="getImageBase64">
            </div>
            <div v-show="image.src" class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img class="align-self-center" id="output" :src="image.src" :alt="imageName">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <p class="card-title">{{imageName}}</p>
                    <p class="card-text"><small class="text-muted">File size: {{imageSize}} KB</small></p>
                    <a :href="image.src" target="_blank"><small class="text-muted">View Image</small></a>
                  </div>
                </div>
              </div>
            </div>
            <button @click="generateQR" class="btn btn-outline-primary">Generate QR</button>
          </div>
        </div>
        <div class="col-sm-8" style="text-align: center;">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title">{{ busName }}</h1>
              <h4>values your feedback.</h4>
              <br>
              <div id="qrcode" style="text-align: center;">
              </div>
              <br>
              <br>
              <h5>Please scan above to leave us a
  <br> review on {{reviewFor}}!</h5>
              <br>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import * as QRCode from 'easyqrcodejs'

export default {
  name: 'QR generator',
  data(){
      return {
        isShow: false,
        qrWidth: 350,
        qrHeight: 350,
        imageName: '',
        imageSize: '',
        image: '',
        imageBase64: '',
        generatedQRCode: '',
        busName: 'AdOn Group',
        reviewFor: 'Google'
        // vueCanvas: '',
        // canvas: '',
      }
  },
  mounted () {
    const revFor = document.getElementById('reviewfor').value;
    this.reviewFor = revFor;
    //Business name
    const businessName = document.getElementById('businessName').value;
    this.busName = businessName;
    //generated QR output
    const qrcode = document.getElementById("qrcode");
    this.generatedQRCode = qrcode;
    let opt = {
      text: 'https://adongroup.com.au',
      width: this.qrWidth,
      height: this.qrHeight,
    }
    new QRCode(this.generatedQRCode, opt)
    //image upload
    const img = document.getElementById('output');
    this.image = img
    //canvas
    // const c = document.getElementById("imageCanvas");
    // this.canvas = c;
    // const ctx = c.getContext("2d");
    // let cw = this.canvas.width;
    // let ch = this.canvas.height;
    // this.canvas.width = this.image.width;
    // this.canvas.height = this.image.height;
    // ctx.fillStyle = "#fff";
    // ctx.strokeRect(0, 0, c.width, c.height);

    // ctx.fillStyle = "#222";
    // ctx.font = "20px serif";
    // ctx.fillText("LOGO", 25, 55);

    // this.vueCanvas = ctx;
  },
  methods: {
    getImageBase64(event){
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            // console.log('RESULT', reader.result)
            this.imageBase64 = reader.result
            console.log("Base64 "+this.imageBase64)
        }
        reader.readAsDataURL(file);
        this.imageName = file.name;
        let roundOffSize = Math.round((file.size*0.001)*100)/100;
        this.imageSize = roundOffSize;
        this.image.src = URL.createObjectURL(event.target.files[0]);
    },
    // loadFile(event){
    //     this.image.src = URL.createObjectURL(event.target.files[0]);
    // },
    // uploadImage(){
    //     // console.log("image source height "+ this.image.height)
    //     // console.log("canvas height "+ this.canvas.height)
    //     let toCenterH = (this.canvas.height - this.image.height)/2;
    //     let toCenterW = (this.canvas.width - this.image.width)/2;
    //     this.vueCanvas.drawImage(this.image,toCenterW,toCenterH,this.image.width,this.image.height);
    //     this.imageBase64 = this.canvas.toDataURL();
    // },
    generateQR(){
        const rLink = document.getElementById("review-link").value;
        let options = {
            text: rLink,
            width: this.qrWidth,
            height: this.qrHeight,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            drawer: 'svg',
            dotScale: 1,
            logo: this.image.src,
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
      width: 100%;
      height: auto;
      padding: 10px;
  }
</style>