<script>
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import SpeedDial from 'primevue/speeddial';
import Toast from 'primevue/toast';
import {useToast} from "primevue/usetoast";
import {ref} from "vue";
import {useConfirm} from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";
import InputText from "primevue/inputtext";
import Textarea from 'primevue/textarea';


export default {
  name: 'CommentItem',
  components: {
    Card,
    Avatar,
    SpeedDial,
    Toast,
    ConfirmDialog,
    InputText,
    Textarea
  },
  props: {
    username: String,
    avatar: String,
    text: String,
    date: String,
    status: Boolean,
    chmod: Boolean,
    id: String
  },
  data() {
    return {
      editMode: false,
      editText: this.text,
      toast: useToast(),
      confirm: useConfirm(),
      saveEdit: ref([
        {
          label: 'Отменить',
          icon: 'pi pi-times',
          command: () => {
            this.editMode = false;
            this.editText=this.text;
          }
        },
        {
          label: 'Сохранить',
          icon: 'pi pi-check',
          command: () => {
            const payload = {
              id: this.id,
              text: this.editText
            }
            this.$store.dispatch('changeCommentText', payload);
            this.editMode = false;
            this.editText=this.text;
            this.$toast.add({
              severity: 'success',
              summary: 'Текст изменен',
              detail: 'Ваш комментарий был изменен',
              life: 3000
            })
          }
        }
      ]),
      items: ref([
        {
          label: 'Редактировать',
          icon: 'pi pi-pencil',
          command: () => {
            this.editMode = true;
          }
        },
        {
          label: 'Скрыть',
          icon: 'pi pi-eye-slash',
          command: () => {
            const payload = {
              id: this.id,
              status: 0
            }
            this.$store.dispatch('changeCommentStatus', payload);
            this.$toast.add({severity: 'info', summary: 'Статус изменен', detail: 'Ваш комментарий скрыт', life: 3000});
          }
        },
        {
          label: 'Удалить',
          icon: 'pi pi-trash',
          command: () => {
            this.$store.dispatch('deleteComment', this.id);
            this.$toast.add({
              severity: 'error',
              summary: 'Удаление комментария',
              detail: 'Ваш комментарий удален',
              life: 3000
            });
            // this.deleteComment();
          }
        }
      ]),
      hideItems: [
        {
          label: 'Редактировать',
          icon: 'pi pi-pencil',
          command: () => {
            this.editMode = true;
          }
        },
        {
          label: 'Показать',
          icon: 'pi pi-eye',
          command: () => {
            const payload = {
              id: this.id,
              status: 1
            }
            this.$store.dispatch('changeCommentStatus', payload);
            this.$toast.add({
              severity: 'info',
              summary: 'Статус изменен',
              detail: 'Ваш комментарий виден другим пользователям',
              life: 3000
            });
          }
        },
        {
          label: 'Удалить',
          icon: 'pi pi-trash',
          command: () => {
            this.$toast.add({
              severity: 'error',
              summary: 'Удаление комментария',
              detail: 'Ваш комментарий удален',
              life: 3000
            });
          }
        }
      ]
    }
  },
  methods: {
    deleteComment() {
      this.confirm.require({
        message: `Вы уверены, что хотите удалить данный комментарий`,
        header: 'Удаление комментария',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Удаление комментария',
            detail: 'Комментарий был удален',
            life: 2000
          })
        },
        reject: () => {
        }
      })
    }
  }
}
</script>
<template>
  <Toast/>
  <ConfirmDialog></ConfirmDialog>
  <Card class="cardItem" v-if="status">
    <template #title>
      <div class="cardHeader">
        <Avatar v-if="!chmod"
                :image=avatar
                class="mr-2 avatar" size="xlarge" shape="circle"/>
        <div v-if="!chmod">{{ username }}</div>
        <p class="date">{{ date }}</p>
      </div>
    </template>
    <template #content>
      <div style="position: relative;">
        <div v-if="chmod">
          <Textarea rows="2" cols="30" v-if="editMode" v-model="editText"/>
          <p class="text" v-else>
            {{ text }}
          </p>

        </div>
        <p v-else>
          {{ text }}
        </p>
        <div v-if="editMode">
          <SpeedDial v-if="chmod" :model="saveEdit" :radius="70" type="quarter-circle" direction="up-left"
                     :style="{ right: 0, bottom: '-20px'}" showIcon="pi pi-bars" hideIcon="pi pi-times"
                     buttonClass="p-button-warning"/>
        </div>
        <SpeedDial v-else v-if="chmod" :model="items" :radius="70" type="quarter-circle" direction="up-left"
                   :style="{ right: 0, bottom: '-20px'}" showIcon="pi pi-bars" hideIcon="pi pi-times"/>
      </div>
    </template>
  </Card>
  <Card class="hide cardItem" v-else>
    <template #title>
      <div class="cardHeader">
        <Avatar v-if="!chmod"
                :image=avatar
                class="mr-2 avatar" size="xlarge" shape="circle"/>
        <div v-if="!chmod">{{ username }}</div>
        <p class="date">{{ date }}</p>
      </div>
    </template>
    <template #content>
      <div style="position: relative;">
        <div v-if="chmod">
          <Textarea rows="2" cols="30" v-if="editMode" v-model="editText"/>
          <p class="text" v-else>
            {{ text }}
          </p>

        </div>
        <p v-else>
          {{ text }}
        </p>
        <div v-if="editMode">
          <SpeedDial v-if="chmod" :model="saveEdit" :radius="70" type="quarter-circle" direction="up-left"
                     :style="{ right: 0, bottom: '-20px'}" showIcon="pi pi-bars" hideIcon="pi pi-times"
                     buttonClass="p-button-warning"/>
        </div>
        <SpeedDial v-else v-if="chmod" :model="hideItems" :radius="70" type="quarter-circle" direction="up-left"
                   :style="{ right: 0, bottom: '-20px'}" showIcon="pi pi-bars" hideIcon="pi pi-times"/>
      </div>
    </template>

  </Card>
</template>
<style>
.cardItem {
  width: 700px;
  transition: 1s;
}

.cardItem:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.hide {
  background-color: #e9ecf1;
}

.cardHeader {
  display: flex;
  align-items: end;
  gap: 20px
}

.text {
  max-width: 80%;
}

.date {
  font-size: 12px;
  color: grey;
  font-weight: normal;
}
</style>