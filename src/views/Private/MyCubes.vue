<template>
  <MemberAreaTemplate>
    <h1 slot="siteTitle">MyCubes</h1>
    <div slot="content">
      <h2>Your Cubes</h2>
      <CubeGrid>
        <cubeEdit v-for="cube in cubes" :data-obj="cube" :key="cube.id"/>
      </CubeGrid>
    </div>
  </MemberAreaTemplate>
</template>
<script>
import MemberAreaTemplate from "./MemberAreaTemplate";
import CubeGrid from "../components/CubeGrid";
import CubeService from "../../services/CubeService";
import cubeEdit from "@/views/components/cubeEdit";

export default {
  name: "MyCubes",
  data() {
    return {
      CubeService: CubeService,
      cubes: null,
      newCubeName: ''
    }
  },
  components: {
    MemberAreaTemplate,
    CubeGrid,
    cubeEdit
  },
  methods: {
    load() {
      this.CubeService.getMyCubes().then((resp) => {
        this.cubes = resp.data;
      });
    },
  },
  created() {
    this.load();
  },
}
</script>
