<script>
import Card from "primevue/card";
import Avatar from "primevue/avatar";

export default {
  name: 'CommentItem',
  components: {
    Card,
    Avatar,
  },
  props: {
    username: String,
    avatar: String,
    text: String,
    date: String
  },
  data() {
    return {}
  }
}
</script>
<template>
  <Card class="cardItem">
    <template #title>
      <div class="cardHeader">
        <Avatar
            :image = avatar
            class="mr-2 avatar" size="xlarge" shape="circle"/>
        <div>{{ username }}</div>
        <p class="date">{{ date }}</p>
      </div>
    </template>
    <template #content>
      <p>
        {{ text }}
      </p>
    </template>
  </Card>
</template>
<style>
.cardItem {
  width: 700px;
}

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
</style>