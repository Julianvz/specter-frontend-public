<template>
  <div class="search-container">
    <input class="searchInput"
           v-model="searchInput"
           type="search"
           placeholder="search"
           @focusin="popupToggle = true"
           @input="searchPopup">
    <div @click="searchPage" class="searchButton">
      <i class="fas fa-search"></i>
    </div>
    <div class="suggestions" v-if="searchPopupItems && popupToggle">
      <div tabindex="0" @keydown.esc="popupToggle = false" @keydown.enter="routeTo(item.id)" class="suggestion"
           v-for="item in searchPopupItems" @click="routeTo(item.id)">
        <div class="outer">
          <img v-if="item.thumbnail" class="thumb inner" :src="item.thumbnail" alt="">
        </div>
        <div>
          <h3>{{ item.title  | truncate(50, '...') }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CubeService from "@/services/CubeService"
import router from "@/router";

export default {
  name: "searchField",
  components: {},
  data() {
    return {
      CubeService: CubeService,
      searchInput: "",
      searchPopupItems: null,
      popupToggle: false,
    };
  },
  computed: {},
  methods: {
    load() {

    },
    searchPage(searchInput) {
      this.popupToggle = false;
      router.push("/search/" + this.searchInput);
    },
    searchPopup(searchInput) {
      // console.log(searchInput)
      if (this.searchInput === null || this.searchInput === " ") {
        return false
      } else {
        this.CubeService.getCubes('filter[title]=' + this.searchInput + '&page[size]=5').then((resp) => {
          console.log(resp.data)
          this.searchPopupItems = resp.data;
        });
      }

    },
    routeTo(id) {
      this.popupToggle = false;
      router.push('/cubes/' + id)
    }
  },
  created() {
    // alert('hallo')
    this.load();
  },
}
</script>

<style scoped>
.searchInput {
  width: 20vw;
}


.searchButton {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.search-container {
  position: relative;
  display: flex;
}


.suggestions {
  width: 100%;
  position: absolute;
  top: 50px;
  background: #333333;
  padding: 10px;
  z-index: 999;
}

.suggestions .suggestion {
  padding: 10px 10px 5px 5px;
  display: flex;
  cursor: pointer;
}

.suggestions .suggestion:focus {
  outline: none;
  background-color: #252525;
}

.suggestions .suggestion div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 10px;
  word-break: break-all;
}

.suggestions .suggestion div h3 {
  font-weight: 600;
  line-height: 1.5;
}

.thumb {
  max-width: 80px;
}


.outer {
  position: relative;

&
:before {
  display: block;
  content: "";
  width: 100%;
  padding-top: (9 / 16) * 100 %;
}

> .inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

}
</style>