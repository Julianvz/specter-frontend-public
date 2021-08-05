<template>
  <MemberAreaTemplate>
    <h1 slot="siteTitle">MyCubes</h1>
    <div slot="content">
      <h2>News from your subscriptions</h2>
      <CubeGrid>
        <cube v-for="cube in cubes" :data-obj="cube" :key="cube.id"/>
      </CubeGrid>
    </div>
  </MemberAreaTemplate>
</template>
<script>
import MemberAreaTemplate from "./MemberAreaTemplate";
import CubeGrid from "../components/CubeGrid";
import CubeService from "../../services/CubeService";
import cube from "../components/cube";

export default {
  name: "Subscriptions",
  data() {
    return {
      CubeService: CubeService,
      cubes: null,
    }
  },
  components: {
    MemberAreaTemplate,
    CubeGrid,
    cube
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
}
</script>
