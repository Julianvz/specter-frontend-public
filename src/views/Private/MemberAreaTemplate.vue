<template>
  <div>
    <div class="container">
      <h1>
        <slot name="siteTitle"></slot>
      </h1>
      <br>
      <div class="wrapper">
        <div class="sidebar">
          <ul>
            <li>
              <router-link to="/account/">
                <i class="fas fa-house-user"></i>
                <p>Account</p>
              </router-link>
            </li>
            <li>
              <router-link to="/myCubes/">
                <i class="fas fa-th-list"></i>
                <p>My Cubes</p>
              </router-link>
            </li>
            <li>
              <router-link to="/upload/">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Upload Cubes</p>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="content">
          <slot name="content">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
h1{
  font-size: 35px;
}
@media all and (max-width: 768px){
  .container .wrapper .sidebar[data-v-49c1e747] {
    /* background-color: gray; */
    border: none;
    min-height: auto;
    max-width: 100%;
    flex-grow: 1;
    padding: 0px;
  }
}

.container {
  /*background-color: rgba(0, 0, 0, 0.83);*/
  border: 1px solid gray;
  padding: 20px;
  min-height: 500px;
  max-width: 1100px;
  //margin: 20px;
  margin: auto;

  .topbar {
    /*background-color: gray;*/
    border: 1px solid gray;
    min-height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
    margin-bottom: 20px;

    .toolbar {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      button {
        border: none;
        padding: 5px 10px;
        width: auto;
      }
    }
  }

  .wrapper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 20px;

    .sidebar {
      /*background-color: gray;*/
      border: 1px solid gray;
      min-height: 600px;
      max-width: 30%;
      flex-grow: 1;
      padding: 10px;


      ul li a {
        color: #a5a5a5;
        text-decoration: none;
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: black;
        margin-bottom: 10px;
        padding: 10px;

        &.router-link-exact-active {
          color: #fffef8;
        }
      }
    }

    .content {
      color: #fff;
      padding: 10px;
      /*background-color: gray;*/
      border: 1px solid gray;

      height: 100%;
      min-height: 600px;
      flex-grow: 1;
      width: 70%;
    }
  }

}


</style>

<script>

export default {
  name: "AccountTemplate",
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created: function () {
  },
}
</script>




