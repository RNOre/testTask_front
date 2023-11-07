<script>
import CommentItem from "../CommentItem.vue";
import {mapState} from "vuex";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: 'AllComments',
  methods: {
     test() {
     }
  },
  components: {
    CommentItem,
    Loading
  },
  created() {
    this.$store.dispatch('getAllComments')
        .then(setTimeout(() => {
          this.isLoading = false
        }, 1000));
  },
  computed: {
    ...mapState({
      commentsData: state => state.comment.comments,
    })
  },
  data() {
    return {
      isLoading: true,
    }
  },

}
</script>
<template>
  <loading v-model:active="isLoading"/>
  <h2 class="title" @click="test">
    Комментарии всех пользователей
  </h2>
  <div class="commentItems">
    <CommentItem v-for="comment in commentsData" :key="comment.id"
                 :username="comment.user.username" :date="comment.date" :avatar="comment.user.avatar"
                 :text="comment.text" :chmod="false" :status="comment.status"
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