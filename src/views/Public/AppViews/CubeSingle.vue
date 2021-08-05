<template>
  <div class="cube" v-if="cube">

    <Player :parentCube="cube"/>

    <h2>More Content of this User</h2>
    <VueSlickCarousel v-bind="settings" v-if="matchingCubes">

      <cube v-for="cube in thisUsersCubes" :data-obj="cube" :key="cube.id"/>
      <template #prevArrow="arrowOption">
        <div class="custom-arrow ca-back">
          <!-- <h1>zurück</h1> -->
        </div>
      </template>
      <template #nextArrow="arrowOption">
        <div class="custom-arrow ca-next">
          <!-- <h1>weiter</h1> -->
        </div>
      </template>
    </VueSlickCarousel>

    <h2>More related Content</h2>
    <VueSlickCarousel v-bind="settings" v-if="matchingCubes">
      <cube v-for="cube in cubes" :data-obj="cube" :key="cube.id"/>
      <template #prevArrow="arrowOption">
        <div class="custom-arrow ca-back">
          <!-- <h1>zurück</h1> -->
        </div>
      </template>
      <template #nextArrow="arrowOption">
        <div class="custom-arrow ca-next">
          <!-- <h1>weiter</h1> -->
        </div>
      </template>
    </VueSlickCarousel>

  </div>
</template>

<script>
// @ is an alias to /src

// Third party Components
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// Own Components
// import adsCarusell from "../../../components/adsCarusell";
// Services
import CubeService from "@/services/CubeService.js";
import CubeGrid from "../../components/CubeGrid";
import cube from "../../components/cube";
// import LikeButton from "@/views/components/likeButton";
import Player from "@/views/Public/AppViews/Player";

export default {
  name: "CubeSingle",
  components: {
    Player,
    // LikeButton,
    VueSlickCarousel,
    // adsCarusell,
    CubeGrid,
    cube,
  },
  data() {
    return {
      cubes: null,
      thisUsersCubes: null,
      activeSide: null,
      CubeService: CubeService,
      id: null,
      cube: null,
      matchingCubes: null,
      toggleInfoContainer: true,

      settings: {
        // centerMode: true,
        // centerPadding: "20px",
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchMove: true,
        autoplay: true,
        speed: 1000,
        arrows: true,
        dots: true,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 1080,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
      },

    };
  },
  methods: {
    load() {
      this.cube = null
      this.id = this.$route.params.id;
      this.CubeService.getCube(this.id)
          .then((resp) => {
            this.cube = resp;
            this.loadMoreUsersCubes()
            this.loadMoreCubes()
          })
          .catch((error) => {
            console.error(error);
          });
      this.getMatchingCubes();
    },
    loadMoreUsersCubes() {
      this.CubeService.getUserCubes(this.cube.user_id).then((resp) => {
        this.thisUsersCubes = resp.data;
      });
    },
    loadMoreCubes() {
      this.CubeService.getCubes().then((resp) => {
        this.cubes = resp.data;
      });
    },
    getMatchingCubes() {
      this.CubeService.getCubes().then((resp) => {
        this.matchingCubes = resp.data;
      });
    },
  },
  created() {
    this.comment = null
    if (module.hot?.data) this.load()
    // console.log(this.id)
  },
  beforeRouteEnter(_, __, next) {
    next(_this => _this.load())
  },
  watch: {
    '$route'(to, from) {
      this.load()
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../../../styles/reset';
@import '../../../styles/style';

h1 {
  font-size: 60px;
  padding-bottom: 10px;
}

p {
  padding: 20px 0;
  font-size: 20px;
}


.whiteSpace {
  height: 50px;
}

.cube {
  h2 {
    font-size: 50px;
    padding: 20px;
    margin-bottom: 20px;
  }
}

.moreVideos {
  padding: 20px;
}
</style>
