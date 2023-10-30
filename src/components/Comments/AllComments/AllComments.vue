<script>
import CommentItem from "../CommentItem.vue";
import {mapState} from "vuex";
import axios from "axios";
import Auth from "../../../../services/auth.js";

export default {
  name: 'AllComments',
  methods: {
    async test(){
      await axios.get("http://localhost:20080/comment/index")
    }

    // test(){
    //   console.log(Auth.getToken());
    // }
  },
  components: {
    CommentItem
  },
  created() {
    this.$store.dispatch('getAllComments');
  },
  computed: {
    ...mapState({
      commentsData: state => state.comment.comments,
    })
  },
  data() {
    return {}
  },

}
</script>
<template>
  <h2 class="title" @click="test">
    Комментарии всех пользователей
  </h2>
  <div class="commentItems">
    <CommentItem v-for="comment in commentsData" :key="comment.id"
                 :username="comment.user.username" :date="comment.date" :avatar="comment.user.avatar"
                 :text="comment.text"
    />
  </div>
</template>
<style scoped>
.title {
  text-align: center;
  margin-bottom: 50px;
}

.commentItems {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
</style>