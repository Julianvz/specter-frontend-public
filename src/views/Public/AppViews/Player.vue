<template>
  <div class="cube" v-if="cube">
    <div class="cubeContainer">
      <div class="videoContainer">
        <!--        <div class="video" id="videos" :style="`background-image: url('` + cube.thumbnail + `')`">-->
        <div class="video outer" id="videos" ref="activePlayer">
          <video @click="play"
                 ref="activeVideo"
                 id="vid1"
                 class="sideVideo inner"
                 v-if="showVideo"
                 :src="findSideVideo">
          </video>
          <div class="videoNavBar">
            <div class="chat-wrapper" v-if="chatToggle">
              <comments :cube="parentCube"></comments>
            </div>
            <i @click="chatToggle = !chatToggle" class="far fa-comment-alt"></i>
            <i v-if="!videoIsPlaying" @click="play" class="fas fa-play"></i>
            <i v-if="videoIsPlaying" @click="pause" class="fas fa-pause"></i>
            <like-button :cube-i-d="cube.id" :likeCount="cube.likes_count"></like-button>
            <i class="far fa-eye"><span> {{ cube.views }}</span></i>
            <div class="cubeChanger">
              <select class="changeVideo" name="" id="" @change="changeVideo" v-model="nextSide"
                      style="min-width: 200px;">
                <option v-for="side in cube.sides" :value="side.position">{{ side.name }}</option>
              </select>
            </div>
            <input type="range"
                   min="0"
                   class="seekBar"
                   :max="video.duration"
                   v-model="seekBarProgress"
                   @change="seek"
                   @input="seek">
            <i class="fas fa-expand" @click="enterFullscreen" v-if="!fullscreenToggle"></i>
            <i class="fas fa-compress" @click="exitFullscreen" v-if="fullscreenToggle"></i>

          </div>
        </div>

      </div>
      <div class="infoContainer">
        <h2>{{ cube.title }}</h2>
        <span>Views: {{ cube.views }} | Created: {{
            cube.created_at | isoLocalDateTime
          }} | Updated: {{ cube.updated_at  | isoLocalDateTime }} </span>
        <p>{{ cube.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// Services
import CubeService from "@/services/CubeService.js";
import LikeButton from "@/views/components/likeButton";
import Comments from "@/views/components/comments";

export default {
  name: "Player",
  components: {
    Comments,
    LikeButton,
  },
  props: ['parentCube'],
  data() {
    return {
      fullscreenToggle: false,
      activeSide: 1,
      nextSide: 1,
      CubeService: CubeService,
      cube: null,
      chatToggle: true,
      // shareToggle: false,
      id: 0,
      currentTime: 0,
      video: {},
      showVideo: true,
      oldProgress: null,
      videoIsPlaying: false,
      seekBarProgress: 0,
    };
  },
  computed: {
    findSideVideo() {
      if (this.cube.sides.length > 0) {
        let res = this.cube.sides.filter(obj => {
          return obj.position === this.activeSide
        })
        console.log(res[0].video)
        return res[0].video
      }
    },
  },
  methods: {
    load() {

      if (this.$route.name === 'Player') {
        this.id = this.$route.params.id;
        this.CubeService.getCube(this.$route.params.id)
            .then((resp) => {
              this.cube = resp;
              this.play()
              this.loadMoreUsersCubes()
              this.loadMoreCubes()

            })
            .catch((error) => {
              console.error(error);
            });
      } else {
        this.cube = this.parentCube;
        this.id = this.cube.id;

        this.cube.sides.sort((a, b) => (a.position > b.position) ? 1 : -1)

        this.activeSide = this.cube.sides[0].position;
        console.log(this.activeSide)
      }
      this.view()
    },
    play() {
      if (this.videoIsPlaying) {
        this.$refs.activeVideo.pause();
        this.videoIsPlaying = false
      } else {
        this.$refs.activeVideo.play();
        this.videoIsPlaying = true
      }

    },
    seek(ev) {
      // console.log(ev)
      let video = document.getElementById('vid1')
      video.currentTime = Number(this.seekBarProgress); //  | 0;
    },
    pause() {
      this.$refs.activeVideo.pause();
      this.videoIsPlaying = false
    },

    enterFullscreen() {
      let element = this.$refs.activePlayer;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {       // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
      }
      this.fullscreenToggle = true
    },

    exitFullscreen() {
      console.log('exit');
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      this.fullscreenToggle = false
    },

    view() {
      this.CubeService.view({cube_id: this.id})
    },
    changeVideo() {
      this.oldProgress = this.$refs.activeVideo.currentTime
      this.activeSide = this.nextSide;
      let video = document.getElementById('vid1')
      let eventTriggerLimit1 = true;
      video.addEventListener('canplaythrough', (event) => {
        if (eventTriggerLimit1 === true) {
          console.log(event)
          video.currentTime = Number(this.oldProgress); //  | 0;
          video.play()
          this.videoIsPlaying = true

          eventTriggerLimit1 = false
        }
      }, false);
      this.showVideo = true
    },
  },
  created() {
    // alert('hallo')
    this.load();

  },
  mounted() {

  },
};
</script>
<style lang="scss" scoped>


.outer {
  position: relative;

  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: (9 / 16) * 100%;
  }

  > .inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

.seekBar {
  width: 200px;
}

.changeVideo {
  border-radius: 50px;
  margin-top: -10px;
}

select {
  outline: none;
}

.cubeContainer {
  min-height: 50vh;
  width: 100%;
  background: black;
  //display: flex;
  justify-content: center;

  .video {
    width: 65%;
    //max-height: 80vh!important;
    margin: 0 auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    video {
      width: 83%;
    }
  }


  @media all and (max-width: 1200px) {
    .video {
      width: 100%;
    }
  }


  #videos .sideVideo {
    width: 100%;
    //  max-width: 100vw !important;
  }


  .infoContainer {
    background: #252525;
    //width: 25%;
    color: black;
    padding: 20px;
  }
}

.videoNavBar {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  color: white;
  gap: 10px;
  height: 50px;
  padding: 10px;
  bottom: 0;
  background: rgba(0, 0, 0, 0.48);
  z-index: 9999;
  top: -50px;
}

.cubeChanger {
  //  position: absolute;
  //  left: calc(50% - 300px);
  //  display: flex;
  //  justify-self: end;
  //  height: 50px;
  //  margin-top: -50px;
  //  background: #f0f8ff61;
}

.share-wrapper {
  position: absolute;
  height: calc(100vh - 180px);
  bottom: 50px;
  left: 0;
  width: 25%;
  min-width: 300px;
  max-width: 300px;
  //border: 1px solid gray;
  //background: gray;
}

.chat-wrapper {
  position: absolute;
  //height: calc(100vh - 180px);
  bottom: 0px;
  left: 0;
  width: 25%;
  min-width: 300px;
  max-width: 25%;
  //border: 1px solid gray;
  background: transparent;
}

h2 {
  font-size: 35px;
  margin: 30px 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.35;
}

.infoContainer p, .infoContainer span {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  max-height: 50vh;
  overflow-y: auto;
  color: #ffffffa6;
  line-height: 1.35;
}


</style>
