<script>
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext'
import SplitButton from "primevue/splitbutton";
import {format} from "date-fns";
import {mapState} from "vuex";
import CommentItem from "../CommentItem.vue";
import Textarea from "primevue/textarea";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


export default {
  name: 'UserComments',
  components: {
    CommentItem,
    Card,
    Avatar,
    InputText,
    SplitButton,
    Textarea,
    Loading
  },
  data() {
    return {
      publishItems: [{
        label: 'Сохранить',
        icon: 'pi pi-save',
        command: () => {
          this.saveComment();
        }
      }
      ],
      commentText: '',
      isLoading: true
    }
  },
  created() {
    const payload = {
      userId: localStorage.getItem('userId'),
    }
    this.$store.dispatch('getUserComments', payload)
        .then(setTimeout(() => {
          this.isLoading = false
        }, 1000))
  },
  computed: {
    ...mapState({
      commentsData: state => state.comment.userComments,
    }),
    userId() {
      return localStorage.getItem('userId')
    }
  },
  methods: {
    createComment() {
      const date = format(new Date(), 'yyyy-MM-dd');
      const body = {
        date,
        status: 1,
        text: this.commentText,
        userId: this.userId,
      }
      this.$store.dispatch('createComment', body);
      this.commentText = '';
    },
    saveComment() {
      const date = format(new Date(), 'yyyy-MM-dd');
      const body = {
        date,
        status: 0,
        text: this.commentText,
        userId: this.userId,
      }
      this.$store.dispatch('createComment', body)
      this.commentText = '';
    }
  }
}
</script>
<template>
  <loading v-model:active="isLoading"/>
  <div>
    <h2 class="title">Комментарии пользователя</h2>
  </div>
  <div class="createCommentForm">
    <Textarea id="value" v-model="commentText" placeholder="Новый комментарий"/>
    <SplitButton @click="createComment" label="Опубликовать" icon="pi pi-plus" :model="publishItems"/>
  </div>
  <div class="commentsList">
    <CommentItem v-for="comment in commentsData" :key="comment.id" :text="comment.text" :date="comment.date"
                 :chmod="true" :status="comment.status" :id="comment.id"/>
  </div>
</template>
<style scoped>
.commentsList {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.createCommentForm {
  display: flex;
  align-item: start;
  gap: 50px
}

.createCommentForm div {
  max-height: 50px;
}

.title {
  text-align: center;
  margin-bottom: 50px;
}

.createCommentForm input {
  margin-right: 20px;
}
</style>