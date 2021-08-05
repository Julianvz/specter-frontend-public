<template>
  <div class="cube">
    <router-link :to="'/edit/' + dataObj.id" class="outer">
      <div class="cubeThumb inner" :style="'background-image:url(' +dataObj.thumbnail+'); min-height:'+cubeHeight+';'">
      </div>
    </router-link>
    <div class="cubeInfo">
      <div class="userInfo">
        <router-link :to="'/cubes/' + dataObj.id">
          <button>
            Visit
          </button>
        </router-link>
      </div>
      <div class="cubeTitle">
        <router-link :to="'/users/' + dataObj.id" class="username">
        </router-link>
        <router-link :to="'/cubes/' + dataObj.id">
          <h3>{{ dataObj.title }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cubeEdit",
  props: ['dataObj', 'cubeHeight'],
  data() {
    return {}
  },
  methods: {},
  created() {
  },
}
</script>


<style lang="scss" scoped>
.cube {
  border: 1px solid black;
  /*padding: 10px;*/
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  flex: 1 1 0;
  /*width: 500px;*/
}

.cube a {
  width: 100%;
}


.cubeThumb {
  display: flex;
  width: 100%;
  min-height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 1;
}

.cubeInfo {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-grow: 1;
}

.userInfo {
  padding: 10px;
  display: flex;
  /*flex-direction: column;*/
  justify-content: space-between;
  gap: 10px;
}

.userThumb {

  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.cubeTitle {
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  .username {
    font-size: 12px;
  }

  a {
    font-size: 20px;
    margin: 0;
    text-decoration: none;
  }
}

</style>