<template>
  <div class="wrapper">
    <div class="wrapperHead">
      <button @click="toggle">
        {{ buttonText }}
        <i v-if="isOpen" class="fas fa-angle-down"/>
        <i v-if="!isOpen" class="fas fa-angle-right"/>
      </button>
      <p v-if="!isOpen" @click="toggle">
        {{ description }}
      </p>
      <button v-if="isOpen" @click="isOpen = false">
        <i class="fas fa-times"></i></button>
    </div>

    <div v-show="isOpen" class="wrapperContent">
      <slot>
      </slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "collapsible",
  props: ["buttonText", "description"],
  data() {
    return {
      isOpen: false,
      wasOpenedOnce: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
      if (!this.wasOpenedOnce) {
        this.$emit("firstOpen")
        this.wasOpenedOnce = true
      }
    },
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  padding: 10px;
  border: 1px solid gray;
  margin-bottom: 10px;
}

.wrapperHead {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
}

.wrapperContent {
  margin-top: 10px;
}

i {
  margin-left: 10px;
}

button {
  min-width: 150px;
  display: inline-flex;
  justify-content: flex-start;
  border-radius: 0px;
}
</style>
