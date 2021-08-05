<template>
  <div class="home">
    <h2>Search Result for {{ $route.params.therm }}</h2>
    <CubeGrid v-if="cubes.length > 1">
      <cube v-for="cube in cubes" :data-obj="cube" :key="cube.id"/>
    </CubeGrid>
    <div v-else-if="cubes.length = 1" style="max-width: 100%; display: flex; justify-content: center; width: 100%;">
      <cube style="max-width: 50%;" v-for="cube in cubes" :data-obj="cube" :key="cube.id"/>
    </div>
    <div v-else-if="cubes.length = 0" style="max-width: 100%; display: flex; justify-content: center; width: 100%;">
      <cube style="max-width: 50%;" v-for="cube in cubes" :data-obj="cube" :key="cube.id"/>
    </div>
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
import router from "@/router";

export default {
  name: "Search",
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
      this.cubes = null;
      if (this.$route.params.therm) {
        this.CubeService.getCubes('filter[title]=' + this.$route.params.therm).then((resp) => {
          this.cubes = resp.data;
        });
      } else {
        router.push("/");
      }

    },
  },
  created() {
    this.load();
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