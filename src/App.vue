<template>
  <div id="app">
    <div v-if="this.$route.path !== 'Player'" id="nav">
      <div class="flex-spacebetween">
        <div class="flex-spacebetween">
          <div>
            <router-link to="/">
              <img class="pageLogo" alt="Vue logo" src="./assets/logo.png">
            </router-link>
          </div>
          <!-- <div>Firmen name</div> -->
        </div>
        <div class="mainNav">
          <div class="linkNav">
            <searchField/>
            <router-link to="/">Home</router-link>

            <router-link to="/register" v-if="UserService.guest()">
              register
            </router-link>
            <router-link to="/login" v-if="!UserService.check()">
              login
            </router-link>

            <router-link to="/account" v-if="UserService.check()">
              Account
            </router-link>
            <button @click="UserService.logout()" v-if="UserService.check()">
              Logout
            </button>

            <div>
              <router-link to="/account/">
                <img class="pageLogo" alt="Vue logo" src="./assets/avatar.png">
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
    <div class="footer" v-if="this.$route.name !== 'Player'">
      <!--            Hallo ich bin der Footer-->
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import UserService from "./services/UserService";
import searchField from "@/views/components/searchField";

export default {
  name: "App",
  components: {searchField},
  data() {
    return {
      UserService: UserService,
    };
  },
  created() {
  },
};
</script>
<style lang="scss">

@import './styles/reset.scss';
@import './styles/style.scss';

#nav {
  padding: 30px;
  background-color: rgb(37, 37, 37);
  color: white;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.mainNav {
  display: flex;
  gap: 20px;
  align-items: center;
  /*flex-wrap: wrap;*/

  .linkNav {
    display: flex;
    align-items: center;
    gap: 20px;
    text-decoration: none;
    /*flex-wrap: wrap;*/
  }
}

.pageLogo {
  height: 40px;
  width: auto;
}

.footer {
  background-color: rgb(37, 37, 37);
  color: lightgrey;
  padding: 30px;
  text-align: center;
  min-height: 10vh;
  margin-top: 100px;
}


</style>
