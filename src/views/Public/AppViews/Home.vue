<template>
  <div class="home">
    <h2>Latest videos</h2>
    <VueSlickCarousel v-bind="settings" v-if="cubes">
      <cube v-for="cube in cubes" :data-obj="cube" :key="cube.id" cubeHeight="400px"/>
      <template #prevArrow="arrowOption">
        <div class="custom-arrow ca-back">
        </div>
      </template>
      <template #nextArrow="arrowOption">
        <div class="custom-arrow ca-next">
        </div>
      </template>
    </VueSlickCarousel>
    <div class="whiteSpace"></div>
    <h2>Viral cubes</h2>
    <CubeGrid>
      <cube v-for="cube in cubes" :data-obj="cube" :key="cube.id"/>
    </CubeGrid>
    <div class="whiteSpace"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// Own Components
import CubeService from "../../../services/CubeService.js";
import Cube from "../../components/cube";
import CubeGrid from "../../components/CubeGrid";

export default {
  name: "Home",
  components: {
    CubeGrid,
    Cube,
    VueSlickCarousel,

  },
  data() {
    return {
      CubeService: CubeService,
      cubes: null,
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
        // dots: true,
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
      this.CubeService.getCubes().then((resp) => {
        this.cubes = resp.data.reverse();
      });
    },
  },
  created() {
    this.load();
  },
};
</script>
<style lang="scss">
@import "../../../styles/reset";
@import "../../../styles/style";

.whiteSpace {
  height: 50px;
}

.home {
  h2 {
    font-size: 50px;
    padding: 20px;
    margin-bottom: 20px;
  }
}


</style>