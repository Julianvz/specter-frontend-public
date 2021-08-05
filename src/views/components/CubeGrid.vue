<template>
  <div class="cubeGrid">
    <slot>
    </slot>
  </div>
</template>
<script>
export default {
  name: "CubeGrid"
}
</script>
<style scoped>
.cubeGrid {
  display: grid;
  /*grid-template-columns: repeat(auto-fit, 23.75vw);*/
  grid-template-columns: repeat( auto-fit, minmax(350px, 1fr) );

  padding: 1vw;
  grid-template-rows: auto;
  grid-gap: 1vw;
}
</style>