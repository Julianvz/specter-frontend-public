<template>
  <div class="cube">
    <router-link :to="'/cubes/' + dataObj.id" class="outer">
      <img v-if="dataObj.thumbnail" class="thumb inner" :src="dataObj.thumbnail" alt="">
    </router-link>
    <div class="cubeInfo">
      <div class="userInfo">
        <img class="userThumb" alt="Vue logo" :src="dataObj.user.avatar">
      </div>
      <div class="cubeTitle">
        <router-link :to="'/cubes/' + dataObj.id">
          <h3>{{ dataObj.title  | truncate(50, '...') }}</h3>
        </router-link>
        <router-link :to="'/users/' + dataObj.id" class="username">
          <h4>{{ dataObj.user.username | truncate(20, '...') }} | {{ dataObj.views }} <i class="far fa-eye"></i> since
            {{ dataObj.created_at | isoLocalDateTime }}</h4>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import LikeButton from "@/views/components/likeButton";
import CubeService from "@/services/CubeService"
import UserService from "@/services/UserService"

export default {
  name: "cube",
  components: {LikeButton},
  props: ['dataObj', 'cubeHeight'],
  data() {
    return {
      CubeService: CubeService,
      UserService: UserService,
    }
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
  height: auto;
}

.thumb {
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
  max-height: 100px;
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
  line-height: 1.2;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  .username {
    padding: 10px 0;
    font-size: 15px;
  }

  a {
    font-size: 20px;
    margin: 0;
    text-decoration: none;
  }
}

</style>