<template>
  <MemberAreaTemplate>
    <h1 slot="siteTitle">Account</h1>
    <div slot="content">
      <br>
      <h2>Your Recent Cubes</h2>
      <br><br>
      <VueSlickCarousel v-bind="settings" v-if="myCubes">
        <cubeEdit v-for="cube in myCubes" :data-obj="cube" :key="cube.id"/>
        <template #prevArrow="arrowOption">
          <div class="custom-arrow ca-back">
          </div>
        </template>
        <template #nextArrow="arrowOption">
          <div class="custom-arrow ca-next">
          </div>
        </template>
      </VueSlickCarousel>

      <br><br>
      <h2>New Trending Contents</h2>
      <br><br>
      <VueSlickCarousel v-bind="settings" v-if="trendingCubes">
        <cube v-for="cube in trendingCubes" :data-obj="cube" :key="cube.id"/>
        <template #prevArrow="arrowOption">
          <div class="custom-arrow ca-back">
          </div>
        </template>
        <template #nextArrow="arrowOption">
          <div class="custom-arrow ca-next">
          </div>
        </template>
      </VueSlickCarousel>

    </div>
  </MemberAreaTemplate>
</template>
<script>
import MemberAreaTemplate from "./MemberAreaTemplate";
import CubeService from "../../services/CubeService";
import cubeEdit from "@/views/components/cubeEdit";
import cube from "@/views/components/cube";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "MyCubes",
  data() {
    return {
      CubeService: CubeService,
      myCubes: null,
      trendingCubes: null,
      newCubeName: '',
      settings: {
        // centerMode: true,
        // centerPadding: "20px",
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchMove: true,
        autoplay: false,
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
    }
  },
  components: {
    MemberAreaTemplate,
    cubeEdit,
    cube,
    VueSlickCarousel,
  },
  methods: {
    load() {
      this.CubeService.getMyCubes().then((resp) => {
        this.myCubes = resp.data;
      });
      this.CubeService.getCubes().then((resp) => {
        this.trendingCubes = resp.data;
      });
    },
  },
  created() {
    this.load();
  },
}
</script>
