<template>
  <AuthTemplate>
    <h1 slot="siteTitle">Login</h1>
    <router-link slot="top" to="/register">
      <button>Register</button>
    </router-link>
    <div slot="content">
      <ul>
        <li>Please Login</li>
        <input type="email" name="" id="" v-model="userCred.email">
        <input type="password" name="" id="" v-model="userCred.password">
        <button @click="login">Login</button>
      </ul>
    </div>
  </AuthTemplate>
</template>
<script>
import AuthTemplate from "./AuthTemplate";
import UserService from "../../../services/UserService";


export default {
  name: "Login",
  data() {
    return {
      userCred: {
        email: 'a@m',
        password: 'p',
      },
      UserService: UserService,
    }
  },
  components: {
    AuthTemplate
  },
  methods: {
    login() {
      // console.log(this.userCred);
      this.UserService.login(this.userCred.email, this.userCred.password).then((e) => {
        console.log(e)
      }).catch((error) => {
        console.log(error)
      })
    },
  },
  created: function () {

  },
}
</script>
