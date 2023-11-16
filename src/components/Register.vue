<script>
import axios from "axios";
import Auth from "../../services/auth.js";
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
  name: 'Register',
  components: {
    InputText,
    Button
  },
  data() {
    return {
      login: '',
      password: '',
      emailInput: ''
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
        email: this.emailInput
      }
      try {
        const response = await axios.post(
            'http://localhost:20080/auth/login', data);

        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        const id = response.data.user.id;
        localStorage.setItem('userId', id.toString());
        Auth.login(token, refreshToken);

        this.$router.push('/all-comments');
        this.$store.dispatch('login');
      } catch (e) {
        console.log(e);
      }

    }
  },
}
</script>
<template>
  <div class="authItem">
    <div class="inputGroup">
      <p>Регистрация</p>
      <div class="inputGroup">
        <span class="p-float-label">
        <InputText id="login" v-model="login"/>
        <label for="login">Логин</label>
      </span>
        <span class="p-float-label">
        <InputText id="email" v-model="emailInput"/>
        <label for="email">Email</label>
      </span>
        <span class="p-float-label">
        <InputText id="password" v-model="password" type="password"/>
        <label for="password">Пароль</label>
      </span>
      </div>
      <Button label="Зарегестрироваться" @click="inputValue()"/>
      <router-link to="/login">Уже есть аккаунт, войти</router-link>
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
</style>
