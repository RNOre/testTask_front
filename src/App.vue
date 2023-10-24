<script setup>
import "primevue/resources/themes/lara-light-indigo/theme.css";
import UserComponent from "./components/Comments/UserComments/UserComments.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <Header/>
  <div class="body">
    <router-view>

    </router-view>
  </div>

<!--  <UserComponent/>-->
</template>

<style scoped>
.body{
  margin-top: 50px;
  background-color: white;
  border-radius: 20px;
  padding: 50px;
}
</style>
