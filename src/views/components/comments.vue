<template>
  <div class="chatwrapper">
    <div class="messages-wrapper">
        <span class="comment" v-for="comment in comments">
          {{ comment.message }}
         <b>By {{ comment.user.username }}</b>
        </span>
    </div>
    <div class="newComment">
      <textarea v-model="newComment">
      {{newComment}}
    </textarea>
      <button @click="addComment">Senden</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments",
  props: ['cube'],
  data() {
    return {
      comments: {},
      newComment: '',
    }
  },

  created() {
    this.getComments();
    setInterval(()=>{
      this.getComments();
    }, 1000)
  },
  methods: {
    getComments() {
      axios.get('/api/comments?filter[cube_id]=' + this.cube.id).then((response) => {
        // console.log(response.data);
        this.comments = response.data.data
      }).catch(function (error) {
        // console.error(error);
      });
    },
    addComment() {
      axios.post('/api/comments', {cube_id: this.cube.id, message: this.newComment}).then((response) => {
        // console.log(response.data);
        this.newComment = ''
        this.getComments()
      }).catch(function (error) {
        // console.error(error);
      });
    }
  }
}
</script>

<style scoped>

.messages-wrapper {
  max-height: 500px;
  overflow: auto;
}

.comment {
  flex-direction: column-reverse;
  background: gray;
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  display: flex;
  width: fit-content;
  line-height: 1.3;
}
b{
  font-weight: bold;
}
.newComment {
  display: flex;
  height: 50px;
}

textarea {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>