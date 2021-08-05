<template>
  <AuthTemplate>
    <h1 slot="siteTitle">Login</h1>
    <router-link slot="top" to="/register">
      <button>Register</button>
    </router-link>

    <div slot="content">
      <ul>
        <li>Please register</li>
        <input type="email" name="email" id="email" v-model="userCred.email" placeholder="Email">
        <input type="text" name="username" id="username" v-model="userCred.username" placeholder="Username">
        <input type="password" name="password" id="password" v-model="userCred.password" placeholder="Password">
        <button @click="login">Register</button>
        {{ errorMsg }}
      </ul>
    </div>
  </AuthTemplate>
</template>
<script>
import AuthTemplate from "./AuthTemplate";
import UserService from "../../../services/UserService";


export default {
  name: "Register",
  data() {
    return {
      userCred: {
        email: '',
        password: '',
      },
      UserService: UserService,
      errorMsg: {},
    }
  },
  components: {
    AuthTemplate
  },
  methods: {
    login() {
      this.UserService.register(this.userCred.email, this.userCred.username, this.userCred.password).then((e) => {
        console.log(e)
      }).catch((error) => {
        console.log(error)
        this.errorMsg = error
      })
    },
  },
  created: function () {

  },
}
</script>
