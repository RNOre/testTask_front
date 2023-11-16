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
import FileUpload from 'primevue/fileupload';
import 'vue-loading-overlay/dist/css/index.css';
import axios from "axios";


export default {
  name: 'UserComments',
  components: {
    CommentItem,
    Card,
    Avatar,
    InputText,
    SplitButton,
    Textarea,
    Loading,
    FileUpload
  },
  data() {
    return {
      showUpload: false,
      publishItems: [{
        label: 'Прикрепить файл',
        icon: 'pi pi-file',
        command: () => {
          this.showUpload = true;
        }
      }],
      commentText: '',
      isLoading: true,
      url: `http://localhost:20080/test/create/${localStorage.getItem('userId')}`
    }
  },
  created() {
    const payload = {
      userId: localStorage.getItem('userId')
    }
    this.$store.dispatch('getUserComments', payload)
        .then(setTimeout(() => {
          this.isLoading = false
        }, 1000))
  },
  computed: {
    ...mapState({
      commentsData: state => state.comment.userComments,
      // commentId: state => state.comments.userComments[state.comments.userComments.count].id
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
    uploadComment(event) {
      const data = JSON.parse(event.xhr.response);

      const date = format(new Date(), 'yyyy-MM-dd');
      let payload = {};
      payload = data;
      payload.body = {
        date,
        status: 1,
        text: this.commentText,
        userId: this.userId,
      }

        this.$store.dispatch('createCommentWithFile', payload)
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
    },
    test() {
      alert('test')
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
    <SplitButton @click="createComment" label="Опубликовать  без файла" icon="pi pi-plus" :model="publishItems"/>
    <FileUpload v-if="showUpload" style="z-index: 2;" @upload="uploadComment($event)" name="demo[]" :url=url
                :multiple="true"
                :maxFileSize="1000000">
      <template #empty>
        <p>Для загрузки файлов перетащите их сюда.</p>
      </template>
    </FileUpload>
  </div>
  <div class="commentsList">
    <CommentItem v-for="comment in commentsData" :key="comment.id" :text="comment.text" :date="comment.date"
                 :chmod="true" :status="comment.status" :id="comment.id"/>
  </div>
</template>
<style scoped>
.commentsList {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.createCommentForm {
  display: flex;
  flex-direction: column;
  align-item: start;
  gap: 50px;
}

.createCommentForm div {
  max-height: 50px;
  z-index: 2
}

.title {
  text-align: center;
  margin-bottom: 50px;
}

.createCommentForm input {
  margin-right: 20px;
}
</style>