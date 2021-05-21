<template>
    <div class="row">
        <div class="col-sm-4">
            <div class="mb-3">
                <label for="reviewlink" class="form-label">Review link</label>
                <input type="text" class="form-control" id="review-link">
            </div>
            <label for="logoimage" class="form-label">Company logo</label><br>
            <div class="mb-3 input-group">
                <input class="form-control" name="image" accept="image/png, image/jpeg" type="file" @change="handleImage">
                <!-- <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button> -->
            </div>
            <img id="output" :src="image" width="300" />
            <img id="file" :src="remoteURL" :value="remoteURL" alt="">
            <!-- <input id='inputfile' type='file' name='inputfile' @change='getFileNameWithExt(event)'>
                <br>
            Output Filename <input id='outputfile' type='text' name='outputfile'>
                <br>
            Extension <input id='extension' type='text' name='extension'> -->
            <button @click="generateQR" class="btn btn-outline-primary">Generate QR</button>
        </div>
        <div class="col-sm-8">
            <div id="qrcode" style="text-align: center;">
                
            </div>
            <!-- <div id="example">
                <p>Original message: "{{ message }}"</p>
                <p>Computed reversed message: "{{ reversedMessage }}"</p>
            </div> -->
        </div>
    </div>
</template>
<script>
import * as QRCode from 'easyqrcodejs'
import axios from 'axios'
// import { upload } from '../file-upload-service'
// import { upload } from '../fake-file-upload-service'

export default {
  name: 'QR generator',
  data(){
      return {
        // message: 'Hello',
        image: '',
        remoteURL: ''
      }
  },
  methods: {
    handleImage(e){
        const selectedImage = e.target.files[0];
        this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject){
        const reader = new FileReader();
        reader.onload = (e) => {
            this.image = e.target.result;
            this.uploadImage();
        };
        reader.readAsDataURL(fileObject);
    },
    uploadImage(){
        const {image} = this;
        axios.post('http://localhost:8080/', {image})
        .then((response)=>{
            this.remoteURL = response.data.url;
        })
        .catch((err)=>{
            return new Error(err.message)
        })
    },
    generateQR(){
        // const BASE_URL = "http://127.0.0.1:8080/easy-qrcodejs/demo"
        const output = document.getElementById("qrcode");
        const rLink = document.getElementById("review-link").value;
        const img = this.remoteURL;
        console.log(img)
        // const imgUrl = `${BASE_URL}/${img}`
        // console.log(imgUrl);
        console.log(rLink);
        var options = {
            text: rLink,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            drawer: 'svg',
            dotScale: 1,
            logo: img,
            logoWidth: undefined,
            logoHeight: undefined,
            logoBackgroundTransparent: true,
            logoBackgroundColor: "#ffffff",
        }
        new QRCode(output, options)
    },
    // getFileNameWithExt(event) {
    //     if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
    //         return;
    //     }
    //     const outputfile = document.getElementById('outputfile')
    //     const extension = document.getElementById('extension')
    //     const name = event.target.files[0].name;
    //     const lastDot = name.lastIndexOf('.');
    //     const fileName = name.substring(0, lastDot);
    //     const ext = name.substring(lastDot + 1);
    //     outputfile.value = fileName;
    //     extension.value = ext;
    //     console.log(fileName);
    //     console.log(ext);
    // },
    // imageUpload(event) {
    //     var image = document.getElementById('output');
	// 	image.src = URL.createObjectURL(event.target.files[0]);
    // }
  },
  computed: {
    // getFileNameWithExt: function(event) {
    //     if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
    //         return;
    //     }
    //     const outputfile = document.getElementById('outputfile')
    //     const extension = document.getElementById('extension')
    //     const name = event.target.files[0].name;
    //     const lastDot = name.lastIndexOf('.');
    //     const fileName = name.substring(0, lastDot);
    //     const ext = name.substring(lastDot + 1);
    //     outputfile.value = fileName;
    //     extension.value = ext;
    //     console.log(fileName);
    //     console.log(ext);
    // }
    // // a computed getter
    // reversedMessage: function () {
    //   // `this` points to the vm instance
    //   return this.message.split('').reverse().join('')
    // },
    // imageUpload: function(event) {
    //     var image = document.getElementById('output');
	// 	image.src = URL.createObjectURL(event.target.files[0]);
    // }
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
</style>