<script>
import axios from "axios";
import Auth from "../../services/auth.js";
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
  name: 'Login',
  components: {
    InputText,
    Button
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {

    setToken(token) {
      Auth.login(token);
      this.$router.push('/all-comments');
    },

    async inputValue() {
      const data = {
        login: this.login,
        password: this.password,
      }

      await axios.post(
          'http://localhost:20080/login/check',
          data)
          .then(resp => resp.data)
          .then(resp => this.setToken(resp))
    }
  },
}
</script>
<template>
  <div class="authItem">
    <div class="inputGroup">
      <p>Вход в систему</p>
      <span class="p-float-label">
        <InputText id="login" v-model="login"/>
        <label for="login">Логин</label>
      </span>
      <span class="p-float-label">
        <InputText id="password" v-model="password"/>
        <label for="password">Пароль</label>
      </span>
      <div class="links">
        <Button icon="pi pi-google" rounded outlined aria-label="Filter" />
      </div>
      <Button class="enterBtn" @click="inputValue()" label="Войти"/>
      <router-link to="/register">Зарегестрироваться</router-link>
    </div>
  </div>
</template>

<style scoped>
.authItem {
  display: flex;
  align-items: center;
  justify-content: center
}

.inputGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  gap: 50px;
}
.links{
  display:flex;
  gap:20px;
}
</style>
