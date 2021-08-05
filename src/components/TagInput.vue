<template>
  <div class="tagInputWrapper">
    <div class='tag-input' v-if="tags.length > 0">
      <div v-for='(tag, index) in tags' :key='tag.id' class='tag-input__tag'>
        <span @click='removeTag(index)'>x</span>
        {{ tag.name }}
      </div>
    </div>
    <input
        type='text'
        placeholder="Type and press enter to add up to 5 Tags!"
        class='tag-input__text'
        @keydown.enter='addTag'
        @keydown.188='addTag'
        v-model="tagInput"
        @input="getTags"
        ref="tagInput"
        v-if="tags.length < 6"
        @focus='autocompleteSuggestions = true'
    />
    <!--    <button @click="saveTags">Save Tags!</button>-->
    <div class="suggestions" v-if="autocompleteSuggestions && tags.length < 6">
      <div tabindex="0" class="suggestion" v-for="tag in autocompleteTags" :key="tag.id" @keydown.enter="addTag(tag)"
           @click="addTag(tag)">
        {{ tag.name }}
      </div>
    </div>

  </div>

</template>
<script>
import axios from "axios"

export default {
  props: ['cube'],
  data() {
    return {
      tags: [],
      autocompleteTags: {},
      tagInput: '',
      autocompleteSuggestions: false,
    }
  },
  created() {
    this.getTags()
    this.tags = this.cube.tags
  },
  methods: {

    getTags() {
      axios.get('/api/tags?filter[name]=' + this.tagInput).then((response) => {
        // console.log(response.data.data);
        this.autocompleteTags = [...new Set(response.data.data)]

      }).catch(function (error) {
        console.error(error);
      });
    },

    addTag(tag) {
      if (this.autocompleteTags.find(x => x.name === tag.name)) {
        this.tags.push(tag)
      } else {
        axios.post('/api/tags', {name: this.tagInput}).then((response) => {
          console.log(response.data);
          this.tags.push(response.data)
        }).catch(function (error) {
          console.error(error.message);
        });
      }

      this.tags = [...new Set(this.tags)]
      this.saveTags()
      this.tagInput = ''
      this.autocompleteSuggestions = false
      this.$refs.tagInput.focus()

      this.autocompleteTags = this.autocompleteTags.filter(item => !this.tags.includes(item))

    },
    removeTag(index) {
      this.tags.splice(index, 1)
      this.saveTags()
    },

    saveTags() {
      // Nur die id aus den objekten im array holen
      // und in einen separaten Array speichern,
      // danach .join um sie mit kommas dazwischen in einen string zu verwandeln
      let ids = []
      this.tags.forEach((tag) => {
        ids.push(tag.id)
      })

      axios.put('/api/cubes/' + this.cube.id + '/tags/' + ids.join()).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }


  }
}
</script>
<style scoped>
.tagInputWrapper {
  /*border: 1px solid white;*/
  /*padding: 10px;*/
  margin-bottom: 10px;
  /*padding-bottom: 50px!important;*/
}

.tag-input {
  width: 100%;
  /*border: 1px solid #eee;*/
  /*font-size: 0.9em;*/
  /*height: 50px;*/
  box-sizing: border-box;
  /*padding: 0 10px;*/
  display: inline-block;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                   supported by Chrome, Edge, Opera and Firefox */

}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #606060;
  margin-bottom: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
  background-color: #fff;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  color: black;
  font-weight: bold;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.tag-input__text {
  border: 1px solid gray;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
  color: white;
}

.tag-input__text:focus {
  border: 1px solid white;
}


.suggestions {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  width: 100%;
  /*background: #333333;*/
  max-height: 150px;
  overflow-y: auto;
}

.suggestions .suggestion {
  width: -moz-max-content;
  padding: 5px;
  display: flex;
  cursor: pointer;
  background-color: gray;
  /*border: 1px solid gray;*/
  word-break: break-all;
}

.suggestion:focus {
  outline: none;
  background-color: green;
}

.suggestions .suggestion div h3 {
  font-weight: 600;
  line-height: 1.5;
}
</style>