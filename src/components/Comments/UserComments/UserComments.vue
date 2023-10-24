<script>
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext'
import SplitButton from "primevue/splitbutton";
import {format} from "date-fns";

export default {
  name: 'UserComments',
  components: {
    Card,
    Avatar,
    InputText,
    SplitButton
  },
  data() {
    return {
      publishItems: [{
        label: 'Сохранить',
        icon: 'pi pi-save',
        command:()=>{
          this.saveComment();
        }
      }
      ],
      commentText: ''
    }
  },
  methods: {
    createComment() {
      const date = format(new Date(), 'yyyy-MM-dd');
      const body = {
        date,
        status: 1,
        text: this.commentText,
        userId: 1,
      }
      this.$store.dispatch('createComment', body)
    },
    saveComment() {
      const date = format(new Date(), 'yyyy-MM-dd');
      const body = {
        date,
        status: 0,
        text: this.commentText,
        userId: 1,
      }
      this.$store.dispatch('createComment', body)
    }
  }
}
</script>
<template>
  <div>
    <h2 class="title">Комментарии пользователя</h2>
  </div>
  <div class="createCommentForm">
    <InputText id="value" v-model="commentText" type="text" :class="{ 'p-invalid': errorMessage }"
               aria-describedby="text-error" placeholder="Новый комментарий"/>
    <SplitButton @click="createComment" label="Опубликовать" icon="pi pi-plus" :model="publishItems"/>
  </div>
</template>
<style scoped>
.cardHeader {
  display: flex;
  align-items: end;
  gap: 20px
}

.avatar {
  object-fit: contain;
}

.date {
  font-size: 12px;
  color: grey;
  font-weight: normal;
}

.title {
  text-align: center;
  margin-bottom: 50px;
}

.createCommentForm input {
  margin-right: 20px;
}
</style>