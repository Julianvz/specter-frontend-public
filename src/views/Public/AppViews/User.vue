<template>
  <div class="home">
    User Profile
  </div>
</template>

<script>
// @ is an alias to /src
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// Own Components
import CubeService from "@/services/CubeService.js";

export default {
  name: "Home",
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      CubeService: CubeService,
      cubes: null,
      settings: {
        centerMode: true,
        centerPadding: "50px",

        infinite: true,
        slidesToShow: 2.8,
        touchMove: true,
        autoplay: true,
        speed: 1000,
        responsive: true,
        arrows: true,
        dots: false,
        pauseOnHover: true,
      },
    };
  },
  methods: {
    load() {
      this.CubeService.getCubes().then((resp) => {
        this.cubes = resp.data;
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

.cubeGrid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 20px;
  padding-bottom: 20px;

  .gridImage {
    width: 32%;
    height: 330px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

}

</style>