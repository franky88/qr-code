<template>
    <div class="row">
        <div class="col-sm-4">
            <div class="mb-3">
                <label for="reviewlink" class="form-label">Review link</label>
                <input type="text" class="form-control" id="review-link">
            </div>
            <div class="mb-3">
                <label for="logoimage" class="form-label">Company logo</label>
                <input type="file" class="form-control" id="logo-image" accept="image/png, image/jpeg">
            </div>
            <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                <h1>Upload images</h1>
                <div class="dropbox">
                <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                    accept="image/*" class="input-file">
                    <p v-if="isInitial">
                    Drag your file(s) here to begin<br> or click to browse
                    </p>
                    <p v-if="isSaving">
                    Uploading {{ fileCount }} files...
                    </p>
                </div>
            </form>
            <button @click="generateQR()" class="btn btn-outline-primary">Generate QR</button>
        </div>
        <div class="col-sm-8">
            <div id="qrcode" style="text-align: center;"></div>
        </div>
    </div>
    <div class="row">
        <div v-if="isSuccess">
            <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
            <p>
            <a href="javascript:void(0)" @click="reset()">Upload again</a>
            </p>
            <ul class="list-unstyled">
            <li v-for="item in uploadedFiles" :key="item.id">
                <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
            </li>
            </ul>
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
            <h2>Uploaded failed.</h2>
            <p>
            <a href="javascript:void(0)" @click="reset()">Try again</a>
            </p>
            <pre>{{ uploadError }}</pre>
        </div>
    </div>
</template>
<script>
import * as QRCode from 'easyqrcodejs'
// import { upload } from '../file-upload-service'
import { upload } from '../fake-file-upload-service'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'QR generator',
  data(){
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
      }
  },
  computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
        reset() {
        // reset form to initial state
            this.currentStatus = STATUS_INITIAL;
            this.uploadedFiles = [];
            this.uploadError = null;
        },
        save(formData) {
            // upload data to the server
            this.currentStatus = STATUS_SAVING;

            upload(formData)
                .then(x => {
                    this.uploadedFiles = [].concat(x);
                    this.currentStatus = STATUS_SUCCESS;
                })
                .catch(err => {
                    this.uploadError = err.response;
                    this.currentStatus = STATUS_FAILED;
                });
        },
        filesChange(fieldName, fileList) {
            // handle file changes
            const formData = new FormData();

            if (!fileList.length) return;

            // append the files to FormData
            Array
                .from(Array(fileList.length).keys())
                .map(x => {
                formData.append(fieldName, fileList[x], fileList[x].name);
                });

            // save it
            this.save(formData);
        },
        generateQR(){
            const BASE_URL = "http://localhost:8080"
            const output = document.getElementById("qrcode");
            const rLink = document.getElementById("review-link").value;
            const img = document.getElementById('logo-image').value;
            const imgUrl = `${BASE_URL}/photo/upload/${img}`
            console.log(imgUrl);
            console.log(rLink);
            var options = {
                text: rLink,
                width: 256,
                height: 256,
                colorDark : "#000000",
                colorLight : "#ffffff",
                logo: imgUrl,
                logoWidth: undefined,
                logoHeight: undefined,
                logoBackgroundTransparent: true,
                logoBackgroundColor: "#ffffff",
            }
            new QRCode(output, options)
        }
    },
    mounted() {
      this.reset();
    },
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