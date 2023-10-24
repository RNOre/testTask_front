<script>
import CommentItem from "../CommentItem.vue";
import {mapState} from "vuex";

export default {
  name: 'AllComments',
  components:{
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
  data(){
    return{

    }
  },

}
</script>
<template>
  <h2 class="title">
    Комментарии всех пользователей
  </h2>
  <div class="commentItems">
    <CommentItem v-for="comment in commentsData" :key="comment.id"
                 :username="comment.user.username" :date="comment.date" :avatar="comment.user.avatar" :text="comment.text"
    />
  </div>
</template>
<style scoped>
.title{
  text-align: center;
  margin-bottom: 50px;
}
.commentItems{
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
</style>