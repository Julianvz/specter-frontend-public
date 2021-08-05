<template>
  <div>
    <div class="container">
      <div class="topbar">
        <div>
          <slot name="siteTitle">
          </slot>
        </div>
        <div class="toolbar">
          <slot name="top">
          </slot>
        </div>
      </div>
      <div class="wrapper">
        <div class="content">
          <slot name="content">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  /*background-color: rgba(0, 0, 0, 0.83);*/
  border: 1px solid gray;
  padding: 20px;
  min-height: 500px;
  width: 60%;
  margin: 0 auto;

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

    .sidebar {
      /*background-color: gray;*/
      border: 1px solid gray;
      min-height: 600px;
      width: 300px;
      padding: 10px;
      margin-right: 20px;

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
      width: 100%;
      height: 100%;
      min-height: 600px;
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
  computed: {
    // hasSeoSettingsSlot () {
    //   return !!this.$slots['seoSettings']
    // }
  },
  created: function () {

  },
}
</script>




