<script>
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';


export default {
  name: 'UserComponent',
  components: {
    Card,
    Avatar,
  },
  data() {
    return {

    }
  }
}
</script>
<template>
  <div>

  </div>
</template>
<style scoped>
.cardHeader{
  display: flex;
  align-items: end;
  gap:20px
}
.avatar{
  object-fit: contain;
}
.date{
  font-size: 12px;
  color:grey;
  font-weight: normal;
}
</style>