<template>
  <MemberAreaTemplate v-if="cube">
    <h1 slot="siteTitle">Edit: {{ cube.title | truncate(60, '...') }} </h1>
    <div slot="content">

      <div class="flexWrapper">
        <div>
          <h2>Edit Info</h2>
        </div>
        <div>
          <router-link :to="'/cubes/' + id " v-if="!cube.private">
            <button>Go to Cube</button>
          </router-link>
        </div>
      </div>

      <input v-model="cube.title" type="text" name="name" id="cubeName" placeholder="Name">
      <textarea v-model="cube.description" name="Description" id="cubeDescription"
                placeholder="Description">
      </textarea>
      <br><br>
      <h2>Edit Tags:</h2><br>
      <TagInput :cube="cube"></TagInput>
      <collapsible button-text="Thumbnail">
        <h2>Thumbnail:</h2><br>
        <img v-if="cube" :src="cube.thumbnail" alt="" style="width:100%">
        <br>
        <br>
        <h2>Upload:</h2><br>
        <vue2Dropzone v-on:vdropzone-sending="sendingEvent"
                      v-on:vdropzone-success="successEvent"
                      ref="cubeThumbNail"
                      id="dropzoneCubeThumbNail"
                      :options="dropzoneOptionsThumbNail">
        </vue2Dropzone>
        <button @click="deleteFilesfromdropzoneOptionsThumbNail">Clear Files</button>


      </collapsible>

      <collapsible button-text="Video Sides">
        <div class="sidesGrid">
          <div class="sidesGridItem" v-if="cube.sides.length < 6">

            <h3>Add a side</h3>
            <input v-model="newSideMeta.name" type="text" name="name" id="sideName" placeholder="Name">
            <!--            <input v-model="newSideMeta.position" type="number" name="position" value="1" id="sidePosition"-->
            <!--                   placeholder="Position">-->
            <select name="" id="" v-model="newSideMeta.position">
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
              <option :value="5">5</option>
              <option :value="6">6</option>
            </select>
            <button @click="createNewSide">Create Side</button>
            <br>
            <br>
            <div v-if="siteMeta">
              <h2>Add Video to this Side:</h2> <br>
              <vue2Dropzone v-on:vdropzone-sending="sendingEvent"
                            v-on:vdropzone-success="successEvent"
                            v-if="!slideUploadBucket"
                            ref="myVueDropzone"
                            id="dropzone"
                            :options="dropzoneOptions">
              </vue2Dropzone>
              <button @click="deleteFilesfromDropZone">Clear Files</button>
              <button v-if="slideUploadBucket" @click="newSide">Add another slide</button>
            </div>
          </div>
          <div v-for="side in cube.sides" class="sidesGridItem">
            <video :src="side.video" style="width: 100%;" controls muted></video>
            <br>

            <input type="text" v-model="side.name" class="" @blur="updateSide(side)">
            <table>
              <tr>
                <td>Position</td>

                <td>
                  <select name="" id="" v-model="side.position" @change="updateSide(side)">
                    <option :value="side.position" selected disabled>{{ side.position }}</option>
                    <option :value="1">1</option>
                    <option :value="2">2</option>
                    <option :value="3">3</option>
                    <option :value="4">4</option>
                    <option :value="5">5</option>
                    <option :value="6">6</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Created</td>
                <td>{{ side.created_at | isoLocalDateTime }}</td>
              </tr>
              <tr>
                <td>Updated</td>
                <td>{{ side.updated_at | isoLocalDateTime }}</td>
              </tr>
            </table>
            <br>
            <button @click="deleteSide(side.id)"><i class="far fa-trash-alt"></i> Delete Side</button>
            <br>
          </div>
        </div>
      </collapsible>


      <div class="flex">
        <select name="" id="" v-model="cube.private">
          <option :value="true">Is Private</option>
          <option :value="false">Is Public</option>
        </select>
        <button @click="updateCube" v-if="cube.private">Save Draft</button>
        <button @click="updateCube" v-if="!cube.private">Publish</button>
        <button @click="deleteCube" class="dangerZone">Delete Cube</button>
      </div>
      <br>
    </div>
  </MemberAreaTemplate>
</template>
<script>
import MemberAreaTemplate from "./MemberAreaTemplate";
import CubeService from "@/services/CubeService";
// https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/installation
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import TagInput from "@/components/TagInput";
import collapsible from "@/components/collapsible";

export default {
  name: "Edit",
  data() {
    return {
      sideSlots: [1, 2, 3, 4, 5, 6,],
      dropzoneOptionsThumbNail: {
        url: null,
        maxFilesize: 1000,
        maxFiles: 1,
        thumbnailWidth: null,
        // headers: {"X-Requested-With": "XMLHttpRequest",
        // "Content-Type":"multipart/form-data"}
      },
      dropzoneOptions: {
        url: null,
        thumbnailWidth: null,
        maxFilesize: 1000,
        maxFiles: 1,
        // headers: { "My-Awesome-Header": "header value" }
      },
      newCube: {},
      newSideMeta: {},
      newSideVideo: {},
      id: null,
      step: 0,
      slideUploadBucket: null,
      siteMeta: false,
      cube: null,
      isNewCube: false,
      CubeService: CubeService,
      sides: []
    }
  },
  components: {
    MemberAreaTemplate,
    vue2Dropzone,
    TagInput,
    collapsible,
  },
  methods: {
    updateSide(side) {
      let sideID = side.id
      let data = side
      console.log(side)
      this.CubeService.editSideMeta(sideID, data)

    },
    updateCube() {
      this.CubeService.updateCube({
        "id": this.id,
        "title": this.cube.title,
        "description": this.cube.description,
        "private": this.cube.private
      }).then((resp) => {
        alert('Cube updated!')
        console.log(resp)
        this.getCube()
      })
    },
    deleteCube() {
      if (confirm('Should the cube: "' + this.cube.title + '" be irretrievably deleted?')) {
        this.CubeService.deleteCube({
          "id": this.id,
        }).then((resp) => {
          console.log(resp)
          this.$router.push('/myCubes/')
        })
      }

    },
    deleteSide(id) {
      if (confirm('Should this Side be irretrievably deleted?')) {
        this.CubeService.deleteSide(id).then((resp) => {
          console.log(resp)
          this.getCube();
        })
      }
    },
    createNewSide() {
      this.CubeService.newSideMeta({
        name: this.newSideMeta.name,
        position: this.newSideMeta.position,
        cube_id: this.id
      }).then((resp) => {
        console.log(resp)
        // this.newCube = 0;
        this.newSideMeta.id = resp.data.id
        console.log(this.newSideMeta.id)
        this.step = 2;
        this.dropzoneOptions.url = '/api/sides/' + this.newSideMeta.id + '/video';
        this.siteMeta = true
        // this.getCube()
      }).catch((error) => {
        console.log(error)
      })
    },
    getCube() {
      // this.cube = null;
      this.CubeService.getCube(this.id)
          .then((resp) => {
            this.cube = resp;
            this.dropzoneOptionsThumbNail.url = '/api/cubes/' + this.cube.id + '/thumbnail';
          })
          .catch((error) => {
            console.error(error);
          });
    },

    load() {
      this.getCube();
      
      this.cube.sides.forEach((side)=>{
        if(side.position){

        }
      })
    },

    deleteFilesfromDropZone() {
      this.$refs.myVueDropzone.removeAllFiles()
    },
    deleteFilesfromdropzoneOptionsThumbNail() {
      this.$refs.dropzoneOptionsThumbNail.removeAllFiles()
    },

    sendingEvent(file, xhr, formData) {
      formData.append('thumbnail', file);
      // formData.append('position', prompt('Position der Side?'));
      // formData.append('cube_id', this.id);
    },

    successEvent(file, response) {
      // alert('Successfully Uploaded')
      this.getCube()
      this.siteMeta = false
      this.newSideMeta = {}
    },
    //
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
<style lang="scss" scoped>
button {
  border-radius: 0;
}

.dangerZone {
  background-color: red;
  color: white;
}

.flex {
  select {
    width: auto;
  }

  margin-top: 20px;
  display: flex;
  //justify-content: space-between;
  //flex-wrap: wrap;
  gap: 10px;
}

.flexWrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 10px 0;
  width: 100%;
}

.cubeMetaWrapper {
  display: grid;
  ///*grid-template-columns: repeat(auto-fit, 23.75vw);*/
  //grid-template-columns: repeat( 2, 1fr );
  gap: 20px;
  padding-bottom: 50px;

  .first img {
    max-width: 100%;
    width: 100%;
  }

  .second {

  }

}


.sidesGrid {
  display: grid;
  /*grid-template-columns: repeat(auto-fit, 23.75vw);*/
  grid-template-columns: repeat( auto-fit, minmax(45%, 1fr) );
  width: 100%;
  /*padding:1vw;*/
  grid-template-rows: auto;
  grid-gap: 1vw;
}

.sidesGridItem {
  //border: 2px solid silver;
  background-color: #333333;
  padding: 10px;

  h3 {
    font-size: 22px;
  }

  table {
    width: 100%;

    td {
      padding: 5px;
    }
  }


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

.DropZone {
  max-width: 100%;
  min-height: 50px;
  margin-top: 50px;
  /*min-width: 50px;*/
  border: 1px solid;
  flex-grow: 1;
}
</style>