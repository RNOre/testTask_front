<script>
import {mapState} from "vuex";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import CommentItem from "../CommentItem.vue";
import Paginator from "primevue/paginator";

export default {
  name: 'Admin',
  components: {
    Loading,
    CommentItem,
    Paginator
  },
  data() {
    return {
      isLoading: true,
    }
  },
  created() {
    this.$store.dispatch('adminGetComments')
        .then(setTimeout(() => {
          this.isLoading = false
        }, 1000))
  },
  computed: {
    ...mapState({
      commentsData: state => state.comment.comments
    })
  },
  methods:{
  }
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
                 :text="comment.text" :chmod="true" :status="comment.status" :admin="true" :id="comment.id"
                 :fileData="comment.file"/>
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