<template>
  <MemberAreaTemplate>
    <h1 slot="siteTitle">Upload</h1>
    <button v-if="isNewCube" slot="top" @click="CubeService.newCube(cube)">Veröffentlichen</button>
    <button v-if="!isNewCube" slot="top" @click="CubeService.updateCube(cube)">Änderungen speichern</button>

    <div slot="content">
      <div class="stepWrapper" v-if="step === 0 && isNewCube || !isNewCube">
        <div>
          <h2>Create new Cube</h2>
          <input v-model="newCube.name" type="text" name="name" id="cubeName" placeholder="Name">
          <textarea v-model="newCube.description" name="Beschreibung" id="cubeDescription"
                    placeholder="Description">
          </textarea>
          <button @click="createNewCube">Create Cube</button>
        </div>
      </div>
      <div class="stepWrapper" v-if="step === 1">
        <div>
          <h2>Add a side to {{ newCube.name }}</h2>
          <input v-model="newSideMeta.name" type="text" name="name" id="sideName" placeholder="Side Name">
          <button @click="createNewSide">Create Side</button>
          <br>
          <br>
          <div v-if="siteMeta">
            <h2>Add Video To this Side:</h2> <br>
            <vue2Dropzone v-on:vdropzone-sending="sendingEvent"
                          v-on:vdropzone-success="successEventSide"
                          v-if="!slideUploadBucket"
                          ref="myVueDropzone"
                          id="dropzone"
                          :options="dropzoneOptions"
                          :useCustomSlot=true>

              <div class="dropzone-custom-content">
                <div class="subtitle">
                  Click or drag and drop to select one video <br>
                  from your computer
                </div>
              </div>

            </vue2Dropzone>
            <button @click="deleteFilesfromDropZone">Clear Files</button>
          </div>
        </div>
      </div>
    </div>
  </MemberAreaTemplate>
</template>
<script>
import MemberAreaTemplate from "./MemberAreaTemplate";
import CubeService from "@/services/CubeService";
// https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/installation
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'


export default {
  name: "Upload",
  data() {
    return {
      dropzoneOptionsThumbNail: {
        url: null,
        thumbnailWidth: null,
        maxFilesize: 1000,
        maxFiles: 1,
      },
      dropzoneOptions: {
        url: null,
        thumbnailWidth: null,
        maxFilesize: 1000,
        maxFiles: 1,
      },
      newCube: {},
      newSideMeta: {
        position: 1,
      },
      newSideVideo: {},
      id: null,
      step: 0,
      slideUploadBucket: null,
      siteMeta: false,
      cube: null,
      cubeShema: {
        "id": null,
        "title": "",
        "description": "",
        "private": false,
        "thumbnail": "",
        "duration": null,
        "views": 0,
        "user_id": null,
        "created_at": "",
        "updated_at": "",
        "likes_count": 0,
        "sides": [],
        "tags": []
      },
      isNewCube: false,
      CubeService: CubeService,
      sides: []
    }
  },
  components: {
    MemberAreaTemplate,
    vue2Dropzone,
  },
  methods: {
    createNewCube() {
      // console.log(this.newCube.description)
      this.CubeService.newCube(
          {
            "title": this.newCube.name,
          }).then((resp) => {
        console.log(resp)
        // this.newCube = 0;
        this.newCube.id = resp.data.id
        console.log(this.newCube.id)
        this.dropzoneOptionsThumbNail.url = '/api/cubes/' + this.newCube.id + '/thumbnail';
        this.updateCube()

      }).catch((error) => {
        console.log(error)
      })
      // create Cube with only title (response must be the cube id
    },
    updateCube() {
      this.CubeService.updateCube({
        "id": this.newCube.id,
        "title": this.newCube.name,
        "description": this.newCube.description,
      }).then((resp) => {
        console.log(resp)
        this.step = 1;
      })
    },
    createNewSide() {
      this.CubeService.newSideMeta({
        name: this.newSideMeta.name,
        position: this.newSideMeta.position,
        cube_id: this.newCube.id
      }).then((resp) => {
        console.log(resp)
        // this.newCube = 0;
        this.newSideMeta.id = resp.data.id
        console.log(this.newSideMeta.id)
        this.step = 1;
        this.dropzoneOptions.url = '/api/sides/' + this.newSideMeta.id + '/video';
        this.siteMeta = true
      }).catch((error) => {
        console.log(error)
      })
    },


    load() {
      if (!this.id) {
        this.isNewCube = true
        this.cube = this.cubeShema
      } else {
        this.CubeService.getCube(this.id)
            .then((resp) => {
              this.cube = resp;
            })
            .catch((error) => {
              console.error(error);
            });
      }
    },

    deleteFilesfromDropZone() {
      this.$refs.myVueDropzone.removeAllFiles()
    },

    sendingEvent(file, xhr, formData) {
      formData.append('thumbnail', file);
      // formData.append('position', prompt('Position der Side?'));
      // formData.append('cube_id', this.id);
    },

    successEvent(file, response) {
      this.step = 2;
      console.log('upload done')
      // console.log(file)
      // console.log(response)
      // this.slideUploadBucket = [file, response]
    },
    successEventSide(file, response) {
      this.$router.push('/edit/' + this.newCube.id)
      // console.log('upload done')
      // console.log(file)
      // console.log(response)
      // this.slideUploadBucket = [file, response]
    },

  },
  computed: {
    reactiveSides() {
      return this.sides
    }
  },
  created: function () {
    this.id = this.$route.params.id
    this.load()
  },
}
</script>
<style scoped>

.stepWrapper {
  width: 100%;
  min-height: 300px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-color: #42b983;*/
}

.tagWrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 5px 10px;
  background: #fff;
  color: black;
  border-radius: 5px;

}

.video {
  height: 300px;
}

.SlidesContainer {
  min-height: 200px;
  width: 100%;
  gap: 10px;
}

.SidesSlider {
  max-width: 100%;
  /*flex-grow: 1;*/
  border: 1px solid;
}

.DropZone {
  max-width: 100%;
  min-height: 50px;
  margin-top: 50px;
  /*min-width: 50px;*/
  border: 1px solid;
  flex-grow: 1;
}
</style>