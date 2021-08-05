<template>
  <i class="far fa-heart" v-if="UserService.check()" @click="like"><span> {{ newCubeData }}</span></i>
</template>

<script>
import CubeService from '@/services/CubeService';
import UserService from '@/services/UserService';

export default {
  name: "likeButton",
  props: ['cubeID', 'likeCount'],
  data() {
    return {
      CubeService: CubeService,
      UserService: UserService,
      newCubeData: null,
    }
  },
  methods: {
    like() {
      this.CubeService.likeToggleCube(this.cubeID).then((res) => {
        this.newCubeData = res.data.likes_count
        // console.log(res)
      })
    }
  },
  created() {
    this.newCubeData = this.likeCount
  },
}
</script>

<style scoped>
.likeButton {
  min-width: 100px;
}
</style>